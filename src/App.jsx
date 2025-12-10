import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Github,
  Linkedin,
  ArrowRight,
  Server, 
  Database, 
  Code2, 
  ExternalLink, 
  Menu,
  X
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const profile = {
    name: "Shreyansh Shekhar Dwivedi",
    role: "Full Stack Developer",
    tagline: "Building scalable backend systems & secure applications",
    location: "Noida, UP",
    email: "shreyanshad512gb@gmail.com",
    about: "Software developer specializing in backend systems, security protocols, and full-stack applications. Passionate about clean code, system design, and solving complex problems with technology.",
    education: {
      degree: "B.Tech in Computer Science Engineering (Data Science)",
      college: "JSSATEN",
      year: "2024 - 2028 (Expected)"
    },
    social: {
      github: "#",
      linkedin: "#"
    }
  };

  const skills = [
    { 
      category: "Languages", 
      items: ["Java", "Rust", "JavaScript", "Shell Scripting", "Bash", "Python"] 
    },
    { 
      category: "Backend & Frameworks", 
      items: ["Spring Boot", "Node.js", "REST APIs", "WebSockets", "Microservices"] 
    },
    { 
      category: "Databases & Tools", 
      items: ["PostgreSQL", "MongoDB", "Firebase", "Docker", "Git", "Linux"] 
    },
    { 
      category: "Specializations", 
      items: ["DSA", "OOP", "Security Protocols", "Cryptography", "System Design"] 
    }
  ];

  const projects = [
    {
      title: "Hybrid QKD Simulator API",
      date: "Nov 2025",
      tech: ["Java 21", "Spring Boot", "AES-256", "REST API"],
      description: "Enterprise-grade REST API implementing BB84 QKD protocol with cryptographic validation, QBER checking, and privacy amplification for secure key derivation.",
      highlights: ["Stateless architecture", "Cryptographic validation", "AES-256 GCM encryption"],
      link: "#"
    },
    {
      title: "Real-Time Chat Application",
      date: "Nov 2025",
      tech: ["Java", "Spring Boot", "MongoDB", "WebSockets"],
      description: "Persistent, room-based chat system with real-time messaging. Implemented transactional message handling to ensure database persistence before broadcasting.",
      highlights: ["Real-time sync", "Message persistence", "Room management"],
      link: "#"
    },
    {
      title: "Food Waste Management System",
      date: "Dec 2024",
      tech: ["Node.js", "Firebase", "React", "Web"],
      description: "Community-driven platform connecting food donors with those in need, reducing food waste while supporting social welfare initiatives.",
      highlights: ["Social impact", "Real-time coordination", "User-friendly interface"],
      link: "#"
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition">
            Shreyansh.dev
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800/50 px-6 py-4 space-y-3">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-slate-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Available for work
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-slate-100">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {profile.name.split(' ').pop()}
                </span>
              </h1>
              <p className="text-2xl text-slate-400 mb-4">{profile.tagline}</p>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                {profile.about}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`mailto:${profile.email}`}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 flex items-center justify-center gap-2 group"
              >
                Get in Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#projects"
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50 flex items-center justify-center gap-2"
              >
                View My Work
                <Code2 size={18} />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href={profile.social.github} className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50">
                <Github size={20} />
              </a>
              <a href={profile.social.linkedin} className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${profile.email}`} className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all duration-300 border border-slate-700/50 hover:border-blue-500/50">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right - Code/Visual */}
          <div className="hidden md:block relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm h-full flex flex-col justify-center space-y-4 font-mono text-sm">
              <div className="text-slate-400">
                <span className="text-green-400">const</span> <span className="text-blue-300">developer</span> = {'{'}
              </div>
              <div className="ml-4 space-y-2 text-slate-300">
                <div><span className="text-purple-400">name</span>: <span className="text-green-400">"Shreyansh"</span>,</div>
                <div><span className="text-purple-400">role</span>: <span className="text-green-400">"Full Stack Developer"</span>,</div>
                <div><span className="text-purple-400">expertise</span>: [<span className="text-green-400">"Backend"</span>, <span className="text-green-400">"Security"</span>, <span className="text-green-400">"Systems"</span>],</div>
                <div><span className="text-purple-400">passionate</span>: <span className="text-orange-400">true</span></div>
              </div>
              <div className="text-slate-400">{'}'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-lg">Showcase of my recent work and technical implementations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-blue-400 text-sm font-mono">{project.date}</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mt-2">
                      {project.title}
                    </h3>
                  </div>
                  <ExternalLink className="text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" size={24} />
                </div>

                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-medium rounded-full border border-blue-500/20 group-hover:border-blue-500/50 group-hover:bg-blue-500/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-slate-400 text-lg">Technologies and domains I specialize in</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skillGroup, idx) => (
            <div 
              key={idx}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 p-8 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 bg-slate-800/70 text-slate-300 rounded-lg border border-slate-700/50 group-hover:border-blue-500/50 hover:bg-slate-700/50 hover:text-blue-300 transition-all duration-200 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 p-12 md:p-16">
          <h2 className="text-4xl font-bold mb-6 text-center">Let's Work Together</h2>
          <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto mb-12">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a 
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Mail className="text-blue-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-400">Email</div>
                <div className="text-white font-semibold group-hover:text-blue-400 transition-colors">{profile.email}</div>
              </div>
            </a>

            <div className="group flex items-center gap-4 p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="text-blue-400" size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-400">Location</div>
                <div className="text-white font-semibold">{profile.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-slate-400">
            © 2025 {profile.name}. All rights reserved.
          </p>
          <div className="text-slate-500 text-sm">
            Crafted with React, Tailwind CSS & ☕
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
