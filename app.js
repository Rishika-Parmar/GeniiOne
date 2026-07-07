/**
 * Aura Student OS - Core Logic Engine
 */

// --- Dynamic Database: Stream-Specific Contents ---
const STREAM_DATABASE = {
  tech: {
    name: "Technology & Engineering",
    news: [
      "Open-source LLMs achieve parity with proprietary models in multi-agent coding trials.",
      "Global Web 3.0 hackathon announces $250k seed prize for AI-agent integrations.",
      "Tech conglomerates shift hiring criteria from degree-oriented to portfolio-proven skills.",
      "Quantum Computing libraries integrated directly into Python 3.14 development branch."
    ],
    youtube: [
      { name: "3Blue1Brown", tag: "Math & AI Visuals", desc: "Unmatched visual explanations of calculus, neural networks, and linear algebra.", url: "https://www.youtube.com/c/3blue1brown", completed: false },
      { name: "freeCodeCamp", tag: "Full-Stack Bootcamps", desc: "Comprehensive 10+ hour code courses covering Python, React, Data Structures, and SQL.", url: "https://www.youtube.com/c/freecodecamp", completed: false },
      { name: "Husan - Tech Architect", tag: "System Design", desc: "Deep dives into scalable architectures, load balancing, caching, and microservices.", url: "https://www.youtube.com/c/husseinناصر", completed: false },
      { name: "The Primeagen", tag: "Algorithms & Dev Culture", desc: "High energy deep-dives into data structures, performance optimization, and developer workflows.", url: "https://www.youtube.com/c/theprimeagen", completed: false }
    ],
    websites: [
      { name: "LeetCode Portal", tag: "Coding Practice", desc: "The industry standard for honing data structure and algorithm problem-solving abilities.", url: "https://leetcode.com", completed: false },
      { name: "Roadmap.sh", tag: "Developer Roadmaps", desc: "Interactive community-guided paths, charts, and resources for every developer stack.", url: "https://roadmap.sh", completed: false },
      { name: "GitHub Explore", tag: "Open Source Collabs", desc: "Discover trending repositories, participate in active projects, and inspect production code.", url: "https://github.com/explore", completed: false },
      { name: "MDN Web Docs", tag: "Official Specs", desc: "Authoritative resource for HTML, CSS, JavaScript, and web APIs documentation.", url: "https://developer.mozilla.org", completed: false }
    ],
    debateTopics: [
      "Will AI agents completely replace junior software developers by 2030?",
      "Open-Source AI vs. Closed-Source AI: Which serves humanity better?",
      "Is Web3 and decentralization a viable solution for cloud data privacy?"
    ],
    mentors: [
      {
        id: "evelyn_tech",
        name: "Prof. Evelyn Vance",
        role: "AI & Systems Specialist",
        avatar: "E",
        intro: "Hello, I am Prof. Evelyn. I guide students through data structures, compiler design, and backend engineering workflows. Ask me about optimization or preparing for tech interviews!"
      },
      {
        id: "sarah_career",
        name: "Dr. Sarah Jenkins",
        role: "Silicon Valley Tech Coach",
        avatar: "S",
        intro: "Hi! I'm Dr. Sarah. I help students select the right frameworks, polish open-source contributions, and strategize for top-tier internships and jobs."
      }
    ],
    opportunities: [
      { id: "tech-o1", type: "scholarship", title: "Google Generation Scholarship", provider: "Google Asia-Pacific", desc: "Supporting computer science students who excel in technology and demonstrate leadership.", deadline: "2026-10-15", reward: "10,000 USD", claimed: false },
      { id: "tech-o2", type: "internship", title: "NVIDIA Deep Learning Intern", provider: "NVIDIA Research", desc: "Work with high-performance computing architects on custom transformer architectures.", deadline: "2026-08-01", reward: "Paid + Credit Coins", claimed: false },
      { id: "tech-o3", type: "hackathon", title: "Global Agentic AI Hackathon", provider: "DeepMind & Cohere", desc: "Build cooperative multi-agent workflows solving real-world climate datasets.", deadline: "2026-07-28", reward: "5,000 USD + Mentorship", claimed: false },
      { id: "tech-o4", type: "certification", title: "AWS Solutions Architect", provider: "Amazon Web Services", desc: "Industry-standard certification validating complex distributed system designs.", deadline: "Flexible", reward: "Resume Boost + 50 🪙", claimed: false }
    ]
  },
  science: {
    name: "Medical & Sciences",
    news: [
      "CRISPR-Cas9 variant successfully targets micro-RNA to suppress oncology cell proliferation.",
      "NEET PG exam pattern revised to emphasize clinical decision case scenarios.",
      "International Space Station observes stellar fusion anomalies in high-density plasma.",
      "James Webb Space Telescope detects heavy metals in atmosphere of exoplanet Kepler-186f."
    ],
    youtube: [
      { name: "Ninja Nerd", tag: "Medical Science", desc: "Extremely detailed lectures on human physiology, organic chemistry, and biochemistry.", url: "https://www.youtube.com/c/ninjanerdscience", completed: false },
      { name: "CrashCourse Biology", tag: "Visual Ecology", desc: "High-quality fast-paced animations covering genetics, evolution, and anatomical systems.", url: "https://www.youtube.com/c/crashcourse", completed: false },
      { name: "Armando Hasudungan", tag: "Anatomy Hand-drawn", desc: "Stunning hand-drawn whiteboard guides illustrating complex immunological pathways.", url: "https://www.youtube.com/c/armandohasudungan", completed: false },
      { name: "Khan Academy Medicine", tag: "MCAT / NEET Prep", desc: "Bite-sized diagnostic tutorials covering pathology, hematology, and cellular biology.", url: "https://www.youtube.com/user/khanacademymedicine", completed: false }
    ],
    websites: [
      { name: "PubMed Central", tag: "Journal Repository", desc: "Free archive of biomedical and life sciences journal literature from NIH.", url: "https://ncbi.nlm.nih.gov/pmc", completed: false },
      { name: "BioDigital Human", tag: "3D Virtual Anatomy", desc: "Fully interactive 3D anatomy simulation tool for exploring muscles, nerves, and organs.", url: "https://biodigital.com", completed: false },
      { name: "Nature Medicine", tag: "Latest Research", desc: "The premier science journal featuring top research in biotech and clinical science.", url: "https://nature.com/nm", completed: false },
      { name: "ChemSpider", tag: "Chemical Database", desc: "Free access to over 100 million chemical structures, properties, and associated patents.", url: "http://chemspider.com", completed: false }
    ],
    debateTopics: [
      "Should somatic cell genome editing be legalized globally for custom child therapeutics?",
      "Is synthetic meat manufacturing a viable alternative to animal agriculture by 2040?",
      "Healthcare privatization vs. Universal single-payer coverage: Impact on research."
    ],
    mentors: [
      {
        id: "marcus_science",
        name: "Dr. Marcus Thorne",
        role: "Biomedical Specialist",
        avatar: "M",
        intro: "Greetings. I am Dr. Thorne. I specialize in cellular biochemistry, pharmaceutical pathways, and preparation for NEET/medical admissions. How can I assist you today?"
      },
      {
        id: "lisa_research",
        name: "Prof. Lisa Yang",
        role: "Pure Physics Researcher",
        avatar: "L",
        intro: "Hello, I am Lisa. I help students structure research papers, understand astrophysics models, and get fellowships at top labs."
      }
    ],
    opportunities: [
      { id: "sci-o1", type: "scholarship", title: "L'Oréal Women in Science", provider: "UNESCO Foundation", desc: "Awarding grants to female researchers in life, physical, and chemical sciences.", deadline: "2026-11-01", reward: "15,000 USD", claimed: false },
      { id: "sci-o2", type: "internship", title: "Biotech Lab Assistant", provider: "Pfizer Therapeutics", desc: "Gain hands-on clinical lab experience testing recombinant enzyme batches.", deadline: "2026-08-15", reward: "Stipend + Cert", claimed: false },
      { id: "sci-o3", type: "hackathon", title: "MedTech Diagnostic Challenge", provider: "Stanford Bio-X", desc: "Design hardware or software to assist rural clinics in pre-screening infectious diseases.", deadline: "2026-09-10", reward: "8,000 USD Grant", claimed: false },
      { id: "sci-o4", type: "certification", title: "Clinical Trial Protocols Certification", provider: "WHO Academy", desc: "Comprehensive course on ethical safety guidelines for testing novel biologics.", deadline: "Self-paced", reward: "WHO Badge + 40 🪙", claimed: false }
    ]
  },
  commerce: {
    name: "Commerce & Business",
    news: [
      "Central Bank announces pilot phase for Digital Currency (CBDC) to reduce interbank fees.",
      "Corporate ESG standards tightened; carbon emissions must be declared on financial audits.",
      "Fintech startups dominate seed funding rounds despite rising interest rate pressure.",
      "Micro-investing applications register a 45% surge in Gen-Z active accounts."
    ],
    youtube: [
      { name: "Damodaran Finance", tag: "Valuation & Investing", desc: "NYU Stern Professor Aswath Damodaran's legendary corporate finance and equity valuation lectures.", url: "https://www.youtube.com/@AswathDamodaranonValuation", completed: false },
      { name: "Graham Stephan", tag: "Personal Finance", desc: "Breakdowns of macroeconomic events, real estate investing, and credit optimization.", url: "https://www.youtube.com/c/grahamstephan", completed: false },
      { name: "The Plain Bagel", tag: "Finance Decoded", desc: "Clean, unbiased explanations of financial models, history, and investment concepts.", url: "https://www.youtube.com/c/theplainbagel", completed: false },
      { name: "Harvard Business Review", tag: "Strategy & Management", desc: "Case study breakdowns, leadership strategies, and organizational behavioral patterns.", url: "https://www.youtube.com/c/harvardbusinessreview", completed: false }
    ],
    websites: [
      { name: "Investopedia", tag: "Finance Wiki", desc: "The absolute dictionary for financial terms, trading principles, and fiscal policy analysis.", url: "https://investopedia.com", completed: false },
      { name: "TradingView", tag: "Market Charting", desc: "Real-time stock, crypto, and commodity charting tool with built-in community analysis indicators.", url: "https://tradingview.com", completed: false },
      { name: "EDGAR SEC Fillings", tag: "Corporate Reports", desc: "Look up official financial statements, 10-K, and 10-Q files for public corporations.", url: "https://sec.gov/edgar", completed: false },
      { name: "Crunchbase Hub", tag: "Startup Database", desc: "Track private funding rounds, venture capital flows, and startup acquisitions globally.", url: "https://crunchbase.com", completed: false }
    ],
    debateTopics: [
      "Will Decentralized Cryptocurrencies eventually replace fiat currency models?",
      "Is corporate greenwashing a systemic issue that financial audits fail to catch?",
      "Should gig-economy platforms be legally forced to provide full employee health benefits?"
    ],
    mentors: [
      {
        id: "raj_finance",
        name: "Rajesh Singhal, CFA",
        role: "Portfolio Manager & VC Advisor",
        avatar: "R",
        intro: "Hi, I am Rajesh. I specialize in corporate finance, valuations, CFA strategy, and venture pitch decks. Let's discuss your financial models!"
      },
      {
        id: "monica_startup",
        name: "Monica Geller",
        role: "Startup Incubator Director",
        avatar: "M",
        intro: "Hello! Monica here. I assist young founders with product-market fit, user acquisitions, and securing angel rounds."
      }
    ],
    opportunities: [
      { id: "com-o1", type: "scholarship", title: "Chartered Financial Analyst Grant", provider: "CFA Institute", desc: "Waives exam enrollment fees for exceptional finance graduates globally.", deadline: "2026-09-01", reward: "1,200 USD Value", claimed: false },
      { id: "com-o2", type: "internship", title: "Investment Banking Intern", provider: "Goldman Sachs", desc: "Assist analysts in constructing financial models and compiling pitch decks.", deadline: "2026-08-20", reward: "Premium Stipend", claimed: false },
      { id: "com-o3", type: "hackathon", title: "Fintech Innovation Pitch", provider: "Y Combinator Incubator", desc: "Pitch a decentralized micro-credit solution for merchants in developing nations.", deadline: "2026-07-30", reward: "25,000 USD Seed", claimed: false },
      { id: "com-o4", type: "certification", title: "Certified Valuation Analyst (CVA)", provider: "NACVA", desc: "A gold standard validation of business valuation skills for advisory roles.", deadline: "Flexible", reward: "Industry Badge + 60 🪙", claimed: false }
    ]
  },
  civil: {
    name: "Civil Services & Humanities",
    news: [
      "Ministry of Civil Affairs unveils draft policy for rural micro-grids powered by solar.",
      "International Court of Justice schedules deliberations on coastal maritime dispute.",
      "New historical excavation site in northern plains reveals 4000-year-old terracotta irrigation models.",
      "Supreme Court rules data encryption is a fundamental extension of the right to privacy."
    ],
    youtube: [
      { name: "StudyIQ IAS", tag: "Current Affairs & Policy", desc: "In-depth updates on geopolitics, Indian polity, and global treaties for civil services preparation.", url: "https://www.youtube.com/@studyiqias", completed: false },
      { name: "CrashCourse World History", tag: "History Lectures", desc: "John Green's famous animated and engaging overview of human civilizations across eras.", url: "https://www.youtube.com/c/crashcourse", completed: false },
      { name: "Unacademy UPSC", tag: "Syllabus Breakdowns", desc: "Top faculty discussions covering geography, civil law, governance, and essay writing.", url: "https://www.youtube.com/c/unacademyupsc", completed: false },
      { name: "Vox Geopolitics", tag: "Global Maps", desc: "High-quality maps explaining international boundary conflicts, resources, and geography.", url: "https://www.youtube.com/c/vox", completed: false }
    ],
    websites: [
      { name: "Press Information Bureau (PIB)", tag: "Official Releases", desc: "The primary source of government updates, cabinet releases, and ministerial briefs.", url: "https://pib.gov.in", completed: false },
      { name: "PRS Legislative Research", tag: "Bill Summaries", desc: "Unbiased, detailed reports analyzing proposed policy bills and legislative debates.", url: "https://prsindia.org", completed: false },
      { name: "UN Global Issues", tag: "Humanities Hub", desc: "Comprehensive official reports on migration, climate action, food security, and human rights.", url: "https://un.org/en/global-issues", completed: false },
      { name: "World History Encyclopedia", tag: "Historical Archive", desc: "Highly detailed peer-reviewed articles detailing ancient empires, trade routes, and cultures.", url: "https://worldhistory.org", completed: false }
    ],
    debateTopics: [
      "Universal Basic Income (UBI) vs. Target Subsidy Schemes: Which prevents rural poverty?",
      "Is carbon taxing a sufficient deterrent for large industrial polluters?",
      "Geopolitics vs. Global Commons: Can nations ever co-agree on deep-sea mineral treaties?"
    ],
    mentors: [
      {
        id: "arjun_ias",
        name: "Arjun Dev, Retd. IAS",
        role: "Senior Policy Advisor",
        avatar: "A",
        intro: "Welcome, student. I served in policy implementation for 25 years. I help aspirants structure civil essays, analyze geopolitical strategies, and master current affairs."
      },
      {
        id: "priya_soc",
        name: "Dr. Priya Sen",
        role: "Sociologist & Anthropologist",
        avatar: "P",
        intro: "Hi, I am Priya. I help students analyze social trends, write thesis papers, and understand modern human migration patterns."
      }
    ],
    opportunities: [
      { id: "civ-o1", type: "scholarship", title: "Public Policy Fellow Grant", provider: "Ford Foundation", desc: "Full funding for humanities graduates pursuing Master's degrees in Public Policy.", deadline: "2026-10-01", reward: "20,000 USD", claimed: false },
      { id: "civ-o2", type: "internship", title: "Legislative Research Assistant", provider: "PRS Legislative", desc: "Analyze draft policy bills, gather data on cabinet trends, and write brief reports.", deadline: "2026-08-05", reward: "Cert + Stipend", claimed: false },
      { id: "civ-o3", type: "hackathon", title: "Civic Tech Solutions Contest", provider: "Code for All Network", desc: "Build applications that connect citizens directly with municipal grievance officers.", deadline: "2026-09-01", reward: "6,000 USD Grant", claimed: false },
      { id: "civ-o4", type: "certification", title: "International Law Foundations", provider: "UN Geneva Course", desc: "Verify key understandings of sovereign rights, space law, and Geneva conventions.", deadline: "Flexible", reward: "UN Cert + 50 🪙", claimed: false }
    ]
  }
};

