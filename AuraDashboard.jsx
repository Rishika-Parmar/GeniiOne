import React, { useState, useEffect, useMemo, useRef } from 'react';

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
      { id: "yt-t1", name: "3Blue1Brown", tag: "Math & AI Visuals", desc: "Unmatched visual explanations of calculus, neural networks, and linear algebra.", url: "https://www.youtube.com/c/3blue1brown" },
      { id: "yt-t2", name: "freeCodeCamp", tag: "Full-Stack Bootcamps", desc: "Comprehensive 10+ hour code courses covering Python, React, Data Structures, and SQL.", url: "https://www.youtube.com/c/freecodecamp" },
      { id: "yt-t3", name: "Husan - Tech Architect", tag: "System Design", desc: "Deep dives into scalable architectures, load balancing, caching, and microservices.", url: "https://www.youtube.com/c/husseinناصر" },
      { id: "yt-t4", name: "The Primeagen", tag: "Algorithms & Dev Culture", desc: "High energy deep-dives into data structures, performance optimization, and developer workflows.", url: "https://www.youtube.com/c/theprimeagen" }
    ],
    websites: [
      { id: "web-t1", name: "LeetCode Portal", tag: "Coding Practice", desc: "The industry standard for honing data structure and algorithm problem-solving abilities.", url: "https://leetcode.com" },
      { id: "web-t2", name: "Roadmap.sh", tag: "Developer Roadmaps", desc: "Interactive community-guided paths, charts, and resources for every developer stack.", url: "https://roadmap.sh" },
      { id: "web-t3", name: "GitHub Explore", tag: "Open Source Collabs", desc: "Discover trending repositories, participate in active projects, and inspect production code.", url: "https://github.com/explore" },
      { id: "web-t4", name: "MDN Web Docs", tag: "Official Specs", desc: "Authoritative resource for HTML, CSS, JavaScript, and web APIs documentation.", url: "https://developer.mozilla.org" }
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
      { id: "tech-o1", type: "scholarship", title: "Google Generation Scholarship", provider: "Google Asia-Pacific", desc: "Supporting computer science students who excel in technology and demonstrate leadership.", deadline: "2026-10-15", reward: "10,000 USD" },
      { id: "tech-o2", type: "internship", title: "NVIDIA Deep Learning Intern", provider: "NVIDIA Research", desc: "Work with high-performance computing architects on custom transformer architectures.", deadline: "2026-08-01", reward: "Paid + Credit Coins" },
      { id: "tech-o3", type: "hackathon", title: "Global Agentic AI Hackathon", provider: "DeepMind & Cohere", desc: "Build cooperative multi-agent workflows solving real-world climate datasets.", deadline: "2026-07-28", reward: "5,000 USD + Mentorship" },
      { id: "tech-o4", type: "certification", title: "AWS Solutions Architect", provider: "Amazon Web Services", desc: "Industry-standard certification validating complex distributed system designs.", deadline: "Flexible", reward: "Resume Boost + 50 🪙" }
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
      { id: "yt-s1", name: "Ninja Nerd", tag: "Medical Science", desc: "Extremely detailed lectures on human physiology, organic chemistry, and biochemistry.", url: "https://www.youtube.com/c/ninjanerdscience" },
      { id: "yt-s2", name: "CrashCourse Biology", tag: "Visual Ecology", desc: "High-quality fast-paced animations covering genetics, evolution, and anatomical systems.", url: "https://www.youtube.com/c/crashcourse" },
      { id: "yt-s3", name: "Armando Hasudungan", tag: "Anatomy Hand-drawn", desc: "Stunning hand-drawn whiteboard guides illustrating complex immunological pathways.", url: "https://www.youtube.com/c/armandohasudungan" },
      { id: "yt-s4", name: "Khan Academy Medicine", tag: "MCAT / NEET Prep", desc: "Bite-sized diagnostic tutorials covering pathology, hematology, and cellular biology.", url: "https://www.youtube.com/user/khanacademymedicine" }
    ],
    websites: [
      { id: "web-s1", name: "PubMed Central", tag: "Journal Repository", desc: "Free archive of biomedical and life sciences journal literature from NIH.", url: "https://ncbi.nlm.nih.gov/pmc" },
      { id: "web-s2", name: "BioDigital Human", tag: "3D Virtual Anatomy", desc: "Fully interactive 3D anatomy simulation tool for exploring muscles, nerves, and organs.", url: "https://biodigital.com" },
      { id: "web-s3", name: "Nature Medicine", tag: "Latest Research", desc: "The premier science journal featuring top research in biotech and clinical science.", url: "https://nature.com/nm" },
      { id: "web-s4", name: "ChemSpider", tag: "Chemical Database", desc: "Free access to over 100 million chemical structures, properties, and associated patents.", url: "http://chemspider.com" }
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
      { id: "sci-o1", type: "scholarship", title: "L'Oréal Women in Science", provider: "UNESCO Foundation", desc: "Awarding grants to female researchers in life, physical, and chemical sciences.", deadline: "2026-11-01", reward: "15,000 USD" },
      { id: "sci-o2", type: "internship", title: "Biotech Lab Assistant", provider: "Pfizer Therapeutics", desc: "Gain hands-on clinical lab experience testing recombinant enzyme batches.", deadline: "2026-08-15", reward: "Stipend + Cert" },
      { id: "sci-o3", type: "hackathon", title: "MedTech Diagnostic Challenge", provider: "Stanford Bio-X", desc: "Design hardware or software to assist rural clinics in pre-screening infectious diseases.", deadline: "2026-09-10", reward: "8,000 USD Grant" },
      { id: "sci-o4", type: "certification", title: "Clinical Trial Protocols Certification", provider: "WHO Academy", desc: "Comprehensive course on ethical safety guidelines for testing novel biologics.", deadline: "Self-paced", reward: "WHO Badge + 40 🪙" }
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
      { id: "yt-c1", name: "Damodaran Finance", tag: "Valuation & Investing", desc: "NYU Stern Professor Aswath Damodaran's legendary corporate finance and equity valuation lectures.", url: "https://www.youtube.com/@AswathDamodaranonValuation" },
      { id: "yt-c2", name: "Graham Stephan", tag: "Personal Finance", desc: "Breakdowns of macroeconomic events, real estate investing, and credit optimization.", url: "https://www.youtube.com/c/grahamstephan" },
      { id: "yt-c3", name: "The Plain Bagel", tag: "Finance Decoded", desc: "Clean, unbiased explanations of financial models, history, and investment concepts.", url: "https://www.youtube.com/c/theplainbagel" },
      { id: "yt-c4", name: "Harvard Business Review", tag: "Strategy & Management", desc: "Case study breakdowns, leadership strategies, and organizational behavioral patterns.", url: "https://www.youtube.com/c/harvardbusinessreview" }
    ],
    websites: [
      { id: "web-c1", name: "Investopedia", tag: "Finance Wiki", desc: "The absolute dictionary for financial terms, trading principles, and fiscal policy analysis.", url: "https://investopedia.com" },
      { id: "web-c2", name: "TradingView", tag: "Market Charting", desc: "Real-time stock, crypto, and commodity charting tool with built-in community analysis indicators.", url: "https://tradingview.com" },
      { id: "web-c3", name: "EDGAR SEC Fillings", tag: "Corporate Reports", desc: "Look up official financial statements, 10-K, and 10-Q files for public corporations.", url: "https://sec.gov/edgar" },
      { id: "web-c4", name: "Crunchbase Hub", tag: "Startup Database", desc: "Track private funding rounds, venture capital flows, and startup acquisitions globally.", url: "https://crunchbase.com" }
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
      { id: "com-o1", type: "scholarship", title: "Chartered Financial Analyst Grant", provider: "CFA Institute", desc: "Waives exam enrollment fees for exceptional finance graduates globally.", deadline: "2026-09-01", reward: "1,200 USD Value" },
      { id: "com-o2", type: "internship", title: "Investment Banking Intern", provider: "Goldman Sachs", desc: "Assist analysts in constructing financial models and compiling pitch decks.", deadline: "2026-08-20", reward: "Premium Stipend" },
      { id: "com-o3", type: "hackathon", title: "Fintech Innovation Pitch", provider: "Y Combinator Incubator", desc: "Pitch a decentralized micro-credit solution for merchants in developing nations.", deadline: "2026-07-30", reward: "25,000 USD Seed" },
      { id: "com-o4", type: "certification", title: "Certified Valuation Analyst (CVA)", provider: "NACVA", desc: "A gold standard validation of business valuation skills for advisory roles.", deadline: "Flexible", reward: "Industry Badge + 60 🪙" }
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
      { id: "yt-l1", name: "StudyIQ IAS", tag: "Current Affairs & Policy", desc: "In-depth updates on geopolitics, Indian polity, and global treaties for civil services preparation.", url: "https://www.youtube.com/@studyiqias" },
      { id: "yt-l2", name: "CrashCourse World History", tag: "History Lectures", desc: "John Green's famous animated and engaging overview of human civilizations across eras.", url: "https://www.youtube.com/c/crashcourse" },
      { id: "yt-l3", name: "Unacademy UPSC", tag: "Syllabus Breakdowns", desc: "Top faculty discussions covering geography, civil law, governance, and essay writing.", url: "https://www.youtube.com/c/unacademyupsc" },
      { id: "yt-l4", name: "Vox Geopolitics", tag: "Global Maps", desc: "High-quality maps explaining international boundary conflicts, resources, and geography.", url: "https://www.youtube.com/c/vox" }
    ],
    websites: [
      { id: "web-l1", name: "Press Information Bureau (PIB)", tag: "Official Releases", desc: "The primary source of government updates, cabinet releases, and ministerial briefs.", url: "https://pib.gov.in" },
      { id: "web-l2", name: "PRS Legislative Research", tag: "Bill Summaries", desc: "Unbiased, detailed reports analyzing proposed policy bills and legislative debates.", url: "https://prsindia.org" },
      { id: "web-l3", name: "UN Global Issues", tag: "Humanities Hub", desc: "Comprehensive official reports on migration, climate action, food security, and human rights.", url: "https://un.org/en/global-issues" },
      { id: "web-l4", name: "World History Encyclopedia", tag: "Historical Archive", desc: "Highly detailed peer-reviewed articles detailing ancient empires, trade routes, and cultures.", url: "https://worldhistory.org" }
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
      { id: "civ-o1", type: "scholarship", title: "Public Policy Fellow Grant", provider: "Ford Foundation", desc: "Full funding for humanities graduates pursuing Master's degrees in Public Policy.", deadline: "2026-10-01", reward: "20,000 USD" },
      { id: "civ-o2", type: "internship", title: "Legislative Research Assistant", provider: "PRS Legislative", desc: "Analyze draft policy bills, gather data on cabinet trends, and write brief reports.", deadline: "2026-08-05", reward: "Cert + Stipend" },
      { id: "civ-o3", type: "hackathon", title: "Civic Tech Solutions Contest", provider: "Code for All Network", desc: "Build applications that connect citizens directly with municipal grievance officers.", deadline: "2026-09-01", reward: "6,000 USD Grant" },
      { id: "civ-o4", type: "certification", title: "International Law Foundations", provider: "UN Geneva Course", desc: "Verify key understandings of sovereign rights, space law, and Geneva conventions.", deadline: "Flexible", reward: "UN Cert + 50 🪙" }
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
  }
};

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

