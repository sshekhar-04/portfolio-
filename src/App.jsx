import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  GitPullRequest,
  CheckCircle2,
  Trophy,
  Star,
  ArrowUpRight,
  Sparkles,
  GitBranch,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Atom,
  Binary
} from 'lucide-react';

/* ================================================================
   GHOST PROTOCOL — Cybersecurity & Software Engineering Portfolio
   ================================================================ */

// ─── INJECTED GLOBAL STYLES ────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: #00ff41; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #00d4ff; }

    @keyframes glitch {
      0%,100% { transform: translate(0); }
      20% { transform: translate(-3px, 2px); }
      40% { transform: translate(3px, -2px); }
      60% { transform: translate(-2px, -1px); }
      80% { transform: translate(2px, 1px); }
    }
    @keyframes glitchClip1 {
      0%,100% { clip-path: inset(0 0 100% 0); }
      20% { clip-path: inset(15% 0 60% 0); }
      40% { clip-path: inset(70% 0 5% 0); }
      60% { clip-path: inset(40% 0 30% 0); }
      80% { clip-path: inset(5% 0 80% 0); }
    }
    @keyframes glitchClip2 {
      0%,100% { clip-path: inset(100% 0 0 0); }
      20% { clip-path: inset(60% 0 15% 0); }
      40% { clip-path: inset(10% 0 70% 0); }
      60% { clip-path: inset(80% 0 5% 0); }
      80% { clip-path: inset(30% 0 45% 0); }
    }
    .glitch-card { position: relative; }
    .glitch-card::before, .glitch-card::after {
      content: ''; position: absolute; inset: 0;
      background: inherit; border-radius: inherit;
      opacity: 0; pointer-events: none; z-index: 1;
    }
    .glitch-card:hover { animation: glitch 0.4s linear; }
    .glitch-card:hover::before {
      opacity: 0.7; animation: glitchClip1 0.4s linear;
      border-left: 2px solid #ff003c; transform: translateX(-3px);
    }
    .glitch-card:hover::after {
      opacity: 0.7; animation: glitchClip2 0.4s linear;
      border-right: 2px solid #00d4ff; transform: translateX(3px);
    }

    @keyframes neonPulse {
      0%,100% { box-shadow: 0 0 5px #00ff41, 0 0 15px rgba(0,255,65,0.2); }
      50% { box-shadow: 0 0 15px #00ff41, 0 0 40px rgba(0,255,65,0.3); }
    }
    @keyframes fadeInUp {
      from { opacity:0; transform:translateY(30px); }
      to { opacity:1; transform:translateY(0); }
    }
    @keyframes bootLine {
      from { opacity:0; transform:translateX(-10px); }
      to { opacity:1; transform:translateX(0); }
    }
    @keyframes blink {
      0%,100% { opacity:1; } 50% { opacity:0; }
    }
    .cursor-blink { animation: blink 1s step-end infinite; }

    .scanlines { position: relative; }
    .scanlines::after {
      content: ''; position: absolute; inset: 0;
      background: repeating-linear-gradient(0deg,
        rgba(0,255,65,0.03) 0px, rgba(0,255,65,0.03) 1px,
        transparent 1px, transparent 3px);
      pointer-events: none; border-radius: inherit;
    }
    .hex-badge {
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      animation: neonPulse 3s ease-in-out infinite;
    }
  `}</style>
);

// ─── HOOKS ─────────────────────────────────────────────────────
const useTypewriter = (strings, speed = 80, pause = 2000) => {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIdx((idx + 1) % strings.length);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, deleting ? text.length - 1 : text.length + 1));
      }, deleting ? 40 : speed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return text;
};

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// ─── BOOT SCREEN ───────────────────────────────────────────────
const BootScreen = ({ onDone }) => {
  const [lines, setLines] = useState([]);
  const [fade, setFade] = useState(false);
  const boot = [
    '[0.000] GHOST PROTOCOL v3.0 — Initializing',
    '[0.142] Loading AES-256-GCM & QI-KDF engine... OK',
    '[0.387] Mounting /dev/portfolio... OK',
    '[0.621] Verifying digital signatures (Google/Eclipse/OWASP)... VALID',
    '[0.834] Establishing encrypted tunnel... OK',
    '[1.103] Loading transmon qubit ML models... OK',
    '[1.447] Scanning perimeter... CLEAR',
    '[1.892] System ready. Access GRANTED.',
  ];
  useEffect(() => {
    boot.forEach((l, i) => setTimeout(() => setLines(p => [...p, l]), i * 200));
    setTimeout(() => setFade(true), 1800);
    setTimeout(onDone, 2300);
  }, []);
  return (
    <div className={`fixed inset-0 z-[200] bg-[#030712] flex items-center justify-center transition-opacity duration-500 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="max-w-2xl w-full px-6 font-mono text-xs sm:text-sm text-[#00ff41] space-y-1">
        {lines.map((l, i) => (
          <div key={i} style={{ animation: 'bootLine 0.3s ease forwards' }}>{l}</div>
        ))}
        <span className="cursor-blink">█</span>
      </div>
    </div>
  );
};

// ─── CURSOR TRAIL ──────────────────────────────────────────────
const CursorTrail = () => {
  const [dots, setDots] = useState([]);
  const last = useRef(0);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      const now = Date.now();
      if (now - last.current < 50) return;
      last.current = now;
      setDots(p => [...p.slice(-11), { x: e.clientX, y: e.clientY, id: now }]);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {dots.map((d, i) => (
        <div key={d.id} className="absolute rounded-full" style={{
          left: d.x - 3, top: d.y - 3, width: 6, height: 6,
          background: '#00ff41', opacity: ((i + 1) / dots.length) * 0.4,
          boxShadow: '0 0 6px #00ff41',
        }} />
      ))}
    </div>
  );
};

