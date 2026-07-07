import React from 'react';
import { TIMETABLE_TEMPLATES } from './constants';

export default function TimetableBalancer({
  balancerLevel,
  setBalancerLevel,
  activeTemplate,
  setActiveTemplate,
  modifiedSlots,
  allocations
}) {
  return (
    <section className="content-panel active">
      <div className="scheduler-layout">
        
        <div className="scheduler-sidebar-config">
          <div className="grid-card">
            <h3>Select Schedule Model</h3>
            <p className="subtitle">Pick a psychological routine that aligns with your active goals.</p>
            
            <div className="template-selectors" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {Object.entries(TIMETABLE_TEMPLATES).map(([key, value]) => (
                <button 
                  key={key}
                  className={`btn ${activeTemplate === key ? 'btn-primary' : 'btn-secondary'} full-width`}
                  style={{ textAlign: 'left', display: 'block', padding: '12px' }}
                  onClick={() => setActiveTemplate(key)}
                >
                  <strong style={{ display: 'block', fontSize: '14px' }}>{value.name}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="grid-card" style={{ marginTop: '20px' }}>
            <h3>Pacing Control</h3>
            <p className="subtitle">Modify standard durations based on fatigue levels.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {['relaxed', 'balanced', 'intense'].map(level => (
                <button 
                  key={level} 
                  className={`btn ${balancerLevel === level ? 'btn-action' : 'btn-secondary'} full-width`}
                  onClick={() => setBalancerLevel(level)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {level} Pacing
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="scheduler-timeline-main">
          <div className="grid-card" style={{ minHeight: '100%' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
              <h2 id="active-template-name">{TIMETABLE_TEMPLATES[activeTemplate]?.name}</h2>
              <p id="template-explanation-text" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                {TIMETABLE_TEMPLATES[activeTemplate]?.desc}
              </p>
            </div>

            <div className="full-timetable-timeline" id="full-timetable-timeline">
              {modifiedSlots.map((slot, idx) => (
                <div className={`timeline-slot ${idx === 1 ? 'active-slot' : ''}`} key={idx}>
                  <div className="slot-time">{slot.time}</div>
                  <div className="slot-detail">
                    <div className="slot-label">{slot.label}</div>
                    <div className="slot-desc">{slot.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