// --- Timetable Configuration Templates ---
const TIMETABLE_TEMPLATES = {
  feynman: {
    name: "The Feynman Review Technique",
    desc: "Divide your academic goals into deep synthesis blocks. Read code/theory, explain it to a simulated beginner, identify gaps in your memory, and write a summary.",
    slots: [
      { time: "06:00 - 07:30", label: "Core Concept Identification", desc: "Select a tough topic and outline everything you know." },
      { time: "08:30 - 11:30", label: "Deep Study & Reference Mapping", desc: "Fill in blanks using YouTube recommendations and study websites." },
      { time: "13:00 - 14:30", label: "Simulated Teaching Block", desc: "Draft a simple, analogy-filled explanation of the concept." },
      { time: "16:00 - 18:00", label: "Deficit Correction", desc: "Go back to source materials for areas where your analogy failed." },
      { time: "20:00 - 21:30", label: "Feynman Summary Log", desc: "Summarize the finalized concepts into simple, readable notes." }
    ]
  },
  pomodoro: {
    name: "Ultra-Pomodoro Sprint",
    desc: "A highly structured rhythmic sprint consisting of 25-minute absolute focus blocks separated by 5-minute restorative recovery breaks.",
    slots: [
      { time: "07:00 - 09:00", label: "Pomodoro Set 1 (4 Cycles)", desc: "100 minutes of pure coding or active revision. No distractions." },
      { time: "10:00 - 12:00", label: "Pomodoro Set 2 (4 Cycles)", desc: "Deep study focus on complex problem sets or case files." },
      { time: "14:00 - 16:00", label: "Pomodoro Set 3 (4 Cycles)", desc: "Structured note organization and flashcard updates." },
      { time: "17:00 - 18:30", label: "Creative Practice / Lab Work", desc: "Hands-on projects, essays, or mock assessments." },
      { time: "20:00 - 21:00", label: "Daily Sprint Audit", desc: "Track progress, check off daily quests, and log credit coins." }
    ]
  },
  spaced: {
    name: "Spaced Repetition Sprint",
    desc: "Forces you to actively retrieve information. Best used to review card decks, flashcards, or past mistakes over widening intervals.",
    slots: [
      { time: "06:30 - 08:00", label: "Active Recall Phase A (24-Hour Review)", desc: "Review the formulas, codes, or policy acts learned yesterday." },
      { time: "09:30 - 11:30", label: "Active Recall Phase B (7-Day Review)", desc: "Force recall on older concepts. Audit card decks." },
      { time: "13:30 - 15:30", label: "Problem Application Sprint", desc: "Solve tough exam questions targeting these recalled concepts." },
      { time: "17:00 - 18:30", label: "Weakness Remediation", desc: "Correct wrong answers, write them in error log books." },
      { time: "20:30 - 21:30", label: "Next Interval Setup", desc: "Schedule tomorrow's active recall cards based on today's performance." }
    ]
  },
  rule3: {
    name: "The Rule of 3 (Academic Wins)",
    desc: "Ignore lengthy schedules. Focus on exactly three major academic 'Wins' that you MUST accomplish today to progress.",
    slots: [
      { time: "08:00 - 11:00", label: "Win #1: Core Difficulty Crunch", desc: "Target the toughest goal (e.g. Master React Hooks, solve 15 physics questions)." },
      { time: "13:00 - 15:30", label: "Win #2: Conceptual Extension", desc: "Second win (e.g. Read draft bill, draft valuation sheet)." },
      { time: "16:30 - 18:30", label: "Win #3: Peer Review & Feedback", desc: "Third win (e.g. Participate in Debate Arena, ask Mentor a core query)." },
      { time: "20:00 - 21:00", label: "Daily Achievements Validation", desc: "Evaluate outcomes, claim quest coins, rest." }
    ]
  },
  deepfocus: {
    name: "Cal Newport Deep Work Cycle",
    desc: "Two massive 90-minute blocks of deep focus where notifications are disabled and brain power is maxed on conceptual breakthroughs.",
    slots: [
      { time: "07:30 - 09:00", label: "Deep Block 1: The Monastic Focus", desc: "Uninterrupted conceptual engineering. No browser tabs except docs." },
      { time: "10:30 - 12:00", label: "Deep Block 2: Implementation", desc: "Building, drafting, or coding based on Block 1 notes." },
      { time: "14:00 - 16:00", label: "Administrative / Shallow Tasks", desc: "Respond to notifications, organize folders, clear email queries." },
      { time: "17:00 - 18:30", label: "Concept Review & Synthesis", desc: "Review study links, read stream news, update flashcards." },
      { time: "20:00 - 21:00", label: "Complete Shutdown Routine", desc: "Formulate tomorrow's tasks. Switch off system." }
    ]
  },
  circadian: {
    name: "Circadian Rhythm Sync",
    desc: "Aligns your hardest mental tasks with biological alert peaks (typically late morning and early evening) and reserves afternoons for physical health.",
    slots: [
      { time: "08:30 - 11:30", label: "Cognitive Alertness Peak", desc: "Solve tough analytical equations, debug structures, or write essays." },
      { time: "12:30 - 14:00", label: "Shallow Work Intermission", desc: "Watch YouTube tutorials, check forums, complete easy quizzes." },
      { time: "14:30 - 16:30", label: "Biological Low (Rest & Restorative)", desc: "Nap, stretch, listen to podcasts, rest eyes." },
      { time: "17:00 - 19:30", label: "Second Alertness Peak", desc: "Revision, debate discussions, active recall work." },
      { time: "21:00 - 22:00", label: "Wind-Down Cycle", desc: "Relaxation, reading non-academic guides." }
    ]
  },
  hybrid888: {
    name: "8-8-8 Balanced Blueprint",
    desc: "Perfect equilibrium: 8 hours of focused academic work, 8 hours of restorative sleep, and 8 hours of physical exercise, social activities, and relaxation.",
    slots: [
      { time: "08:00 - 12:00", label: "Academic Focus: Block 1", desc: "First 4 hours of deep study, research, or programming classes." },
      { time: "12:00 - 14:00", label: "Rest & Nutrition Intermission", desc: "Lunch, relaxation, chatting with friends." },
      { time: "14:00 - 18:00", label: "Academic Focus: Block 2", desc: "Second 4 hours of practical workshops, mock tests, and assignments." },
      { time: "18:00 - 22:00", label: "Recreation & Wellness", desc: "Gym, social calls, hobbies, and dinner." },
      { time: "22:00 - 06:00", label: "Restorative Sleep Cycle", desc: "8 hours of uninterrupted rest to solidify memory pathways." }
    ]
  },
  wellnessfirst: {
    name: "Mental Wellness Layout",
    desc: "Interleaved breaks, physical stretching, and mindfulness practices to prevent exam burnout and cognitive fatigue.",
    slots: [
      { time: "07:00 - 08:00", label: "Morning Mindfulness & Activity", desc: "Meditation, deep breathing, light cardio or jog." },
      { time: "09:00 - 11:30", label: "Micro-Break Study Block 1", desc: "Study for 45 minutes, stand/stretch for 15 minutes. Repeat." },
      { time: "13:00 - 15:30", label: "Micro-Break Study Block 2", desc: "Analyze cases, solve coding questions with active stretching breaks." },
      { time: "16:30 - 18:00", label: "Nature Walk & Reflection", desc: "Disconnect from devices. Clear mind." },
      { time: "19:30 - 21:00", label: "Relaxed Review & Mentorship", desc: "Consult with AI mentors, check bookmarks, discuss topics." }
    ]
  },
  spacedrest: {
    name: "Rest-Accelerated Sprinting",
    desc: "Increases the proportion of recovery time. Ideal for students who struggle with long study spans, helping them stay fresh.",
    slots: [
      { time: "08:30 - 10:00", label: "Sprint 1: Concentrated Prep", desc: "90 minutes of high focus study." },
      { time: "10:00 - 11:30", label: "Extended Recovery Walk", desc: "90 minutes of active leisure, walking, reading news." },
      { time: "11:30 - 13:00", label: "Sprint 2: Focus Application", desc: "90 minutes of hands-on solving." },
      { time: "14:30 - 17:00", label: "Afternoon Rest Block", desc: "Extended nap, wellness checks, stretching." },
      { time: "18:00 - 19:30", label: "Sprint 3: Active Synthesis", desc: "Final 90 minutes of coding/revision." }
    ]
  },
  examcram: {
    name: "Extreme Exam Cram Mode",
    desc: "A high-intensity, structured schedule meant for the final 10 days before target examinations. Emphasizes mock tests and recall.",
    slots: [
      { time: "06:00 - 09:00", label: "Mock Exam Marathon", desc: "Full 3-hour exam simulation under timed constraints." },
      { time: "10:00 - 13:00", label: "Mock Paper Critical Analysis", desc: "Audit every error, verify explanations in docs." },
      { time: "14:30 - 17:30", label: "Weakness Remediation Block", desc: "Study the exact chapters where marks were dropped." },
      { time: "19:00 - 21:30", label: "Formulas & Recall Review", desc: "Memorize active recall sheets, definitions, and shortcuts." },
      { time: "21:30 - 22:30", label: "Relaxation & Early Sleep", desc: "Rest brain to ensure cognitive efficiency tomorrow." }
    ]
  },
  coderush: {
    name: "Code & Build Intensive",
    desc: "Continuous software engineering loops, rapid prototyping, and bug-squashing. Designed for hackathons or project development.",
    slots: [
      { time: "08:00 - 11:30", label: "Prototyping Core API & Backend", desc: "Develop routes, architecture, and connect database schemas." },
      { time: "13:00 - 16:30", label: "Frontend State Development", desc: "Integrate dashboard screens, implement responsive layouts." },
      { time: "17:30 - 20:00", label: "Debugging & End-to-End Testing", desc: "Locate memory leaks, optimize loading states, fix CSS issues." },
      { time: "21:00 - 22:30", label: "Documentation & Release Audit", desc: "Write readme files, push code to repo, claim coins." }
    ]
  },
  pastpapers: {
    name: "Mock Marathon Sequence",
    desc: "Rigorous timed evaluations on previous years' test papers, followed by review with AI mentors.",
    slots: [
      { time: "09:00 - 12:00", label: "Previous Year Paper (Timed)", desc: "Solve question paper in silence without breaks." },
      { time: "13:30 - 15:30", label: "Step-by-Step Scoring", desc: "Score yourself objectively, identify error types." },
      { time: "16:30 - 19:00", label: "Concept Strengthening", desc: "Work with syllabus sites and mentors on weak topics." },
      { time: "20:00 - 21:30", label: "Strategy Re-planning", desc: "Identify time-management strategies for the next paper." }
    ]
  },
  weaknessfix: {
    name: "Weakness-Targeted Decimation",
    desc: "Strictly targets your weaknesses. You skip strong topics to spend the day solving problems in your lowest-scoring domains.",
    slots: [
      { time: "07:30 - 09:30", label: "Weakness Audit & Target Definition", desc: "Find your weakest core topic. Review basic rules." },
      { time: "10:30 - 13:00", label: "Guided Problem Solving", desc: "Work slowly through 20 complex questions in this topic." },
      { time: "14:30 - 17:00", label: "Unassisted Problem Solving", desc: "Solve 20 more questions without templates/hints." },
      { time: "18:30 - 20:30", label: "Mentor Feedback & Review", desc: "Ask AI mentors to explain lingering doubts." },
      { time: "21:00 - 22:00", label: "Progress Check", desc: "Test yourself on 5 quick questions. Review improvements." }
    ]
  }
};

