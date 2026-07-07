import React from 'react';

export default function StudyHub({ 
  currentStreamDb, 
  completedStudyItems, 
  toggleStudyItem, 
  quests, 
  handleQuestToggle 
}) {
  return (
    <section className="content-panel active">
      <div style={{ marginBottom: '24px' }}>
        <h2>Curated Stream Resources</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Highly-rated visual playlists and reference specs mapped for your stream focus.</p>
      </div>

      <h3>Video Learning Pathways</h3>
      <div className="study-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px', marginTop: '12px' }}>
        {currentStreamDb.youtube.map(video => {
          const isCompleted = completedStudyItems.has(video.id);
          return (
            <div className={`resource-card ${isCompleted ? 'completed-resource' : ''}`} key={video.id}>
              <div className="resource-header">
                <span className="tag video-tag">YouTube Playlist</span>
                <span className="channel-tag">{video.tag}</span>
              </div>
              <h4>{video.name}</h4>
              <p>{video.desc}</p>
              <div className="resource-footer" style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <a href={video.url} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center' }}>
                  Watch Channel
                </a>
                <button 
                  className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-action'}`}
                  onClick={() => toggleStudyItem(video.id)}
                  style={{ flex: 1.2 }}
                >
                  {isCompleted ? 'Finished ✓' : 'Mark Finished (+10 🪙)'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h3>Official References & Problem Portals</h3>
      <div className="study-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '12px' }}>
        {currentStreamDb.websites.map(web => {
          const isCompleted = completedStudyItems.has(web.id);
          return (
            <div className={`resource-card ${isCompleted ? 'completed-resource' : ''}`} key={web.id}>
              <div className="resource-header">
                <span className="tag web-tag">Interactive Spec</span>
                <span className="channel-tag">{web.tag}</span>
              </div>
              <h4>{web.name}</h4>
              <p>{web.desc}</p>
              <div className="resource-footer" style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <a 
                  href={web.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-secondary btn-sm link-btn-track"
                  onClick={() => {
                    if (quests && !quests.study) handleQuestToggle("study");
                  }}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Visit Site
                </a>
                <button 
                  className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-action'}`}
                  onClick={() => toggleStudyItem(web.id)}
                  style={{ flex: 1.2 }}
                >
                  {isCompleted ? 'Finished ✓' : 'Mark Finished (+10 🪙)'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