// ─── MATRIX RAIN ───────────────────────────────────────────────
const MatrixRain = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let animId;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}[]';
    const fs = 14, cols = Math.floor(c.width / fs);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(3,7,18,0.05)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fs}px 'JetBrains Mono', monospace`;
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 opacity-25" />;
};

// ─── NAVBAR ────────────────────────────────────────────────────
const Navbar = ({ active }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = ['home', 'about', 'skills', 'projects', 'achievements', 'experience', 'contact'];
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-[#00ff41]/10' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
        <a href="#home" style={{ fontFamily: 'Orbitron' }} className="text-[#00ff41] font-bold text-lg tracking-wider">
          SHREYANSH<span className="text-[#00d4ff]">.</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l} href={`#${l}`} className={`px-3 py-2 text-[10px] uppercase tracking-[0.2em] rounded transition-all ${active === l ? 'text-[#00ff41] bg-[#00ff41]/10' : 'text-slate-500 hover:text-[#00ff41]'}`}>{l}</a>
          ))}
          <a href="/Shreyansh_S_Dwivedi_Resume_v4.pdf" download className="ml-3 px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-[#00ff41]/30 text-[#00ff41] rounded hover:bg-[#00ff41]/10 transition-all flex items-center gap-1.5">
            <Download size={12} /> Resume
          </a>
        </div>
        <button className="md:hidden text-[#00ff41] p-2 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#030712]/95 backdrop-blur-xl ${open ? 'max-h-96 border-b border-[#00ff41]/10' : 'max-h-0'}`}>
        <div className="px-6 py-4 space-y-2">
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className={`block py-2 text-xs uppercase tracking-widest ${active === l ? 'text-[#00ff41]' : 'text-slate-500'}`}>{`> ${l}`}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ─── HERO ──────────────────────────────────────────────────────
const Hero = () => {
  const typed = useTypewriter([
    'Software Developer & Researcher',
    'Software Intern @ CapConnect+',
    'Ex-Research Intern @ IIT Bhilai',
    'Quantum-Inspired Cryptography (QI-KDF)',
    'OSS Contributor: TensorFlow & Eclipse & OWASP'
  ], 75, 2000);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/60 to-[#030712]" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#00ff41]/30 rounded-full text-[#00ff41] text-[10px] tracking-widest mb-8">
          <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
          SYSTEM ACTIVE — ENCRYPTED CONNECTION
        </div>
        <h1 style={{ fontFamily: 'Orbitron' }} className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
          SHREY<span className="text-[#00ff41]">ANSH</span>
        </h1>
        <div className="text-[#00d4ff] text-base sm:text-xl mb-8 h-8">
          {'> '}{typed}<span className="cursor-blink">█</span>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
          B.Tech CS (Data Science) student specializing in backend engineering, agentic AI systems, and quantum-inspired cryptography.
          Currently Software Intern at CapConnect+ and former Research Intern at IIT Bhilai. Proven contributor to TensorFlow (Google), Eclipse Foundation, and OWASP.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-3 bg-[#00ff41]/10 border border-[#00ff41]/40 text-[#00ff41] text-xs uppercase tracking-[0.2em] rounded hover:bg-[#00ff41]/20 transition-all">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3 border border-slate-700 text-slate-400 text-xs uppercase tracking-[0.2em] rounded hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all">
            Contact Me
          </a>
        </div>
        <div className="flex items-center justify-center gap-3 mt-6">
          <a href="https://github.com/sshekhar-04" target="_blank" rel="noreferrer" className="p-3 border border-slate-700/50 rounded-lg text-slate-500 hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all hover:-translate-y-0.5">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/shreyanshshekhar-dwivedi" target="_blank" rel="noreferrer" className="p-3 border border-slate-700/50 rounded-lg text-slate-500 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all hover:-translate-y-0.5">
            <Linkedin size={18} />
          </a>
          <a href="mailto:shreyanshsd512gb@gmail.com" className="p-3 border border-slate-700/50 rounded-lg text-slate-500 hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all hover:-translate-y-0.5">
            <Mail size={18} />
          </a>
          <a href="/Shreyansh_S_Dwivedi_Resume_v4.pdf" download className="p-3 border border-slate-700/50 rounded-lg text-slate-500 hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all hover:-translate-y-0.5">
            <Download size={18} />
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-[#00ff41]/40" />
      </div>
    </section>
  );
};

// ─── ABOUT (Compact, exact resume data) ────────────────────────
const About = () => {
  const [ref, vis] = useReveal();

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2">
          <h2 style={{ fontFamily: 'Orbitron' }} className="text-2xl sm:text-3xl font-bold text-[#00ff41] tracking-wider">
            {'// ABOUT'}
          </h2>
          <div className="text-[10px] text-[#00d4ff] font-mono mt-1 sm:mt-0 tracking-widest">
            [IDENT: SHREYANSH SHEKHAR DWIVEDI]
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-[#00ff41]/40 via-[#00d4ff]/20 to-transparent mb-5" />

        <div className="scanlines bg-[#0a1628] border border-[#00ff41]/15 rounded-xl p-5 sm:p-6">
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3.5 border-b border-[#00ff41]/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff003c]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/60" />
              <span className="text-slate-400 font-semibold ml-1">root@shreyansh:~$ cat profile.txt</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="text-[#00ff41] font-semibold">Software Developer & Researcher</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span>Noida, UP, India</span>
            </div>
          </div>

          {/* Professional Summary from Resume */}
          <div className="mb-4 relative z-10 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2">
            <p>
              B.Tech CS (Data Science) student specializing in backend engineering, agentic AI systems, and quantum-inspired cryptography. Currently <span className="text-[#00ff41] font-semibold">Software Intern at CapConnect+</span> and former <span className="text-[#00d4ff] font-semibold">Research Intern at IIT Bhilai</span> (transmon qubit ML research).
            </p>
            <p className="text-slate-400 text-xs">
              Proven open-source contributor to <span className="text-[#00ff41]">TensorFlow (Google)</span>, <span className="text-[#00ff41]">Eclipse Foundation</span>, and <span className="text-[#00ff41]">OWASP</span>. Skilled in Spring Boot microservices, RAG pipelines, Docker/Kubernetes, and secure distributed architectures.
            </p>
          </div>

          {/* Education & Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10 text-xs font-mono">
            <div className="bg-[#030712]/60 border border-[#00ff41]/15 rounded-lg p-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={15} className="text-[#00d4ff] shrink-0" />
                <div>
                  <div className="text-white font-semibold text-[11px]">B.Tech — CSE (Data Science)</div>
                  <div className="text-[10px] text-slate-400">JSS Academy of Technical Education, Noida</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] text-[#00ff41] bg-[#00ff41]/10 px-2 py-0.5 rounded border border-[#00ff41]/20 block">
                  Expected 2028
                </span>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">
                  CGPA: 7.31
                </span>
              </div>
            </div>

            <div className="bg-[#030712]/60 border border-[#00ff41]/15 rounded-lg p-3 flex items-center justify-around text-center">
              <div>
                <div style={{ fontFamily: 'Orbitron' }} className="text-sm font-bold text-[#00ff41]">3 Orgs</div>
                <div className="text-[8px] text-slate-400 uppercase tracking-wider">TF / Eclipse / OWASP</div>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <div style={{ fontFamily: 'Orbitron' }} className="text-sm font-bold text-[#00d4ff]">QI-KDF</div>
                <div className="text-[8px] text-slate-400 uppercase tracking-wider">Crypto Research</div>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <div style={{ fontFamily: 'Orbitron' }} className="text-sm font-bold text-[#00ff41]">ML & RAG</div>
                <div className="text-[8px] text-slate-400 uppercase tracking-wider">Agentic AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SKILLS (exact resume categories) ──────────────────────────
const skillCategories = [
  { category: 'Languages', items: ['Java (Advanced)', 'Rust', 'Python', 'Bash'] },
  { category: 'Backend & AI', items: ['Spring Boot', 'Spring AI', 'RESTful APIs', 'RAG', 'WebSockets (STOMP)', 'DSA'] },
  { category: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'Linux', 'Maven', 'Git', 'CI/CD'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'ChromaDB'] },
  { category: 'Security / Crypto', items: ['AES-256-GCM', 'SHA-256', 'BB84 QKD Simulation', 'Penetration Testing'] },
  { category: 'LLM Integration', items: ['RAG Pipelines', 'Embedding Search', 'OpenAI API', 'Gemini API'] },
];

const Skills = () => {
  const [ref, vis] = useReveal(0.15);
  return (
    <section id="skills" ref={ref} className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6">
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <h2 style={{ fontFamily: 'Orbitron' }} className="text-2xl sm:text-3xl font-bold text-[#00ff41] mb-2 tracking-wider">{'// TECHNICAL SKILLS'}</h2>
        <div className="h-px bg-gradient-to-r from-[#00ff41]/40 to-transparent mb-10" />

        <div className="bg-[#0a1628] border border-[#00ff41]/15 rounded-xl p-6 sm:p-8">
          <div className="text-[#00ff41] text-xs mb-6">
            <span className="text-slate-600">root@shreyansh:~$</span> nmap -sV --skill-scan --deep
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((group, i) => (
              <div key={i}
                className="bg-[#030712]/60 border border-[#00ff41]/10 rounded-lg p-5 hover:border-[#00ff41]/30 transition-all duration-300"
                style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(15px)', transition: `all 0.6s ease ${i * 0.1}s` }}
              >
                <div className="text-[10px] text-[#00d4ff] uppercase tracking-[0.2em] mb-3 font-semibold">
                  {'> '}{group.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill, j) => (
                    <span key={j} className="text-[10px] px-2.5 py-1 bg-[#00ff41]/5 text-[#00ff41]/80 border border-[#00ff41]/15 rounded hover:bg-[#00ff41]/15 hover:text-[#00ff41] transition-all cursor-default font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[10px] text-slate-600">
            {'// Scan complete. 6 categories verified. Production-grade toolset loaded.'}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PROJECTS ──────────────────────────────────────────────────
const projects = [
  {
    title: 'ARIA — Adaptive Realtime Intelligence Agent',
    period: '2025 – Present', category: 'Agentic AI / Personal Project',
    desc: 'OS-level agentic AI with LLM-controlled terminal access and a READ/WRITE/DESTRUCTIVE intent classifier that gates every command pre-execution, preventing unrecoverable system mutations. Spring Boot 3.x backend + Python/ChromaDB RAG sidecar for persistent memory; React/Tauri desktop UI with offline Porcupine wake-word detection; MongoDB audit trail — fully air-gapped capable.',
    tags: ['Java 21', 'Spring Boot 3.x', 'Python', 'ChromaDB', 'RAG', 'React', 'Tauri', 'MongoDB', 'Porcupine'],
    live: 'https://aria.shreyansh.dev',
    github: 'https://github.com/sshekhar-04/ARIA--Adaptive-Realtime-Intelligence-Agent.git',
    classified: false,
    notLive: true,
  },
  {
    title: 'Multi-Modal RAG & AI Chat Service',
    period: 'Jan 2026', category: 'AI / Backend',
    desc: 'Built a RAG pipeline over private datasets using embedding-based similarity search to minimize hallucinations; engineered Spring @Configuration / @Qualifier multi-provider AI bean management (Gemini + OpenAI).',
    tags: ['Java 21', 'Spring Boot', 'Spring AI', 'OpenAI API', 'Gemini API', 'Embedding Search'],
    live: 'https://rag-ai-chat.shreyansh.dev',
    github: 'https://github.com/sshekhar-04/RAG_model.git',
    classified: false,
    notLive: true,
  },
  {
    title: 'Hybrid QKD Simulator API',
    period: 'Nov 2025', category: 'Cryptography / Security',
    desc: 'RESTful API simulating the BB84 quantum key exchange protocol with QBER validation, error correction mechanisms, and ephemeral AES-256 GCM session key derivation. Demonstrates end-to-end secure key lifecycle — generation, distribution, error correction, and quantum-resistant encryption.',
    tags: ['Java 21', 'Spring Boot', 'REST', 'AES-256 GCM', 'SHA-256', 'BB84 Protocol', 'QKD'],
    live: 'https://frontend-qkd.onrender.com/',
    github: 'https://github.com/sshekhar-04/QKD-simulation.git',
    classified: true,
  },
];

const Projects = () => {
  const [ref, vis] = useReveal();
  const [popup, setPopup] = useState(null);

  const handleLiveClick = (e, p) => {
    if (p.notLive) {
      e.preventDefault();
      setPopup(p.title);
    }
  };

  return (
    <section id="projects" ref={ref} className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6">
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <h2 style={{ fontFamily: 'Orbitron' }} className="text-2xl sm:text-3xl font-bold text-[#00ff41] mb-2 tracking-wider">{'// PROJECTS'}</h2>
        <div className="h-px bg-gradient-to-r from-[#00ff41]/40 to-transparent mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i}
              className="glitch-card bg-[#0a1628] border border-[#00ff41]/15 rounded-xl p-6 flex flex-col hover:border-[#00ff41]/40 transition-all duration-300 group"
              style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.15}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded border border-[#00d4ff]/20 uppercase tracking-widest">{p.period}</span>
                    <span className="text-[9px] text-slate-600 uppercase tracking-widest">{p.category}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00ff41] transition-colors leading-tight">{p.title}</h3>
                </div>
                {p.classified && (
                  <span className="text-[8px] bg-[#ff003c]/20 text-[#ff003c] px-2 py-0.5 rounded border border-[#ff003c]/30 uppercase tracking-widest shrink-0 ml-2">
                    Classified
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-5 flex-grow">{p.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tags.map((t, j) => (
                  <span key={j} className="text-[9px] px-2 py-0.5 bg-[#00ff41]/5 text-[#00ff41]/70 border border-[#00ff41]/10 rounded">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-[#00ff41]/10 relative z-10">
                <a href={p.notLive ? '#' : p.live} target={p.notLive ? undefined : '_blank'} rel="noreferrer"
                  onClick={(e) => handleLiveClick(e, p)}
                  className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest transition-colors ${p.notLive ? 'text-slate-600 hover:text-[#ff003c] cursor-pointer' : 'text-[#00d4ff] hover:text-[#00ff41]'}`}
                >
                  <ExternalLink size={12} /> {p.notLive ? 'Offline' : 'Live'}
                </a>
                <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-[#00ff41] transition-colors uppercase tracking-widest">
                  <Github size={12} /> Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Not Live Popup Modal */}
      {popup && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4" onClick={() => setPopup(null)}>
          <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm" />
          <div
            className="relative bg-[#0a1628] border border-[#ff003c]/30 rounded-xl p-6 sm:p-8 max-w-md w-full scanlines"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.3s ease' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#ff003c]/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-slate-600/60" />
              <span className="ml-3 text-[10px] text-slate-600">system_alert.sh</span>
            </div>
            <div className="text-[#ff003c] text-xs mb-2 uppercase tracking-widest" style={{ fontFamily: 'Orbitron' }}>
              ⚠ ACCESS DENIED
            </div>
            <div className="text-sm text-white font-semibold mb-2 relative z-10">{popup}</div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 relative z-10">
              This project is currently <span className="text-[#ff003c] font-semibold">not deployed</span>. The live demo is unavailable at this time. Please check the <span className="text-[#00ff41]">source code</span> on GitHub to explore the project.
            </p>
            <div
              onClick={() => setPopup(null)}
              className="inline-block px-6 py-2 bg-[#ff003c]/10 border border-[#ff003c]/30 text-[#ff003c] text-[10px] uppercase tracking-[0.2em] rounded cursor-pointer hover:bg-[#ff003c]/20 transition-all active:scale-95 select-none relative z-10"
            >
              &gt; ACKNOWLEDGED
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ─── ACHIEVEMENTS & HIGHLIGHTS (exact resume data) ─────────────
const achievementsData = [
  {
    category: 'Enterprise Open Source',
    badge: 'OSS // ENTERPRISE',
    icon: GitPullRequest,
    statement: 'Merged contributions into TensorFlow (Google), Eclipse Foundation, and OWASP as a first-year undergraduate — spanning three enterprise-scale open-source ecosystems.',
    details: [
      'TensorFlow (Google): Resolved CI/CD build failures; integrated Maven Spotless.',
      'Eclipse Foundation (4diac IDE): 4 merged internationalization (i18n) PRs.',
      'OWASP FinBot CTF: 3 merged PRs (#265–#267) fixing audit trail bugs.'
    ],
    tags: ['TensorFlow', 'Eclipse 4diac', 'OWASP', 'Maven Spotless', 'CI/CD']
  },
  {
    category: 'Original Cryptography Research',
    badge: 'RESEARCH // QI-KDF',
    icon: ShieldCheck,
    statement: 'Authored original cryptography research (QI-KDF): 2^190.5 key space, zero modulo bias, ~500K ops/s — addressing a gap no existing RFC standard covers.',
    details: [
      '6-stage deterministic key derivation function with BigDecimal precision.',
      'Verified strict SHA-256 avalanche criterion (~50.1% flip rate) across 10K+ trials.',
      'Roadmap: SHA-3 migration, CRYSTALS-Kyber wrapping, QRNG, and NIST submission.'
    ],
    tags: ['QI-KDF', 'AES-256-GCM', 'SHA-256', 'Avalanche Criterion', 'Quantum Entropy']
  },
  {
    category: 'Agentic AI Architecture (ARIA)',
    badge: 'AI // AGENTIC SYSTEMS',
    icon: Cpu,
    statement: 'Designed and shipped ARIA, an OS-level agentic AI with intent-aware pre-execution guardrails, cited as a working proof-of-concept in a GSoC 2026 OWASP proposal.',
    details: [
      'READ/WRITE/DESTRUCTIVE intent classifier gating every command pre-execution.',
      'Spring Boot 3.x backend + Python/ChromaDB RAG sidecar for rolling memory.',
      'Offline Porcupine wake-word detection + air-gapped capable MongoDB audit trail.'
    ],
    tags: ['Agentic AI', 'Spring Boot 3.x', 'ChromaDB', 'RAG', 'GSoC OWASP PoC']
  },
  {
    category: 'Recognition & Community',
    badge: 'HONORS // GITHUB',
    icon: Trophy,
    statement: 'Recognised with the GitHub Pull Shark badge for open-source contributions to TensorFlow Java.',
    details: [
      'Active contributor to foundational machine learning repositories.',
      'Strong foundation in system design, clean code principles, and scalable microservices.',
      'Active on Codeforces (ssd512gb) solving complex Data Structures & Algorithms.'
    ],
    tags: ['Pull Shark Badge', 'TensorFlow Java', 'Codeforces', 'DSA']
  }
];

const Achievements = () => {
  const [ref, vis] = useReveal(0.15);

  return (
    <section id="achievements" ref={ref} className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2">
          <div>
            <h2 style={{ fontFamily: 'Orbitron' }} className="text-2xl sm:text-3xl font-bold text-[#00ff41] tracking-wider">
              {'// ACHIEVEMENTS & HIGHLIGHTS'}
            </h2>
          </div>
          <div className="text-[10px] text-[#00d4ff] font-mono mt-2 sm:mt-0 tracking-widest">
            [STATUS: VERIFIED CREDENTIALS]
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-[#00ff41]/40 via-[#00d4ff]/20 to-transparent mb-8" />

        <div className="bg-[#0a1628] border border-[#00ff41]/20 rounded-xl p-5 sm:p-7 mb-8 scanlines">
          <div className="flex items-center gap-2 mb-5 text-xs font-mono">
            <span className="w-3 h-3 rounded-full bg-[#ff003c]/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-[#00ff41]/60" />
            <span className="ml-3 text-slate-500">root@shreyansh:~$ ./verify_credentials.sh --achievements --verified</span>
          </div>

          {/* Achievements Grid (exact data from resume) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {achievementsData.map((a, i) => {
              const IconComp = a.icon;
              return (
                <div
                  key={i}
                  className="bg-[#030712]/70 border border-[#00ff41]/15 rounded-xl p-5 hover:border-[#00ff41]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                  style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.1}s` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 text-[#00ff41] group-hover:scale-105 transition-transform">
                        <IconComp size={16} />
                      </div>
                      <span className="text-[8px] text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded border border-[#00d4ff]/20 uppercase tracking-widest font-mono">
                        {a.badge}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#00ff41] font-semibold mb-2 flex items-center gap-1.5 font-mono">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      {a.category}
                    </div>

                    {/* Statement */}
                    <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                      {a.statement}
                    </p>

                    {/* Details */}
                    <ul className="space-y-1.5 mb-4">
                      {a.details.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-[10px] text-slate-400 leading-relaxed font-mono">
                          <span className="text-[#00ff41] shrink-0">▸</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="pt-3 border-t border-[#00ff41]/10 flex flex-wrap gap-1">
                    {a.tags.map((t, tIdx) => (
                      <span key={tIdx} className="text-[8px] px-2 py-0.5 bg-[#00ff41]/5 text-[#00ff41]/70 border border-[#00ff41]/10 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-[#00ff41]/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
            <div>{'// Sourced directly from Shreyansh_S_Dwivedi_Resume_v4.pdf'}</div>
            <div className="text-[#00ff41]">VERIFIED HONORS & RESEARCH</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── WORK EXPERIENCE (ALL 4 experiences from resume PDF, compact 2x2 grid) ──
const experiencesData = [
  {
    org: 'CapConnect+',
    abbr: 'CC+',
    role: 'Software Intern',
    period: 'Aug 2026 – Present',
    badge: 'INDUSTRY INTERNSHIP',
    location: 'Production Engineering',
    bullets: [
      'Contributing to full-stack feature development and code quality initiatives as part of the engineering team.',
      'Applying Java/Spring Boot and React expertise in a production environment.'
    ],
    tech: ['Java', 'Spring Boot', 'React', 'Production Engineering', 'Full-Stack']
  },
  {
    org: 'IIT Bhilai (Online Programs)',
    abbr: 'IIT',
    role: 'Research Intern',
    period: 'Jun 2026 – Jul 2026',
    badge: 'QUANTUM ML RESEARCH',
    location: 'IIT Research Lab',
    bullets: [
      'Researched transmon qubit architecture and quantum coherence using machine learning.',
      'Built a full ML pipeline (Random Forest, XGBoost with SHAP, Graph Neural Network) to predict materials that improve qubit coherence.'
    ],
    tech: ['Quantum Coherence', 'Transmon Qubits', 'Random Forest', 'XGBoost', 'SHAP', 'GNN']
  },
  {
    org: 'Quantum-Inspired Cryptography',
    abbr: 'QI',
    role: 'Independent Researcher',
    period: 'Nov 2025 – Aug 2026',
    badge: 'CRYPTOGRAPHY RESEARCH',
    location: 'Original Research',
    bullets: [
      'Designed QI-KDF: a 6-stage deterministic key derivation function combining BigDecimal precision seeding with microsecond temporal entropy — achieving a 2^190.5 key space, zero modulo bias, and ~500K ops/s throughput.',
      'Verified strict SHA-256 avalanche criterion (~50.1% flip rate) across 10K+ trials; roadmap targets SHA-3 migration, CRYSTALS-Kyber wrapping, QRNG integration, and RFC/NIST standardization submission.'
    ],
    tech: ['QI-KDF', 'BigDecimal Precision', 'Temporal Entropy', 'SHA-256 Avalanche', 'CRYSTALS-Kyber']
  },
  {
    org: 'TensorFlow, Eclipse & OWASP',
    abbr: 'OSS',
    role: 'Open Source Contributor',
    period: 'Nov 2025 – Mar 2026',
    badge: 'TIER-1 OPEN SOURCE',
    location: 'Google / Eclipse / OWASP',
    bullets: [
      "TensorFlow (Google): Resolved CI/CD 'run format check' pipeline failures; integrated Maven Spotless for automated style enforcement.",
      'Eclipse Foundation (4diac IDE): 4 merged internationalization (i18n) PRs, reviewed by maintainer Alois Zoitl.',
      'OWASP FinBot CTF: 3 merged PRs (#265–#267) fixing f-string interpolation bugs in audit trails, each with unit tests.'
    ],
    tech: ['TensorFlow (Google)', 'Maven Spotless', 'Eclipse 4diac', 'OWASP', 'CI/CD']
  }
];

const Experience = () => {
  const [ref, vis] = useReveal();

  return (
    <section id="experience" ref={ref} className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2">
          <h2 style={{ fontFamily: 'Orbitron' }} className="text-2xl sm:text-3xl font-bold text-[#00ff41] tracking-wider">
            {'// EXPERIENCE'}
          </h2>
          <div className="text-[10px] text-[#00d4ff] font-mono mt-1 sm:mt-0 tracking-widest">
            [WORK & RESEARCH EXPERIENCE // 4 TRACKS VERIFIED]
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-[#00ff41]/40 via-[#00d4ff]/20 to-transparent mb-6" />

        {/* Compact 2x2 Grid of ALL 4 Experiences from Resume */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {experiencesData.map((exp, i) => (
            <div
              key={i}
              className="glitch-card bg-[#0a1628] border border-[#00ff41]/15 rounded-xl p-4 sm:p-5 hover:border-[#00ff41]/40 transition-all duration-300 flex flex-col justify-between group scanlines"
              style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.1}s` }}
            >
              <div>
                {/* Header Bar */}
                <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="hex-badge w-9 h-9 bg-[#030712] border border-[#00ff41]/40 flex items-center justify-center shrink-0">
                      <span style={{ fontFamily: 'Orbitron' }} className="text-[#00ff41] text-[9px] font-black">
                        {exp.abbr}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00ff41] transition-colors leading-tight">
                        {exp.org}
                      </h3>
                      <div className="text-[11px] text-[#00ff41] font-mono mt-0.5">
                        {exp.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[8px] text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded border border-[#00d4ff]/20 uppercase tracking-widest font-mono block">
                      {exp.badge}
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono mt-1 block">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullets (Exact from resume) */}
                <ul className="space-y-1.5 mb-3.5 relative z-10">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-relaxed font-mono">
                      <span className="text-[#00ff41] shrink-0">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2.5 border-t border-[#00ff41]/10 flex flex-wrap gap-1 relative z-10">
                {exp.tech.map((t, tIdx) => (
                  <span key={tIdx} className="text-[8px] px-2 py-0.5 bg-[#00ff41]/5 text-[#00ff41]/80 border border-[#00ff41]/15 rounded font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CONTACT ───────────────────────────────────────────────────
const Contact = () => {
  const [ref, vis] = useReveal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (name && email && msg) {
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n---\nName: ${name}\nEmail: ${email}`);
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=shreyanshsd512gb@gmail.com&su=${subject}&body=${body}`, '_blank');
      setSent(true);
      setTimeout(() => { setSent(false); setName(''); setEmail(''); setMsg(''); }, 3000);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6">
      <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <h2 style={{ fontFamily: 'Orbitron' }} className="text-2xl sm:text-3xl font-bold text-[#00ff41] mb-2 tracking-wider">{'// CONTACT'}</h2>
        <div className="h-px bg-gradient-to-r from-[#00ff41]/40 to-transparent mb-10" />

        <div className="max-w-2xl mx-auto bg-[#0a1628] border border-[#00ff41]/15 rounded-xl p-6 sm:p-8 scanlines">
          <div className="flex items-center gap-2 mb-6 text-xs">
            <span className="w-3 h-3 rounded-full bg-[#ff003c]/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-[#00ff41]/60" />
            <span className="ml-3 text-slate-600">root@shreyansh:~$ ./send_message.sh</span>
          </div>

          <div className="space-y-5 relative z-10">
            {[
              { label: 'IDENT', val: name, set: setName, placeholder: 'Your name', type: 'text' },
              { label: 'EMAIL', val: email, set: setEmail, placeholder: 'Your email', type: 'email' },
            ].map((f, i) => (
              <div key={i}>
                <div className="text-[10px] text-[#00ff41]/60 uppercase tracking-widest mb-1.5">{`> Enter ${f.label}:`}</div>
                <input
                  type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  className="w-full bg-[#030712] border border-[#00ff41]/20 rounded px-4 py-3 text-xs text-[#00d4ff] placeholder-slate-600 focus:outline-none focus:border-[#00ff41]/50 transition-colors font-mono"
                />
              </div>
            ))}
            <div>
              <div className="text-[10px] text-[#00ff41]/60 uppercase tracking-widest mb-1.5">{`> Enter MESSAGE:`}</div>
              <textarea
                value={msg} onChange={e => setMsg(e.target.value)} placeholder="Your message..." rows={4}
                className="w-full bg-[#030712] border border-[#00ff41]/20 rounded px-4 py-3 text-xs text-[#00d4ff] placeholder-slate-600 focus:outline-none focus:border-[#00ff41]/50 transition-colors resize-none font-mono"
              />
            </div>

            <div className="flex items-center gap-4">
              <div
                onClick={handleSend}
                className="px-6 py-2.5 bg-[#00ff41]/10 border border-[#00ff41]/40 text-[#00ff41] text-[10px] uppercase tracking-[0.2em] rounded cursor-pointer hover:bg-[#00ff41]/20 transition-all active:scale-95 select-none font-mono"
              >
                {sent ? '✓ TRANSMITTED' : '> TRANSMIT'}
              </div>
              {sent && <span className="text-[10px] text-[#00ff41] animate-pulse font-mono">Encrypted message sent successfully.</span>}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#00ff41]/10 flex flex-wrap gap-6">
            <a href="mailto:shreyanshsd512gb@gmail.com" className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-[#00ff41] transition-colors uppercase tracking-widest font-mono">
              <Mail size={12} /> shreyanshsd512gb@gmail.com
            </a>
            <a href="https://github.com/sshekhar-04" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-[#00ff41] transition-colors uppercase tracking-widest font-mono">
              <Github size={12} /> GitHub
            </a>
            <a href="https://linkedin.com/in/shreyanshshekhar-dwivedi" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-slate-500 hover:text-[#00d4ff] transition-colors uppercase tracking-widest font-mono">
              <Linkedin size={12} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ────────────────────────────────────────────────────
const Footer = () => {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);
  const fmt = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };
  return (
    <footer className="border-t border-[#00ff41]/10 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-widest font-mono">
        <span>© {new Date().getFullYear()} Shreyansh Shekhar Dwivedi</span>
        <span className="text-[#00ff41]/50">
          Session Uptime: <span className="text-[#00ff41]">{fmt(uptime)}</span>
        </span>
        <span className="text-slate-700">Ghost Protocol v3.0</span>
      </div>
    </footer>
  );
};

// ─── MAIN APP ──────────────────────────────────────────────────
const App = () => {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState('home');

  // Scroll-spy: detect active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [booted]);

  return (
    <>
      <GlobalStyles />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <div className="bg-[#030712] min-h-screen">
          <CursorTrail />
          <Navbar active={active} />
          <Hero />
          <About />
          <Skills />
          <Projects />
          {/* Switched: Achievements comes first, then Experience */}
          <Achievements />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;