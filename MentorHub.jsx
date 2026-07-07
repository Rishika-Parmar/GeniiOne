import React, { useState, useEffect } from 'react';

export default function MentorHub({ 
  currentStreamDb, 
  quests, 
  handleQuestToggle 
}) {
  const [selectedMentorIndex, setSelectedMentorIndex] = useState(0);
  const [mentorInput, setMentorInput] = useState("");
  const [mentorChatHistory, setMentorChatHistory] = useState({});

  const activeMentor = currentStreamDb.mentors[selectedMentorIndex] || currentStreamDb.mentors[0];

  useEffect(() => {
    if (activeMentor && !mentorChatHistory[activeMentor.id]) {
      setMentorChatHistory(prev => ({
        ...prev,
        [activeMentor.id]: [{ sender: activeMentor.name, body: activeMentor.intro }]
      }));
    }
  }, [activeMentor, mentorChatHistory]);

  const handleSendMentorMessage = (e) => {
    e.preventDefault();
    if (!mentorInput.trim()) return;
    const msg = mentorInput.trim();
    setMentorInput("");

    const mId = activeMentor.id;
    // 1. Post User message
    setMentorChatHistory(prev => ({
      ...prev,
      [mId]: [...(prev[mId] || []), { sender: "You", body: msg }]
    }));

    if (quests && !quests.mentor) {
      handleQuestToggle("mentor");
    }

    // 2. Mock AI response after delay
    setTimeout(() => {
      let response = "";
      const textLower = msg.toLowerCase();
      if (textLower.includes("schedule") || textLower.includes("timetable") || textLower.includes("time")) {
        response = `An excellent target exam routine requires a scientific structure. I recommend using the **Cal Newport Deep Work Cycle** or the **Pomodoro Sprint** under your 'Timetable & Balancer' panel. Be sure to align the 3-Level Balancer with your energy cycles.`;
      } else if (textLower.includes("career") || textLower.includes("job") || textLower.includes("placement")) {
        response = `Building a target path begins with an audit of your skills. Input your stack in the 'Career Predictor' panel. I highly recommend completing the Primary roadmap path, and keeping the backup options visible so you're insulated from sudden shifts.`;
      } else if (textLower.includes("anxiety") || textLower.includes("stress") || textLower.includes("burnout")) {
        response = `Academic endurance is a marathon, not a sprint. Set your Study-Life Balancer to **Relaxed Mode** today. This reduces study limits and structures 9 hours of restorative sleep to ease mental fatigue.`;
      } else {
        response = `Interesting question. To progress in the ${currentStreamDb.name} stream, focus on building tangible proofs-of-work (projects/studies). Be sure to check the 'Hidden Gems' panel daily for niche certifications and fellowships that fit this goal!`;
      }

      setMentorChatHistory(prev => ({
        ...prev,
        [mId]: [...(prev[mId] || []), { sender: activeMentor.name, body: response }]
      }));
    }, 800);
  };

  return (
    <section className="content-panel active">
      <div className="mentor-layout-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', height: '600px' }}>
        
        <div className="mentor-profiles-list-card">
          <div className="grid-card" style={{ height: '100%', padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>AI Mentors</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentStreamDb.mentors.map((m, idx) => (
                <div 
                  className={`mentor-profile-item ${selectedMentorIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedMentorIndex(idx)}
                  key={m.id}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="mentor-pic">{m.avatar}</div>
                  <div className="mentor-meta-side">
                    <h4>{m.name}</h4>
                    <span>{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mentor-chat-window-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="grid-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div className="mentor-pic" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                {activeMentor?.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '16px' }}>{activeMentor?.name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{activeMentor?.role}</span>
              </div>
            </div>

            <div 
              className="chat-log-container" 
              style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}
            >
              {(mentorChatHistory[activeMentor?.id] || []).map((msg, idx) => (
                <div className={`chat-bubble ${msg.sender === 'You' ? 'user-bubble' : 'bot-bubble'}`} key={idx}>
                  <div className="bubble-sender" style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '2px', color: msg.sender === 'You' ? '#a855f7' : 'var(--accent-primary)' }}>{msg.sender}</div>
                  <div className="bubble-body" style={{ fontSize: '13px', lineHeight: '1.4' }}>{msg.body}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMentorMessage} style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <input 
                type="text" 
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder={`Ask ${activeMentor?.name} something...`} 
                style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              <button type="submit" className="btn btn-primary">Send Question</button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