const REWARDS_STORE_ITEMS = [
  { id: "shop1", icon: "🏆", name: "1-on-1 AI Mock Interview", desc: "Get a rigorous 30-minute mock interview tailored to your career goal with detailed AI performance reviews.", price: 200 },
  { id: "shop2", icon: "🧠", name: "Premium Syllabus Cheat-Sheets", desc: "Highly condensed, exam-focused visual revisions and formula cards for your target exams.", price: 80 },
  { id: "shop3", icon: "💬", name: "20-Min Premium Mentor Chat", desc: "Live messaging session with an industry-specialist mentor for customized review.", price: 150 },
  { id: "shop4", icon: "⚡", name: "AI Resume Optimizer Credits", desc: "Unlock professional grading and ATS optimization scanning for 5 resume submissions.", price: 100 }
];

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
  
  // Interactive Hub States
  const [activePredictorTrack, setActivePredictorTrack] = useState("primary"); // 'primary' | 'backup'
  const [skillsInput, setSkillsInput] = useState("");
  const [hasCalculatedCareer, setHasCalculatedCareer] = useState(false);
  
  // Mentor Chat
  const [selectedMentorIndex, setSelectedMentorIndex] = useState(0);
  const [mentorChatHistory, setMentorChatHistory] = useState({}); // mentorId -> messages array
  const [mentorInput, setMentorInput] = useState("");

  // Debate Arena
  const [selectedDebateTopicIndex, setSelectedDebateTopicIndex] = useState(0);
  const [debateHistory, setDebateHistory] = useState({}); // topicText -> messages array
  const [debateInput, setDebateInput] = useState("");
  const [debateFeedback, setDebateFeedback] = useState(null);

  // Shop overlay
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLogoOverlayOpen, setIsLogoOverlayOpen] = useState(false);

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

  // Filter for opportunities
  const [opportunityFilter, setOpportunityFilter] = useState("all");

  // Notifications/Toasts System
  const [toasts, setToasts] = useState([]);

  // --- Theme Mode State ---
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('theme-mode') || 'dark';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // --- Debate & GD Arena States & Refs ---
  const [blockedStates, setBlockedStates] = useState({
    "Aarav (Tech Aspirant)": { voice: false, text: false, video: false },
    "Sophia (AI Ethics Expert)": { voice: false, text: false, video: false },
    "Zoe (Study Strategist)": { voice: false, text: false, video: false }
  });
  const [userMedia, setUserMedia] = useState({ mic: false, camera: false });
  const [floatingStickers, setFloatingStickers] = useState([]);
  const [debateWarning, setDebateWarning] = useState(null);
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${user.stream}`);
    document.body.classList.add(`${themeMode}-mode`);
    localStorage.setItem('theme-mode', themeMode);
  }, [user.stream, themeMode]);

  // --- Webcam Access & Stream Setup ---
  useEffect(() => {
    if (userMedia.camera) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          streamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localVideoRef.current.play().catch(err => console.warn("Video play check failed:", err));
          }
        })
        .catch(err => {
          console.warn("Camera access denied/unavailable:", err);
          showToast("Camera Permission Check", "No camera detected or access denied. Rendering custom visual avatar.");
          setUserMedia(prev => ({ ...prev, camera: false }));
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
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [userMedia.camera]);

  // --- Dynamic Level Mapping ---
  const levelData = useMemo(() => {
    let lvl = 1;
    let rank = "Novice Scholar";
    if (coins >= 500) {
      lvl = 3;
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
  const addCoins = (amount, reason) => {
    setCoins(prev => prev + amount);
  };

  // --- Scavenger Hunt Mechanism ---
  useEffect(() => {
    // 35% chance to spawn a gem on page change
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
    addCoins(20, "Hidden Gem");
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
    setSkillsInput(skillsVal);
    setIsOnboarded(true);
    showToast("Ecosystem Initialized", `Welcome aboard, ${nameVal}!`);
  };

  // --- Quest Completion Handler ---
  const handleQuestToggle = (key) => {
    setQuests(prev => {
      const nextVal = !prev[key];
      if (nextVal) {
        addCoins(5, "Daily Quest Complete");
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
        addCoins(10, "Study Completed");
        showToast("🪙 STUDY COMPLETE (+10)", "Keep up the active learning process!");
        
        // Auto check off the daily study quest
        if (!quests.study) {
          handleQuestToggle("study");
        }
      }
      return nextSet;
    });
  };

  // --- Mentor AI Dialogue simulator ---
  const activeMentor = currentStreamDb.mentors[selectedMentorIndex] || currentStreamDb.mentors[0];

  useEffect(() => {
    // Populate introductory message on load if empty
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

    if (!quests.mentor) {
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

  // --- Debate Simulator Engine ---
  const activeDebateTopic = currentStreamDb.debateTopics[selectedDebateTopicIndex] || currentStreamDb.debateTopics[0];

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

    // Spawn bots
    const botParticipants = [
      { name: "Aarav (Tech Aspirant)", body: `In my view, this topic is critical. Looking at modern deployment stats, automation is taking over routine pipelines. Consequently, junior positions must evolve or disappear.` },
      { name: "Sophia (AI Ethics Expert)", body: `However, Aarav, we shouldn't neglect the necessity of human verification. Pure algorithmic setups fail to grasp product nuances. Therefore, humans remain highly vital.` }
    ];

    botParticipants.forEach((bot, idx) => {
      setTimeout(() => {
        setDebateHistory(prev => {
          const list = prev[topicText] || [];
          return {
            ...prev,
            [topicText]: [...list, { sender: bot.name, body: bot.body }]
          };
        });
      }, 700 * (idx + 1));
    });
  };

  // Run on mount or stream change to reset debate topic
  useEffect(() => {
    if (isOnboarded) {
      handleSelectTopic(0);
    }
  }, [user.stream, isOnboarded]);

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

    if (!quests.debate) {
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
      addCoins(15, "Debate Graded");
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

  // --- Debate Media & Safety Actions ---
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

    // AI bot triggers sticker reply
    setTimeout(() => {
      const bots = ["Aarav (Tech Aspirant)", "Sophia (AI Ethics Expert)", "Zoe (Study Strategist)"];
      const randBot = bots[Math.floor(Math.random() * bots.length)];
      
      // If bot's text is not blocked, it adds a chat entry
      if (!blockedStates[randBot]?.text) {
        setDebateHistory(prev => ({
          ...prev,
          [topicText]: [...(prev[topicText] || []), { sender: randBot, body: `Sent sticker: ${emoji}`, isSticker: true, stickerEmoji: emoji }]
        }));
      }
      
      // Float sticker if bot's video is not blocked
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
      
      // Toast notice
      const modeText = type === 'voice' ? 'Voice Audio' : (type === 'text' ? 'Text Chat' : 'Visual Video');
      const actionText = nextState[participant][type] ? 'BLOCKED & MUTED' : 'UNBLOCKED';
      showToast(`${participant} Moderation`, `${modeText} has been successfully ${actionText}.`);
      
      return nextState;
    });
  };

  // --- Career Predictor ---
  const activeCareerData = CAREER_DATABASE[user.stream] || CAREER_DATABASE.tech;
  const currentRoadmapSteps = activePredictorTrack === "primary" ? activeCareerData.primary.roadmap : activeCareerData.backup.roadmap;

  const handleCalculateCareer = () => {
    if (skillsInput.trim().length < 5) {
      showToast("Invalid Input", "Please enter at least 2 key skills to build predictions.");
      return;
    }
    setHasCalculatedCareer(true);
    showToast("Career Analysis Generated", "Primary & alternative roadmap paths initialized.");
  };

  const toggleMilestone = (id) => {
    setCompletedRoadmapMilestones(prev => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
        addCoins(15, "Milestone Unlocked");
        showToast("🪙 MILESTONE UNLOCKED (+15)", "Your roadmap progression is updating nicely.");
      }
      return nextSet;
    });
  };

  // --- Opportunity Finder ---
  const toggleOpportunity = (id) => {
    setClaimedOpportunities(prev => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
        addCoins(10, "Applied to opportunity tracker");
        showToast("🪙 APPLIED (+10)", "Opportunity registered and added to active tracker!");
      }
      return nextSet;
    });
  };

  const filteredOpportunities = useMemo(() => {
    if (opportunityFilter === "all") return currentStreamDb.opportunities;
    return currentStreamDb.opportunities.filter(op => op.type === opportunityFilter);
  }, [opportunityFilter, currentStreamDb]);

  // --- Shop/Redeem Handler ---
  const handleRedeemItem = (item) => {
    if (coins < item.price) {
      showToast("Insufficient Coins", `You need ${item.price - coins} more Credit Coins to redeem this item.`);
      return;
    }
    setCoins(prev => prev - item.price);
    showToast("🎉 REDEEMED SUCCESSFULLY!", `You unlocked: "${item.name}". Access credentials will sync to your mail.`);
  };

  // --- Init Mock Onboarding on Skip / Default Demo ---
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
    setSkillsInput("Python, Mathematics, Logical Reasoning");
    setIsOnboarded(true);
    showToast("Skipped Onboarding", "Loaded default profile presets.");
  };

  if (!isOnboarded) {
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

          <form onSubmit={handleOnboardSubmit} className="onboarding-form">
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
              <button type="button" className="btn-skip-outline" onClick={handleSkipOnboarding}>
                Skip (Demo Default)
              </button>
            </div>
          </form>
        </div>
      </div>
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
          {/* Back button in top corner */}
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
          
          {/* Full Screen Image */}
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

      {/* Shop Overlay Modal */}
      {isShopOpen && (
        <div id="shop-overlay" className="overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="glass-modal shop-modal" style={{ position: 'relative' }}>
            <div className="modal-header">
              <h2>Credit Coin Rewards Store</h2>
              <button id="close-shop-btn" className="close-btn" onClick={() => setIsShopOpen(false)}>&times;</button>
            </div>
            <p className="shop-desc">Exchange your earned Credit Coins for premium academic resources, AI credits, and exclusive mentor access. (Current Balance: 🪙 {coins})</p>
            
            <div className="shop-grid">
              {REWARDS_STORE_ITEMS.map(item => (
                <div className="shop-card" key={item.id}>
                  <div className="shop-icon">{item.icon}</div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="shop-footer">
                    <span className="price-tag">🪙 {item.price} Coins</span>
                    <button className="btn btn-action buy-item-btn" onClick={() => handleRedeemItem(item)}>Redeem</button>
                  </div>
                </div>
              ))}
            </div>
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
                   {/* Floating Ambient Shadow */}
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

                   {/* Floating Robot Assembly */}
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
                     {/* Torso / Body */}
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
                       {/* LED emblem core */}
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

                     {/* Head */}
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
                       {/* Face Screen */}
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
                         {/* Glowing Blue Eyes */}
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

                     {/* Left Arm / Ear detail */}
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
                     {/* Right Arm / Ear detail */}
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
                          if (!quests.study) handleQuestToggle("study");
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
        )}

        {/* --- VIEW: Timetable & Balancer --- */}
        {currentView === 'timetable-balancer' && (
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
        )}

        {/* --- VIEW: Debate & GD Arena --- */}
        {currentView === 'debate-arena' && (
          <section className="content-panel active">
            
            {/* Top: 4-Column Media & Participant Grid */}
            <div className="debate-participants-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              
              {/* Box 1: You (Student User) */}
              <div className="participant-card user-card" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', padding: '16px', display: 'flex', flexDirection: 'column', height: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>You (Student)</span>
                  <span className={`media-badge ${userMedia.mic ? 'active' : ''}`} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: userMedia.mic ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: userMedia.mic ? '#10b981' : '#ef4444' }}>
                    {userMedia.mic ? 'Mic Active' : 'Muted'}
                  </span>
                </div>
                
                {/* Webcam Video Box */}
                <div className="video-viewport" style={{ flex: 1, position: 'relative', borderRadius: '8px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {userMedia.camera ? (
                    <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '32px' }}>👤</div>
                  )}

                  {/* Floating Stickers Overlay for You */}
                  {floatingStickers.filter(s => s.sender === 'You').map(st => (
                    <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '36px', animation: 'floatUp 2s ease-in-out forwards' }}>
                      {st.emoji}
                    </div>
                  ))}
                </div>

                {/* Personal Media Controls */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
                  <button 
                    className={`btn btn-sm ${userMedia.mic ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setUserMedia(prev => ({ ...prev, mic: !prev.mic }))}
                    title={userMedia.mic ? 'Mute Microphone' : 'Unmute Microphone'}
                    style={{ padding: '6px 12px' }}
                  >
                    🎤 {userMedia.mic ? 'Mic On' : 'Mic Off'}
                  </button>
                  <button 
                    className={`btn btn-sm ${userMedia.camera ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setUserMedia(prev => ({ ...prev, camera: !prev.camera }))}
                    title={userMedia.camera ? 'Turn Off Camera' : 'Turn On Camera'}
                    style={{ padding: '6px 12px' }}
                  >
                    📷 {userMedia.camera ? 'Cam On' : 'Cam Off'}
                  </button>
                </div>
              </div>

              {/* Box 2: Aarav */}
              <div className="participant-card" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', padding: '16px', display: 'flex', flexDirection: 'column', height: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>Aarav (Tech)</span>
                  <span style={{ display: 'flex', gap: '4px' }}>
                    {blockedStates["Aarav (Tech Aspirant)"].voice && <span style={{ fontSize: '10px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🔇 Audio Muted</span>}
                    {blockedStates["Aarav (Tech Aspirant)"].video && <span style={{ fontSize: '10px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🚫 Cam Blocked</span>}
                  </span>
                </div>

                {/* Video feed or blocked screen */}
                <div className="video-viewport" style={{ flex: 1, position: 'relative', borderRadius: '8px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {blockedStates["Aarav (Tech Aspirant)"].video ? (
                    <div className="blocked-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(6px)', color: '#f87171', padding: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '20px' }}>🚫</span>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>VISUALS BLOCKED</span>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px' }}>👨‍💻</div>
                      <div className="voice-wave-bar" style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '8px' }}>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                      </div>
                    </div>
                  )}

                  {/* Floating Stickers Overlay */}
                  {floatingStickers.filter(s => s.sender === 'Aarav (Tech Aspirant)').map(st => (
                    <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '36px', animation: 'floatUp 2s ease-in-out forwards' }}>
                      {st.emoji}
                    </div>
                  ))}
                </div>

                {/* Moderation Controls */}
                <div style={{ display: 'flex', gap: '4px', marginTop: '12px', justifyContent: 'center' }}>
                  <button className={`btn btn-xs ${blockedStates["Aarav (Tech Aspirant)"].voice ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Aarav (Tech Aspirant)", "voice")} title="Mute/Unmute voice track">
                    {blockedStates["Aarav (Tech Aspirant)"].voice ? 'Unmute Voice' : 'Mute Voice'}
                  </button>
                  <button className={`btn btn-xs ${blockedStates["Aarav (Tech Aspirant)"].text ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Aarav (Tech Aspirant)", "text")} title="Mute/Unmute chat text">
                    {blockedStates["Aarav (Tech Aspirant)"].text ? 'Show Text' : 'Mute Text'}
                  </button>
                  <button className={`btn btn-xs ${blockedStates["Aarav (Tech Aspirant)"].video ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Aarav (Tech Aspirant)", "video")} title="Block/Unblock video stream">
                    {blockedStates["Aarav (Tech Aspirant)"].video ? 'Show Video' : 'Hide Video'}
                  </button>
                </div>
              </div>

              {/* Box 3: Sophia */}
              <div className="participant-card" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', padding: '16px', display: 'flex', flexDirection: 'column', height: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>Sophia (Ethics)</span>
                  <span style={{ display: 'flex', gap: '4px' }}>
                    {blockedStates["Sophia (AI Ethics Expert)"].voice && <span style={{ fontSize: '10px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🔇 Muted</span>}
                    {blockedStates["Sophia (AI Ethics Expert)"].video && <span style={{ fontSize: '10px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🚫 Blocked</span>}
                  </span>
                </div>

                {/* Video feed or blocked screen */}
                <div className="video-viewport" style={{ flex: 1, position: 'relative', borderRadius: '8px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {blockedStates["Sophia (AI Ethics Expert)"].video ? (
                    <div className="blocked-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(6px)', color: '#f87171', padding: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '20px' }}>🚫</span>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>VISUALS BLOCKED</span>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px' }}>👩‍⚖️</div>
                      <div className="voice-wave-bar" style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '8px' }}>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                      </div>
                    </div>
                  )}

                  {/* Floating Stickers Overlay */}
                  {floatingStickers.filter(s => s.sender === 'Sophia (AI Ethics Expert)').map(st => (
                    <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '36px', animation: 'floatUp 2s ease-in-out forwards' }}>
                      {st.emoji}
                    </div>
                  ))}
                </div>

                {/* Moderation Controls */}
                <div style={{ display: 'flex', gap: '4px', marginTop: '12px', justifyContent: 'center' }}>
                  <button className={`btn btn-xs ${blockedStates["Sophia (AI Ethics Expert)"].voice ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Sophia (AI Ethics Expert)", "voice")} title="Mute/Unmute voice track">
                    {blockedStates["Sophia (AI Ethics Expert)"].voice ? 'Unmute' : 'Mute'}
                  </button>
                  <button className={`btn btn-xs ${blockedStates["Sophia (AI Ethics Expert)"].text ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Sophia (AI Ethics Expert)", "text")} title="Mute/Unmute chat text">
                    {blockedStates["Sophia (AI Ethics Expert)"].text ? 'Show' : 'Mute'}
                  </button>
                  <button className={`btn btn-xs ${blockedStates["Sophia (AI Ethics Expert)"].video ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Sophia (AI Ethics Expert)", "video")} title="Block/Unblock video stream">
                    {blockedStates["Sophia (AI Ethics Expert)"].video ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>

              {/* Box 4: Zoe */}
              <div className="participant-card" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', padding: '16px', display: 'flex', flexDirection: 'column', height: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>Zoe (Strategy)</span>
                  <span style={{ display: 'flex', gap: '4px' }}>
                    {blockedStates["Zoe (Study Strategist)"].voice && <span style={{ fontSize: '10px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🔇 Muted</span>}
                    {blockedStates["Zoe (Study Strategist)"].video && <span style={{ fontSize: '10px', padding: '2px 4px', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>🚫 Blocked</span>}
                  </span>
                </div>

                {/* Video feed or blocked screen */}
                <div className="video-viewport" style={{ flex: 1, position: 'relative', borderRadius: '8px', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {blockedStates["Zoe (Study Strategist)"].video ? (
                    <div className="blocked-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.15)', backdropFilter: 'blur(6px)', color: '#f87171', padding: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '20px' }}>🚫</span>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>VISUALS BLOCKED</span>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px' }}>👩‍🎓</div>
                      <div className="voice-wave-bar" style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '8px' }}>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                        <div className="wave-bar"></div>
                      </div>
                    </div>
                  )}

                  {/* Floating Stickers Overlay */}
                  {floatingStickers.filter(s => s.sender === 'Zoe (Study Strategist)').map(st => (
                    <div key={st.id} className="floating-sticker-particle" style={{ position: 'absolute', fontSize: '36px', animation: 'floatUp 2s ease-in-out forwards' }}>
                      {st.emoji}
                    </div>
                  ))}
                </div>

                {/* Moderation Controls */}
                <div style={{ display: 'flex', gap: '4px', marginTop: '12px', justifyContent: 'center' }}>
                  <button className={`btn btn-xs ${blockedStates["Zoe (Study Strategist)"].voice ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Zoe (Study Strategist)", "voice")} title="Mute/Unmute voice track">
                    {blockedStates["Zoe (Study Strategist)"].voice ? 'Unmute' : 'Mute'}
                  </button>
                  <button className={`btn btn-xs ${blockedStates["Zoe (Study Strategist)"].text ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Zoe (Study Strategist)", "text")} title="Mute/Unmute chat text">
                    {blockedStates["Zoe (Study Strategist)"].text ? 'Show' : 'Mute'}
                  </button>
                  <button className={`btn btn-xs ${blockedStates["Zoe (Study Strategist)"].video ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleBlockState("Zoe (Study Strategist)", "video")} title="Block/Unblock video stream">
                    {blockedStates["Zoe (Study Strategist)"].video ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom: Main Discussion Chat Column & AI Score Evaluator Column */}
            <div className="debate-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
              
              <div className="debate-chat-column" style={{ display: 'flex', flexDirection: 'column', height: '620px' }}>
                <div className="grid-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
                  
                  {/* Topic Selector Panel */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                    <label htmlFor="debate-topic-selector" style={{ fontWeight: '600', whiteSpace: 'nowrap' }}>Debate Focus:</label>
                    <select 
                      id="debate-topic-selector" 
                      style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      value={selectedDebateTopicIndex}
                      onChange={(e) => handleSelectTopic(Number(e.target.value))}
                    >
                      {currentStreamDb.debateTopics.map((topic, idx) => (
                        <option key={idx} value={idx}>{topic}</option>
                      ))}
                    </select>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleSelectTopic(selectedDebateTopicIndex)}>
                      Reset
                    </button>
                    
                    {/* Test Safety Button */}
                    <button className="btn btn-secondary btn-sm" onClick={handleSimulateAbuse} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }}>
                      ⚠️ Safety Test
                    </button>
                  </div>

                  {/* Warning banner if abusive content detected */}
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
                      
                      // Check if text is blocked
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
                          
                          {/* Alert notification overlay for abusive text flag */}
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
                          onClick={() => handleSendSticker(emoji)}
                          style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'transform 0.1s' }}
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
                      placeholder="Write your viewpoint here (min 10 characters)..." 
                      style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                    <button type="submit" className="btn btn-primary">Send Point</button>
                  </form>
                </div>
              </div>

              <div className="debate-evaluator-column">
                <div className="grid-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3>AI Evaluation & Scores</h3>
                  <p className="subtitle">Scores update instantly when you submit debate arguments.</p>
                  
                  {debateFeedback ? (
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
          </section>
        )}

        {/* --- VIEW: AI Mentor Hub --- */}
        {currentView === 'mentor-hub' && (
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
        )}

        {/* --- VIEW: Career Predictor --- */}
        {currentView === 'career-predictor' && (
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
        )}

        {/* --- VIEW: Opportunity Hub --- */}
        {currentView === 'opportunity-hub' && (
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
        )}

      </main>
    </div>
  );
}
