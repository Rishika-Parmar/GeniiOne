import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function DebateArena({
  coins,
  setCoins,
  levelData,
  quests,
  handleQuestToggle,
  showToast,
  currentStreamDb
}) {
  // --- Debate states ---
  const [blockedStates, setBlockedStates] = useState({
    "Aarav (Tech Aspirant)": { voice: false, text: false, video: false },
    "Sophia (AI Ethics Expert)": { voice: false, text: false, video: false },
    "Zoe (Study Strategist)": { voice: false, text: false, video: false }
  });
  const [userMedia, setUserMedia] = useState({ mic: false, camera: false });
  const [floatingStickers, setFloatingStickers] = useState([]);
  const [debateWarning, setDebateWarning] = useState(null);
  const [selectedDebateTopicIndex, setSelectedDebateTopicIndex] = useState(0);
  
  const [inDebate, setInDebate] = useState(false);
  const [simStage, setSimStage] = useState(0);
  const [debateParticipants, setDebateParticipants] = useState([]);
  const [debateTimeRemaining, setDebateTimeRemaining] = useState(900); // 15 mins
  const [breakTimeRemaining, setBreakTimeRemaining] = useState(300); // 5 mins
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isJudging, setIsJudging] = useState(false);
  const [judgeResult, setJudgeResult] = useState(null);
  const [debateInput, setDebateInput] = useState("");
  const [debateFeedback, setDebateFeedback] = useState(null);
  const [debateHistory, setDebateHistory] = useState({});

  const localVideoRef = useRef(null);
  const streamRef = useRef(null);

  const activeDebateTopic = currentStreamDb.debateTopics[selectedDebateTopicIndex] || currentStreamDb.debateTopics[0];

  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  // --- Webcam & Microphone Access & Stream Setup ---
  useEffect(() => {
    const constraints = {
      video: userMedia.camera,
      audio: userMedia.mic
    };

    if (constraints.video || constraints.audio) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          streamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = constraints.video ? stream : null;
            if (constraints.video) {
              localVideoRef.current.play().catch(err => console.warn("Video play check failed:", err));
            }
          }
        })
        .catch(err => {
          console.warn("Media access denied/unavailable:", err);
          if (constraints.video && constraints.audio) {
            showToast("Media Access Failed", "Unable to access camera or microphone.");
          } else if (constraints.video) {
            showToast("Camera Access Failed", "Unable to access camera. Rendering custom visual avatar.");
          } else {
            showToast("Microphone Access Failed", "Unable to access microphone.");
          }
          setUserMedia(prev => ({
            mic: constraints.audio ? false : prev.mic,
            camera: constraints.video ? false : prev.camera
          }));
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
    return () => {
      // Clean up on unmount or triggers
    };
  }, [userMedia.camera, userMedia.mic]);

  const { entryFee, winReward } = useMemo(() => {
    const lvl = levelData.level;
    if (lvl === 1) return { entryFee: 30, winReward: 50 };
    if (lvl === 2) return { entryFee: 15, winReward: 30 };
    return { entryFee: 5, winReward: 10 }; // Level 3 default
  }, [levelData.level]);

  const handleSelectTopic = (index) => {
    setSelectedDebateTopicIndex(index);
    setDebateFeedback(null);
    const topicText = currentStreamDb.debateTopics[index];
    
    // Clear and build initial statements
    const initialMsgs = [
      { sender: "System", body: `Debate Arena active on topic: "${topicText}". Join the group discussion by writing your viewpoint.` }
    ];

    setDebateHistory(prev => ({
      ...prev,
      [topicText]: initialMsgs
    }));

    if (inDebate) {
      setSimStage(0);
      setDebateParticipants([
        {
          name: "You (Student)",
          avatar: "👤",
          isUser: true,
          team: 1,
          mic: false,
          camera: false
        }
      ]);
    }
  };

  const handleJoinDebate = () => {
    if (coins < entryFee) {
      showToast("❌ Entry Refused", `You need at least ${entryFee} Credit Coins for Level ${levelData.level} entry.`);
      return;
    }
    
    setCoins(prev => prev - entryFee);
    setInDebate(true);
    setSimStage(0);
    setDebateTimeRemaining(900); // 15 mins
    setIsBreakActive(false);
    setJudgeResult(null);

    // Reset debate history and select topic
    handleSelectTopic(selectedDebateTopicIndex);
    
    // Set up user as the first participant in Team 1
    setDebateParticipants([
      {
        name: "You (Student)",
        avatar: "👤",
        isUser: true,
        team: 1,
        mic: false,
        camera: false
      }
    ]);
    
    showToast("🪙 Paid Entry Fee", `Paid ${entryFee} coins. Welcome to Level ${levelData.level} Arena! You are on Team 1.`);
  };

  const handleEndDebateAndJudge = () => {
    if (isJudging) return;
    setIsJudging(true);
    setDebateFeedback(null);
    
    showToast("🧠 AI Judge Evaluating", "The AI Judge is analyzing arguments, structure, and team delivery...");
    
    setTimeout(() => {
      setIsJudging(false);
      setIsBreakActive(true);
      setBreakTimeRemaining(300); // 5 minutes break

      // Determine winning team - Team 1 (user's team) wins to show the coin reward!
      const winningTeam = 1;
      
      // Award coins to user since they are in Team 1
      addCoins(winReward);
      
      setJudgeResult({
        winningTeam,
        verdict: `Team 1 (Pro-Topic) won the debate! They structured their arguments with clear connections and presented exceptional critical assertions. Each member of Team 1 receives a reward of ${winReward} Credit Coins!`,
        rewardAwarded: winReward
      });
      
      showToast("🏆 Team 1 Wins! (+" + winReward + " 🪙)", `AI Judge awarded ${winReward} coins to each Team 1 member!`);
    }, 2500);
  };

  const handleNextDebateCycle = () => {
    setIsBreakActive(false);
    setInDebate(false);
    setSimStage(0);
    setJudgeResult(null);
    setDebateParticipants([]);
    
    // Cycle to next debate topic
    const nextIndex = (selectedDebateTopicIndex + 1) % currentStreamDb.debateTopics.length;
    setSelectedDebateTopicIndex(nextIndex);
    
    showToast("🔔 New Debate Cycle Active", "Break ended. Pay the entry fee to join the new topic debate!");
  };

  const handleSkipTimer = () => {
    if (inDebate && !isBreakActive) {
      setDebateTimeRemaining(5); // Speed up to 5 seconds remaining
      showToast("⏩ Timer Speedup", "Fast-forwarding to the end of the debate...");
    } else if (isBreakActive) {
      setBreakTimeRemaining(5); // Speed up to 5 seconds remaining
      showToast("⏩ Timer Speedup", "Fast-forwarding to the end of the break...");
    }
  };

  const handleSimulateThreeUsers = () => {
    if (simStage !== 0) return;
    
    const newParticipants = [
      { name: "Aarav (Tech Aspirant)", avatar: "👨‍💻", isUser: false, team: 2 },
      { name: "Sophia (AI Ethics Expert)", avatar: "👩‍⚖️", isUser: false, team: 3 },
      { name: "Zoe (Study Strategist)", avatar: "👩‍🎓", isUser: false, team: 1 }
    ];

    setDebateParticipants(prev => [...prev, ...newParticipants]);
    setSimStage(1);

    const topicText = activeDebateTopic;
    const botMessages = [
      { sender: "Aarav (Tech Aspirant)", body: "In my view, this topic is critical. Looking at modern deployment stats, automation is taking over routine pipelines. Consequently, junior positions must evolve or disappear." },
      { sender: "Sophia (AI Ethics Expert)", body: "However, Aarav, we shouldn't neglect the necessity of human verification. Pure algorithmic setups fail to grasp product nuances. Therefore, humans remain highly vital." },
      { sender: "Zoe (Study Strategist)", body: "To succeed, we need a strategic hybrid model. We must integrate AI to accelerate our learning rather than seeing it as a threat." }
    ];

    botMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setDebateHistory(prev => {
          const list = prev[topicText] || [];
          return {
            ...prev,
            [topicText]: [...list, msg]
          };
        });
      }, 600 * (idx + 1));
    });

    showToast("👥 3 Users Entered", "Aarav (Team 2), Sophia (Team 3), and Zoe (Team 1) have joined the debate.");
  };

  const handleSimulateTwoMoreUsers = () => {
    if (simStage !== 1) return;

    const newParticipants = [
      { name: "Ishaan (AI Developer)", avatar: "🤖", isUser: false, team: 3 },
      { name: "Ananya (Research Specialist)", avatar: "👩‍🔬", isUser: false, team: 1 }
    ];

    setDebateParticipants(prev => [...prev, ...newParticipants]);
    setSimStage(2);

    const topicText = activeDebateTopic;
    const newMessages = [
      { sender: "Ishaan (AI Developer)", body: "AI agents are powerful tools, but they cannot replace the creative problem solving of junior engineers. We are scaling productivity, not replacing minds." },
      { sender: "Ananya (Research Specialist)", body: "Empirical studies in human-AI collaboration prove that hybrid teams produce 40% fewer errors than AI or humans working alone." }
    ];

    newMessages.forEach((msg, idx) => {
      setTimeout(() => {
        setDebateHistory(prev => {
          const list = prev[topicText] || [];
          return {
            ...prev,
            [topicText]: [...list, msg]
          };
        });
      }, 600 * (idx + 1));
    });

    showToast("👥 2 More Users Entered", "Ishaan (Team 3) and Ananya (Team 1) have joined the debate.");
  };

  // Timer Countdown Effect
  useEffect(() => {
    let timer = null;
    if (inDebate && !isBreakActive) {
      timer = setInterval(() => {
        setDebateTimeRemaining(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    } else if (isBreakActive) {
      timer = setInterval(() => {
        setBreakTimeRemaining(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [inDebate, isBreakActive]);

  // Effect to handle debate timer ending
  useEffect(() => {
    if (inDebate && !isBreakActive && debateTimeRemaining === 0) {
      handleEndDebateAndJudge();
    }
  }, [debateTimeRemaining, inDebate, isBreakActive]);

  // Effect to handle break timer ending
  useEffect(() => {
    if (isBreakActive && breakTimeRemaining === 0) {
      handleNextDebateCycle();
    }
  }, [breakTimeRemaining, isBreakActive]);

  // Run on mount or stream change to reset debate topic
  useEffect(() => {
    handleSelectTopic(0);
  }, [currentStreamDb]);

  const handleSendDebateArgument = (e) => {
    e.preventDefault();
    if (debateInput.trim().length < 10) {
      showToast("Argument Too Short", "Please write a comprehensive point to debate (min 10 chars).");
      return;
    }
    const val = debateInput.trim();
    setDebateInput("");
    const topicText = activeDebateTopic;

    // 1. Post User
    setDebateHistory(prev => ({
      ...prev,
      [topicText]: [...(prev[topicText] || []), { sender: "You", body: val }]
    }));

    if (quests && !quests.debate) {
      handleQuestToggle("debate");
    }

    // 2. Grade input
    const wordCount = val.split(" ").length;
    const markers = ["however", "therefore", "consequently", "because", "furthermore", "analysis", "evidence", "contrast"];
    let matchedCount = 0;
    markers.forEach(m => {
      if (val.toLowerCase().includes(m)) matchedCount++;
    });

    const scoreClarity = Math.min(98, Math.max(70, 75 + matchedCount * 4 + (wordCount > 15 ? 5 : 0)));
    const scoreThinking = Math.min(98, Math.max(68, 70 + (wordCount > 20 ? 8 : 2) + matchedCount * 5));
    const scorePersuasion = Math.min(98, Math.max(65, 72 + matchedCount * 6));
    const scoreConfidence = Math.min(98, Math.max(72, 80 + (wordCount > 25 ? 10 : 3)));

    let feedbackText = "";
    if (matchedCount >= 2 && wordCount > 20) {
      feedbackText = `Excellent Critical Construction! You structurally organized your argument with logical transitions (${markers.filter(m => val.toLowerCase().includes(m)).join(", ")}). Your assertion addresses core thesis bounds nicely. +15 Credit Coins added!`;
      addCoins(15);
    } else {
      feedbackText = `Structured Argument Received. Good attempt. To enhance your persuasion score next round, try incorporating comparative connectors (e.g. 'However', 'Therefore') and back your premise with mock empirical metrics.`;
    }

    setDebateFeedback({
      clarity: scoreClarity,
      thinking: scoreThinking,
      persuasion: scorePersuasion,
      confidence: scoreConfidence,
      text: feedbackText
    });

    // 3. Bot reply rebuttal
    setTimeout(() => {
      const botsRebuttals = [
        `A fair assertion, but it overlooks resource limits. Because scalability is bounded, we cannot rely solely on the model you propose.`,
        `I agree with that perspective. Indeed, prioritizing active skill development yields significantly stronger long-term yields.`,
        `That contradicts empirical metrics. For example, local tests proved that manual configuration latency remains too high.`
      ];
      const randResp = botsRebuttals[Math.floor(Math.random() * botsRebuttals.length)];
      const botName = Math.random() > 0.5 ? "Aarav (Tech Aspirant)" : "Sophia (AI Ethics Expert)";

      setDebateHistory(prev => ({
        ...prev,
        [topicText]: [...(prev[topicText] || []), { sender: botName, body: randResp }]
      }));
    }, 1500);
  };

  const triggerSticker = (sender, emoji) => {
    const id = Date.now() + Math.random();
    setFloatingStickers(prev => [...prev, { id, sender, emoji }]);
    setTimeout(() => {
      setFloatingStickers(prev => prev.filter(s => s.id !== id));
    }, 2000);
  };

  const handleSendSticker = (emoji) => {
    const topicText = activeDebateTopic;
    setDebateHistory(prev => ({
      ...prev,
      [topicText]: [...(prev[topicText] || []), { sender: "You", body: `Sent sticker: ${emoji}`, isSticker: true, stickerEmoji: emoji }]
    }));
    triggerSticker("You", emoji);

    setTimeout(() => {
      const bots = ["Aarav (Tech Aspirant)", "Sophia (AI Ethics Expert)", "Zoe (Study Strategist)"];
      const randBot = bots[Math.floor(Math.random() * bots.length)];
      
      if (!blockedStates[randBot]?.text) {
        setDebateHistory(prev => ({
          ...prev,
          [topicText]: [...(prev[topicText] || []), { sender: randBot, body: `Sent sticker: ${emoji}`, isSticker: true, stickerEmoji: emoji }]
        }));
      }
      
      if (!blockedStates[randBot]?.video) {
        triggerSticker(randBot, emoji);
      }
    }, 1000);
  };

  const handleSimulateAbuse = () => {
    const topicText = activeDebateTopic;
    setDebateWarning("Warning: Aarav's feed has triggered standard safety protocols (potential verbal abuse/corrupt feed). Recommend muting text/video.");
    
    setDebateHistory(prev => ({
      ...prev,
      [topicText]: [...(prev[topicText] || []), { sender: "Aarav (Tech Aspirant)", body: "⚠️ [AI SYSTEM ALERT: SAFETY VIOLATION] YOU GUYS DO NOT KNOW ANYTHING! THIS DEBATE IS A WASTE OF TIME! 😡", isAbusive: true }]
    }));
    showToast("🚨 Safety Protocol Flagged", "Aarav (Tech Aspirant) triggered automated filters. Use block controls to mute.");
  };

  const toggleBlockState = (participant, type) => {
    setBlockedStates(prev => {
      const pState = prev[participant] || { voice: false, text: false, video: false };
      const nextState = {
        ...prev,
        [participant]: {
          ...pState,
          [type]: !pState[type]
        }
      };
      
      const modeText = type === 'voice' ? 'Voice Audio' : (type === 'text' ? 'Text Chat' : 'Visual Video');
      const actionText = nextState[participant][type] ? 'BLOCKED & MUTED' : 'UNBLOCKED';
      showToast(`${participant} Moderation`, `${modeText} has been successfully ${actionText}.`);
      
      return nextState;
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="content-panel active" style={{ padding: '0 0 20px 0' }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes voicePulse {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        .voice-wave-bar .wave-bar {
          animation: voicePulse 1s infinite ease-in-out alternate;
        }
        .voice-wave-bar .wave-bar:nth-child(2) {
          animation-delay: 0.15s;
        }
        .voice-wave-bar .wave-bar:nth-child(3) {
          animation-delay: 0.3s;
        }
      `}</style>

      {/* Lobby / Welcome Screen */}
      {!inDebate && !isBreakActive && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', padding: '20px' }}>
          <div className="grid-card" style={{ maxWidth: '650px', width: '100%', textAlign: 'center', padding: '36px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px', animation: 'robotFloat 3s infinite ease-in-out' }}>🎙️</div>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Debate Arena & GD Hub</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Step into the arena to debate complex stream-specific policy and tech topics against AI scholars. You will be dynamically allocated to a team to keep team sizes balanced. Speak or type to win coins!
            </p>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'var(--accent-gradient-glow)', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>Your Level: Level {levelData.level} ({levelData.rank})</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '28px' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '14px', fontWeight: '700', textAlign: 'left' }}>🏷️ Level-Based Entry Protocols:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { lvl: 1, title: "Level 1 (Master Scholar, coins >= 500)", fee: 30, reward: 50 },
                  { lvl: 2, title: "Level 2 (Intermediate Academic, 250-499 coins)", fee: 15, reward: 30 },
                  { lvl: 3, title: "Level 3 (Novice Scholar, coins < 250)", fee: 5, reward: 10 }
                ].map((item) => (
                  <div key={item.lvl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: '8px', background: levelData.level === item.lvl ? 'rgba(6, 182, 212, 0.08)' : 'transparent', border: levelData.level === item.lvl ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent' }}>
                    <span style={{ fontSize: '12px', fontWeight: levelData.level === item.lvl ? 'bold' : 'normal', color: levelData.level === item.lvl ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {item.title} {levelData.level === item.lvl && "👈"}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: levelData.level === item.lvl ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      Entry: {item.fee} 🪙 / Win: {item.reward} 🪙
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleJoinDebate}
              style={{ padding: '12px 28px', fontSize: '15px', fontWeight: 'bold', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(6, 182, 212, 0.2)' }}
            >
              Pay {entryFee} 🪙 & Enter Debate Arena
            </button>
            
            <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Your current balance: <strong style={{ color: '#fbbf24' }}>🪙 {coins} Coins</strong>
            </div>
          </div>
        </div>
      )}

      {/* Timed Debate Arena and Break Views */}
      {(inDebate || isBreakActive) && (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            borderRadius: '12px',
            background: isBreakActive ? 'rgba(234, 179, 8, 0.08)' : 'rgba(6, 182, 212, 0.08)',
            border: isBreakActive ? '1px solid rgba(234, 179, 8, 0.2)' : '1px solid rgba(6, 182, 212, 0.2)',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>{isBreakActive ? '☕' : '⏱️'}</span>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                  {isBreakActive ? 'Debate Break Interval' : 'Active Debate Session'}
                </strong>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {isBreakActive ? 'Relax for a moment. The next debate round begins shortly.' : `Focus topic: "${activeDebateTopic}"`}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlignment: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Time Remaining</span>
                <strong style={{ fontSize: '18px', fontFamily: 'monospace', color: isBreakActive ? '#eab308' : 'var(--accent-primary)' }}>
                  {formatTime(isBreakActive ? breakTimeRemaining : debateTimeRemaining)}
                </strong>
              </div>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={handleSkipTimer}
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                ⏩ Skip
              </button>
            </div>
          </div>

          {/* 3-Column Teams Display */}
          <div className="debate-teams-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            
            {/* Team 1 Card: Pro */}
            <div className="grid-card team-panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'var(--bg-sidebar)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginBottom: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></span>
                  Team 1 (Pro-Topic)
                </h4>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '10px' }}>
                  {debateParticipants.filter(p => p.team === 1).length} Members
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {debateParticipants.filter(p => p.team === 1).length === 0 ? (
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', color: 'var(--text-secondary)', fontSize: '12px', fontStyle: 'italic' }}>
                    No members assigned
                  </div>
                ) : (
                  debateParticipants.filter(p => p.team === 1).map((member, idx) => (
                    <div key={idx} className="member-item-card" style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-primary)' }}>
                          {member.name} {member.isUser && <span style={{ fontSize: '9px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>(You)</span>}
                        </span>
                        
                        {member.isUser ? (
                          <span className={`media-badge ${userMedia.mic ? 'active' : ''}`} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '3px', background: userMedia.mic ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: userMedia.mic ? '#10b981' : '#ef4444' }}>
                            {userMedia.mic ? 'Mic Active' : 'Muted'}
                          </span>
                        ) : (
                          <span style={{ display: 'flex', gap: '3px' }}>
                            {blockedStates[member.name]?.voice && <span style={{ fontSize: '8px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🔇 Muted</span>}
                            {blockedStates[member.name]?.video && <span style={{ fontSize: '8px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🚫 Cam</span>}
                          </span>
                        )}
                      </div>

                      <div className="video-viewport" style={{ height: '110px', position: 'relative', borderRadius: '6px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {member.isUser ? (
                          userMedia.camera ? (
                            <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ fontSize: '24px' }}>👤</div>
                          )
                        ) : (
                          blockedStates[member.name]?.video ? (
                            <div className="blocked-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(6px)', color: '#f87171', padding: '4px', textAlign: 'center' }}>
                              <span style={{ fontSize: '14px' }}>🚫</span>
                              <span style={{ fontSize: '8px', fontWeight: 'bold', marginTop: '2px' }}>BLOCKED</span>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px' }}>{member.avatar}</div>
                              {!blockedStates[member.name]?.voice && (
                                <div className="voice-wave-bar" style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px', height: '14px' }}>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                </div>
                              )}
                            </div>
                          )
                        )}

                        {floatingStickers.filter(s => s.sender === (member.isUser ? 'You' : member.name)).map(st => (
                          <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '28px', animation: 'floatUp 2s ease-in-out forwards' }}>
                            {st.emoji}
                          </div>
                        ))}
                      </div>

                      {member.isUser ? (
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '2px' }}>
                          <button 
                            className={`btn btn-sm ${userMedia.mic ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setUserMedia(prev => ({ ...prev, mic: !prev.mic }))}
                            style={{ padding: '3px 8px', fontSize: '10px', flex: 1 }}
                          >
                            🎤 {userMedia.mic ? 'Mic On' : 'Mic Off'}
                          </button>
                          <button 
                            className={`btn btn-sm ${userMedia.camera ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setUserMedia(prev => ({ ...prev, camera: !prev.camera }))}
                            style={{ padding: '3px 8px', fontSize: '10px', flex: 1 }}
                          >
                            📷 {userMedia.camera ? 'Cam On' : 'Cam Off'}
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '2px' }}>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.voice ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "voice")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.voice ? 'Unmute' : 'Mute'}
                          </button>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.text ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "text")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.text ? 'Show' : 'Mute'}
                          </button>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.video ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "video")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.video ? 'Show' : 'Hide'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Team 2 Card: Con */}
            <div className="grid-card team-panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'var(--bg-sidebar)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginBottom: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#f87171' }}></span>
                  Team 2 (Con-Topic)
                </h4>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '10px' }}>
                  {debateParticipants.filter(p => p.team === 2).length} Members
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {debateParticipants.filter(p => p.team === 2).length === 0 ? (
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', color: 'var(--text-secondary)', fontSize: '12px', fontStyle: 'italic' }}>
                    No members assigned
                  </div>
                ) : (
                  debateParticipants.filter(p => p.team === 2).map((member, idx) => (
                    <div key={idx} className="member-item-card" style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-primary)' }}>
                          {member.name} {member.isUser && <span style={{ fontSize: '9px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>(You)</span>}
                        </span>
                        
                        {member.isUser ? (
                          <span className={`media-badge ${userMedia.mic ? 'active' : ''}`} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '3px', background: userMedia.mic ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: userMedia.mic ? '#10b981' : '#ef4444' }}>
                            {userMedia.mic ? 'Mic Active' : 'Muted'}
                          </span>
                        ) : (
                          <span style={{ display: 'flex', gap: '3px' }}>
                            {blockedStates[member.name]?.voice && <span style={{ fontSize: '8px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🔇 Muted</span>}
                            {blockedStates[member.name]?.video && <span style={{ fontSize: '8px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🚫 Cam</span>}
                          </span>
                        )}
                      </div>

                      <div className="video-viewport" style={{ height: '110px', position: 'relative', borderRadius: '6px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {member.isUser ? (
                          userMedia.camera ? (
                            <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ fontSize: '24px' }}>👤</div>
                          )
                        ) : (
                          blockedStates[member.name]?.video ? (
                            <div className="blocked-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(6px)', color: '#f87171', padding: '4px', textAlign: 'center' }}>
                              <span style={{ fontSize: '14px' }}>🚫</span>
                              <span style={{ fontSize: '8px', fontWeight: 'bold', marginTop: '2px' }}>BLOCKED</span>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px' }}>{member.avatar}</div>
                              {!blockedStates[member.name]?.voice && (
                                <div className="voice-wave-bar" style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px', height: '14px' }}>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                </div>
                              )}
                            </div>
                          )
                        )}

                        {floatingStickers.filter(s => s.sender === (member.isUser ? 'You' : member.name)).map(st => (
                          <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '28px', animation: 'floatUp 2s ease-in-out forwards' }}>
                            {st.emoji}
                          </div>
                        ))}
                      </div>

                      {member.isUser ? (
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '2px' }}>
                          <button 
                            className={`btn btn-sm ${userMedia.mic ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setUserMedia(prev => ({ ...prev, mic: !prev.mic }))}
                            style={{ padding: '3px 8px', fontSize: '10px', flex: 1 }}
                          >
                            🎤 {userMedia.mic ? 'Mic On' : 'Mic Off'}
                          </button>
                          <button 
                            className={`btn btn-sm ${userMedia.camera ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setUserMedia(prev => ({ ...prev, camera: !prev.camera }))}
                            style={{ padding: '3px 8px', fontSize: '10px', flex: 1 }}
                          >
                            📷 {userMedia.camera ? 'Cam On' : 'Cam Off'}
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '2px' }}>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.voice ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "voice")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.voice ? 'Unmute' : 'Mute'}
                          </button>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.text ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "text")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.text ? 'Show' : 'Mute'}
                          </button>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.video ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "video")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.video ? 'Show' : 'Hide'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Team 3 Card: Neutral */}
            <div className="grid-card team-panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'var(--bg-sidebar)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginBottom: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#eab308', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></span>
                  Team 3 (Neutral)
                </h4>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '10px' }}>
                  {debateParticipants.filter(p => p.team === 3).length} Members
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {debateParticipants.filter(p => p.team === 3).length === 0 ? (
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', color: 'var(--text-secondary)', fontSize: '12px', fontStyle: 'italic' }}>
                    No members assigned
                  </div>
                ) : (
                  debateParticipants.filter(p => p.team === 3).map((member, idx) => (
                    <div key={idx} className="member-item-card" style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-primary)' }}>
                          {member.name} {member.isUser && <span style={{ fontSize: '9px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>(You)</span>}
                        </span>
                        
                        {member.isUser ? (
                          <span className={`media-badge ${userMedia.mic ? 'active' : ''}`} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '3px', background: userMedia.mic ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: userMedia.mic ? '#10b981' : '#ef4444' }}>
                            {userMedia.mic ? 'Mic Active' : 'Muted'}
                          </span>
                        ) : (
                          <span style={{ display: 'flex', gap: '3px' }}>
                            {blockedStates[member.name]?.voice && <span style={{ fontSize: '8px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🔇 Muted</span>}
                            {blockedStates[member.name]?.video && <span style={{ fontSize: '8px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🚫 Cam</span>}
                          </span>
                        )}
                      </div>

                      <div className="video-viewport" style={{ height: '110px', position: 'relative', borderRadius: '6px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {member.isUser ? (
                          userMedia.camera ? (
                            <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ fontSize: '24px' }}>👤</div>
                          )
                        ) : (
                          blockedStates[member.name]?.video ? (
                            <div className="blocked-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(6px)', color: '#f87171', padding: '4px', textAlign: 'center' }}>
                              <span style={{ fontSize: '14px' }}>🚫</span>
                              <span style={{ fontSize: '8px', fontWeight: 'bold', marginTop: '2px' }}>BLOCKED</span>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '24px' }}>{member.avatar}</div>
                              {!blockedStates[member.name]?.voice && (
                                <div className="voice-wave-bar" style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px', height: '14px' }}>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                  <div className="wave-bar" style={{ width: '2px', height: '4px' }}></div>
                                </div>
                              )}
                            </div>
                          )
                        )}

                        {floatingStickers.filter(s => s.sender === (member.isUser ? 'You' : member.name)).map(st => (
                          <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '28px', animation: 'floatUp 2s ease-in-out forwards' }}>
                            {st.emoji}
                          </div>
                        ))}
                      </div>

                      {member.isUser ? (
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '2px' }}>
                          <button 
                            className={`btn btn-sm ${userMedia.mic ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setUserMedia(prev => ({ ...prev, mic: !prev.mic }))}
                            style={{ padding: '3px 8px', fontSize: '10px', flex: 1 }}
                          >
                            🎤 {userMedia.mic ? 'Mic On' : 'Mic Off'}
                          </button>
                          <button 
                            className={`btn btn-sm ${userMedia.camera ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setUserMedia(prev => ({ ...prev, camera: !prev.camera }))}
                            style={{ padding: '3px 8px', fontSize: '10px', flex: 1 }}
                          >
                            📷 {userMedia.camera ? 'Cam On' : 'Cam Off'}
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '2px' }}>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.voice ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "voice")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.voice ? 'Unmute' : 'Mute'}
                          </button>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.text ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "text")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.text ? 'Show' : 'Mute'}
                          </button>
                          <button className={`btn btn-xs ${blockedStates[member.name]?.video ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState(member.name, "video")} style={{ fontSize: '8px', padding: '2px 4px', flex: 1 }}>
                            {blockedStates[member.name]?.video ? 'Show' : 'Hide'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Bottom: Main Discussion Chat Column & AI Score Evaluator Column */}
          <div className="debate-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            
            <div className="debate-chat-column" style={{ display: 'flex', flexDirection: 'column', height: '620px' }}>
              <div className="grid-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
                
                {/* Topic Selector & Simulation Controls Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <label htmlFor="debate-topic-selector" style={{ fontWeight: '600', whiteSpace: 'nowrap' }}>Debate Focus:</label>
                    <select 
                      id="debate-topic-selector" 
                      disabled={inDebate || isBreakActive}
                      style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      value={selectedDebateTopicIndex}
                      onChange={(e) => handleSelectTopic(Number(e.target.value))}
                    >
                      {currentStreamDb.debateTopics.map((topic, idx) => (
                        <option key={idx} value={idx}>{topic}</option>
                      ))}
                    </select>
                    <button className="btn btn-secondary btn-sm" disabled={inDebate || isBreakActive} onClick={() => handleSelectTopic(selectedDebateTopicIndex)}>
                      Reset
                    </button>
                    
                    <button className="btn btn-secondary btn-sm" disabled={isBreakActive} onClick={handleSimulateAbuse} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }}>
                      ⚠️ Safety Test
                    </button>
                  </div>

                  {/* Simulation Panel */}
                  {inDebate && !isBreakActive && (
                    <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '10px 14px', borderRadius: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        🎮 Simulation Tools:
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn btn-secondary btn-xs" 
                          disabled={simStage !== 0} 
                          onClick={handleSimulateThreeUsers}
                          style={{ background: simStage === 0 ? 'rgba(6, 182, 212, 0.1)' : 'transparent', borderColor: simStage === 0 ? 'var(--accent-primary)' : 'var(--border-color)', color: simStage === 0 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                        >
                          👥 Simulate 3 Users Join
                        </button>
                        <button 
                          className="btn btn-secondary btn-xs" 
                          disabled={simStage !== 1} 
                          onClick={handleSimulateTwoMoreUsers}
                          style={{ background: simStage === 1 ? 'rgba(6, 182, 212, 0.1)' : 'transparent', borderColor: simStage === 1 ? 'var(--accent-primary)' : 'var(--border-color)', color: simStage === 1 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                        >
                          👥 Simulate 2 More Users Join
                        </button>
                        <button 
                          className="btn btn-action btn-xs" 
                          disabled={isJudging}
                          onClick={handleEndDebateAndJudge}
                          style={{ background: 'var(--accent-gradient)', border: 'none', color: '#000', fontWeight: 'bold' }}
                        >
                          🏆 AI Judge Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {debateWarning && (
                  <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px dashed #ef4444', borderRadius: '6px', fontSize: '12px', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>🚨 {debateWarning}</span>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setDebateWarning(null)}>Dismiss</button>
                  </div>
                )}

                {/* Chat Log Container */}
                <div 
                  className="chat-log-container" 
                  id="debate-log-container"
                  style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}
                >
                  {(debateHistory[activeDebateTopic] || []).map((msg, idx) => {
                    let bubbleClass = "bot-bubble";
                    if (msg.sender === "You") bubbleClass = "user-bubble";
                    if (msg.sender === "System") bubbleClass = "system-bubble";
                    
                    const isBlocked = blockedStates[msg.sender]?.text;
                    
                    return (
                      <div className={`chat-bubble ${bubbleClass}`} key={idx} style={{ position: 'relative' }}>
                        {msg.sender !== "System" && (
                          <div className="bubble-sender" style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '2px', color: msg.sender === 'You' ? '#a855f7' : 'var(--accent-primary)' }}>
                            {msg.sender}
                          </div>
                        )}
                        <div className="bubble-body" style={{ fontSize: '13px', lineHeight: '1.4' }}>
                          {isBlocked ? (
                            <span style={{ fontStyle: 'italic', opacity: 0.6 }}>🚫 [Content hidden - participant text is muted]</span>
                          ) : msg.isAbusive ? (
                            <span style={{ color: '#ef4444', fontWeight: '500' }}>{msg.body}</span>
                          ) : (
                            msg.body
                          )}
                        </div>
                        
                        {msg.isAbusive && !isBlocked && (
                          <div style={{ fontSize: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '6px' }}>
                            ⚠️ Reported for abuse. Click Mute Text or Hide Video above to restrict.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sticker tray selector */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Send Sticker:</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {["🚀", "💡", "🔥", "👏", "🤔", "👑"].map(emoji => (
                      <button 
                        key={emoji} 
                        disabled={isBreakActive || isJudging}
                        onClick={() => handleSendSticker(emoji)}
                        style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'transform 0.1s', opacity: (isBreakActive || isJudging) ? 0.4 : 1 }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message input bar */}
                <form onSubmit={handleSendDebateArgument} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <input 
                    type="text" 
                    value={debateInput}
                    onChange={(e) => setDebateInput(e.target.value)}
                    disabled={isBreakActive || isJudging}
                    placeholder={isBreakActive ? "Debate in break phase - next round starting soon..." : "Write your viewpoint here (min 10 characters)..."} 
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', opacity: (isBreakActive || isJudging) ? 0.6 : 1 }}
                  />
                  <button type="submit" className="btn btn-primary" disabled={isBreakActive || isJudging}>Send Point</button>
                </form>
              </div>
            </div>

            <div className="debate-evaluator-column">
              <div className="grid-card" style={{ height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                <h3>AI Evaluation & Scores</h3>
                <p className="subtitle">Scores update instantly when you submit debate arguments.</p>
                
                {isJudging ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: '16px' }}>
                    <div className="spinner" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid rgba(6,182,212,0.1)', borderTopColor: 'var(--accent-primary)', animation: 'spin 1s linear infinite' }}></div>
                    <div>
                      <strong style={{ color: 'var(--accent-primary)' }}>AI Judging in Progress...</strong>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Analyzing argument depth, structure, transition markers, and team performance metrics.</p>
                    </div>
                  </div>
                ) : judgeResult ? (
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px' }}>
                      <div style={{ fontSize: '32px' }}>🏆</div>
                      <h4 style={{ margin: '8px 0 4px 0', color: '#10b981', fontWeight: 'bold' }}>
                        Team {judgeResult.winningTeam} Wins!
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        AI Judicial Verdict & Rewards
                      </span>
                    </div>
                    
                    <div style={{ padding: '14px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px', fontSize: '13px', lineHeight: '1.5' }}>
                      <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>Judicial Critique:</strong>
                      {judgeResult.verdict}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', padding: '10px', background: 'rgba(253, 224, 71, 0.08)', border: '1px solid rgba(253, 224, 71, 0.2)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '18px' }}>🪙</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fbbf24' }}>
                        Received +{judgeResult.rewardAwarded} Coins Reward!
                      </span>
                    </div>
                  </div>
                ) : debateFeedback ? (
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    {[
                      { label: 'Clarity & Formulation', val: debateFeedback.clarity, id: 'clarity' },
                      { label: 'Structured Thinking', val: debateFeedback.thinking, id: 'thinking' },
                      { label: 'Persuasiveness', val: debateFeedback.persuasion, id: 'persuasion' },
                      { label: 'Delivery & Confidence', val: debateFeedback.confidence, id: 'confidence' }
                    ].map(metric => (
                      <div key={metric.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                          <span>{metric.label}</span>
                          <strong style={{ color: 'var(--accent-primary)' }}>{metric.val}%</strong>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${metric.val}%`, background: 'var(--accent-gradient)', transition: 'width 0.6s ease' }}></div>
                        </div>
                      </div>
                    ))}

                    <div className="feedback-grade-card" style={{ marginTop: '20px', padding: '16px', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <h4 style={{ color: 'var(--accent-primary)' }}>AI Analytical Review</h4>
                      <p style={{ fontSize: '13px', marginTop: '8px', lineHeight: '1.4' }}>{debateFeedback.text}</p>
                      <div className="feedback-stars" style={{ color: '#fbbf24', marginTop: '12px', fontWeight: 'bold' }}>★★★★☆ (Grade A-)</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, opacity: 0.6, textAlign: 'center', padding: '24px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
                    <p style={{ fontSize: '13px' }}>Your constructive criticism and logic breakdown will appear here post contribution.</p>
                  </div>
                )}

              </div>
            </div>

          </div>
        </>
      )}
    </section>
  );
}