// Default fallbacks to cover 21 templates if user adds more. Rhythmic generator handles custom arrays dynamically.

// --- Simulated AI Career Predictor Maps ---
const CAREER_DATABASE = {
  tech: {
    primary: {
      role: "AI Core Research Engineer",
      compat: 94,
      desc: "Architects and trains deep neural networks, designs custom NLP pipelines, and scales agentic execution networks.",
      skills: ["Python", "PyTorch", "Linear Algebra", "Transformers", "Distributed Systems"],
      roadmap: [
        { id: "tp1", title: "Complete Deep Learning Specialization", desc: "Master neural networks, backpropagation, and CNN/RNN models." },
        { id: "tp2", title: "Build and Deploy an Autonomous Agent", desc: "Create a system that processes inputs and performs actions using LLMs." },
        { id: "tp3", title: "Contribute to open-source ML Repos", desc: "Submit pull requests to Hugging Face or PyTorch packages." },
        { id: "tp4", title: "Publish or Present at AI Conferences", desc: "Submit structural papers to student symposiums." }
      ]
    },
    backup: {
      role: "Full-Stack Web Architect",
      compat: 86,
      desc: "Creates highly responsive user dashboards, engineers secure cloud backend databases, and deploys high-availability systems.",
      skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "AWS / Docker"],
      roadmap: [
        { id: "tb1", title: "Master React & Frontend Frameworks", desc: "Build multi-view glassmorphic dashboards using state containers." },
        { id: "tb2", title: "Develop Scalable REST/GraphQL APIs", desc: "Set up express servers, secure endpoints, and configure DB indexing." },
        { id: "tb3", title: "Configure Docker & CI/CD Pipelines", desc: "Containerize apps and set up automatic deployments upon Git pushes." },
        { id: "tb4", title: "Deploy a SaaS MVP Platform", desc: "Launch a live tool used by real students or peers." }
      ]
    }
  },
  science: {
    primary: {
      role: "Bioinformatics Specialist",
      compat: 92,
      desc: "Merges biology with computer algorithms, analyzing genomic sequences, mapping cellular mutations, and predicting drug interactions.",
      skills: ["Biology", "Genetics", "Python Data Analytics", "Statistics", "R Coding"],
      roadmap: [
        { id: "sp1", title: "Master Genetic Mutation Databases", desc: "Learn to query NCBI, PubMed, and blast genome tools." },
        { id: "sp2", title: "Build Genomic Sequence Parser", desc: "Code an algorithm in Python that isolates target codon mutations." },
        { id: "sp3", title: "Complete Research Internship at BioLab", desc: "Gain hands-on clinical lab and sequence analytics hours." },
        { id: "sp4", title: "Submit Bioinformatics Case Study", desc: "Publish findings on mutations in student science journals." }
      ]
    },
    backup: {
      role: "Clinical Trial Consultant",
      compat: 82,
      desc: "Monitors and analyzes pharmaceutical drug tests, audits ethical compliance, and ensures protocols match international standards.",
      skills: ["Biochemistry", "Pathology", "FDA Regulations", "Data Analysis", "Medical Writing"],
      roadmap: [
        { id: "sb1", title: "Certify in GCP (Good Clinical Practice)", desc: "Acquire WHO-compliant certification for ethical research." },
        { id: "sb2", title: "Audit Mock Clinical Study Datasets", desc: "Locate protocol deficits, structure statistical outcomes." },
        { id: "sb3", title: "Intern with Research Organisation (CRO)", desc: "Work with regulatory coordinators on drug submissions." },
        { id: "sb4", title: "Compile Comprehensive Drug Audit Review", desc: "Publish study analyzing past FDA compliance issues." }
      ]
    }
  },
  commerce: {
    primary: {
      role: "Quantitative Valuation Analyst",
      compat: 91,
      desc: "Uses statistical equations and financial algorithms to price corporate shares, assess asset risks, and model market patterns.",
      skills: ["Corporate Valuation", "Financial Modeling", "CFA Core", "Excel (Advanced)", "Python for Finance"],
      roadmap: [
        { id: "cp1", title: "Complete CFA Level 1 Preparation", desc: "Deep study of ethics, equity analysis, and economics." },
        { id: "cp2", title: "Build 3-Statement Valuation Sheets", desc: "Model a public company's cash flow, balance sheet, and income statement." },
        { id: "cp3", title: "Analyze Venture Market Datasets", desc: "Deploy linear regression tools in Python to analyze market pricing." },
        { id: "cp4", title: "Pitch Valuation Report to VC Fund", desc: "Present a detailed investment pitch deck to senior investors." }
      ]
    },
    backup: {
      role: "Growth Marketing Director",
      compat: 84,
      desc: "Designs customer acquisition strategies, optimizes ad budgets using unit economics, and manages brand scaling campaigns.",
      skills: ["SEO Strategy", "Data Analytics", "Ad Management", "Copywriting", "Consumer Psychology"],
      roadmap: [
        { id: "cb1", title: "Launch and Scale a Content Portal", desc: "Write search-optimized guides that pull organic visitors." },
        { id: "cb2", title: "Optimize Mock Paid Advertising Sheets", desc: "Distribute ad budgets to minimize CAC and maximize LTV." },
        { id: "cb3", title: "Run Growth Campaign for Local Startup", desc: "Execute marketing sprints for an active brand." },
        { id: "cb4", title: "Certify in Advanced Product Analytics", desc: "Earn certifications validating conversion funnel optimizations." }
      ]
    }
  },
  civil: {
    primary: {
      role: "Public Policy Consultant",
      compat: 93,
      desc: "Advises government bodies, drafts research briefs, analyzes public statistics, and guides municipal implementation projects.",
      skills: ["Polity & Governance", "International Treaties", "Public Economics", "Sociology", "Legislative Drafts"],
      roadmap: [
        { id: "vp1", title: "Complete Policy Analysis Specialization", desc: "Study policy evaluation metrics, welfare models, and data analytics." },
        { id: "vp2", title: "Draft Bill Analysis Report", desc: "Review a pending legislative bill, noting structural pros and cons." },
        { id: "vp3", title: "Intern at PRS Legislative or Think Tank", desc: "Assist policy analysts in compiling briefing documents." },
        { id: "vp4", title: "Submit Public Grievance Action Plan", desc: "Draft a model policy solving public utility leaks in local districts." }
      ]
    },
    backup: {
      role: "Geopolitical Risk Analyst",
      compat: 85,
      desc: "Evaluates international boundary conflicts, currency embargoes, and resource allocations to advise multinational organizations.",
      skills: ["Geopolitics", "Strategic Studies", "History Research", "Risk Modeling", "Public Speaking"],
      roadmap: [
        { id: "vb1", title: "Publish Geopolitical Conflict Analysis", desc: "Write research brief analyzing international border trade conflicts." },
        { id: "vb2", title: "Complete International Relations Course", desc: "Gain certifications covering strategic treaties and diplomatic pacts." },
        { id: "vb3", title: "Simulate Crisis Response Strategy", desc: "Draft action plans solving simulated ocean resource standoffs." },
        { id: "vb4", title: "Present Geopolitical Brief at Summit", desc: "Present risk analysis to academic boards or policy panels." }
      ]
    }
  }
};

