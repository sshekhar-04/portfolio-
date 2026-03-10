import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, MapPin, Github, Linkedin, ArrowRight, Server,
  Database, Code2, ExternalLink, Menu, X, Shield, Terminal, Globe,
  Download, Cloud, Cpu, Lock, Layers, RefreshCw, Briefcase, Award,
  BookOpen, ChevronDown, Zap, GitBranch, Bot, Key, Binary,
  Braces, Container, FileCode, Rocket, GraduationCap, Star,
  ArrowUpRight, Eye, Hash, CalendarDays, CreditCard, Users,
  MessageSquare, CheckCircle, LayoutDashboard
} from 'lucide-react';

/* ─────────────────────────────────────────────
   SECTION REVEAL HOOK – Animate on scroll
   ───────────────────────────────────────────── */
const useSectionReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER — for stats
   ───────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useSectionReveal(0.5);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   PARTICLE FIELD BACKGROUND
   ───────────────────────────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();
      });

      // connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/* ─────────────────────────────────────────────
   TECH MEMORY GAME
   ───────────────────────────────────────────── */
const TechMemoryGame = () => {
  const initialStack = [
    { id: 'Java', icon: Code2, color: 'text-orange-500' },
    { id: 'Spring Boot', icon: Server, color: 'text-green-500' },
    { id: 'Docker', icon: Container, color: 'text-blue-500' },
    { id: 'PostgreSQL', icon: Database, color: 'text-indigo-400' },
    { id: 'Cryptography', icon: Lock, color: 'text-yellow-500' },
    { id: 'Kubernetes', icon: Cloud, color: 'text-cyan-400' },
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

  useEffect(() => { initializeGame(); }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (cards[newFlipped[0]].id === cards[newFlipped[1]].id) {
        setSolved((s) => [...s, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="glass-card p-6 sm:p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto flex flex-col items-center w-full animate-glow">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8">
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-3">
            <Cpu className="text-blue-500" /> System Memory Match
          </h3>
          <p className="text-slate-400 text-sm mt-1 mb-4 sm:mb-0">
            Match backend tech stack pairs — test your memory!
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-end mt-4 sm:mt-0">
          <span className="text-blue-400 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-full">
            Moves: {moves}
          </span>
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
              className={`w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-xl cursor-pointer transition-all duration-500 transform flex items-center justify-center border
                ${isFlipped
                  ? 'bg-slate-800 border-blue-500/50 scale-105 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800/40 border-white/5 hover:border-blue-500/30 hover:scale-105 hover:bg-slate-800/70'
                }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center">
                  <Icon size={28} className={card.color} />
                  <span className="text-[10px] sm:text-xs mt-2 font-medium text-slate-300 text-center leading-tight px-1">
                    {card.id}
                  </span>
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
            <Shield size={24} /> System Optimized in {moves} moves!
          </p>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADING COMPONENT
   ───────────────────────────────────────────── */
const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col gap-2 mb-10 sm:mb-14">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <Icon size={24} className="text-blue-400" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-slate-500 font-mono text-sm tracking-tight ml-[44px]">{subtitle}</p>
    )}
    <div className="h-px bg-gradient-to-r from-blue-500/30 via-blue-500/10 to-transparent mt-2" />
  </div>
);

/* ─────────────────────────────────────────────
   PROJECT MODAL
   ───────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative glass-card rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {project.period}
          </span>
          <span className="text-xs font-mono text-slate-500">
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
          {project.title}
        </h3>

        <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">
          {project.longDesc}
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">
            Key Highlights
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <Zap size={14} className="text-blue-500 mt-0.5 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, j) => (
              <span key={j} className="text-xs font-medium px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-lg border border-blue-500/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all active:scale-95"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-sm font-semibold transition-all active:scale-95"
          >
            <Github size={16} /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN PORTFOLIO COMPONENT
   ───────────────────────────────────────────── */
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [heroRef, heroVisible] = useSectionReveal(0.1);
  const [expRef, expVisible] = useSectionReveal();
  const [projRef, projVisible] = useSectionReveal();
  const [skillRef, skillVisible] = useSectionReveal();
  const [eduRef, eduVisible] = useSectionReveal();
  const [playRef, playVisible] = useSectionReveal();

  const profile = {
    name: "Shreyansh Shekhar Dwivedi",
    role: "Backend Developer | Java & Spring Boot",
    location: "Noida, Uttar Pradesh, India",
    email: "shreyanshsd512gb@gmail.com",
    about: "B.Tech Computer Science (Data Science) student with strong expertise in backend engineering, AI-powered systems, and secure distributed architectures. Proven open-source contributor to large-scale repositories including TensorFlow (Google) and Eclipse Foundation. Experienced in building high-reliability RESTful APIs, implementing RAG pipelines, and integrating cloud-native DevOps workflows.",
    education: {
      degree: "B.Tech — Computer Science Engineering (Data Science)",
      college: "JSS Academy of Technical Education",
      location: "Noida, Uttar Pradesh, India",
      year: "Expected Graduation: 2028"
    },
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    resumeLink: "/Shreyansh_S_Dwivedi_Resume_1.pdf"
  };

  const stats = [
    { label: "Open Source Repos", value: 2, suffix: "+" },
    { label: "Projects Built", value: 5, suffix: "+" },
    { label: "Tech Skills", value: 25, suffix: "+" },
    { label: "Graduation", value: 2028, suffix: "" },
  ];

  const skills = [
    {
      category: "Programming Languages",
      icon: Code2,
      items: ["Java (Advanced)", "Rust (Proficient)", "Bash/Shell Scripting"]
    },
    {
      category: "Backend & AI",
      icon: Server,
      items: ["Spring Boot", "Spring AI", "RESTful APIs", "RAG Architecture", "WebSockets (STOMP)", "OOP", "Data Structures & Algorithms"]
    },
    {
      category: "DevOps & Cloud",
      icon: Cloud,
      items: ["Docker", "Kubernetes", "Linux", "Maven", "Git", "CI/CD Pipelines"]
    },
    {
      category: "Databases",
      icon: Database,
      items: ["PostgreSQL", "MongoDB"]
    },
    {
      category: "Security & Cryptography",
      icon: Lock,
      items: ["AES-256 GCM", "SHA-256", "Quantum Key Distribution (BB84)", "Penetration Testing Fundamentals"]
    },
    {
      category: "AI & LLM Integration",
      icon: Bot,
      items: ["Retrieval-Augmented Generation (RAG)", "Embedding-based Similarity Search", "OpenAI API", "Gemini API"]
    }
  ];

  const experience = [
    {
      company: "TensorFlow (Google Open Source)",
      role: "Open Source Contributor",
      period: "Ongoing",
      icon: GitBranch,
      desc: "Resolved CI/CD 'run format check' pipeline failures, improving build reliability for a global multi-thousand contributor repository.",
      details: [
        "Automated code-style enforcement by integrating Maven Spotless plugin, ensuring consistent formatting standards across the large-scale codebase.",
        "Contributed to maintaining code quality and consistency in one of the world's most widely used machine learning frameworks.",
        "Worked with a global community of developers to ensure smooth CI/CD operations and code quality."
      ]
    },
    {
      company: "Eclipse Foundation",
      role: "Open Source Contributor",
      period: "Ongoing",
      icon: Globe,
      desc: "Improved project infrastructure and developer tooling to enhance contributor onboarding and productivity.",
      details: [
        "Refactored test suites to improve maintainability, code coverage, and stability across multiple environments.",
        "Resolved configuration issues to ensure seamless cross-environment integration and compatibility.",
        "Enhanced developer documentation and tooling for better contributor experience."
      ]
    }
  ];

  const projects = [
    {
      title: "Multi-Modal RAG & AI Chat Service",
      period: "Jan 2026",
      category: "AI / Backend",
      icon: Bot,
      desc: "A Retrieval-Augmented Generation pipeline enabling context-aware querying over private datasets using embedding-based similarity search, with multi-provider AI integrations.",
      longDesc: "This project implements a production-grade Retrieval-Augmented Generation (RAG) pipeline that enables intelligent, context-aware querying over private datasets. By leveraging embedding-based similarity search, the system significantly reduces LLM hallucinations and ensures that AI responses are grounded in actual source documents. The architecture is designed to support multiple LLM providers (OpenAI and Google Gemini) simultaneously through a modular Spring Boot configuration, allowing seamless switching or parallel use of different AI models. The system processes documents, generates vector embeddings, stores them for efficient retrieval, and uses the retrieved context to augment LLM prompts for highly accurate, domain-specific answers. Secure credential management via environment variables ensures the service is ready for production deployment.",
      highlights: [
        "Built a RAG pipeline enabling context-aware querying over private datasets using embedding-based similarity search, significantly reducing LLM hallucinations.",
        "Engineered custom Spring @Configuration with @Qualifier annotations to manage multi-provider AI beans (Gemini & OpenAI), enabling modular and scalable AI integrations.",
        "Implemented secure credential management using environment variables ensuring production-ready deployment best practices.",
        "Designed RESTful API backend architecture supporting multiple LLM providers and scalable document retrieval.",
        "Supports dynamic document ingestion with automatic embedding generation and indexing."
      ],
      tags: ["Java 21", "Spring Boot", "Spring AI", "REST", "RAG", "OpenAI API", "Gemini API", "Embedding Search"],
      liveLink: "https://rag-ai-chat.shreyansh.dev",
      githubLink: "https://github.com/sshekhar-04/multi-modal-rag-service"
    },
    {
      title: "Hybrid Quantum Key Distribution (QKD) Simulator API",
      period: "Nov 2025",
      category: "Cryptography / Security",
      icon: Key,
      desc: "A RESTful API simulating the BB84 protocol for quantum-resistant secure key exchange, with QBER validation and AES-256 GCM encryption.",
      longDesc: "This project demonstrates a comprehensive implementation of quantum key distribution concepts in a practical API-first architecture. The system simulates the BB84 quantum key exchange protocol, which is one of the foundational protocols in quantum cryptography. It implements the complete end-to-end secure key lifecycle — from quantum bit generation and basis selection, through the key sifting process where communicating parties compare measurement bases, to Quantum Bit Error Rate (QBER) validation that detects potential eavesdropping. Once a shared secret key is established through the quantum exchange, the system derives ephemeral AES-256 GCM session keys for quantum-resistant symmetric encryption of actual data. The API also includes error correction mechanisms inspired by real-world QKD implementations, making it both an educational tool and a practical demonstration of post-quantum security concepts.",
      highlights: [
        "Designed and implemented a RESTful API simulating the BB84 protocol for secure quantum key exchange, including QBER validation and error correction mechanisms.",
        "Derived ephemeral AES-256 GCM session keys from the quantum key exchange process for quantum-resistant symmetric encryption.",
        "Demonstrated end-to-end secure key lifecycle management including key generation, distribution, error correction, and cryptographic protocol implementation.",
        "Implemented real-time QBER (Quantum Bit Error Rate) monitoring for eavesdropping detection.",
        "Built with clean architecture principles for easy extensibility to other QKD protocols."
      ],
      tags: ["Java 21", "Spring Boot", "REST", "AES-256 GCM", "SHA-256", "BB84 Protocol", "Quantum Cryptography"],
      liveLink: "https://qkd-simulator.shreyansh.dev",
      githubLink: "https://github.com/sshekhar-04/quantum-key-distribution-api"
    },
    {
      title: "EventX — Full-Stack Event Booking Platform",
      period: "2026",
      category: "Full-Stack / SaaS Platform",
      icon: CalendarDays,
      desc: "A Spring Boot + MongoDB + React platform connecting Event Managers with Users to discover, book, and pay for events — with an AI-powered RAG chatbot, Razorpay payments, and a full booking lifecycle system.",
      longDesc: "EventX is a production-grade full-stack event booking platform that bridges the gap between Event Managers and Users looking to plan their special occasions. Whether it's a grand wedding, a corporate conference, a birthday celebration, or an anniversary party — EventX provides a seamless end-to-end experience from discovering the right planner to completing the booking and leaving a review.\n\nThe platform solves a real-world problem in the Indian events industry: there is no centralized, transparent, and trustworthy marketplace for event planning services. Most bookings still happen through word-of-mouth, WhatsApp groups, or unverified aggregator sites with no payment security or review system.\n\nEventX implements a clean layered Spring Boot architecture with 50+ REST endpoints across 10 modules, JWT-based dual-token auth with 3 roles (USER, MANAGER, ADMIN), a complete booking state machine (PENDING → CONFIRMED → IN_PROGRESS → COMPLETED / CANCELLED) with full audit trails, Razorpay payment integration with HMAC-SHA256 signature verification, and the most technically sophisticated feature — a RAG-powered AI chatbot. The chatbot splits platform documentation into 500-token chunks, converts them to 1536-dimensional embedding vectors via OpenAI, stores them in MongoDB Atlas Vector Search, and uses cosine similarity (≥ 0.6) to retrieve the most relevant context for answering user questions with zero hallucination.\n\nThe system includes 9 MongoDB collections, manager verification workflows, verified review systems, real-time in-app notifications at every booking stage, dynamic pricing with platform fees, and Cloudinary integration for image management. The React frontend (in progress) uses the Obsidian Noir design system — a dark luxury aesthetic with Framer Motion animations, Zustand state management, and TanStack Query for server state.",
      highlights: [
        "Built a production-ready REST API with 50+ endpoints, JWT auth with dual-token strategy (15-min access + 7-day refresh), role-based access control, and auto-generated Swagger documentation.",
        "Implemented a RAG-powered AI chatbot using Spring AI 1.0.0-M1, OpenAI embeddings (text-embedding-ada-002), and MongoDB Atlas Vector Search — grounding responses in real documentation to eliminate hallucinations.",
        "Integrated Razorpay with server-side order creation and HMAC-SHA256 signature verification for tamper-proof, cryptographically verified payment processing with partial payment and refund support.",
        "Designed a complete booking state machine (PENDING → CONFIRMED → IN_PROGRESS → COMPLETED / CANCELLED) with audit trail timeline, dynamic pricing (base + guest charges + 2% platform fee), and automatic notifications at every stage.",
        "Built a manager verification system with admin approval workflow, email notifications, and prevention of unverified listings — ensuring platform trust and quality.",
        "Implemented verified review system where only completed-booking users can review, with automatic rating recalculation, manager replies, and image upload support.",
        "Designed 9 MongoDB collections with compound indexes, TTL indexes for auto-cleanup, soft deletes for data integrity, and human-readable booking numbers (EVT-YYYY-XXXXX).",
        "Security: BCrypt password hashing, 256-bit HMAC-SHA256 JWT signing, file upload validation (type + size), server-side refresh token invalidation, and admin role restricted to direct DB access only."
      ],
      tags: ["Java 17", "Spring Boot", "Spring Security", "Spring AI", "MongoDB Atlas", "RAG", "OpenAI", "Razorpay", "JWT", "Cloudinary", "React", "Swagger"],
      liveLink: "https://eventx-platform.shreyansh.dev",
      githubLink: "https://github.com/sshekhar-04/EventX"
    }
  ];

  const achievements = [
    "Contributed to enterprise-scale open-source repositories including TensorFlow (Google) and Eclipse Foundation.",
    "Built secure distributed backend systems applying advanced cryptography (AES-256 GCM, SHA-256, QKD simulation).",
    "Designed AI-driven backend architectures integrating multiple LLM providers (OpenAI, Gemini) using RAG pipelines.",
    "Built EventX — a full-stack event booking platform with 50+ REST endpoints, Razorpay payments, and a RAG-powered AI chatbot.",
    "Strong foundation in system design, clean code principles, and scalable microservices architecture.",
    "Actively solving Data Structures & Algorithms problems; strong interest in Cloud Native infrastructure and distributed systems."
  ];

  const navItems = ['Experience', 'Projects', 'Skills', 'Education', 'Play'];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <ParticleField />

      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] sm:w-[35%] h-[35%] bg-blue-600/8 rounded-full blur-[100px] sm:blur-[140px] animate-float" />
        <div className="absolute top-[50%] -right-[10%] w-[40%] sm:w-[25%] h-[25%] bg-purple-600/8 rounded-full blur-[100px] sm:blur-[120px]" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] sm:w-[20%] h-[20%] bg-cyan-600/5 rounded-full blur-[80px] sm:blur-[100px]" style={{ animationDelay: '5s' }} />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <a href="#" className="flex items-center gap-1 transition group">
            <span className="text-lg sm:text-xl font-extrabold tracking-tighter group-hover:text-blue-400 transition-colors">
              SHREYANSH<span className="text-blue-500">.</span>
            </span>
            <span className="text-[10px] font-mono text-slate-600 hidden sm:inline ml-2">// dev</span>
          </a>

          <div className="hidden md:flex gap-1 text-sm font-medium text-slate-400">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all hover:border-white/20"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.resumeLink}
              download
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm border border-blue-500/30 hover:border-blue-500"
            >
              <Download size={16} /> Resume
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/95 backdrop-blur-xl border-b border-white/10 flex flex-col ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-6 py-6 flex flex-col gap-3 text-center">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-blue-400 py-2"
              >
                {item}
              </a>
            ))}
            <a
              href={profile.resumeLink}
              download
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-blue-600/20 text-blue-400 py-3 rounded-lg font-bold border border-blue-500/30 mx-auto w-full max-w-xs mt-2"
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 flex flex-col gap-28 sm:gap-36 pb-24">

        {/* ── HERO SECTION ── */}
        <section
          id="home"
          ref={heroRef}
          className={`flex flex-col lg:flex-row gap-10 sm:gap-16 items-center lg:items-center min-h-[60vh] transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex flex-col flex-1 space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1 items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Available for Opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] flex flex-col gap-1">
              <span className="text-slate-300">Hi, I'm</span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Shreyansh.
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-400 mt-2">
                Architecting <span className="text-white">Secure</span> & <span className="text-white">Scalable</span> Systems
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              {profile.about}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start py-4">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-xs text-slate-500 font-mono mt-1">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group font-bold shadow-lg shadow-blue-600/20"
              >
                View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center justify-center gap-3">
                <a href={profile.social.github} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1 hover:border-white/20">
                  <Github size={22} />
                </a>
                <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1 hover:border-white/20">
                  <Linkedin size={22} />
                </a>
                <a href={`mailto:${profile.email}`} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:-translate-y-1 hover:border-white/20 text-blue-400">
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Code Box */}
          <div className="flex-1 w-full max-w-lg relative group order-1 lg:order-2 flex justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative w-full glass-card rounded-2xl p-6 sm:p-8 font-mono text-[12px] sm:text-sm leading-relaxed flex flex-col animate-border-glow">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-slate-600 text-xs ml-3">developer_profile.rs</span>
              </div>
              <p className="text-slate-500">{"// System Profile v2.0"}</p>
              <p><span className="text-purple-400">pub</span> <span className="text-blue-400">struct</span> <span className="text-yellow-400">Developer</span> {"{"}</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">name</span>: <span className="text-green-400">"{profile.name}"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">role</span>: <span className="text-green-400">"Backend Engineer"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">location</span>: <span className="text-green-400">"{profile.location}"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">stack</span>: <span className="text-cyan-400">vec!</span>[<span className="text-green-400">"Java"</span>, <span className="text-green-400">"Spring"</span>, <span className="text-green-400">"Docker"</span>],</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">status</span>: <span className="text-green-400">"Building cool stuff 🚀"</span>,</p>
              <p className="ml-4 sm:ml-6"><span className="text-blue-300">open_source</span>: <span className="text-orange-400">true</span>,</p>
              <p>{"}"}</p>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE SECTION ── */}
        <section
          id="experience"
          ref={expRef}
          className={`flex flex-col transition-all duration-700 ${expVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            icon={Briefcase}
            title="Open Source Experience"
            subtitle="/* Contributing to global codebases */"
          />
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
            {experience.map((exp, i) => {
              const ExpIcon = exp.icon;
              return (
                <div
                  key={i}
                  className="flex-1 min-w-[300px] flex flex-col glass-card glass-card-hover rounded-2xl p-6 sm:p-8 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                        <ExpIcon size={22} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold leading-tight">{exp.company}</h3>
                        <p className="text-blue-400 text-sm font-medium mt-0.5">{exp.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{exp.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {exp.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-500">
                        <ChevronDown size={12} className="text-blue-500 mt-0.5 shrink-0 rotate-[-90deg]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PROJECTS SECTION ── */}
        <section
          id="projects"
          ref={projRef}
          className={`flex flex-col transition-all duration-700 ${projVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            icon={Rocket}
            title="Featured Projects"
            subtitle="/* Production-grade systems & APIs */"
          />
          <div className="flex flex-col gap-6 lg:gap-8">
            {projects.map((proj, i) => {
              const ProjIcon = proj.icon;
              return (
                <div
                  key={i}
                  className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 transition-all duration-300 group cursor-pointer"
                  onClick={() => setActiveProject(proj)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                          <ProjIcon size={22} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-blue-300 transition-colors">
                            {proj.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              {proj.period}
                            </span>
                            <span className="text-xs font-mono text-slate-500">{proj.category}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-5">
                        {proj.desc}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {proj.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="text-[10px] sm:text-xs font-medium px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-lg border border-blue-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          <ExternalLink size={14} /> Live Demo <ArrowUpRight size={12} />
                        </a>
                        <span className="text-slate-700">|</span>
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white font-medium transition-colors"
                        >
                          <Github size={14} /> Source Code
                        </a>
                        <span className="text-slate-700">|</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveProject(proj); }}
                          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 font-medium transition-colors cursor-pointer"
                        >
                          <Eye size={14} /> Read More
                        </button>
                      </div>
                    </div>

                    {/* Mini highlights on the side */}
                    <div className="lg:w-72 shrink-0 flex flex-col gap-2 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Key Highlights</h4>
                      {proj.highlights.slice(0, 3).map((h, k) => (
                        <div key={k} className="flex items-start gap-2 text-xs text-slate-500">
                          <Zap size={10} className="text-blue-500 mt-0.5 shrink-0" />
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SKILLS SECTION ── */}
        <section
          id="skills"
          ref={skillRef}
          className={`flex flex-col transition-all duration-700 ${skillVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            icon={Shield}
            title="Technical Arsenal"
            subtitle="/* Built for Scalability & Security */"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((group, i) => {
              const SkillIcon = group.icon;
              return (
                <div
                  key={i}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                      <SkillIcon size={18} className="text-blue-400" />
                    </div>
                    <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, j) => (
                      <span
                        key={j}
                        className="text-xs font-medium px-3 py-1.5 bg-white/5 text-slate-300 rounded-lg border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── EDUCATION & ACHIEVEMENTS ── */}
        <section
          id="education"
          ref={eduRef}
          className={`flex flex-col transition-all duration-700 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            icon={GraduationCap}
            title="Education & Achievements"
            subtitle="/* Learning never stops */"
          />
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Education card */}
            <div className="flex-1 glass-card glass-card-hover rounded-2xl p-6 sm:p-8 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <BookOpen size={22} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{profile.education.degree}</h3>
                  <p className="text-blue-400 text-sm font-medium">{profile.education.college}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-500" />
                  <span>{profile.education.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-slate-500" />
                  <span>{profile.education.year}</span>
                </div>
              </div>
            </div>

            {/* Achievements card */}
            <div className="flex-1 glass-card glass-card-hover rounded-2xl p-6 sm:p-8 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <Award size={22} className="text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold">Achievements & Highlights</h3>
              </div>
              <ul className="space-y-3">
                {achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <Star size={12} className="text-yellow-500 mt-1 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── PLAY SECTION ── */}
        <section
          id="play"
          ref={playRef}
          className={`flex flex-col gap-10 transition-all duration-700 ${playVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeading
            icon={Cpu}
            title="Interactive Zone"
            subtitle="/* Take a break and play */"
          />
          <TechMemoryGame />
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-extrabold tracking-tighter">
              SHREYANSH<span className="text-blue-500">.</span>
            </span>
            <p className="text-slate-500 text-xs font-mono">
              © {new Date().getFullYear()} Shreyansh Shekhar Dwivedi
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-slate-500">
            <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Mail size={14} /> {profile.email}
            </a>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Github size={14} /> GitHub
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>

          <a
            href={profile.resumeLink}
            download
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <Download size={14} /> Download Resume
          </a>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
};

export default Portfolio;