// --- Dynamic Database: Stream-Specific Contents ---
export const STREAM_DATABASE = {
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
export const TIMETABLE_TEMPLATES = {
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
export const CAREER_DATABASE = {
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

export const REWARDS_STORE_ITEMS = [
  { id: "shop1", icon: "🏆", name: "1-on-1 AI Mock Interview", desc: "Get a rigorous 30-minute mock interview tailored to your career goal with detailed AI performance reviews.", price: 200 },
  { id: "shop2", icon: "🧠", name: "Premium Syllabus Cheat-Sheets", desc: "Highly condensed, exam-focused visual revisions and formula cards for your target exams.", price: 80 },
  { id: "shop3", icon: "💬", name: "20-Min Premium Mentor Chat", desc: "Live messaging session with an industry-specialist mentor for customized review.", price: 150 },
  { id: "shop4", icon: "⚡", name: "AI Resume Optimizer Credits", desc: "Unlock professional grading and ATS optimization scanning for 5 resume submissions.", price: 100 }
];