// --- Application Core State ---
const state = {
  studentName: "",
  studentStream: "tech",
  targetExam: "",
  learningStyle: "visual",
  studentSkills: [],
  strength: "",
  weakness: "",
  creditCoins: 100,
  streak: 7,
  level: 1,
  currentView: "dashboard",
  balancerLevel: "balanced", // 'relaxed' | 'balanced' | 'intense'
  activeTemplate: "feynman",
  quests: {
    news: false,
    study: false,
    debate: false,
    mentor: false
  },
  debateHistory: {}, // keyed by topic name, value array of message objects
  mentorChatHistory: {}, // keyed by mentor id, value array of message objects
  claimedOpportunities: new Set(),
  completedStudyItems: new Set(),
  completedRoadmapMilestones: new Set(),
  activePredictorTrack: "primary", // 'primary' | 'backup'
  gemFound: false
};

// --- DOM Initialisation ---
document.addEventListener("DOMContentLoaded", () => {
  // Check if onboarding already done (simulate via state or check local storage)
  initUI();
  setupEventListeners();
  loadStreamData();
  triggerView("dashboard");
});

// Initialize UI States
function initUI() {
  updateCoinDisplay();
  updateStreakDisplay();
  updateLevelDisplay();
  renderStudyLifeBalancer();
  generateTimetable();
}

// Update Coin Displays
function updateCoinDisplay() {
  const displays = ["coin-balance", "stat-coins"];
  displays.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = state.creditCoins;
      // Simple scaling pop animation
      el.classList.add("pop-anim");
      setTimeout(() => el.classList.remove("pop-anim"), 200);
    }
  });
}

// Update Streak
function updateStreakDisplay() {
  const el = document.getElementById("streak-days");
  if (el) el.textContent = `${state.streak} Days`;
}

// Update Level
function updateLevelDisplay() {
  let rank = "Novice Scholar";
  if (state.level === 2) rank = "Intermediate Academic";
  if (state.level >= 3) rank = "Master Scholar";

  const levelTxt = `Level ${state.level} ${rank}`;
  
  const elSide = document.getElementById("sidebar-student-level");
  if (elSide) elSide.textContent = levelTxt;

  const elStat = document.getElementById("stat-level");
  if (elStat) elStat.textContent = `Lvl ${state.level}`;
}

