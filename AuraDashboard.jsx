import React, { useState, useEffect, useMemo, useRef } from 'react';
import Onboarding from './Onboarding';
import StudyHub from './StudyHub';
import TimetableBalancer from './TimetableBalancer';
import DebateArena from './DebateArena';
import MentorHub from './MentorHub';
import CareerPredictor from './CareerPredictor';
import OpportunityHub from './OpportunityHub';
import ShopModal from './ShopModal';
import {
  STREAM_DATABASE,
  TIMETABLE_TEMPLATES
} from './constants';

export default function AuraDashboard() {
  // --- Stateful Engine ---
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState({
    name: "",
    stream: "tech",
    targetExam: "",
    learningStyle: "visual",
    skills: [],
    strength: "",
    weakness: ""
  });

  const [coins, setCoins] = useState(100);
  const [streak, setStreak] = useState(7);
  const [currentView, setCurrentView] = useState("dashboard");
  const [balancerLevel, setBalancerLevel] = useState("balanced"); // 'relaxed' | 'balanced' | 'intense'
  const [activeTemplate, setActiveTemplate] = useState("feynman");
  
  const [quests, setQuests] = useState({
    news: false,
    study: false,
    debate: false,
    mentor: false
  });

  // Checklists and claims
  const [completedStudyItems, setCompletedStudyItems] = useState(new Set());
  const [completedRoadmapMilestones, setCompletedRoadmapMilestones] = useState(new Set());
  const [claimedOpportunities, setClaimedOpportunities] = useState(new Set());
  
  // Modals and Overlays
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLogoOverlayOpen, setIsLogoOverlayOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 3D Interactive Robot Parallax
  const [robotCoords, setRobotCoords] = useState({ x: 0, y: 0 });

  const handleRobotMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRobotCoords({ x, y });
  };

  const handleRobotMouseLeave = () => {
    setRobotCoords({ x: 0, y: 0 });
  };
  
  // Scavenger Hunt / Floating Gem
  const [gemFound, setGemFound] = useState(false);
  const [gemPosition, setGemPosition] = useState({ x: 0, y: 0 });
  const [isGemVisible, setIsGemVisible] = useState(false);

  // Notifications/Toasts System
  const [toasts, setToasts] = useState([]);

  // --- Theme Mode State ---
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('theme-mode') || 'dark';
  });

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${user.stream}`);
    document.body.classList.add(`${themeMode}-mode`);
    localStorage.setItem('theme-mode', themeMode);
  }, [user.stream, themeMode]);

  // --- Dynamic Level Mapping ---
  const levelData = useMemo(() => {
    let lvl = 3;
    let rank = "Novice Scholar";
    if (coins >= 500) {
      lvl = 1;
      rank = "Master Scholar";
    } else if (coins >= 250) {
      lvl = 2;
      rank = "Intermediate Academic";
    }
    return { level: lvl, rank };
  }, [coins]);

  // Level Up Toast Side-effect
  const prevLevel = useRef(1);
  useEffect(() => {
    if (levelData.level !== prevLevel.current) {
      showToast("🌟 LEVEL UP!", `Congratulations! You leveled up to Level ${levelData.level} (${levelData.rank}).`);
      prevLevel.current = levelData.level;
    }
  }, [levelData]);

  // --- Toast Manager ---
  const showToast = (title, body) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const isCoinRelated = title.includes("🪙") || title.includes("GEM") || title.includes("Coins");
    setToasts(prev => [...prev, { id, title, body, isCoinRelated }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // --- Add Coins Utility ---
  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  // --- Scavenger Hunt Mechanism ---
  useEffect(() => {
    setGemFound(false);
    setIsGemVisible(false);

    if (Math.random() < 0.35) {
      const timer = setTimeout(() => {
        const randX = Math.floor(Math.random() * (window.innerWidth - 120)) + 60;
        const randY = Math.floor(Math.random() * (window.innerHeight - 120)) + 60;
        setGemPosition({ x: randX, y: randY });
        setIsGemVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleClaimGem = () => {
    if (gemFound) return;
    setGemFound(true);
    setIsGemVisible(false);
    
    const quotes = [
      "Opportunity is missed by most people because it is dressed in overalls and looks like work. - Edison",
      "Focus on the process, not the outcome. You build value hourly.",
      "Hidden pathways open to those who check documentation systematically.",
      "Small streaks build massive momentum. +20 Credit Coins awarded!"
    ];
    const randQuote = quotes[Math.floor(Math.random() * quotes.length)];
    addCoins(20);
    showToast("💎 GEM DISCOVERED! (+20)", randQuote);
  };

  // --- Study Balancer allocations logic ---
  const allocations = useMemo(() => {
    if (balancerLevel === "relaxed") {
      return { study: 4, sleep: 9, exercise: 2, wellness: 3, relaxation: 6 };
    } else if (balancerLevel === "intense") {
      return { study: 10, sleep: 6, exercise: 1, wellness: 1, relaxation: 6 };
    }
    return { study: 6, sleep: 8, exercise: 2, wellness: 2, relaxation: 6 };
  }, [balancerLevel]);

  // --- Timetable slots logic ---
  const modifiedSlots = useMemo(() => {
    const template = TIMETABLE_TEMPLATES[activeTemplate];
    if (!template) return [];
    
    let slotsCopy = JSON.parse(JSON.stringify(template.slots));
    if (balancerLevel === "relaxed") {
      slotsCopy.forEach(s => {
        if (s.label.includes("Study") || s.label.includes("Sprint") || s.label.includes("Deep") || s.label.includes("Win")) {
          s.label = `Relaxed ${s.label}`;
          s.desc = `${s.desc} (Paced limits, include tea break)`;
        }
      });
    } else if (balancerLevel === "intense") {
      slotsCopy.forEach(s => {
        if (s.label.includes("Study") || s.label.includes("Sprint") || s.label.includes("Deep") || s.label.includes("Win")) {
          s.label = `💥 BEAST: ${s.label}`;
          s.desc = `${s.desc} (Highly analytical target, eliminate distractions!)`;
        }
      });
    }
    return slotsCopy;
  }, [activeTemplate, balancerLevel]);

  // --- Selected database entries based on Stream ---
  const currentStreamDb = useMemo(() => {
    return STREAM_DATABASE[user.stream] || STREAM_DATABASE.tech;
  }, [user.stream]);

  // --- Onboarding Initializer ---
  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const nameVal = data.get("studentName");
    const streamVal = data.get("studentStream");
    const examVal = data.get("targetExam");
    const styleVal = data.get("learningStyle");
    const skillsVal = data.get("studentSkills");
    const strengthVal = data.get("mainStrength");
    const weaknessVal = data.get("mainWeakness");

    setUser({
      name: nameVal,
      stream: streamVal,
      targetExam: examVal,
      learningStyle: styleVal,
      skills: skillsVal.split(",").map(s => s.trim()).filter(Boolean),
      strength: strengthVal,
      weakness: weaknessVal
    });
    setIsOnboarded(true);
    showToast("Ecosystem Initialized", `Welcome aboard, ${nameVal}!`);
  };

  const handleSkipOnboarding = () => {
    setUser({
      name: "Ishaan Sharma",
      stream: "tech",
      targetExam: "JEE Advanced 2027",
      learningStyle: "hands-on",
      skills: ["Python", "Mathematics", "Logical Reasoning"],
      strength: "Analytical Solving",
      weakness: "Time Management"
    });
    setIsOnboarded(true);
    showToast("Skipped Onboarding", "Loaded default profile presets.");
  };

  // --- Quest Completion Handler ---
  const handleQuestToggle = (key) => {
    setQuests(prev => {
      const nextVal = !prev[key];
      if (nextVal) {
        addCoins(5);
        showToast("🪙 QUEST COMPLETE! (+5)", `You completed the quest: ${key.toUpperCase()}`);
      }
      return { ...prev, [key]: nextVal };
    });
  };

  // --- Study completion logic ---
  const toggleStudyItem = (id) => {
    setCompletedStudyItems(prev => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        nextSet.delete(id);
        showToast("Resource Unmarked", "Study progress updated.");
      } else {
        nextSet.add(id);
        addCoins(10);
        showToast("🪙 STUDY COMPLETE (+10)", "Keep up the active learning process!");
        
        if (!quests.study) {
          handleQuestToggle("study");
        }
      }
      return nextSet;
    });
  };

  // --- Career Milestone progress toggle ---
  const toggleMilestone = (id) => {
    setCompletedRoadmapMilestones(prev => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
        addCoins(15);
        showToast("🪙 MILESTONE UNLOCKED (+15)", "Your roadmap progression is updating nicely.");
      }
      return nextSet;
    });
  };

  // --- Opportunity Finder toggle ---
  const toggleOpportunity = (id) => {
    setClaimedOpportunities(prev => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
        addCoins(10);
        showToast("🪙 APPLIED (+10)", "Opportunity registered and added to active tracker!");
      }
      return nextSet;
    });
  };

  if (!isOnboarded) {
    return (
      <Onboarding 
        onSubmit={handleOnboardSubmit}
        onSkip={handleSkipOnboarding}
        setIsLogoOverlayOpen={setIsLogoOverlayOpen}
      />
    );
  }

  const viewTitleMap = {
    dashboard: "Dashboard Overview",
    "study-hub": "Stream Learning Curations",
    "timetable-balancer": "Daily Smart Scheduler",
    "debate-arena": "AI Debate Arena & GD Hub",
    "mentor-hub": "24/7 AI Mentor Support",
    "career-predictor": "AI Career Planner & Backup Roadmap",
    "opportunity-hub": "Opportunities & Hidden Gems"
  };

  return (
    <div className="app-container">
      {/* Toast Overlay Container */}
      <div id="toast-container" className="toast-container" style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1000, pointerEvents: 'none' }}>
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.isCoinRelated ? 'toast-coins' : ''}`} style={{ pointerEvents: 'auto', marginBottom: '8px', animation: 'slideIn 0.3s ease forwards' }}>
            <div className="toast-body">
              <strong>{toast.title}</strong>
              <div>{toast.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Hidden Gem */}
      {isGemVisible && !gemFound && (
        <div 
          id="floating-gem" 
          className="floating-gem" 
          onClick={handleClaimGem}
          style={{ position: 'fixed', left: `${gemPosition.x}px`, top: `${gemPosition.y}px`, zIndex: 9999, cursor: 'pointer' }}
          title="You found a Hidden Gem! Click to claim."
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gem-svg" style={{ width: '48px', height: '48px' }}>
            <path d="M6 3h12l4 6-10 12L2 9z" fill="url(#gem-gradient)"/>
            <defs>
              <linearGradient id="gem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="gem-glow"></div>
        </div>
      )}

      {/* Logo Overlay Modal */}
      {isLogoOverlayOpen && (
        <div 
          className="overlay" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 99999, 
            background: 'rgba(4, 6, 12, 0.95)',
            backdropFilter: 'blur(12px)'
          }}
          onClick={() => setIsLogoOverlayOpen(false)}
        >
          <button 
            className="btn btn-secondary" 
            onClick={(e) => {
              e.stopPropagation();
              setIsLogoOverlayOpen(false);
            }}
            style={{ 
              position: 'absolute', 
              top: '24px', 
              right: '24px', 
              padding: '10px 20px', 
              fontSize: '14px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              zIndex: 100000
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back</span>
          </button>
          
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '20px', 
              animation: 'fade-in 0.3s ease-out forwards' 
            }}
          >
            <img 
              src="/logo.jpg" 
              alt="GeniiOne Logo Fullscreen" 
              style={{ 
                maxWidth: '90%', 
                maxHeight: '75vh', 
                borderRadius: '24px', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px var(--accent-glow)',
                border: '2px solid rgba(255,255,255,0.15)' 
              }} 
            />
            <span style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '1px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GeniiOne</span>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/logo.jpg" 
              alt="GeniiOne" 
              onClick={() => setIsLogoOverlayOpen(true)}
              style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} 
            />
            <span className="brand-text" style={{ fontSize: '20px', fontWeight: '800', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GeniiOne</span>
          </div>
          <button className="sidebar-close-btn" onClick={() => setIsMobileSidebarOpen(false)}>&times;</button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <rect x="3" y="3" width="7" height="7"></rect> },
              { id: 'study-hub', label: 'Study Resources', icon: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path> },
              { id: 'timetable-balancer', label: 'Timetable & Balancer', icon: <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> },
              { id: 'debate-arena', label: 'Debate & GD Arena', icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> },
              { id: 'mentor-hub', label: '24/7 AI Mentor', icon: <circle cx="9" cy="7" r="4"></circle> },
              { id: 'career-predictor', label: 'Career Predictor', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline> },
              { id: 'opportunity-hub', label: 'Opportunity Hub', icon: <circle cx="12" cy="12" r="10"></circle> }
            ].map(item => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setCurrentView(item.id); setIsMobileSidebarOpen(false); }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-icon">
                    {item.icon}
                    {item.id === 'study-hub' && <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>}
                    {item.id === 'timetable-balancer' && (
                      <>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </>
                    )}
                    {item.id === 'mentor-hub' && (
                      <>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </>
                    )}
                    {item.id === 'opportunity-hub' && (
                      <>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </>
                    )}
                  </svg>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-profile">
          <div className="avatar">
            {user.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "S"}
          </div>
          <div className="profile-info">
            <span className="name">{user.name || "Student"}</span>
            <span className="role">Level {levelData.level} {levelData.rank}</span>
          </div>
        </div>
      </aside>
      <div className={`sidebar-backdrop ${isMobileSidebarOpen ? 'active' : ''}`} onClick={() => setIsMobileSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="sidebar-toggle-btn" 
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1 id="page-title">{viewTitleMap[currentView] || "Dashboard Overview"}</h1>
          </div>

          <div className="header-right">
            <div className="stream-selector">
              <label htmlFor="stream-switcher">Active Stream:</label>
              <select 
                id="stream-switcher" 
                value={user.stream}
                onChange={(e) => setUser(prev => ({ ...prev, stream: e.target.value }))}
              >
                <option value="tech">Technology & Engineering</option>
                <option value="science">Medical & Sciences</option>
                <option value="commerce">Commerce & Finance</option>
                <option value="civil">Civil Services & Humanities</option>
              </select>
            </div>

            <button 
              className="btn btn-secondary theme-toggle-btn"
              onClick={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
            >
              {themeMode === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbf24' }}>
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0f172a' }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <div className="streak-widget" title="Daily study streak!" onClick={() => setStreak(prev => prev + 1)}>
              <svg className="streak-fire" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{streak} Days</span>
            </div>

            <div className="coin-widget" onClick={() => setIsShopOpen(true)} title="Click to open Rewards Store" style={{ cursor: 'pointer' }}>
              <span className="coin-icon">🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </header>

        {/* --- VIEW: Dashboard --- */}
        {currentView === 'dashboard' && (
          <section className="content-panel active">
            <div className="news-ticker-container">
              <div className="ticker-label">BREAKING NEWS</div>
              <div className="ticker-wrap">
                <div className="ticker" style={{ animationDuration: '25s' }}>
                  {currentStreamDb.news.map((n, idx) => (
                    <span key={idx} style={{ marginRight: '64px', display: 'inline-block' }}>
                      🔥 {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="grid-card triple-width gradient-card welcome-banner">
                <div className="banner-content">
                  <h2>Welcome back, <span>{user.name}</span>!</h2>
                  <p>Your personalized OS is synchronized with the <strong>{currentStreamDb.name}</strong> and targeted on the <strong>{user.targetExam || "Active Target"}</strong>. Keep up your active habit streak to claim coins and unlock roadmap badges.</p>
                  
                  <div className="quick-stats-row">
                    <div className="stat-bubble">
                      <span className="num">Lvl {levelData.level}</span>
                      <span className="lbl">Rank</span>
                    </div>
                    <div className="stat-bubble" style={{ textTransform: 'capitalize' }}>
                      <span className="num">{user.learningStyle}</span>
                      <span className="lbl">Learning Style</span>
                    </div>
                    <div className="stat-bubble">
                      <span className="num">{coins}</span>
                      <span className="lbl">Credit Coins</span>
                    </div>
                  </div>
                </div>
                 <div 
                   className="banner-graphic" 
                   onMouseMove={handleRobotMouseMove}
                   onMouseLeave={handleRobotMouseLeave}
                   style={{ 
                     width: '140px', 
                     height: '140px', 
                     perspective: '600px',
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     position: 'relative',
                     cursor: 'pointer'
                   }}
                 >
                   <div 
                     style={{
                       position: 'absolute',
                       bottom: '5px',
                       width: '80px',
                       height: '10px',
                       borderRadius: '50%',
                       background: 'rgba(34, 211, 238, 0.15)',
                       filter: 'blur(8px)',
                       transform: `scale(${1 - Math.abs(robotCoords.y) * 0.1})`,
                       transition: 'transform 0.2s ease-out',
                       animation: 'shadowPulse 2s infinite ease-in-out'
                     }}
                   />

                   <div 
                     style={{
                       position: 'relative',
                       width: '100px',
                       height: '120px',
                       transformStyle: 'preserve-3d',
                       transform: `rotateY(${robotCoords.x * 35}deg) rotateX(${-robotCoords.y * 35}deg) translateY(${robotCoords.y * 5}px)`,
                       transition: 'transform 0.1s ease-out',
                       animation: 'robotFloat 3s infinite ease-in-out'
                     }}
                   >
                     <div 
                       style={{
                         position: 'absolute',
                         bottom: '20px',
                         left: '20px',
                         width: '60px',
                         height: '52px',
                         borderRadius: '24px 24px 30px 30px',
                         background: 'linear-gradient(135deg, #ffffff 60%, #cbd5e1 100%)',
                         boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.4)',
                         border: '1px solid rgba(255,255,255,0.6)',
                         transformStyle: 'preserve-3d',
                         transform: `translateZ(10px)`
                       }}
                     >
                       <div 
                         style={{
                           position: 'absolute',
                           top: '16px',
                           left: '20px',
                           width: '20px',
                           height: '20px',
                           borderRadius: '50%',
                           background: 'var(--accent-gradient)',
                           boxShadow: '0 0 10px var(--accent-primary)',
                           animation: 'pulse 1.5s infinite alternate'
                         }}
                       />
                     </div>

                     <div 
                       style={{
                         position: 'absolute',
                         top: '10px',
                         left: '15px',
                         width: '70px',
                         height: '56px',
                         borderRadius: '24px',
                         background: 'linear-gradient(135deg, #ffffff 60%, #cbd5e1 100%)',
                         boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.15), 0 10px 25px rgba(0,0,0,0.4)',
                         border: '1px solid rgba(255,255,255,0.6)',
                         transformStyle: 'preserve-3d',
                         transform: `translateZ(25px) translate(${robotCoords.x * 6}px, ${robotCoords.y * 4}px)`
                       }}
                     >
                       <div 
                         style={{
                           position: 'absolute',
                           top: '11px',
                           left: '8px',
                           width: '54px',
                           height: '34px',
                           borderRadius: '14px',
                           background: '#0a0f1d',
                           boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8), 0 0 5px rgba(255,255,255,0.05)',
                           transformStyle: 'preserve-3d',
                           transform: `translateZ(5px) translate(${robotCoords.x * 4}px, ${robotCoords.y * 3}px)`,
                           overflow: 'hidden',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           gap: '8px'
                         }}
                       >
                         <div 
                           style={{
                             width: '8px',
                             height: '8px',
                             borderRadius: '50%',
                             background: '#22d3ee',
                             boxShadow: '0 0 8px #22d3ee',
                             transform: `translate(${robotCoords.x * 4}px, ${robotCoords.y * 3}px)`,
                             animation: 'eyeBlink 4s infinite'
                           }}
                         />
                         <div 
                           style={{
                             width: '8px',
                             height: '8px',
                             borderRadius: '50%',
                             background: '#22d3ee',
                             boxShadow: '0 0 8px #22d3ee',
                             transform: `translate(${robotCoords.x * 4}px, ${robotCoords.y * 3}px)`,
                             animation: 'eyeBlink 4s infinite'
                           }}
                         />
                       </div>
                     </div>

                     <div 
                       style={{
                         position: 'absolute',
                         top: '30px',
                         left: '5px',
                         width: '12px',
                         height: '18px',
                         borderRadius: '6px',
                         background: '#94a3b8',
                         transform: `rotateY(30deg) translateZ(15px) rotateZ(${robotCoords.y * 15}deg)`,
                         boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                       }}
                     />
                     <div 
                       style={{
                         position: 'absolute',
                         top: '30px',
                         right: '5px',
                         width: '12px',
                         height: '18px',
                         borderRadius: '6px',
                         background: '#94a3b8',
                         transform: `rotateY(-30deg) translateZ(15px) rotateZ(${-robotCoords.y * 15}deg)`,
                         boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                       }}
                     />
                   </div>
                 </div>
              </div>

              <div className="grid-card quest-card">
                <h3>Daily Coin Quests</h3>
                <p className="subtitle">Complete study actions to replenish your credits</p>
                <ul className="quest-list">
                  {[
                    { key: 'news', label: 'Read Stream Headlines (+5 🪙)' },
                    { key: 'study', label: 'Review Curated Study Resources (+5 🪙)' },
                    { key: 'debate', label: 'Contribute to Debate Arena (+5 🪙)' },
                    { key: 'mentor', label: 'Ask AI Mentor a core doubt (+5 🪙)' }
                  ].map(quest => (
                    <li className="quest-item" key={quest.key}>
                      <div className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={quests[quest.key]}
                          onChange={() => handleQuestToggle(quest.key)} 
                          className="quest-checkbox" 
                          id={`chk-${quest.key}`}
                        />
                        <label htmlFor={`chk-${quest.key}`}>{quest.label}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid-card balancer-card">
                <div className="card-header-row">
                  <h3>Study-Life Balancer</h3>
                  <span className="badge" id="balancer-badge" style={{ textTransform: 'uppercase' }}>
                    {balancerLevel}
                  </span>
                </div>
                <p className="subtitle">Current focus layout configured for: {balancerLevel.toUpperCase()} Mode</p>
                
                <div className="balancer-widget">
                  <div className="allocation-bars">
                    {Object.entries(allocations).map(([type, hours]) => (
                      <div 
                        key={type}
                        className={`bar-segment bar-${type}`} 
                        style={{ width: `${(hours / 24) * 100}%` }}
                        title={`${type.toUpperCase()}: ${hours} Hours`}
                      />
                    ))}
                  </div>
                  <div className="allocation-legend">
                    {Object.entries(allocations).map(([type, hours]) => (
                      <div className="legend-item" key={type}>
                        <div className={`legend-color bar-${type}`}></div>
                        <span style={{ textTransform: 'capitalize' }}>{type}: {hours}h</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="balancer-controls" style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  {['relaxed', 'balanced', 'intense'].map(level => (
                    <button 
                      key={level}
                      className={`btn btn-sm ${balancerLevel === level ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setBalancerLevel(level)}
                      style={{ flex: 1, textTransform: 'capitalize' }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid-card mini-timeline-card">
                <h3>Up Next In Schedule</h3>
                <p className="subtitle">Template: {TIMETABLE_TEMPLATES[activeTemplate]?.name}</p>
                
                <div className="mini-timeline-list">
                  {modifiedSlots.slice(0, 3).map((slot, idx) => (
                    <div className={`mini-timeline-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                      <span className="time-box">{slot.time.split(" - ")[0]}</span>
                      <span className="task-name">{slot.label}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-action btn-sm full-width" onClick={() => setCurrentView('timetable-balancer')} style={{ marginTop: '16px' }}>
                  Manage Schedule & Templates
                </button>
              </div>

              <div className="grid-card news-feed-card double-width">
                <h3>Curated Feed & Global Notes</h3>
                <p className="subtitle">Tailored insights for {currentStreamDb.name}</p>
                <div className="news-feed-list">
                  {currentStreamDb.news.map((item, idx) => (
                    <div className="news-card" key={idx} style={{ padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: 'bold' }}>Headline {idx+1}</span>
                      <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-primary)' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- VIEW: Study Hub --- */}
        {currentView === 'study-hub' && (
          <StudyHub
            currentStreamDb={currentStreamDb}
            completedStudyItems={completedStudyItems}
            toggleStudyItem={toggleStudyItem}
            quests={quests}
            handleQuestToggle={handleQuestToggle}
          />
        )}

        {/* --- VIEW: Timetable & Balancer --- */}
        {currentView === 'timetable-balancer' && (
          <TimetableBalancer
            balancerLevel={balancerLevel}
            setBalancerLevel={setBalancerLevel}
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
            modifiedSlots={modifiedSlots}
            allocations={allocations}
          />
        )}

        {/* --- VIEW: Debate & GD Arena --- */}
        {currentView === 'debate-arena' && (
          <DebateArena
            coins={coins}
            setCoins={setCoins}
            levelData={levelData}
            quests={quests}
            handleQuestToggle={handleQuestToggle}
            showToast={showToast}
            currentStreamDb={currentStreamDb}
          />
        )}

        {/* --- VIEW: AI Mentor Hub --- */}
        {currentView === 'mentor-hub' && (
          <MentorHub
            currentStreamDb={currentStreamDb}
            quests={quests}
            handleQuestToggle={handleQuestToggle}
          />
        )}

        {/* --- VIEW: Career Predictor --- */}
        {currentView === 'career-predictor' && (
          <CareerPredictor
            user={user}
            coins={coins}
            setCoins={setCoins}
            completedRoadmapMilestones={completedRoadmapMilestones}
            toggleMilestone={toggleMilestone}
            showToast={showToast}
            currentStreamDb={currentStreamDb}
          />
        )}

        {/* --- VIEW: Opportunity Hub --- */}
        {currentView === 'opportunity-hub' && (
          <OpportunityHub
            currentStreamDb={currentStreamDb}
            claimedOpportunities={claimedOpportunities}
            toggleOpportunity={toggleOpportunity}
          />
        )}

      </main>

      {/* Rewards Shop Modal */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        coins={coins}
        setCoins={setCoins}
        showToast={showToast}
      />
    </div>
  );
}
