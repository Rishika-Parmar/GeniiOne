import React, { useState, useMemo } from 'react';

export default function OpportunityHub({
  currentStreamDb,
  claimedOpportunities,
  toggleOpportunity
}) {
  const [opportunityFilter, setOpportunityFilter] = useState("all");

  const filteredOpportunities = useMemo(() => {
    if (opportunityFilter === "all") return currentStreamDb.opportunities;
    return currentStreamDb.opportunities.filter(op => op.type === opportunityFilter);
  }, [opportunityFilter, currentStreamDb]);

  return (
    <section className="content-panel active">
      <div className="grid-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3>Opportunities Finder</h3>
            <p className="subtitle">Niche fellowships, scholarships, and certifications to validate your active portfolio.</p>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'all', label: 'All Listings' },
              { id: 'scholarship', label: 'Scholarships' },
              { id: 'internship', label: 'Internships' },
              { id: 'hackathon', label: 'Hackathons' },
              { id: 'certification', label: 'Certifications' }
            ].map(btn => (
              <button 
                key={btn.id}
                className={`btn btn-sm ${opportunityFilter === btn.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOpportunityFilter(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="opportunities-grid-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginTop: '24px' }}>
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map(op => {
            const isClaimed = claimedOpportunities.has(op.id);
            return (
              <div className={`opportunity-card ${isClaimed ? 'claimed-card' : ''}`} key={op.id}>
                <div className="opportunity-tag" style={{ textTransform: 'capitalize' }}>{op.type}</div>
                <h3>{op.title}</h3>
                <div className="opportunity-provider">Provided by: {op.provider}</div>
                <p className="opportunity-desc">{op.desc}</p>
                <div className="opportunity-meta">
                  <span className="deadline">Deadline: {op.deadline}</span>
                  <span className="reward">{op.reward}</span>
                </div>
                <button 
                  className={`btn ${isClaimed ? 'btn-secondary' : 'btn-action'} full-width`}
                  onClick={() => toggleOpportunity(op.id)}
                  style={{ marginTop: '16px' }}
                >
                  {isClaimed ? 'Applied & Tracked ✓' : 'Apply & Track (+10 🪙)'}
                </button>
              </div>
            );
          })
        ) : (
          <div className="empty-state" style={{ gridColumn: 'span 3', textAlign: 'center', padding: '40px 20px', opacity: 0.6 }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💼</div>
            <p>No matching niche opportunities found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