// --- Setup Router & Event Listeners ---
function setupEventListeners() {
  // Sidebar Navigation Links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      triggerView(target);
      
      // Update active class
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Dynamic View buttons (within panels)
  const viewBtns = document.querySelectorAll("[data-view-btn]");
  viewBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-view-btn");
      triggerView(target);
      // Sync sidebar nav selection
      const matchingLink = document.querySelector(`.nav-link[data-target="${target}"]`);
      if (matchingLink) {
        navLinks.forEach(l => l.classList.remove("active"));
        matchingLink.classList.add("active");
      }
    });
  });

  // Global Stream Switcher Dropdown
  const streamSelect = document.getElementById("stream-switcher");
  if (streamSelect) {
    streamSelect.addEventListener("change", (e) => {
      state.studentStream = e.target.value;
      loadStreamData();
      
      // Sync Onboarding Select if switched in dashboard
      const onboardSelect = document.getElementById("student-stream");
      if (onboardSelect) onboardSelect.value = state.studentStream;
    });
  }

  // Onboarding Form Submit
  const onboardingForm = document.getElementById("onboarding-form");
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.studentName = document.getElementById("student-name").value;
      state.studentStream = document.getElementById("student-stream").value;
      state.targetExam = document.getElementById("target-exam").value;
      state.learningStyle = document.getElementById("learning-style").value;
      
      const skillInput = document.getElementById("student-skills").value;
      state.studentSkills = skillInput.split(",").map(s => s.trim()).filter(s => s.length > 0);
      
      state.strength = document.getElementById("main-strength").value;
      state.weakness = document.getElementById("main-weakness").value;

      // Update switcher dropdown in header
      if (streamSelect) streamSelect.value = state.studentStream;

      // Hide Onboarding modal
      const overlay = document.getElementById("onboarding-overlay");
      if (overlay) overlay.classList.add("hidden");

      // Update user details in dashboard
      updateProfileDataUI();
      loadStreamData();
      
      showToast("Operating System Initialized!", "Welcome aboard Aura OS!");
    });
  }

  // Rewards Store Triggers
  const coinBtn = document.getElementById("coin-trigger-btn");
  const shopOverlay = document.getElementById("shop-overlay");
  const closeShopBtn = document.getElementById("close-shop-btn");

  if (coinBtn && shopOverlay) {
    coinBtn.addEventListener("click", () => shopOverlay.classList.remove("hidden"));
  }
  if (closeShopBtn && shopOverlay) {
    closeShopBtn.addEventListener("click", () => shopOverlay.classList.add("hidden"));
  }

  // Store Redeem Actions
  const buyBtns = document.querySelectorAll(".buy-item-btn");
  buyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      const price = parseInt(btn.getAttribute("data-price"), 10);
      
      if (state.creditCoins >= price) {
        state.creditCoins -= price;
        updateCoinDisplay();
        showToast("Purchase Complete! 🪙", `You redeemed [${item}] for ${price} Coins.`);
      } else {
        showToast("Insufficient Coins 🪙", `You need ${price - state.creditCoins} more coins to redeem [${item}].`);
      }
    });
  });

  // Daily Quests Toggles
  const questCheckboxes = document.querySelectorAll(".quest-checkbox");
  questCheckboxes.forEach(chk => {
    chk.addEventListener("change", (e) => {
      const parent = chk.closest(".quest-item");
      const qKey = parent.id.replace("quest-", "");
      const coinReward = parseInt(parent.getAttribute("data-coins"), 10);

      if (e.target.checked) {
        state.quests[qKey] = true;
        addCoins(coinReward, `Daily Quest: Completed ${qKey.toUpperCase()}`);
      } else {
        state.quests[qKey] = false;
        state.creditCoins = Math.max(0, state.creditCoins - coinReward);
        updateCoinDisplay();
      }
    });
  });

  // 3-Level Balancer Slider
  const balancerSlider = document.getElementById("balancer-slider");
  if (balancerSlider) {
    balancerSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      let level = "balanced";
      if (val === 1) level = "relaxed";
      if (val === 3) level = "intense";
      
      state.balancerLevel = level;
      
      // Update label highlight
      const labels = document.querySelectorAll(".slider-labels span");
      labels.forEach(lbl => lbl.classList.remove("active"));
      document.querySelector(`.label-${level}`).classList.add("active");
      
      renderStudyLifeBalancer();
      generateTimetable();
      showToast("Schedule Recalculated", `Study-Life ratio adjusted to [${level.toUpperCase()}]`);
    });
  }

  // Schedule Template Select
  const templateSelect = document.getElementById("schedule-template-select");
  if (templateSelect) {
    templateSelect.addEventListener("change", (e) => {
      state.activeTemplate = e.target.value;
      generateTimetable();
    });
  }

  // Debate Topic Switcher
  const debateTopicSelect = document.getElementById("debate-topic-selector");
  if (debateTopicSelect) {
    debateTopicSelect.addEventListener("change", () => {
      initDebateTopic();
    });
  }

  // Reset Debate
  const resetDebateBtn = document.getElementById("reset-debate-btn");
  if (resetDebateBtn) {
    resetDebateBtn.addEventListener("click", () => {
      initDebateTopic();
    });
  }

  // Submit Debate Argument
  const submitArgumentBtn = document.getElementById("submit-argument-btn");
  const userArgumentInput = document.getElementById("user-argument-input");
  if (submitArgumentBtn && userArgumentInput) {
    submitArgumentBtn.addEventListener("click", () => {
      const val = userArgumentInput.value.trim();
      if (val.length < 10) {
        showToast("Argument Too Short", "Please write a comprehensive point to debate (min 10 chars).");
        return;
      }
      postUserDebatePoint(val);
      userArgumentInput.value = "";
    });
  }

  // Mentor Chat Send
  const mentorChatInput = document.getElementById("mentor-chat-input");
  const mentorChatSubmit = document.getElementById("mentor-chat-submit");
  if (mentorChatSubmit && mentorChatInput) {
    mentorChatSubmit.addEventListener("click", () => {
      const val = mentorChatInput.value.trim();
      if (val.length === 0) return;
      sendMentorMessage(val);
      mentorChatInput.value = "";
    });
    mentorChatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = mentorChatInput.value.trim();
        if (val.length === 0) return;
        sendMentorMessage(val);
        mentorChatInput.value = "";
      }
    });
  }

  // Career Predictor Button
  const calcPredictorBtn = document.getElementById("calculate-predictor-btn");
  if (calcPredictorBtn) {
    calcPredictorBtn.addEventListener("click", () => {
      runCareerPredictor();
    });
  }

  // Career Roadmap Tracker toggles (Primary vs Backup)
  const primaryTrackBtn = document.getElementById("btn-show-primary");
  const backupTrackBtn = document.getElementById("btn-show-backup");
  if (primaryTrackBtn && backupTrackBtn) {
    primaryTrackBtn.addEventListener("click", () => {
      state.activePredictorTrack = "primary";
      primaryTrackBtn.classList.add("active");
      backupTrackBtn.classList.remove("active");
      renderRoadmapTimeline();
    });
    backupTrackBtn.addEventListener("click", () => {
      state.activePredictorTrack = "backup";
      backupTrackBtn.classList.add("active");
      primaryTrackBtn.classList.remove("active");
      renderRoadmapTimeline();
    });
  }

  // Scavenger Hunt: Floating Gem Click
  const gemEl = document.getElementById("floating-gem");
  if (gemEl) {
    gemEl.addEventListener("click", () => {
      claimHiddenGem();
    });
  }

  // Opportunity Hub filters
  const filterBtns = document.querySelectorAll(".btn-filter");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderOpportunities(btn.getAttribute("data-filter"));
    });
  });
}

// Router Switcher
function triggerView(viewId) {
  state.currentView = viewId;
  
  // Hide all panels, show matching one
  const panels = document.querySelectorAll(".content-panel");
  panels.forEach(p => p.classList.remove("active"));
  
  const activePanel = document.getElementById(viewId);
  if (activePanel) {
    activePanel.classList.add("active");
  }

  // Update Header Title
  const titleMap = {
    dashboard: "Dashboard Overview",
    "study-hub": "Stream Learning Curations",
    "timetable-balancer": "Daily Smart Scheduler",
    "debate-arena": "AI Debate Arena & GD Hub",
    "mentor-hub": "24/7 AI Mentor Support",
    "career-predictor": "AI Career Planner & Backup Roadmap",
    "opportunity-hub": "Opportunities & Hidden Gems"
  };
  const titleEl = document.getElementById("page-title");
  if (titleEl && titleMap[viewId]) {
    titleEl.textContent = titleMap[viewId];
  }

  // Random Hidden Gem spawner mechanism on nav change
  triggerGemChance();
}

// Update Onboard UI Copy
function updateProfileDataUI() {
  const nameVal = state.studentName || "Student";
  const initials = nameVal.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

  // Avatar letter
  const avatarEl = document.getElementById("sidebar-avatar-letter");
  if (avatarEl) avatarEl.textContent = initials || "S";

  // Student name
  const nameEl = document.getElementById("sidebar-student-name");
  if (nameEl) nameEl.textContent = nameVal;

  // Welcome names
  const welcomeName = document.getElementById("welcome-name");
  if (welcomeName) welcomeName.textContent = nameVal;

  const welcomeStream = document.getElementById("welcome-stream");
  if (welcomeStream && STREAM_DATABASE[state.studentStream]) {
    welcomeStream.textContent = STREAM_DATABASE[state.studentStream].name;
  }

  const welcomeExam = document.getElementById("welcome-exam");
  if (welcomeExam) welcomeExam.textContent = state.targetExam || "Active Target";

  const statStyle = document.getElementById("stat-style");
  if (statStyle) statStyle.textContent = state.learningStyle.toUpperCase();

  // Populate Career Predictor Skills input automatically
  const predictSkillsInput = document.getElementById("predict-skills");
  if (predictSkillsInput && state.studentSkills.length > 0) {
    predictSkillsInput.value = state.studentSkills.join(", ");
  }
}

