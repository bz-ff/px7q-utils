const PLAN_DATA = {
  startDate: "2026-04-30",
  phases: [
    { id: 1, name: "Foundation", days: [1, 30] },
    { id: 2, name: "Depth & Application", days: [31, 60] },
    { id: 3, name: "Interview & Close", days: [61, 90] }
  ],
  milestones: [
    { day: 14, text: "Kleppmann core chapters complete, 4 system design problems practiced" },
    { day: 30, text: "Phase 1 complete — system design fluency, behavioral stories, resume ready" },
    { day: 31, text: "Apply to Google TPM roles" },
    { day: 45, text: "3+ mocks completed, system design interview-ready" },
    { day: 60, text: "Phase 2 complete — all materials ready, applications submitted" },
    { day: 75, text: "Active interview pipeline" },
    { day: 90, text: "90-day plan complete" }
  ]
};

const DAYS = [
  {
    day: 1, date: "2026-04-30", weekday: "Thursday",
    tasks: [
      { id: "d1t0", text: "Purchase/bookmark core prep resources: Kleppmann DDIA, ByteByteGo, Exponent TPM course, IGotAnOffer Google TPM guide", minutes: 30, category: "career" },
      { id: "d1t1", text: "Read IGotAnOffer Google TPM guide end-to-end — understand the full interview process", minutes: 90, category: "study" }
    ]
  },
  {
    day: 2, date: "2026-05-01", weekday: "Friday",
    tasks: [
      { id: "d2t0", text: "Start STAR Story Bank — write 5 stories using STAR format, each mapping to Google's four pillars: (1) large-scale multi-workstream program (2) compliance/GRC implementation (3) scope dispute resolution (4) AI automation pipeline you built (5) technical side project", minutes: 90, category: "behavioral" }
    ]
  },
  {
    day: 3, date: "2026-05-02", weekday: "Saturday",
    tasks: [
      { id: "d3t0", text: "Write STAR stories 6–10: influenced without authority, resolved cross-functional conflict, a failure and what you learned, reprioritized mid-sprint, drove decision with incomplete data", minutes: 120, category: "behavioral" },
      { id: "d3t1", text: "Kleppmann Ch 1: Reliable, Scalable, and Maintainable Applications", minutes: 120, category: "study" }
    ]
  },
  {
    day: 4, date: "2026-05-03", weekday: "Sunday",
    tasks: [
      { id: "d4t0", text: "Kleppmann Ch 2: Data Models and Query Languages", minutes: 120, category: "study" },
      { id: "d4t1", text: "Watch ByteByteGo 'System Design in a Hurry' overview video", minutes: 60, category: "system-design" },
      { id: "d4t2", text: "Research 5 open Google TPM roles on careers.google.com — note teams, skills, qualifications", minutes: 60, category: "career" }
    ]
  },
  {
    day: 5, date: "2026-05-04", weekday: "Monday",
    tasks: [
      { id: "d5t0", text: "Kleppmann Ch 3: Storage and Retrieval", minutes: 90, category: "study" },
      { id: "d5t1", text: "Practice: Explain SQL vs NoSQL databases and when to recommend each — write it out", minutes: 30, category: "system-design" }
    ]
  },
  {
    day: 6, date: "2026-05-05", weekday: "Tuesday",
    tasks: [
      { id: "d6t0", text: "Kleppmann Ch 5: Replication — leader-follower, multi-leader, leaderless, eventual consistency, CAP theorem", minutes: 90, category: "study" }
    ]
  },
  {
    day: 7, date: "2026-05-06", weekday: "Wednesday",
    tasks: [
      { id: "d7t0", text: "Kleppmann Ch 6: Partitioning", minutes: 90, category: "study" },
      { id: "d7t1", text: "System Design Problem 1: Design a URL shortener — whiteboard it in 35 min, then watch ByteByteGo solution", minutes: 60, category: "system-design" }
    ]
  },
  {
    day: 8, date: "2026-05-07", weekday: "Thursday",
    tasks: [
      { id: "d8t0", text: "Kleppmann Ch 7: Transactions — ACID, isolation levels, two-phase commit, distributed transactions", minutes: 90, category: "study" }
    ]
  },
  {
    day: 9, date: "2026-05-08", weekday: "Friday",
    tasks: [
      { id: "d9t0", text: "System Design Problem 2: Design a notification system — 45 min attempt, then review solution", minutes: 60, category: "system-design" },
      { id: "d9t1", text: "Research Google-specific terminology: OKRs, launch reviews, design docs, go/links, PRDs at Google", minutes: 45, category: "study" }
    ]
  },
  {
    day: 10, date: "2026-05-09", weekday: "Saturday",
    tasks: [
      { id: "d10t0", text: "Kleppmann Ch 8: The Trouble with Distributed Systems", minutes: 120, category: "study" },
      { id: "d10t1", text: "Kleppmann Ch 9: Consistency and Consensus — CRITICAL chapters for Google system design", minutes: 120, category: "study" }
    ]
  },
  {
    day: 11, date: "2026-05-10", weekday: "Sunday",
    tasks: [
      { id: "d11t0", text: "System Design Problem 3: Design a rate limiter — token bucket vs sliding window vs fixed window", minutes: 60, category: "system-design" },
      { id: "d11t1", text: "Update LinkedIn headline to 'Senior Program Manager | Technical Delivery & AI Transformation | PMP'", minutes: 15, category: "career" },
      { id: "d11t2", text: "Set up Google Careers job alerts for 'Technical Program Manager'", minutes: 15, category: "career" },
      { id: "d11t3", text: "Connect with 3 current/former Google TPMs on LinkedIn with personalized notes", minutes: 30, category: "networking" },
      { id: "d11t4", text: "Join Blind and browse Google TPM threads for recent interview experiences", minutes: 60, category: "career" }
    ]
  },
  {
    day: 12, date: "2026-05-11", weekday: "Monday",
    tasks: [
      { id: "d12t0", text: "Kleppmann Ch 10: Batch Processing", minutes: 90, category: "study" }
    ]
  },
  {
    day: 13, date: "2026-05-12", weekday: "Tuesday",
    tasks: [
      { id: "d13t0", text: "Kleppmann Ch 11: Stream Processing — message queues, Kafka, pub/sub, event-driven architecture", minutes: 90, category: "study" }
    ]
  },
  {
    day: 14, date: "2026-05-13", weekday: "Wednesday",
    isMilestone: true,
    milestoneText: "Kleppmann core chapters complete, 4 system design problems practiced",
    tasks: [
      { id: "d14t0", text: "System Design Problem 4: Design Google Drive — file sync, conflict resolution, chunking, metadata, permissions", minutes: 60, category: "system-design" }
    ]
  },
  {
    day: 15, date: "2026-05-14", weekday: "Thursday",
    tasks: [
      { id: "d15t0", text: "Deep dive GCP architecture basics: Compute Engine, GKE, Cloud Functions, BigQuery, Pub/Sub, Cloud Storage, Spanner", minutes: 90, category: "study" }
    ]
  },
  {
    day: 16, date: "2026-05-15", weekday: "Friday",
    tasks: [
      { id: "d16t0", text: "System Design Problem 5: Design a web crawler", minutes: 60, category: "system-design" },
      { id: "d16t1", text: "Study how Google's infrastructure works: Borg, Spanner, MapReduce, Colossus", minutes: 30, category: "study" }
    ]
  },
  {
    day: 17, date: "2026-05-16", weekday: "Saturday",
    tasks: [
      { id: "d17t0", text: "Program Management deep dive — OKR framework. Read 'Measure What Matters' Ch 1–4 or summary", minutes: 120, category: "study" },
      { id: "d17t1", text: "Practice: Write OKRs for a current program as if presenting to a Google skip-level", minutes: 30, category: "behavioral" },
      { id: "d17t2", text: "Practice answering: 'How do you track program health?' — build framework with leading/lagging indicators", minutes: 60, category: "behavioral" },
      { id: "d17t3", text: "Informational interview #1 with a Google TPM or former Google TPM", minutes: 60, category: "networking" }
    ]
  },
  {
    day: 18, date: "2026-05-17", weekday: "Sunday",
    tasks: [
      { id: "d18t0", text: "Program Management deep dive — dependency tracking: mapping, critical path analysis, risk registers, escalation protocols", minutes: 120, category: "study" },
      { id: "d18t1", text: "System Design Problem 6: Design a chat system (WhatsApp)", minutes: 60, category: "system-design" },
      { id: "d18t2", text: "Research which AI/ML teams at Google are hiring TPMs: Cloud AI, DeepMind, Gemini, Ads ML", minutes: 60, category: "career" }
    ]
  },
  {
    day: 19, date: "2026-05-18", weekday: "Monday",
    tasks: [
      { id: "d19t0", text: "Behavioral prep — Leadership pillar: practice 3 stories on influencing without authority, emergent leadership, driving alignment. Record yourself, keep under 3 min each", minutes: 90, category: "behavioral" }
    ]
  },
  {
    day: 20, date: "2026-05-19", weekday: "Tuesday",
    tasks: [
      { id: "d20t0", text: "Behavioral prep — Googleyness pillar: practice 3 stories on ambiguity comfort, bias to action, intellectual humility, inclusion. The 'failure' question is almost guaranteed", minutes: 90, category: "behavioral" }
    ]
  },
  {
    day: 21, date: "2026-05-20", weekday: "Wednesday",
    tasks: [
      { id: "d21t0", text: "System Design Problem 7: Design YouTube — upload pipeline, transcoding, CDN, recommendation architecture", minutes: 60, category: "system-design" },
      { id: "d21t1", text: "Study ML pipeline architecture: training vs inference, feature stores, model serving", minutes: 30, category: "study" }
    ]
  },
  {
    day: 22, date: "2026-05-21", weekday: "Thursday",
    tasks: [
      { id: "d22t0", text: "System Design Problem 8: Design a global deployment system — canary, blue-green, feature flags, rollback, monitoring", minutes: 60, category: "system-design" },
      { id: "d22t1", text: "Review GCP knowledge — can you reference Pub/Sub, Spanner, BigQuery naturally in a system design answer?", minutes: 30, category: "study" }
    ]
  },
  {
    day: 23, date: "2026-05-22", weekday: "Friday",
    tasks: [
      { id: "d23t0", text: "Mock Interview #1 — 45 min with practice partner: 1 system design + 1 behavioral round. Use Exponent or Prepfully", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 24, date: "2026-05-23", weekday: "Saturday",
    tasks: [
      { id: "d24t0", text: "Address gaps from Mock Interview #1 — study weak areas identified in debrief", minutes: 120, category: "study" },
      { id: "d24t1", text: "System Design Problem 9: Design a search autocomplete system — trie structures, ranking, caching, latency", minutes: 60, category: "system-design" },
      { id: "d24t2", text: "Informational interview #2 with Google TPM", minutes: 60, category: "networking" }
    ]
  },
  {
    day: 25, date: "2026-05-24", weekday: "Sunday",
    tasks: [
      { id: "d25t0", text: "Program Execution deep dive — practice: 'Walk through 0 to 1 program launch', 'Program is 3 weeks behind', 'Stakeholder keeps changing requirements', 'How do you decide what to cut'", minutes: 120, category: "behavioral" },
      { id: "d25t1", text: "System Design Problem 10: Design an API rate-limiting system — very common Google TPM question", minutes: 60, category: "system-design" }
    ]
  },
  {
    day: 26, date: "2026-05-25", weekday: "Monday",
    tasks: [
      { id: "d26t0", text: "Resume reframe for Google — lead with quantified impact, emphasize technical depth, remove consulting jargon. Google cares about 'shipped', 'scaled', 'impact'", minutes: 180, category: "career" }
    ]
  },
  {
    day: 27, date: "2026-05-26", weekday: "Tuesday",
    tasks: [
      { id: "d27t0", text: "Resume polish — get 2 people to review. Ideally someone who has worked at Google", minutes: 60, category: "career" },
      { id: "d27t1", text: "Build 'Why Google?' answer — specific to a team/product, not generic. Connect your background to Google Cloud's enterprise challenges", minutes: 30, category: "behavioral" },
      { id: "d27t2", text: "Study Google AI initiatives: Gemini, Cloud AI, DeepMind, Vertex AI, AI in Search, AI in Ads", minutes: 30, category: "study" }
    ]
  },
  {
    day: 28, date: "2026-05-27", weekday: "Wednesday",
    tasks: [
      { id: "d28t0", text: "Mock Interview #2 — full system design mock (45 min + debrief). Focus on articulating trade-offs clearly", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 29, date: "2026-05-28", weekday: "Thursday",
    tasks: [
      { id: "d29t0", text: "Mock Interview #3 — full behavioral/leadership mock (45 min + debrief). Are stories concise? Do you quantify results?", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 30, date: "2026-05-29", weekday: "Friday",
    isMilestone: true,
    milestoneText: "Phase 1 complete — system design fluency, behavioral stories, resume ready",
    tasks: [
      { id: "d30t0", text: "Phase 1 checkpoint: Rate yourself 1–5 on system design fluency, behavioral storytelling, GCP knowledge, program management frameworks", minutes: 30, category: "career" }
    ]
  },
  {
    day: 31, date: "2026-05-30", weekday: "Saturday",
    isMilestone: true,
    milestoneText: "Apply to Google TPM roles",
    tasks: [
      { id: "d31t0", text: "Submit applications to 3–5 Google TPM roles on careers.google.com. Prioritize: Cloud AI, Gemini, Ads ML, GCP Infrastructure", minutes: 120, category: "career" },
      { id: "d31t1", text: "Reach out to Google TPM contacts for internal referrals — this dramatically increases resume screen pass rate", minutes: 60, category: "networking" },
      { id: "d31t2", text: "Reach out to Google recruiters who have viewed your LinkedIn", minutes: 30, category: "networking" }
    ]
  },
  {
    day: 32, date: "2026-05-31", weekday: "Sunday",
    tasks: [
      { id: "d32t0", text: "Advanced System Design — ML Systems: design an ML pipeline (ingestion → features → training → evaluation → serving → monitoring)", minutes: 90, category: "system-design" }
    ]
  },
  {
    day: 33, date: "2026-06-01", weekday: "Monday",
    tasks: [
      { id: "d33t0", text: "Advanced System Design — Data Pipelines: design real-time analytics pipeline (Pub/Sub → Dataflow → BigQuery → dashboard)", minutes: 90, category: "system-design" }
    ]
  },
  {
    day: 34, date: "2026-06-02", weekday: "Tuesday",
    tasks: [
      { id: "d34t0", text: "System Design Problem 11: Design Gmail", minutes: 60, category: "system-design" },
      { id: "d34t1", text: "Practice explaining design decisions out loud as if to an interviewer", minutes: 30, category: "system-design" }
    ]
  },
  {
    day: 35, date: "2026-06-03", weekday: "Wednesday",
    tasks: [
      { id: "d35t0", text: "Coding brush-up — 3 easy-medium LeetCode problems in Python + 3 SQL queries (joins, aggregations, window functions)", minutes: 90, category: "coding" }
    ]
  },
  {
    day: 36, date: "2026-06-04", weekday: "Thursday",
    tasks: [
      { id: "d36t0", text: "Coding brush-up continued — 3 more LeetCode + 2 SQL problems. Focus: arrays, hashmaps, string manipulation, basic graph traversal", minutes: 90, category: "coding" }
    ]
  },
  {
    day: 37, date: "2026-06-05", weekday: "Friday",
    tasks: [
      { id: "d37t0", text: "Mock Interview #4 — 2 rounds minimum: system design + program execution. Use Exponent or Prepfully with ex-Google interviewers", minutes: 180, category: "mock-interview" },
      { id: "d37t1", text: "Informational interview #3 — ask about team matching process and which orgs are actively hiring", minutes: 60, category: "networking" }
    ]
  },
  {
    day: 38, date: "2026-06-06", weekday: "Saturday",
    tasks: [
      { id: "d38t0", text: "Deep GCP study — Spanner, Bigtable, BigQuery, Pub/Sub, Cloud Functions, GKE. For each: what it does, when to choose it, trade-offs", minutes: 120, category: "study" },
      { id: "d38t1", text: "Follow up on Google applications — check status, ping recruiters", minutes: 30, category: "career" },
      { id: "d38t2", text: "Apply to 2–3 backup FAANG TPM roles (Meta, Amazon, Microsoft) as comp leverage", minutes: 90, category: "career" }
    ]
  },
  {
    day: 39, date: "2026-06-07", weekday: "Sunday",
    tasks: [
      { id: "d39t0", text: "Product Sense prep — practice: 'Prioritize 5 features, ship only 2'. Framework: impact vs effort, OKR alignment, user impact, tech debt", minutes: 90, category: "behavioral" }
    ]
  },
  {
    day: 40, date: "2026-06-08", weekday: "Monday",
    tasks: [
      { id: "d40t0", text: "System Design Problem 12: Design a distributed cache — LRU eviction, consistent hashing, invalidation, Redis vs Memcached", minutes: 60, category: "system-design" },
      { id: "d40t1", text: "Practice: Design a monitoring and alerting system for a production ML model", minutes: 30, category: "system-design" }
    ]
  },
  {
    day: 41, date: "2026-06-09", weekday: "Tuesday",
    tasks: [
      { id: "d41t0", text: "'Why Google?' answer finalization — make it specific to a team/product. Connect your enterprise delivery background to Google Cloud's challenges", minutes: 60, category: "behavioral" },
      { id: "d41t1", text: "Practice delivering 'Why Google?' naturally in under 90 seconds", minutes: 30, category: "behavioral" }
    ]
  },
  {
    day: 42, date: "2026-06-10", weekday: "Wednesday",
    tasks: [
      { id: "d42t0", text: "Mock Interview #5 — Behavioral/Googleyness focus. Have partner probe: 'Tell me about a time you disagreed with your manager'", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 43, date: "2026-06-11", weekday: "Thursday",
    tasks: [
      { id: "d43t0", text: "System Design Problem 13: Design Google Maps — graph algorithms, Dijkstra's, tile rendering, real-time traffic", minutes: 60, category: "system-design" },
      { id: "d43t1", text: "Review all 13 system design problems — can you whiteboard each in under 30 minutes?", minutes: 30, category: "system-design" }
    ]
  },
  {
    day: 44, date: "2026-06-12", weekday: "Friday",
    tasks: [
      { id: "d44t0", text: "Full Mock Loop — simulate 3 back-to-back interviews: system design + program execution + leadership", minutes: 180, category: "mock-interview" },
      { id: "d44t1", text: "Debrief and identify final gaps", minutes: 60, category: "mock-interview" }
    ]
  },
  {
    day: 45, date: "2026-06-13", weekday: "Saturday",
    isMilestone: true,
    milestoneText: "3+ mocks completed, system design interview-ready",
    tasks: [
      { id: "d45t0", text: "Address gaps from full mock loop", minutes: 120, category: "study" },
      { id: "d45t1", text: "Study Google's launch process — how launches are reviewed, what launch checklists look like, TPM coordination", minutes: 60, category: "study" }
    ]
  },
  {
    day: 46, date: "2026-06-14", weekday: "Sunday",
    tasks: [
      { id: "d46t0", text: "Coding practice — 3 more medium LeetCode + 2 SQL problems", minutes: 90, category: "coding" }
    ]
  },
  {
    day: 47, date: "2026-06-15", weekday: "Monday",
    tasks: [
      { id: "d47t0", text: "System Design Problem 14: Design a payment processing system — idempotency, exactly-once processing, reconciliation", minutes: 60, category: "system-design" },
      { id: "d47t1", text: "Study PCI compliance considerations for system design context", minutes: 30, category: "study" }
    ]
  },
  {
    day: 48, date: "2026-06-16", weekday: "Tuesday",
    tasks: [
      { id: "d48t0", text: "Behavioral refinement — record yourself answering top 5 stories and review. Under 3 min each? Quantified results? Natural delivery?", minutes: 90, category: "behavioral" }
    ]
  },
  {
    day: 49, date: "2026-06-17", weekday: "Wednesday",
    tasks: [
      { id: "d49t0", text: "System Design Problem 15: Design a task/job scheduler — priority queues, cron vs event-driven, retry logic, dead letter queues", minutes: 60, category: "system-design" },
      { id: "d49t1", text: "Follow up on all applications and referral requests", minutes: 30, category: "career" }
    ]
  },
  {
    day: 50, date: "2026-06-18", weekday: "Thursday",
    tasks: [
      { id: "d50t0", text: "Mock Interview #6 — System design focusing on ML infrastructure: 'Design a system serving ML predictions at 10K QPS with <50ms latency'", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 51, date: "2026-06-19", weekday: "Friday",
    tasks: [
      { id: "d51t0", text: "Light review — go through notes, vocabulary, frameworks", minutes: 120, category: "study" },
      { id: "d51t1", text: "Write cheat sheet: system design framework, program execution framework, STAR format, Googleyness themes", minutes: 60, category: "study" }
    ]
  },
  {
    day: 52, date: "2026-06-20", weekday: "Saturday",
    tasks: [
      { id: "d52t0", text: "Full Mock Loop #2 — 4 rounds simulating real onsite. If possible, use ex-Google interviewer on Exponent/Prepfully", minutes: 240, category: "mock-interview" }
    ]
  },
  {
    day: 53, date: "2026-06-21", weekday: "Sunday",
    tasks: [
      { id: "d53t0", text: "Debrief Mock Loop #2 and targeted fixes", minutes: 90, category: "study" }
    ]
  },
  {
    day: 54, date: "2026-06-22", weekday: "Monday",
    tasks: [
      { id: "d54t0", text: "Salary negotiation prep — research Google TPM comp bands. L4: base $155K–$180K, GSU $80K–$120K/yr, bonus 15%. L5: base $185K–$220K, GSU $120K–$200K/yr", minutes: 60, category: "career" },
      { id: "d54t1", text: "Read Rora and Levels.fyi negotiation guides specific to Google. Key: negotiate total comp, GSU vesting is front-loaded 33/33/22/12", minutes: 30, category: "career" }
    ]
  },
  {
    day: 55, date: "2026-06-23", weekday: "Tuesday",
    tasks: [
      { id: "d55t0", text: "System Design Problem 16: Design a content moderation system — relevant for Google Trust & Safety", minutes: 60, category: "system-design" },
      { id: "d55t1", text: "Research Google Trust & Safety org as potential team match", minutes: 30, category: "career" }
    ]
  },
  {
    day: 56, date: "2026-06-24", weekday: "Wednesday",
    tasks: [
      { id: "d56t0", text: "Prep for recruiter screen — nail 'Tell me about yourself' in 2 min, 'Why Google?' in 90 sec, 'Why TPM?' connecting consulting PM to technical program management", minutes: 90, category: "behavioral" }
    ]
  },
  {
    day: 57, date: "2026-06-25", weekday: "Thursday",
    tasks: [
      { id: "d57t0", text: "Practice cold: pick 2 random system design problems, solve each in 35 min with no notes", minutes: 90, category: "system-design" }
    ]
  },
  {
    day: 58, date: "2026-06-26", weekday: "Friday",
    tasks: [
      { id: "d58t0", text: "Mock Interview #7 — bar raiser simulation: motivations, learning mindset, career vision, first 90 days at Google", minutes: 90, category: "mock-interview" },
      { id: "d58t1", text: "Informational interview #4", minutes: 60, category: "networking" },
      { id: "d58t2", text: "Follow up on all applications", minutes: 30, category: "career" }
    ]
  },
  {
    day: 59, date: "2026-06-27", weekday: "Saturday",
    tasks: [
      { id: "d59t0", text: "Final behavioral polish — run through all 10 STAR stories rapid-fire, 2 min each", minutes: 60, category: "behavioral" },
      { id: "d59t1", text: "Review and update cheat sheet", minutes: 30, category: "study" },
      { id: "d59t2", text: "Review Google's recent AI announcements — Gemini updates, I/O, Cloud Next. Speak about products with genuine knowledge", minutes: 90, category: "study" }
    ]
  },
  {
    day: 60, date: "2026-06-28", weekday: "Sunday",
    isMilestone: true,
    milestoneText: "Phase 2 complete — all materials ready, applications submitted",
    tasks: [
      { id: "d60t0", text: "Phase 2 checkpoint: All materials ready? Resume, stories, system design, coding, GCP, Why Google, negotiation strategy", minutes: 60, category: "career" },
      { id: "d60t1", text: "Identify top 5 most promising roles/teams for follow-up", minutes: 30, category: "career" }
    ]
  },
  {
    day: 61, date: "2026-06-29", weekday: "Monday",
    tasks: [
      { id: "d61t0", text: "If interviews scheduled: deep prep on the specific team/product. If waiting: apply to 2 more backup FAANG roles", minutes: 90, category: "career" },
      { id: "d61t1", text: "Practice 1 system design problem cold to maintain sharpness", minutes: 45, category: "system-design" }
    ]
  },
  {
    day: 62, date: "2026-06-30", weekday: "Tuesday",
    tasks: [
      { id: "d62t0", text: "Run through top 3 STAR stories — keep them sharp", minutes: 30, category: "behavioral" },
      { id: "d62t1", text: "1 LeetCode medium + 1 SQL problem", minutes: 45, category: "coding" },
      { id: "d62t2", text: "Follow up with Google recruiter", minutes: 15, category: "career" }
    ]
  },
  {
    day: 63, date: "2026-07-01", weekday: "Wednesday",
    tasks: [
      { id: "d63t0", text: "Practice system design problem: Design a distributed logging system", minutes: 60, category: "system-design" },
      { id: "d63t1", text: "Review GCP services quick reference", minutes: 30, category: "study" }
    ]
  },
  {
    day: 64, date: "2026-07-02", weekday: "Thursday",
    tasks: [
      { id: "d64t0", text: "Mock interview maintenance — 1 behavioral round with a partner", minutes: 60, category: "mock-interview" },
      { id: "d64t1", text: "Network: check in with Google TPM contacts for any team matching intel", minutes: 30, category: "networking" }
    ]
  },
  {
    day: 65, date: "2026-07-03", weekday: "Friday",
    tasks: [
      { id: "d65t0", text: "Practice: 'How would you handle a situation where data science says model isn't ready but business wants to launch?'", minutes: 45, category: "behavioral" },
      { id: "d65t1", text: "1 LeetCode medium problem", minutes: 30, category: "coding" }
    ]
  },
  {
    day: 66, date: "2026-07-04", weekday: "Saturday",
    tasks: [
      { id: "d66t0", text: "Light day (Independence Day) — review cheat sheet and rest", minutes: 30, category: "study" }
    ]
  },
  {
    day: 67, date: "2026-07-05", weekday: "Sunday",
    tasks: [
      { id: "d67t0", text: "Full mock interview — 2 rounds: 1 system design + 1 leadership", minutes: 120, category: "mock-interview" },
      { id: "d67t1", text: "Debrief and note improvements", minutes: 30, category: "mock-interview" }
    ]
  },
  {
    day: 68, date: "2026-07-06", weekday: "Monday",
    tasks: [
      { id: "d68t0", text: "Practice system design: Design a recommendation engine", minutes: 60, category: "system-design" },
      { id: "d68t1", text: "Follow up on all active interview pipelines", minutes: 30, category: "career" }
    ]
  },
  {
    day: 69, date: "2026-07-07", weekday: "Tuesday",
    tasks: [
      { id: "d69t0", text: "Practice: 'What questions would you ask in your first 30 days as a Google TPM?'", minutes: 45, category: "behavioral" },
      { id: "d69t1", text: "1 SQL problem + 1 LeetCode problem", minutes: 45, category: "coding" }
    ]
  },
  {
    day: 70, date: "2026-07-08", weekday: "Wednesday",
    tasks: [
      { id: "d70t0", text: "If phone screen scheduled: intensive prep day. If not: practice 1 system design problem cold", minutes: 90, category: "system-design" }
    ]
  },
  {
    day: 71, date: "2026-07-09", weekday: "Thursday",
    tasks: [
      { id: "d71t0", text: "Run through all STAR stories rapid-fire — identify any that need refreshing", minutes: 45, category: "behavioral" },
      { id: "d71t1", text: "Research any new Google AI product launches for interview talking points", minutes: 30, category: "study" }
    ]
  },
  {
    day: 72, date: "2026-07-10", weekday: "Friday",
    tasks: [
      { id: "d72t0", text: "Mock interview maintenance — 1 system design + 1 program execution round", minutes: 120, category: "mock-interview" }
    ]
  },
  {
    day: 73, date: "2026-07-11", weekday: "Saturday",
    tasks: [
      { id: "d73t0", text: "Practice: Design a real-time collaborative editing system (Google Docs)", minutes: 60, category: "system-design" },
      { id: "d73t1", text: "Study: Operational Transformation vs CRDT approaches", minutes: 60, category: "study" },
      { id: "d73t2", text: "Check status of all applications and interview pipelines", minutes: 30, category: "career" }
    ]
  },
  {
    day: 74, date: "2026-07-12", weekday: "Sunday",
    tasks: [
      { id: "d74t0", text: "Light study — review system design cheat sheet and GCP quick reference", minutes: 60, category: "study" },
      { id: "d74t1", text: "Practice: 'How do you measure ROI on a technical infrastructure investment?'", minutes: 30, category: "behavioral" }
    ]
  },
  {
    day: 75, date: "2026-07-13", weekday: "Monday",
    isMilestone: true,
    milestoneText: "Active interview pipeline",
    tasks: [
      { id: "d75t0", text: "Pipeline review: status of every application and next steps. Which are most promising?", minutes: 60, category: "career" },
      { id: "d75t1", text: "1 system design problem to stay sharp", minutes: 45, category: "system-design" }
    ]
  },
  {
    day: 76, date: "2026-07-14", weekday: "Tuesday",
    tasks: [
      { id: "d76t0", text: "If onsite scheduled: 3-day intensive prep begins. If not: 1 mock round + 1 LeetCode", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 77, date: "2026-07-15", weekday: "Wednesday",
    tasks: [
      { id: "d77t0", text: "Practice: Can you explain transformers, attention mechanisms, and tokenization at a PM level?", minutes: 60, category: "study" },
      { id: "d77t1", text: "Practice: 'How would you scope an AI program with uncertain feasibility?'", minutes: 30, category: "behavioral" }
    ]
  },
  {
    day: 78, date: "2026-07-16", weekday: "Thursday",
    tasks: [
      { id: "d78t0", text: "Run through top 5 STAR stories one more time", minutes: 30, category: "behavioral" },
      { id: "d78t1", text: "Practice 'Why Google?' delivery — should feel natural, not rehearsed", minutes: 15, category: "behavioral" },
      { id: "d78t2", text: "1 system design problem cold", minutes: 45, category: "system-design" }
    ]
  },
  {
    day: 79, date: "2026-07-17", weekday: "Friday",
    tasks: [
      { id: "d79t0", text: "Mock interview — full bar raiser simulation with focus on 'Tell me about yourself' and career trajectory narrative", minutes: 90, category: "mock-interview" }
    ]
  },
  {
    day: 80, date: "2026-07-18", weekday: "Saturday",
    tasks: [
      { id: "d80t0", text: "Refine elevator pitch — 90 seconds on why you're the right Google TPM", minutes: 60, category: "behavioral" },
      { id: "d80t1", text: "AI vendor landscape review: foundation models, ML platforms, MLOps tools, vector DBs — speak fluently about the ecosystem", minutes: 120, category: "study" }
    ]
  },
  {
    day: 81, date: "2026-07-19", weekday: "Sunday",
    tasks: [
      { id: "d81t0", text: "Light review — cheat sheet, GCP services, key system design patterns", minutes: 60, category: "study" },
      { id: "d81t1", text: "Follow up on all active processes", minutes: 30, category: "career" }
    ]
  },
  {
    day: 82, date: "2026-07-20", weekday: "Monday",
    tasks: [
      { id: "d82t0", text: "If onsite prep: review the specific team/product you're interviewing for. Study their recent launches and technical challenges", minutes: 90, category: "career" }
    ]
  },
  {
    day: 83, date: "2026-07-21", weekday: "Tuesday",
    tasks: [
      { id: "d83t0", text: "Salary negotiation rehearsal — practice the conversation: 'I'm excited about this opportunity. Based on my research, L5 comp bands are...'", minutes: 60, category: "career" },
      { id: "d83t1", text: "Research market rates on Levels.fyi and Blind for your target level", minutes: 30, category: "career" }
    ]
  },
  {
    day: 84, date: "2026-07-22", weekday: "Wednesday",
    tasks: [
      { id: "d84t0", text: "1 system design problem cold — maintain sharpness", minutes: 45, category: "system-design" },
      { id: "d84t1", text: "Practice: 'How do you handle a stakeholder who keeps changing requirements mid-sprint?'", minutes: 30, category: "behavioral" }
    ]
  },
  {
    day: 85, date: "2026-07-23", weekday: "Thursday",
    tasks: [
      { id: "d85t0", text: "Send thank-you notes to everyone who helped — informational interviewees, referral providers, mentors", minutes: 45, category: "networking" }
    ]
  },
  {
    day: 86, date: "2026-07-24", weekday: "Friday",
    tasks: [
      { id: "d86t0", text: "Full pipeline review — status of every application, next steps, which to double down on", minutes: 60, category: "career" },
      { id: "d86t1", text: "Plan next 30 days: continuing search, preparing for offers, or adjusting strategy", minutes: 60, category: "career" }
    ]
  },
  {
    day: 87, date: "2026-07-25", weekday: "Saturday",
    tasks: [
      { id: "d87t0", text: "Self-assessment: confidence level on each Google interview dimension (1–5). System design, behavioral, program execution, Googleyness, coding", minutes: 30, category: "career" },
      { id: "d87t1", text: "Practice any dimension still below 4", minutes: 90, category: "study" }
    ]
  },
  {
    day: 88, date: "2026-07-26", weekday: "Sunday",
    tasks: [
      { id: "d88t0", text: "Light review and rest — trust your preparation", minutes: 30, category: "study" },
      { id: "d88t1", text: "Update your career transition plan with Google TPM progress", minutes: 30, category: "career" }
    ]
  },
  {
    day: 89, date: "2026-07-27", weekday: "Monday",
    tasks: [
      { id: "d89t0", text: "Buffer day — interviews, follow-ups, remaining applications", minutes: 60, category: "career" }
    ]
  },
  {
    day: 90, date: "2026-07-28", weekday: "Tuesday",
    isMilestone: true,
    milestoneText: "90-day plan complete",
    tasks: [
      { id: "d90t0", text: "Final reflection: What worked? What would you do differently? Remaining gaps? Confidence vs Day 1?", minutes: 60, category: "career" },
      { id: "d90t1", text: "Celebrate completing the plan — regardless of where interviews stand, you've built a foundation most candidates never do", minutes: 0, category: "career" }
    ]
  }
];

const SCORECARD = [
  { id: "kleppmann", label: "Kleppmann chapters read", target: 11 },
  { id: "sysdesign", label: "System design problems practiced", target: 16 },
  { id: "star", label: "STAR stories written & polished", target: 10 },
  { id: "mocks", label: "Mock interviews completed", target: 7 },
  { id: "google_apps", label: "Google applications submitted", target: 5 },
  { id: "referrals", label: "Internal referrals secured", target: 2 },
  { id: "info_interviews", label: "Informational interviews (Google TPMs)", target: 4 },
  { id: "backup_apps", label: "Backup FAANG applications", target: 5 },
  { id: "leetcode", label: "LeetCode problems practiced", target: 15 },
  { id: "sql", label: "SQL problems practiced", target: 10 },
  { id: "resume", label: "Resume reframed for Google", target: 1 },
  { id: "why_google", label: "'Why Google?' answer polished", target: 1 },
  { id: "negotiation", label: "Salary negotiation strategy ready", target: 1 }
];
