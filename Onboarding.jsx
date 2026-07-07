import React from 'react';

export default function Onboarding({ onSubmit, onSkip, setIsLogoOverlayOpen }) {
  return (
    <div className="sky-onboarding-container">
      {/* Floating Clouds */}
      <div className="onboarding-cloud cloud-1"></div>
      <div className="onboarding-cloud cloud-2"></div>
      <div className="onboarding-cloud cloud-3"></div>

      {/* Paper Airplanes */}
      <div className="onboarding-airplane airplane-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>
      <div className="onboarding-airplane airplane-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>

      {/* Hot Air Balloon */}
      <div className="onboarding-balloon">
        <svg viewBox="0 0 100 130" fill="none">
          <path d="M50 10 C20 10, 10 35, 10 60 C10 85, 30 100, 50 105 C70 105, 90 85, 90 60 C90 35, 80 10, 50 10 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
          <path d="M50 10 C35 10, 25 35, 25 60 C25 85, 38 100, 50 105" fill="#facc15" stroke="#eab308" strokeWidth="1.5"/>
          <path d="M50 10 C65 10, 75 35, 75 60 C75 85, 62 100, 50 105" fill="#facc15" stroke="#eab308" strokeWidth="1.5"/>
          <line x1="38" y1="105" x2="42" y2="120" stroke="#78350f" strokeWidth="1.5"/>
          <line x1="62" y1="105" x2="58" y2="120" stroke="#78350f" strokeWidth="1.5"/>
          <line x1="50" y1="105" x2="50" y2="120" stroke="#78350f" strokeWidth="1.5"/>
          <rect x="40" y="120" width="20" height="10" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Floating Day Streak Badge */}
      <div className="onboarding-badge-07">07</div>

      {/* Grassy hills */}
      <div className="onboarding-grass-hill">
        <div className="hill-left"></div>
        <div className="hill-right"></div>
      </div>

      {/* Books Illustration */}
      <div className="illustration-books">
        <div className="illus-book book-4"></div>
        <div className="illus-book book-3"></div>
        <div className="illus-book book-2"></div>
        <div className="illus-book book-1"></div>
      </div>

      {/* Laptop Illustration */}
      <div className="illustration-laptop">
        <div className="illus-laptop-screen"></div>
        <div className="illus-laptop-base"></div>
      </div>

      <div className="glass-modal onboarding-modal" style={{ maxHeight: '92vh', overflowY: 'auto' }}>
        <div className="onboarding-header">
          <div className="onboarding-logo-box">
            <img 
              src="/logo.jpg" 
              alt="GeniiOne Logo" 
              onClick={() => setIsLogoOverlayOpen(true)}
              style={{ cursor: 'pointer' }} 
            />
            <span className="logo-text">GeniiOne</span>
          </div>
          <h1>Welcome to your AI Student Operating System</h1>
          <p>Let's configure your stream, target goals, and learning profile to build your personalized ecosystem.</p>
        </div>

        <form onSubmit={onSubmit} className="onboarding-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="studentName">Full Name</label>
              <div className="input-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input type="text" name="studentName" id="student-name" placeholder="E.g., Ishaan Sharma" required defaultValue="Ishaan Sharma" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="studentStream">Select Your Academic Stream</label>
              <div className="input-icon-wrapper select-wrapper">
                <select name="studentStream" id="student-stream" required>
                  <option value="tech">Technology & Engineering (Coding, Web, AI)</option>
                  <option value="science">Medical & Basic Sciences (Biology, Physics, NEET)</option>
                  <option value="commerce">Commerce & Business (Finance, Economics, Startups)</option>
                  <option value="civil">Civil Services & Humanities (UPSC, Policies, History)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="targetExam">Target Examination</label>
              <div className="input-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
                <input type="text" name="targetExam" id="target-exam" placeholder="E.g., JEE Advanced 2027, UPSC, NEET, Placement" required defaultValue="JEE Advanced 2027" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="learningStyle">Primary Learning Style</label>
              <div className="input-icon-wrapper select-wrapper">
                <select name="learningStyle" id="learning-style" required>
                  <option value="visual">Visual (Videos, Charts, Mindmaps)</option>
                  <option value="auditory">Auditory (Lectures, Podcasts, Discussions)</option>
                  <option value="hands-on">Hands-On (Coding, Projects, Solving Problems)</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="studentSkills">Current Skillset (Comma-separated)</label>
              <div className="input-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <input type="text" name="studentSkills" id="student-skills" placeholder="E.g., Python, Mathematics, Logical Reasoning, Public Speaking" defaultValue="Python, Mathematics, Logical Reasoning" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mainStrength">Core Strength</label>
              <div className="input-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <input type="text" name="mainStrength" id="main-strength" placeholder="E.g., Analytical Solving, Memory" required defaultValue="Analytical Solving" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mainWeakness">Core Weakness</label>
              <div className="input-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <input type="text" name="mainWeakness" id="main-weakness" placeholder="E.g., Time Management, Exam Anxiety" required defaultValue="Time Management" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            <button type="submit" className="btn-initialize">
              <span>Initialize My Ecosystem</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5"></path>
                <path d="M12 2C7.58 2 4 5.58 4 10c0 4.13 4 9 8 12 4-3 8-7.87 8-12 0-4.42-3.58-8-8-8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </button>
            <button type="button" className="btn-skip-outline" onClick={onSkip}>
              Skip (Demo Default)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