// --- Stream Loading ---
function loadStreamData() {
  const streamKey = state.studentStream;
  const db = STREAM_DATABASE[streamKey];
  if (!db) return;

  // 1. Update active theme body class
  document.body.className = ""; // clear
  document.body.classList.add(`theme-${streamKey}`);

  // 2. Load breaking news ticker
  const tickerEl = document.getElementById("breaking-news-ticker");
  if (tickerEl) {
    // Join headlines separated by large gaps
    tickerEl.innerHTML = db.news.map(h => `<span>🔥 ${h}</span>`).join(" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ");
  }

  // 3. Load Dashboard news feed cards
  renderDashboardNewsFeed(db.news);

  // 4. Load Study Hub Youtube & Website resource grids
  renderStudyHub(db);

  // 5. Load Debate topics dropdown
  renderDebateTopicOptions(db.debateTopics);

  // 6. Load AI Mentors List
  renderMentorsList(db.mentors);

  // 7. Load Opportunities (Hidden Gems)
  const activeFilterBtn = document.querySelector(".btn-filter.active");
  const filterVal = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
  renderOpportunities(filterVal);

  // Sync Welcome Stream text
  const welcomeStream = document.getElementById("welcome-stream");
  if (welcomeStream) welcomeStream.textContent = db.name;

  // Clear predicting outcome when stream changes to force recalculation
  const roadmapCard = document.getElementById("roadmap-card");
  if (roadmapCard) roadmapCard.classList.add("hidden");
  
  const resultsCard = document.getElementById("prediction-results-content");
  if (resultsCard) {
    resultsCard.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔮</div>
        <p>Stream switched. Generate analysis to view career tracks for ${db.name}.</p>
      </div>
    `;
  }
}

// Dashboard News List Render
function renderDashboardNewsFeed(newsArr) {
  const listEl = document.getElementById("news-feed-list");
  if (!listEl) return;

  listEl.innerHTML = "";
  
  // Renders 3 items
  const subset = newsArr.slice(0, 3);
  subset.forEach((n, idx) => {
    const card = document.createElement("div");
    card.className = "news-card";
    
    let topicBadge = "UPDATE";
    if (idx === 0) topicBadge = "TRENDING";
    if (idx === 1) topicBadge = "ACADEMICS";
    if (idx === 2) topicBadge = "JOBS";

    card.innerHTML = `
      <div class="news-card-badge">${topicBadge}</div>
      <div class="news-card-content">
        <h4>${n.split(" ")[0]} ${n.split(" ")[1]} ${n.split(" ")[2]}...</h4>
        <p>${n}</p>
      </div>
    `;
    listEl.appendChild(card);
  });
}

// Study Hub Curation Render
function renderStudyHub(db) {
  const ytGrid = document.getElementById("youtube-resources-grid");
  const webGrid = document.getElementById("website-resources-grid");

  if (!ytGrid || !webGrid) return;

  ytGrid.innerHTML = "";
  webGrid.innerHTML = "";

  // Render YouTube
  db.youtube.forEach((yt, idx) => {
    const cardId = `yt-${state.studentStream}-${idx}`;
    const isCompleted = state.completedStudyItems.has(cardId);
    
    const card = document.createElement("div");
    card.className = `resource-card ${isCompleted ? 'completed-resource' : ''}`;
    card.innerHTML = `
      <div class="card-thumbnail-wrap">
        <div class="yt-logo-badge">📺</div>
      </div>
      <div class="card-resource-content">
        <div class="card-header">
          <span class="opportunity-tag">${yt.tag}</span>
        </div>
        <h4>${yt.name}</h4>
        <p>${yt.desc}</p>
        <div class="card-resource-footer">
          <a href="${yt.url}" target="_blank" class="btn btn-secondary btn-sm link-btn-track" data-id="${cardId}">Visit Channel</a>
          <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-action'} btn-sm complete-study-btn" data-id="${cardId}">
            ${isCompleted ? 'Finished ✓' : 'Mark Finished (+10 🪙)'}
          </button>
        </div>
      </div>
    `;
    ytGrid.appendChild(card);
  });

  // Render Websites
  db.websites.forEach((w, idx) => {
    const cardId = `web-${state.studentStream}-${idx}`;
    const isCompleted = state.completedStudyItems.has(cardId);

    const card = document.createElement("div");
    card.className = `resource-card ${isCompleted ? 'completed-resource' : ''}`;
    card.innerHTML = `
      <div class="card-thumbnail-wrap">
        <div class="web-logo-badge">🌐</div>
      </div>
      <div class="card-resource-content">
        <div class="card-header">
          <span class="opportunity-tag">${w.tag}</span>
        </div>
        <h4>${w.name}</h4>
        <p>${w.desc}</p>
        <div class="card-resource-footer">
          <a href="${w.url}" target="_blank" class="btn btn-secondary btn-sm link-btn-track" data-id="${cardId}">Visit Website</a>
          <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-action'} btn-sm complete-study-btn" data-id="${cardId}">
            ${isCompleted ? 'Finished ✓' : 'Mark Finished (+10 🪙)'}
          </button>
        </div>
      </div>
    `;
    webGrid.appendChild(card);
  });

  // Setup completion listeners
  setupStudyCompletionBtns();
}

function setupStudyCompletionBtns() {
  const completeBtns = document.querySelectorAll(".complete-study-btn");
  completeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      
      if (state.completedStudyItems.has(id)) {
        // undo completion
        state.completedStudyItems.delete(id);
        btn.textContent = "Mark Finished (+10 🪙)";
        btn.className = "btn btn-action btn-sm complete-study-btn";
        btn.closest(".resource-card").classList.remove("completed-resource");
      } else {
        state.completedStudyItems.add(id);
        btn.textContent = "Finished ✓";
        btn.className = "btn btn-secondary btn-sm complete-study-btn";
        btn.closest(".resource-card").classList.add("completed-resource");
        
        // Award Credit coins
        addCoins(10, "Study Resource Completed");

        // Complete daily quest if applicable
        const questChk = document.getElementById("chk-study");
        if (questChk && !questChk.checked) {
          questChk.checked = true;
          questChk.dispatchEvent(new Event("change"));
        }
      }
    });
  });

  // Track reference link clicks for daily quest
  const linkBtns = document.querySelectorAll(".link-btn-track");
  linkBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Simulate reading/visiting
      const questChk = document.getElementById("chk-study");
      if (questChk && !questChk.checked) {
        questChk.checked = true;
        // Trigger coin reward through change handler
        questChk.dispatchEvent(new Event("change"));
      }
    });
  });
}

// --- Study-Life Balancer Visualizations ---
function renderStudyLifeBalancer() {
  const barsContainer = document.getElementById("allocation-bars");
  const legendContainer = document.getElementById("allocation-legend");
  
  if (!barsContainer || !legendContainer) return;

  // Recalculate allocations based on state.balancerLevel
  // Allocations must equal 24 hours
  let allocations = { study: 6, sleep: 8, exercise: 2, wellness: 2, relaxation: 6 };
  
  if (state.balancerLevel === "relaxed") {
    allocations = { study: 4, sleep: 9, exercise: 2, wellness: 3, relaxation: 6 };
  } else if (state.balancerLevel === "intense") {
    allocations = { study: 10, sleep: 6, exercise: 1, wellness: 1, relaxation: 6 };
  }

  // Display badges in dashboard
  const balancerBadge = document.getElementById("balancer-badge");
  if (balancerBadge) {
    balancerBadge.textContent = state.balancerLevel.toUpperCase();
  }

  // Renders stacked bar parts
  barsContainer.innerHTML = "";
  legendContainer.innerHTML = "";

  const order = ["study", "sleep", "exercise", "wellness", "relaxation"];
  const colorMap = {
    study: "bar-study",
    sleep: "bar-sleep",
    exercise: "bar-exercise",
    wellness: "bar-wellness",
    relaxation: "bar-relaxation"
  };

  order.forEach(type => {
    const hours = allocations[type];
    const percentage = (hours / 24) * 100;
    
    // Renders visual segment
    const seg = document.createElement("div");
    seg.className = `bar-segment ${colorMap[type]}`;
    seg.style.width = `${percentage}%`;
    seg.title = `${type.toUpperCase()}: ${hours} Hours (${Math.round(percentage)}%)`;
    barsContainer.appendChild(seg);

    // Renders legend indicator
    const legItem = document.createElement("div");
    legItem.className = "legend-item";
    legItem.innerHTML = `
      <div class="legend-color ${colorMap[type]}"></div>
      <span>${type.charAt(0).toUpperCase() + type.slice(1)}: ${hours}h</span>
    `;
    legendContainer.appendChild(legItem);
  });
}

// --- Timetable Generation ---
function generateTimetable() {
  const timelineContainer = document.getElementById("full-timetable-timeline");
  const miniTimelineContainer = document.getElementById("mini-timeline-list");
  const explText = document.getElementById("template-explanation-text");
  const activeTemplateName = document.getElementById("active-template-name");
  
  if (!timelineContainer) return;

  const temp = TIMETABLE_TEMPLATES[state.activeTemplate];
  if (!temp) return;

  // 1. Renders active template descriptions
  if (explText) explText.textContent = temp.desc;
  if (activeTemplateName) activeTemplateName.textContent = temp.name;

  // 2. Clear containers
  timelineContainer.innerHTML = "";
  if (miniTimelineContainer) miniTimelineContainer.innerHTML = "";

  // 3. Build hour blocks
  // If the user selected intense level, modify target study slots to be longer/more intense
  let modifiedSlots = JSON.parse(JSON.stringify(temp.slots));
  
  if (state.balancerLevel === "relaxed") {
    modifiedSlots.forEach(s => {
      if (s.label.includes("Study") || s.label.includes("Sprint") || s.label.includes("Deep") || s.label.includes("Win")) {
        s.label = `Relaxed ${s.label}`;
        s.desc = `${s.desc} (Paced limits, include tea break)`;
      }
    });
  } else if (state.balancerLevel === "intense") {
    modifiedSlots.forEach(s => {
      if (s.label.includes("Study") || s.label.includes("Sprint") || s.label.includes("Deep") || s.label.includes("Win")) {
        s.label = `💥 BEAST: ${s.label}`;
        s.desc = `${s.desc} (Highly analytical target, eliminate distractions!)`;
      }
    });
  }

  // 4. Render main schedule timeline
  modifiedSlots.forEach((slot, idx) => {
    const slotEl = document.createElement("div");
    // Make first one active/active-slot for demo
    slotEl.className = `timeline-slot ${idx === 1 ? 'active-slot' : ''}`;
    slotEl.innerHTML = `
      <div class="slot-time">${slot.time}</div>
      <div class="slot-detail">
        <div class="slot-label">${slot.label}</div>
        <div class="slot-desc">${slot.desc}</div>
      </div>
    `;
    timelineContainer.appendChild(slotEl);

    // Render mini timeline widget (max 3 items)
    if (miniTimelineContainer && idx < 3) {
      const miniSlot = document.createElement("div");
      miniSlot.className = `mini-timeline-item ${idx === 1 ? 'active' : ''}`;
      miniSlot.innerHTML = `
        <span class="time-box">${slot.time.split(" - ")[0]}</span>
        <span class="task-name">${slot.label}</span>
      `;
      miniTimelineContainer.appendChild(miniSlot);
    }
  });
}

// --- AI Debate & GD Hub Engine ---
function renderDebateTopicOptions(topics) {
  const selectEl = document.getElementById("debate-topic-selector");
  if (!selectEl) return;

  selectEl.innerHTML = "";
  topics.forEach((t, idx) => {
    const opt = document.createElement("option");
    opt.value = `topic-${idx}`;
    opt.textContent = t;
    selectEl.appendChild(opt);
  });

  // Initialize debate topic history
  initDebateTopic();
}

function initDebateTopic() {
  const selectEl = document.getElementById("debate-topic-selector");
  if (!selectEl) return;
  
  const activeTopicText = selectEl.options[selectEl.selectedIndex]?.textContent;
  if (!activeTopicText) return;

  const logContainer = document.getElementById("debate-log-container");
  if (!logContainer) return;

  // Clear logs
  logContainer.innerHTML = "";
  
  // Set up mock bot participants debate statements
  const botParticipants = [
    { name: "Aarav (Tech Aspirant)", body: `In my view, this topic is critical. Looking at modern deployment stats, automation is taking over routine pipelines. Consequently, junior positions must evolve or disappear.` },
    { name: "Sophia (AI Ethics Expert)", body: `However, Aarav, we shouldn't neglect the necessity of human verification. Pure algorithmic setups fail to grasp product nuances. Therefore, humans remain highly vital.` }
  ];

  state.debateHistory[activeTopicText] = [
    { sender: "System", body: `Debate Arena active on topic: "${activeTopicText}". Join the group discussion by writing your viewpoint.` }
  ];

  // Append System message
  appendDebateBubble("System", state.debateHistory[activeTopicText][0].body, "bot-bubble");

  // Delay bots dialogue to simulate live GD
  botParticipants.forEach((bot, idx) => {
    setTimeout(() => {
      state.debateHistory[activeTopicText].push({ sender: bot.name, body: bot.body });
      appendDebateBubble(bot.name, bot.body, "bot-bubble");
    }, 800 * (idx + 1));
  });

  // Reset feedback card
  resetDebateFeedback();
}

