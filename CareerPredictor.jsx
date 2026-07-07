import React, { useState, useMemo } from 'react';
import { CAREER_DATABASE } from './constants';

export default function CareerPredictor({
  user,
  coins,
  setCoins,
  completedRoadmapMilestones,
  toggleMilestone,
  showToast,
  currentStreamDb
}) {
  const [activePredictorTrack, setActivePredictorTrack] = useState("primary");
  const [skillsInput, setSkillsInput] = useState("");
  const [hasCalculatedCareer, setHasCalculatedCareer] = useState(false);

  const activeCareerData = useMemo(() => {
    return CAREER_DATABASE[user.stream] || CAREER_DATABASE.tech;
  }, [user.stream]);

  const currentRoadmapSteps = useMemo(() => {
    return activePredictorTrack === "primary" ? activeCareerData.primary.roadmap : activeCareerData.backup.roadmap;
  }, [activePredictorTrack, activeCareerData]);

  const handleCalculateCareer = () => {
    if (skillsInput.trim().length < 5) {
      showToast("Invalid Input", "Please enter at least 2 key skills to build predictions.");
      return;
    }
    setHasCalculatedCareer(true);
    showToast("Career Analysis Generated", "Primary & alternative roadmap paths initialized.");
  };

  return (
    <section className="content-panel active">
      <div className="grid-card">
        <h3>AI Career Planner & Backup Roadmap</h3>
        <p className="subtitle">Enter your core skills to project your alignment with primary and secondary roles in the {currentStreamDb.name} domain.</p>
        
        <div className="career-input-row">
          <input 
            type="text" 
            id="predict-skills" 
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="E.g., Python, SQL, Git, Public Speaking" 
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={handleCalculateCareer}>Calculate Compatibility</button>
        </div>
      </div>

      {hasCalculatedCareer && (
        <div className="career-results-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="prediction-card primary-track" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
              <div className="compatibility-pill">🎯 {activeCareerData.primary.compat}% Match</div>
              <h4 style={{ fontSize: '18px', marginTop: '12px' }}>Primary Career: {activeCareerData.primary.role}</h4>
              <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>{activeCareerData.primary.desc}</p>
              <div className="skills-pill-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                {activeCareerData.primary.skills.map((s, idx) => (
                  <span className="skill-pill" key={idx}>{s}</span>
                ))}
              </div>
            </div>

            <div className="prediction-card backup-track" style={{ borderLeft: '4px solid #f97316' }}>
              <div className="compatibility-pill" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>🛡️ Backup: {activeCareerData.backup.compat}% Match</div>
              <h4 style={{ fontSize: '18px', marginTop: '12px' }}>Alternative Path: {activeCareerData.backup.role}</h4>
              <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>{activeCareerData.backup.desc}</p>
              <div className="skills-pill-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                {activeCareerData.backup.skills.map((s, idx) => (
                  <span className="skill-pill" key={idx}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-card" id="roadmap-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3>Roadmap Steps</h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  className={`btn btn-sm ${activePredictorTrack === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActivePredictorTrack('primary')}
                >
                  Primary Path
                </button>
                <button 
                  className={`btn btn-sm ${activePredictorTrack === 'backup' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActivePredictorTrack('backup')}
                >
                  Backup Path
                </button>
              </div>
            </div>

            <div className="roadmap-timeline-steps">
              {currentRoadmapSteps.map((step, idx) => {
                const isCompleted = completedRoadmapMilestones.has(step.id);
                return (
                  <div className={`timeline-step ${isCompleted ? 'completed' : ''}`} key={step.id}>
                    <div className="step-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                      <div className="step-card-detail" style={{ flex: 1 }}>
                        <h4 style={{ color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)' }}>{step.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{step.desc}</p>
                      </div>
                      <div className="step-card-action">
                        <button 
                          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-action'} btn-sm`}
                          onClick={() => toggleMilestone(step.id)}
                        >
                          {isCompleted ? 'Completed ✓' : 'Mark Completed (+15 🪙)'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
