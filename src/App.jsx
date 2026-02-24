import React, { useState, useEffect } from 'react';
import {
  Mail, MapPin, Github, Linkedin, ArrowRight, Server,
  Database, Code2, ExternalLink, Menu, X, Shield, Terminal, Globe,
  Download, Cloud, Cpu, Lock, Layers, RefreshCw, Briefcase, Award, BookOpen
} from 'lucide-react';

const TechMemoryGame = () => {
  const initialStack = [
    { id: 'Java', icon: Code2, color: 'text-orange-500' },
    { id: 'Spring Boot', icon: Server, color: 'text-green-500' },
    { id: 'Docker', icon: Layers, color: 'text-blue-500' },
    { id: 'PostgreSQL', icon: Database, color: 'text-indigo-400' },
    { id: 'Cryptography', icon: Lock, color: 'text-yellow-500' },
    { id: 'Microservices', icon: Cloud, color: 'text-cyan-400' },
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const shuffledCards = [...initialStack, ...initialStack]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, uniqueId: index }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.id === secondCard.id) {
        setSolved((s) => [...s, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="bg-slate-900/50 p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto flex flex-col items-center w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8">
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-3"><Cpu className="text-blue-500" /> System Memory Match</h3>
          <p className="text-slate-400 text-sm mt-1 mb-4 sm:mb-0">Match the backend tech stack pairs to prove your memory skills.</p>
        </div>
        <div className="flex flex-col items-center flex-wrap sm:items-end mt-4 sm:mt-0">
          <span className="text-blue-400 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-full whitespace-nowrap">Moves: {moves}</span>
          <button
            onClick={initializeGame}
            className="mt-3 flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw size={14} /> Restart
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);
          const Icon = card.icon;
          return (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              className={`w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-xl cursor-pointer transition-all duration-500 transform flex items-center justify-center border ${isFlipped ? 'bg-slate-800 border-blue-500/50 scale-105 shadow-lg shadow-blue-500/20' : 'bg-slate-800/40 border-white/5 hover:border-blue-500/30 hover:scale-105 hover:bg-slate-800/70'}`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center animate-pulse duration-300">
                  <Icon size={28} className={card.color} />
                  <span className="text-[10px] sm:text-xs mt-2 font-medium text-slate-300 text-center leading-tight px-1">{card.id}</span>
                </div>
              ) : (
                <Terminal size={24} className="text-slate-600" />
              )}
            </div>
          );
        })}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <div className="mt-8 text-center animate-bounce">
          <p className="text-green-400 font-bold text-xl flex items-center justify-center gap-2">
            <Shield size={24} /> System Fully Optimized in {moves} moves!
          </p>
        </div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const profile = {
    name: "Shreyansh Shekhar Dwivedi",
    role: "Backend Developer | Java & Spring Boot",
    location: "Noida, Uttar Pradesh, India",
    email: "shreyanshsd512gb@gmail.com",
    about: "B.Tech Computer Science (Data Science) student with strong expertise in backend engineering, AI-powered systems, and secure distributed architectures. Contributor to TensorFlow & Eclipse Foundation.",
    education: {
      degree: "B.Tech — Computer Science Engineering (Data Science)",
      college: "JSS Academy of Technical Education",
      year: "Expected Graduation: 2028"
    },
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    resumeLink: "/Shreyansh_S_Dwivedi_Resume_1.pdf"
  };

  const skills = [
    { category: "Programming Languages", items: ["Java (Advanced)", "Rust (Proficient)", "Bash/Shell Scripting"] },
    { category: "Backend & AI", items: ["Spring Boot", "Spring AI", "RESTful APIs", "RAG Architecture", "WebSockets", "OOP", "DSA"] },
    { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "Linux", "Maven", "Git", "CI/CD Pipelines"] },
    { category: "Databases & Security", items: ["PostgreSQL", "MongoDB", "AES-256 GCM", "SHA-256", "QKD", "Penetration Testing"] }
  ];

  const experience = [
    {
      company: "TensorFlow (Google Open Source)",
      role: "Open Source Contributor",
      period: "Recent",
      desc: "Resolved CI/CD 'run format check' pipeline failures, improving build reliability. Automated code-style enforcement by integrating Maven Spotless plugin."
    },
    {
      company: "Eclipse Foundation",
      role: "Open Source Contributor",
      period: "Recent",
      desc: "Improved project infrastructure and developer tooling. Refactored test suites to improve maintainability, code coverage, and stability."
    }
  ];

  const projects = [
    {
      title: "Multi-Modal RAG & AI Chat Service",
      period: "Jan 2026",
      desc: "Built a Retrieval-Augmented Generation (RAG) pipeline enabling context-aware querying using embedding-based similarity search. Engineered custom Spring @Configuration for multi-provider AI beans (Gemini & OpenAI).",
      tags: ["Java 21", "Spring Boot", "Spring AI", "REST", "RAG", "OpenAI", "Gemini"]
    },
    {
      title: "Hybrid Quantum Key Distribution Simulator",
      period: "Nov 2025",
      desc: "Designed a RESTful API simulating the BB84 protocol for secure quantum key exchange. Derived ephemeral AES-256 GCM session keys from the quantum key exchange process.",
      tags: ["Java 21", "Spring Boot", "REST", "AES-256 GCM", "SHA-256", "BB84"]
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-blue-500/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] sm:w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[60%] sm:w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <a href="#" className="flex flex-col transition">
            <span className="text-lg sm:text-xl font-bold tracking-tighter hover:text-blue-400">SHREYANSH<span className="text-blue-500">.</span></span>
          </a>

          <div className="hidden md:flex gap-6 flex-wrap text-sm font-medium text-slate-400">
            {['Experience', 'Projects', 'Skills', 'Play'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-all hover:scale-105">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a href={profile.resumeLink} download className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-all text-sm border border-blue-500/30 hover:border-blue-500">
              <Download size={16} /> Download Resume
            </a>
          </div>

          <button className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900 border-b border-white/10 flex flex-col ${isMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
          <div className="px-6 py-6 flex flex-col gap-4 text-center">
            {['Experience', 'Projects', 'Skills', 'Play'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-blue-400">{item}</a>
            ))}
            <a href={profile.resumeLink} download onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-blue-600/20 text-blue-400 py-3 rounded-lg font-bold border border-blue-500/30 mx-auto w-full max-w-xs mt-2">
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 flex flex-col gap-24 sm:gap-32 pb-24">

        {/* HERO SECTION */}
        <section id="home" className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-center lg:items-center min-h-[60vh]">
          {/* Hero Text */}
          <div className="flex flex-col flex-1 space-y-6 sm:space-y-10 text-center lg:text-left order-2 lg:order-1 items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Backend Developer | Java & Spring Boot
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] flex flex-col gap-2">
              <span>Hi, I'm Shreyansh.</span>
              <span>Architecting <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Secure</span> Systems</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              {profile.about}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group font-bold">
                View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center justify-center gap-3">
                <a href={profile.social.github} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1"><Github size={22} /></a>
                <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1"><Linkedin size={22} /></a>
                <a href={profile.resumeLink} download className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1 text-blue-400" title="Download Resume"><Download size={22} /></a>
              </div>
            </div>
          </div>

          {/* Hero Code Box */}
          <div className="flex-1 w-full max-w-lg relative group order-1 lg:order-2 flex justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-10 font-mono text-[12px] sm:text-sm leading-relaxed backdrop-blur-sm flex flex-col">
              <div className="flex gap-1.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
              </div>
              <p className="text-slate-500">// System Profile</p>
              <p><span className="text-blue-400">struct</span> <span className="text-yellow-400">Developer</span> {'{'}</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">name</span>: <span className="text-green-400">"{profile.name}"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">location</span>: <span className="text-green-400">"{profile.location}"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">status</span>: <span className="text-green-400">"Deploying Backend Magic"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">education</span>: <span className="text-green-400">"JSS Academy, Expected 2028"</span>,</p>
              <p>{'}'}</p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="flex flex-col gap-10 sm:gap-14">
          <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3"><Terminal className="text-blue-500" /> Open Source Experience</h2>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full flex-wrap">
            {experience.map((exp, i) => (
              <div key={i} className="flex-1 min-w-[300px] flex flex-col p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-600/5 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-slate-400" /> {exp.company}</h3>
                  <span className="text-[10px] sm:text-xs font-mono text-blue-500 uppercase tracking-[0.2em]">{exp.period}</span>
                </div>
                <p className="text-blue-400 font-medium text-sm sm:text-base mt-1">{exp.role}</p>
                <p className="text-sm sm:text-base text-slate-400 mt-5 leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="flex flex-col gap-10 sm:gap-14">
          <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3"><Code2 className="text-blue-500" /> Featured Projects</h2>
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 flex-wrap">
            {projects.map((proj, i) => (
              <div key={i} className="flex-1 min-w-[300px] flex flex-col p-6 sm:p-8 bg-slate-900/40 border border-white/10 rounded-2xl backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-white leading-tight">{proj.title}</h3>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-500 whitespace-nowrap bg-white/5 px-2 py-1 rounded">{proj.period}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-400 mb-6 leading-relaxed flex-grow">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-medium px-2 py-1 bg-blue-500/10 text-blue-300 rounded border border-blue-500/20">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="flex flex-col gap-10 sm:gap-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3"><Shield className="text-blue-500" /> Technical Arsenal</h2>
            <p className="text-slate-500 font-mono text-sm tracking-tighter">/* Built for Scalability & Security */</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            {skills.map((group, i) => (
              <div key={i} className="flex-1 min-w-[280px] p-6 sm:p-8 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col backdrop-blur-sm hover:border-blue-500/20 transition-colors">
                <h3 className="text-blue-400 font-bold mb-6 text-sm uppercase tracking-widest border-b border-white/5 pb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill, j) => (
                    <span key={j} className="text-xs font-medium px-3 py-1.5 bg-white/5 text-slate-300 rounded-lg border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-colors">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MINIGAME SECTION */}
        <section id="play" className="flex flex-col gap-10">
          <TechMemoryGame />
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8 text-slate-500 text-xs sm:text-sm font-mono tracking-widest">
        <p className="text-center sm:text-left">© {new Date().getFullYear()} Shreyansh Shekhar Dwivedi</p>
        <div className="flex gap-10 items-center text-center">
          <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition-colors flex items-center gap-2"><Mail size={14} /> {profile.email}</a>
          <a href={profile.social.github} className="hover:text-blue-400 transition-colors">GitHub</a>
          <a href={profile.social.linkedin} className="hover:text-blue-400 transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;