function appendDebateBubble(sender, message, bubbleClass) {
  const logContainer = document.getElementById("debate-log-container");
  if (!logContainer) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${bubbleClass}`;
  
  const senderText = sender !== "System" ? `<div class="bubble-sender">${sender}</div>` : "";
  bubble.innerHTML = `
    ${senderText}
    <div class="bubble-body">${message}</div>
  `;
  
  logContainer.appendChild(bubble);
  logContainer.scrollTop = logContainer.scrollHeight;
}

function postUserDebatePoint(userMessage) {
  const selectEl = document.getElementById("debate-topic-selector");
  if (!selectEl) return;
  const activeTopicText = selectEl.options[selectEl.selectedIndex]?.textContent;

  // 1. Post User bubble
  state.debateHistory[activeTopicText].push({ sender: "You", body: userMessage });
  appendDebateBubble("You", userMessage, "user-bubble");

  // Complete quest if unchecked
  const questChk = document.getElementById("chk-debate");
  if (questChk && !questChk.checked) {
    questChk.checked = true;
    questChk.dispatchEvent(new Event("change"));
  }

  // 2. Trigger AI Review Grading
  gradeDebateInput(userMessage);

  // 3. Trigger Bot rebuttal after delay
  setTimeout(() => {
    const botsRebuttals = [
      `A fair assertion, but it overlooks resource limits. Because scalability is bounded, we cannot rely solely on the model you propose.`,
      `I agree with that perspective. Indeed, prioritizing active skill development yields significantly stronger long-term yields.`,
      `That contradicts empirical metrics. For example, local tests proved that manual configuration latency remains too high.`
    ];
    const randResp = botsRebuttals[Math.floor(Math.random() * botsRebuttals.length)];
    const botName = Math.random() > 0.5 ? "Aarav (Tech Aspirant)" : "Sophia (AI Ethics Expert)";
    
    state.debateHistory[activeTopicText].push({ sender: botName, body: randResp });
    appendDebateBubble(botName, randResp, "bot-bubble");
  }, 1500);
}

// AI Grader Evaluation Engine
function gradeDebateInput(text) {
  // Score heuristics based on argument structure
  const wordCount = text.split(" ").length;
  
  // Look for debate connective indicators
  const markers = ["however", "therefore", "consequently", "because", "furthermore", "analysis", "evidence", "contrast"];
  let matchedCount = 0;
  markers.forEach(m => {
    if (text.toLowerCase().includes(m)) matchedCount++;
  });

  // Calculate scores
  const scoreClarity = Math.min(98, Math.max(70, 75 + matchedCount * 4 + (wordCount > 15 ? 5 : 0)));
  const scoreThinking = Math.min(98, Math.max(68, 70 + (wordCount > 20 ? 8 : 2) + matchedCount * 5));
  const scorePersuasion = Math.min(98, Math.max(65, 72 + matchedCount * 6));
  const scoreConfidence = Math.min(98, Math.max(72, 80 + (wordCount > 25 ? 10 : 3)));

  // Render scores
  updateProgressFill("metric-clarity", "score-clarity", scoreClarity);
  updateProgressFill("metric-thinking", "score-thinking", scoreThinking);
  updateProgressFill("metric-persuasion", "score-persuasion", scorePersuasion);
  updateProgressFill("metric-confidence", "score-confidence", scoreConfidence);

  // Written Grade Output
  const gradeTextEl = document.getElementById("feedback-grade-text");
  if (gradeTextEl) {
    let analyticalFeedback = "";
    if (matchedCount >= 2 && wordCount > 20) {
      analyticalFeedback = `<strong>Excellent Critical Construction!</strong> You structurally organized your argument with logical transitions (${markers.filter(m => text.toLowerCase().includes(m)).join(", ")}). Your assertion addresses core thesis bounds nicely. +15 Credit Coins added!`;
      addCoins(15, "Debate Core argument analyzed");
    } else {
      analyticalFeedback = `<strong>Structured Argument Received.</strong> Good attempt. To enhance your persuasion score next round, try incorporating comparative connectors (e.g. 'However', 'Therefore') and back your premise with mock empirical metrics.`;
    }
    
    gradeTextEl.innerHTML = `
      <div class="ai-critique">
        <p>${analyticalFeedback}</p>
        <div class="feedback-stars">★★★★☆ (Grade A-)</div>
      </div>
    `;
  }
}

function updateProgressFill(barId, valId, score) {
  const bar = document.getElementById(barId);
  const val = document.getElementById(valId);
  if (bar && val) {
    bar.style.width = `${score}%`;
    val.textContent = `${score}%`;
  }
}

function resetDebateFeedback() {
  const bars = ["metric-clarity", "metric-thinking", "metric-persuasion", "metric-confidence"];
  const scores = ["score-clarity", "score-thinking", "score-persuasion", "score-confidence"];
  
  bars.forEach(b => {
    const el = document.getElementById(b);
    if (el) el.style.width = "0%";
  });
  scores.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.textContent = "--";
  });

  const gradeTextEl = document.getElementById("feedback-grade-text");
  if (gradeTextEl) {
    gradeTextEl.innerHTML = `
      <div class="empty-state">
        <div class="icon">📊</div>
        <p>Your constructive criticism and logic breakdown will appear here post contribution.</p>
      </div>
    `;
  }
}

// --- AI Mentor Chat Engine ---
function renderMentorsList(mentors) {
  const listContainer = document.getElementById("mentor-profiles-list");
  if (!listContainer) return;

  listContainer.innerHTML = "";
  mentors.forEach((m, idx) => {
    const pItem = document.createElement("div");
    pItem.className = `mentor-profile-item ${idx === 0 ? 'active' : ''}`;
    pItem.innerHTML = `
      <div class="mentor-pic">${m.avatar}</div>
      <div class="mentor-meta-side">
        <h4>${m.name}</h4>
        <span>${m.role}</span>
      </div>
    `;
    pItem.addEventListener("click", () => {
      // Toggle active
      document.querySelectorAll(".mentor-profile-item").forEach(item => item.classList.remove("active"));
      pItem.classList.add("active");
      
      // Load selected mentor chat console
      selectMentor(m);
    });
    listContainer.appendChild(pItem);
  });

  // Load first mentor by default
  if (mentors.length > 0) {
    selectMentor(mentors[0]);
  }
}

function selectMentor(mentor) {
  const avatarEl = document.getElementById("active-mentor-avatar");
  const nameEl = document.getElementById("active-mentor-name");
  const roleEl = document.getElementById("active-mentor-role");
  const logEl = document.getElementById("mentor-chat-log");

  if (!avatarEl || !nameEl || !roleEl || !logEl) return;

  avatarEl.textContent = mentor.avatar;
  nameEl.textContent = mentor.name;
  roleEl.textContent = mentor.role;

  // Load history or initialize
  logEl.innerHTML = "";
  const chatKey = mentor.id;
  if (!state.mentorChatHistory[chatKey]) {
    state.mentorChatHistory[chatKey] = [
      { sender: mentor.name, body: mentor.intro }
    ];
  }

  state.mentorChatHistory[chatKey].forEach(msg => {
    appendMentorBubble(msg.sender, msg.body, msg.sender === "You" ? "user-bubble" : "bot-bubble");
  });
}

function appendMentorBubble(sender, message, bubbleClass) {
  const logContainer = document.getElementById("mentor-chat-log");
  if (!logContainer) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${bubbleClass}`;
  bubble.innerHTML = `
    <div class="bubble-sender">${sender}</div>
    <div class="bubble-body">${message}</div>
  `;
  
  logContainer.appendChild(bubble);
  logContainer.scrollTop = logContainer.scrollHeight;
}

function sendMentorMessage(msgText) {
  const activeMentorName = document.getElementById("active-mentor-name").textContent;
  
  // Find current mentor key
  const streamKey = state.studentStream;
  const currentMentor = STREAM_DATABASE[streamKey].mentors.find(m => m.name === activeMentorName);
  if (!currentMentor) return;
  
  const chatKey = currentMentor.id;

  // 1. Post user message
  state.mentorChatHistory[chatKey].push({ sender: "You", body: msgText });
  appendMentorBubble("You", msgText, "user-bubble");

  // Complete quest if unchecked
  const questChk = document.getElementById("chk-mentor");
  if (questChk && !questChk.checked) {
    questChk.checked = true;
    questChk.dispatchEvent(new Event("change"));
  }

  // 2. Simulate Mentor AI Response after delay
  setTimeout(() => {
    let response = "";
    
    // Simple mock heuristic response rules
    const textLower = msgText.toLowerCase();
    if (textLower.includes("schedule") || textLower.includes("timetable") || textLower.includes("time")) {
      response = `An excellent target exam routine requires a scientific structure. I recommend using the **Cal Newport Deep Work Cycle** or the **Pomodoro Sprint** under your 'Timetable & Balancer' panel. Be sure to align the 3-Level Balancer with your energy cycles.`;
    } else if (textLower.includes("career") || textLower.includes("job") || textLower.includes("placement")) {
      response = `Building a target path begins with an audit of your skills. Input your stack in the 'Career Predictor' panel. I highly recommend completing the Primary roadmap path, and keeping the backup options visible so you're insulated from sudden shifts.`;
    } else if (textLower.includes("anxiety") || textLower.includes("stress") || textLower.includes("burnout")) {
      response = `Academic endurance is a marathon, not a sprint. Set your Study-Life Balancer to **Relaxed Mode** today. This reduces study limits and structures 9 hours of restorative sleep to ease mental fatigue.`;
    } else {
      response = `Interesting question. To progress in the ${STREAM_DATABASE[state.studentStream].name} stream, focus on building tangible proofs-of-work (projects/studies). Be sure to check the 'Hidden Gems' panel daily for niche certifications and fellowships that fit this goal!`;
    }

    state.mentorChatHistory[chatKey].push({ sender: currentMentor.name, body: response });
    appendMentorBubble(currentMentor.name, response, "bot-bubble");
  }, 800);
}

// --- AI Career Predictor & Roadmaps ---
function runCareerPredictor() {
  const skillsInput = document.getElementById("predict-skills").value.trim();
  const resultsContent = document.getElementById("prediction-results-content");
  const roadmapCard = document.getElementById("roadmap-card");

  if (skillsInput.length < 5) {
    showToast("Invalid Input", "Please enter at least 2 key skills to build predictions.");
    return;
  }

  // Retrieve matching career data from DB based on active stream
  const careerData = CAREER_DATABASE[state.studentStream];
  if (!careerData) return;

  resultsContent.innerHTML = "";
  
  // Render Primary
  const primCard = document.createElement("div");
  primCard.className = "prediction-card primary-track";
  primCard.innerHTML = `
    <div class="compatibility-pill">🎯 ${careerData.primary.compat}% Match</div>
    <h4>Primary Career: ${careerData.primary.role}</h4>
    <p>${careerData.primary.desc}</p>
    <div class="skills-pill-row">
      ${careerData.primary.skills.map(s => `<span class="skill-pill">${s}</span>`).join("")}
    </div>
  `;
  resultsContent.appendChild(primCard);

  // Render Backup
  const backCard = document.createElement("div");
  backCard.className = "prediction-card backup-track";
  backCard.innerHTML = `
    <div class="compatibility-pill">🛡️ Backup: ${careerData.backup.compat}% Match</div>
    <h4>Alternative Path: ${careerData.backup.role}</h4>
    <p>${careerData.backup.desc}</p>
    <div class="skills-pill-row">
      ${careerData.backup.skills.map(s => `<span class="skill-pill">${s}</span>`).join("")}
    </div>
  `;
  resultsContent.appendChild(backCard);

  // Reveal Roadmap Card
  roadmapCard.classList.remove("hidden");
  
  // Render steps timeline
  renderRoadmapTimeline();
  showToast("Career Analysis Generated", "Primary & alternative roadmap paths initialized.");
}

function renderRoadmapTimeline() {
  const stepsContainer = document.getElementById("roadmap-timeline-steps");
  if (!stepsContainer) return;

  const careerData = CAREER_DATABASE[state.studentStream];
  if (!careerData) return;

  stepsContainer.innerHTML = "";

  const activeTrack = state.activePredictorTrack; // 'primary' | 'backup'
  const roadmapSteps = activeTrack === "primary" ? careerData.primary.roadmap : careerData.backup.roadmap;

  roadmapSteps.forEach(step => {
    const isCompleted = state.completedRoadmapMilestones.has(step.id);
    
    const stepEl = document.createElement("div");
    stepEl.className = `timeline-step ${isCompleted ? 'completed' : ''}`;
    stepEl.innerHTML = `
      <div class="step-card">
        <div class="step-card-detail">
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
        </div>
        <div class="step-card-action">
          <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-action'} btn-sm milestone-toggle-btn" data-id="${step.id}">
            ${isCompleted ? 'Completed ✓' : 'Mark Completed (+15 🪙)'}
          </button>
        </div>
      </div>
    `;
    stepsContainer.appendChild(stepEl);
  });

  // Setup listeners for milestone triggers
  setupMilestoneListeners();
}

function setupMilestoneListeners() {
  const toggleBtns = document.querySelectorAll(".milestone-toggle-btn");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const stepId = btn.getAttribute("data-id");
      if (state.completedRoadmapMilestones.has(stepId)) {
        state.completedRoadmapMilestones.delete(stepId);
      } else {
        state.completedRoadmapMilestones.add(stepId);
        addCoins(15, "Roadmap Milestone Unlocked");
      }
      renderRoadmapTimeline();
    });
  });
}

// --- Opportunities (Hidden Gems) Finder ---
function renderOpportunities(filterType = "all") {
  const gridContainer = document.getElementById("opportunities-grid-list");
  if (!gridContainer) return;

  gridContainer.innerHTML = "";
  
  const streamKey = state.studentStream;
  const db = STREAM_DATABASE[streamKey];
  if (!db || !db.opportunities) return;

  // Filter items
  const filtered = db.opportunities.filter(op => {
    if (filterType === "all") return true;
    return op.type === filterType;
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state double-width" style="grid-column: span 3;">
        <div class="icon">💼</div>
        <p>No matching niche opportunities found in the ${STREAM_DATABASE[streamKey].name} category yet.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(op => {
    const isClaimed = state.claimedOpportunities.has(op.id);
    
    const opCard = document.createElement("div");
    opCard.className = `opportunity-card ${isClaimed ? 'claimed-card' : ''}`;
    opCard.innerHTML = `
      <div class="opportunity-tag">${op.type}</div>
      <h3>${op.title}</h3>
      <div class="opportunity-provider">Provided by: ${op.provider}</div>
      <p class="opportunity-desc">${op.desc}</p>
      <div class="opportunity-meta">
        <span class="deadline">Deadline: ${op.deadline}</span>
        <span class="reward">${op.reward}</span>
      </div>
      <button class="btn ${isClaimed ? 'btn-secondary' : 'btn-action'} full-width claim-op-btn" data-id="${op.id}">
        ${isClaimed ? 'Applied & Tracked ✓' : 'Apply & Track (+10 🪙)'}
      </button>
    `;
    gridContainer.appendChild(opCard);
  });

  // Setup claim listeners
  setupOpportunityClaimBtns(filterType);
}

function setupOpportunityClaimBtns(filterType) {
  const btns = document.querySelectorAll(".claim-op-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (state.claimedOpportunities.has(id)) {
        state.claimedOpportunities.delete(id);
      } else {
        state.claimedOpportunities.add(id);
        addCoins(10, "Applied to Opportunity Tracker");
      }
      renderOpportunities(filterType);
    });
  });
}

// --- Scavenger Hunt: Dynamic Hidden Gems ---
function triggerGemChance() {
  // Clear existing gem
  const gemEl = document.getElementById("floating-gem");
  if (gemEl) gemEl.classList.add("hidden");
  state.gemFound = false;

  // 30% chance to spawn gem on tab navigation change
  if (Math.random() < 0.35) {
    setTimeout(spawnHiddenGem, 500);
  }
}

function spawnHiddenGem() {
  const gemEl = document.getElementById("floating-gem");
  if (!gemEl) return;

  // Generate random window placement (leaving padding margins for safe display)
  const windowW = window.innerWidth;
  const windowH = window.innerHeight;

  const randX = Math.floor(Math.random() * (windowW - 120)) + 60;
  const randY = Math.floor(Math.random() * (windowH - 120)) + 60;

  gemEl.style.left = `${randX}px`;
  gemEl.style.top = `${randY}px`;
  gemEl.classList.remove("hidden");
}

function claimHiddenGem() {
  const gemEl = document.getElementById("floating-gem");
  if (!gemEl || state.gemFound) return;

  state.gemFound = true;
  gemEl.classList.add("hidden");

  // Coin and tip reward
  const quotes = [
    "Opportunity is missed by most people because it is dressed in overalls and looks like work. - Edison",
    "Focus on the process, not the outcome. You build value hourly.",
    "Hidden pathways open to those who check documentation systematically.",
    "Small streaks build massive momentum. +20 Credit Coins awarded!"
  ];
  const randQuote = quotes[Math.floor(Math.random() * quotes.length)];

  addCoins(20, "Hidden Gem Discovered!");
  showToast("💎 GEM DISCOVERED! (+20)", randQuote);
}

// --- Global Utilities: Coins & Toasts ---
function addCoins(amount, source) {
  state.creditCoins += amount;
  updateCoinDisplay();
  
  // Calculate Level Up threshold: level 1 to 2 needs 250 coins, 2 to 3 needs 500 coins
  checkLevelUp();
}

function checkLevelUp() {
  const oldLevel = state.level;
  if (state.creditCoins >= 500) {
    state.level = 3;
  } else if (state.creditCoins >= 250) {
    state.level = 2;
  } else {
    state.level = 1;
  }

  if (state.level !== oldLevel) {
    updateLevelDisplay();
    showToast("🌟 LEVEL UP!", `Congratulations! You leveled up to Level ${state.level}.`);
  }
}

// Visual Toast System
function showToast(title, body) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${title.includes("🪙") || title.includes("GEM") || title.includes("Coins") ? 'toast-coins' : ''}`;
  toast.innerHTML = `
    <div class="toast-body">
      <strong>${title}</strong>
      <div>${body}</div>
    </div>
  `;

  container.appendChild(toast);

  // Fade out and remove element after 4.5 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}
