import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Github, Linkedin, Mail, Code2, ExternalLink, Download, User, MapPin, Search, Menu, X, Landmark, GraduationCap, Briefcase, BrainCircuit, Cpu, Laptop, Send, Phone, MessageSquare, Award, CheckCircle2, Sparkles, Target, Zap, Sun, Moon
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Typewriter } from 'react-simple-typewriter';

const RESUME_URL = '/Ganesh_Resume.pdf';
const DEPLOY_URL = 'https://portfolio-ganeshbobbala.vercel.app/';

// --- COMPONENTS ---

const SectionHeader = ({ title, subtitle }) => (
    <div className="flex flex-col items-center justify-center text-center mb-10 px-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-normal mb-4 text-white capitalize">{title}</h2>
        <p className="text-zinc-500 text-sm md:text-base font-medium tracking-wide">{subtitle}</p>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mt-4 rounded-full" />
    </div>
);

const Navbar = ({ isDark, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const tabs = ['Home', 'About', 'My skills', 'My projects', 'Education', 'Certifications', 'Contact'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-3xl border-b border-white/5 py-4 px-6 md:px-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center text-white">
                <a href="#home" className="text-2xl font-black tracking-tighter text-blue-500 italic flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center italic text-sm">P</div>
                    Portfolio
                </a>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                    {tabs.map((tab) => (
                        <a 
                            key={tab} 
                            href={`#${tab.replace(/\s+/g, '').toLowerCase()}`} 
                            className="text-xs font-black tracking-[0.1em] text-zinc-300 hover:text-white transition-all px-4 py-2 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-600/40 uppercase shadow-[0_0_20px_rgba(37,99,235,0.05)] hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                        >
                            {tab}
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className="ml-2 relative w-14 h-7 rounded-full transition-all duration-300 border focus:outline-none"
                        style={{
                            background: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(250,204,21,0.15)',
                            borderColor: isDark ? 'rgba(37,99,235,0.4)' : 'rgba(250,204,21,0.5)'
                        }}
                    >
                        <motion.div
                            layout
                            animate={{ x: isDark ? 2 : 30 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute top-[3px] w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: isDark ? '#3b82f6' : '#facc15' }}
                        >
                            {isDark
                                ? <Moon size={11} className="text-white" />
                                : <Sun size={11} className="text-zinc-900" />}
                        </motion.div>
                    </button>
                </div>

                {/* Mobile Right: Theme Toggle + Hamburger */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className="relative w-12 h-6 rounded-full transition-all duration-300 border focus:outline-none"
                        style={{
                            background: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(250,204,21,0.15)',
                            borderColor: isDark ? 'rgba(37,99,235,0.4)' : 'rgba(250,204,21,0.5)'
                        }}
                    >
                        <motion.div
                            layout
                            animate={{ x: isDark ? 2 : 25 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute top-[2px] w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: isDark ? '#3b82f6' : '#facc15' }}
                        >
                            {isDark
                                ? <Moon size={9} className="text-white" />
                                : <Sun size={9} className="text-zinc-900" />}
                        </motion.div>
                    </button>
                    <button 
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-zinc-950/95 border-b border-white/5 overflow-hidden"
                >
                  <div className="flex flex-col p-6 gap-4">
                    {tabs.map((tab) => (
                      <a 
                        key={tab} 
                        href={`#${tab.replace(/\s+/g, '').toLowerCase()}`} 
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-black text-zinc-400 hover:text-white transition-colors py-2 flex items-center justify-between"
                      >
                        {tab}
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </nav>
    );
};



const RotatingReactLogo = () => {
    const groupRef = useRef();
    useFrame(({ clock }) => {
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
        groupRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef} scale={1.2}>
                {/* Nucleus */}
                <Sphere args={[0.3, 32, 32]}>
                    <meshBasicMaterial color="#61dafb" />
                </Sphere>
                
                {/* Orbits */}
                <group rotation={[0, 0, 0]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.8, 0.04, 16, 100]} />
                        <meshBasicMaterial color="#61dafb" transparent opacity={0.6} />
                    </mesh>
                </group>
                <group rotation={[0, 0, Math.PI / 3]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.8, 0.04, 16, 100]} />
                        <meshBasicMaterial color="#61dafb" transparent opacity={0.6} />
                    </mesh>
                </group>
                <group rotation={[0, 0, -Math.PI / 3]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.8, 0.04, 16, 100]} />
                        <meshBasicMaterial color="#61dafb" transparent opacity={0.6} />
                    </mesh>
                </group>

                {/* Outer Glow Orbits for Hologram Effect */}
                <group rotation={[0, 0, 0]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.8, 0.1, 8, 100]} />
                        <meshBasicMaterial color="#61dafb" transparent opacity={0.1} wireframe />
                    </mesh>
                </group>
            </group>
        </Float>
    );
};

const App = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    const roles = ["Problem Solver", "Software Engineer", "Web Developer", "Frontend Developer"];

    const skills = [
        { title: "Programming Languages", items: ["Java"] },
        { title: "Web Technologies", items: ["HTML", "CSS", "JavaScript"] },
        { title: "Database Technologies", items: ["MySQL"] },
        { title: "Tools & Platforms", items: ["Git", "GitHub", "Visual Studio Code"] },
        { title: "Core Concepts", items: ["Object-Oriented Programming (OOP)", "DBMS"] },
        { title: "Soft Skills", items: ["Problem Solving", "Team Collaboration", "Communication", "Adaptability"] }
    ];

// (removed unused education constant; education UI uses inline data)

    const certs = [
        { n: "AI Tools and ChatGPT Workshop", i: "be10x", link: "/Copy of Be10x participate.pdf", c: "bg-purple-500/10 text-purple-500" },
        { n: "Software Engineering Job Simulation", i: "JPMorgan Chase & Co. (Forage)", link: "/Software Engineering Job Simulation.pdf", c: "bg-blue-500/10 text-blue-500" },
        { n: "Generative AI for Beginners", i: "Simplilearn SkillUp", link: "/Generative AI for Beginners.pdf", c: "bg-pink-500/10 text-pink-500" },
        { n: "GenAI Powered Data Analytics Job Simulation", i: "JPMorgan Chase & Co. (Forage)", link: "/GenAI Powered Data Analytics Job Simulation.pdf", c: "bg-indigo-500/10 text-indigo-500" },
        { n: "Prompt Engineering", i: "Infosys Springboard", link: "/prompt Engineering.pdf", c: "bg-emerald-500/10 text-emerald-500" }
    ];

    const projects = [
        {
            title: "MarroeCode – AI-Powered Coding Practice Platform",
            bullets: [
                "Developed a full-stack coding practice platform with a modern IDE-style interface for writing, executing, and analyzing code in real time.",
                "Built an AI-powered Python AST analysis engine to detect code complexity, logic errors, and provide intelligent coding feedback and execution insights.",
                "Integrated Supabase PostgreSQL database with interactive React dashboards to store coding history, track user performance, and visualize learning analytics."
            ],
            tech: ["React.js", "Supabase", "PostgreSQL", "Python", "AST"],
            github: "https://github.com/Ganeshbobbala/MarroeCode"
        },
        {
            title: "Autism Detection via Video Recognition",
            bullets: [
                "Developed a web-based system that detects autism-related behaviors from uploaded videos using CNN + LSTM deep learning models.",
                "Trained CNN + LSTM models to recognize behavioral patterns, integrating landmarks and pose estimation via OpenCV and MediaPipe.",
                "Stored video metadata and user analysis history securely using a custom MongoDB schema."
            ],
            tech: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "MongoDB"],
            github: "https://github.com/Ganeshbobbala/Behavioural-Video-Recognition-for-Autism-Detection"
        },
        {
            title: "Driver Drowsiness Detection System",
            bullets: [
                "Monitored driver drowsiness using computer vision to analyze eye blink rate, head movement, and facial features in real-time.",
                "Integrated Arduino controllers and IoT sensors with real-time facial detection alert mechanisms.",
                "Programmed computer vision modules in Python with OpenCV to trigger immediate physical alarms."
            ],
            tech: ["Arduino", "Python", "OpenCV", "IoT Sensors"]
        },
        {
            title: "Smart PDS: Automated Time-Slot Booking & Distribution System",
            bullets: [
                "Developed a full-stack web application with role-based access for customers, distributors, and government authorities.",
                "Integrated a Scikit-learn machine learning model through a Flask API to predict ration card eligibility.",
                "Built a real-time admin dashboard with inventory tracking, analytics visualization, a QR-based token system, and notification features using Socket.io and Twilio."
            ],
            tech: ["HTML", "CSS", "JavaScript", "Node.js", "Flask", "Socket.io", "Twilio", "Supabase"],
            github: "https://github.com/Ganeshbobbala/portfolio"
        },
        {
            title: "EMG-Based Parkinson’s Disease Detection System",
            bullets: [
                "Designed a real-time health monitoring prototype using Arduino Uno to capture muscle activity.",
                "Applied signal processing algorithms to detect abnormal neuromuscular patterns from EMG sensors.",
                "Offered a low-cost, non-invasive wearable prototype for early healthcare monitoring and diagnosis."
            ],
            tech: ["Arduino Uno", "Embedded C", "EMG Sensors", "Signal Processing"]
        }
    ];

    return (
        <div className="bg-[#020202] text-white min-h-screen selection:bg-purple-500/30 overflow-x-hidden font-sans portfolio-root">
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />

            {/* --- HERO --- */}
            <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    <Canvas 
                        camera={{ position: [0, 0, 5], fov: 60 }} 
                        style={{ background: 'transparent' }}
                    >
                        <ambientLight intensity={1} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <RotatingReactLogo />
                    </Canvas>
                </div>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1], 
                        x: [0, 50, -50, 0], 
                        y: [0, -50, 50, 0] 
                    }}
                    transition={{ 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full opacity-60 pointer-events-none" 
                />
                <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
                    <motion.p
                        initial={{ opacity: 0, tracking: '0.1em' }}
                        animate={{ opacity: 1, tracking: '0.5em' }}
                        className="text-purple-500 text-xs font-black uppercase mb-10"
                    >
                        <span className="text-purple-500 text-base font-black uppercase mb-10">Welcome to my portfolio</span>
                    </motion.p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-normal mb-8 leading-none select-none">
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500">Ganesh</span>
                    </h1>
                    <div className="h-16 md:h-20 mb-12">
                        <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tight">
                            <Typewriter
                                words={roles}
                                loop={0}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={2000}
                            />
                        </span>
                    </div>
                    <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-16 px-4">
                        Building intelligent AI-driven solutions and scalable modern web applications.
                    </p>
                    <div className="flex justify-center mb-16">
                        <a href="#myprojects" className="w-full md:w-auto bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1">View Projects</a>
                    </div>
                </div>
            </section>

            {/* --- ABOUT --- */}
            <section id="about" className="py-8">
                <SectionHeader title="About Me" subtitle="Get to know me a little better" />
                <div className="max-w-6xl mx-auto px-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-center">
                        <div className="lg:w-[40%] relative group">
                            {/* Neon Glow Aura */}
                            <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/10">
                                <img src="/My Photo.png" alt="Ganesh Bobbala" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                {/* Inner Gloss Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <div className="lg:w-[60%]">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-normal">Aspiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">Software Engineer</span></h2>
                            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
                                Aspiring Software Engineer with strong foundations and hands-on experience in Java, web development, and software engineering concepts. Skilled in building responsive web applications, problem-solving, and developing scalable software solutions. Passionate about learning modern technologies and contributing to innovative software development projects in collaborative environments.
                            </p>
                            <div className="flex flex-wrap gap-8 mb-12">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><GraduationCap size={16} className="text-blue-500" /> B.Tech CSE (AI & ML)</div>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><MapPin size={16} className="text-blue-500" /> India</div>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><Code2 size={16} className="text-blue-500" /> Open to Opportunities</div>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><Sparkles size={16} className="text-blue-500" /> Passionate Learner</div>
                            </div>
                            <div className="flex flex-wrap gap-4 mb-12">
                                {[
                                    { label: 'Portfolio', href: DEPLOY_URL },
                                    { label: 'GitHub', href: 'https://github.com/Ganeshbobbala/portfolio' },
                                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ganesh-bobbala-9a7a52327' }
                                ].map((link) => (
                                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
                                {[
                                    { l: 'Projects', v: '5+', href: '#myprojects' }, { l: 'Certifications', v: '5+', href: '#certifications' }
                                ].map((s, i) => (
                                    <a key={i} href={s.href} className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-zinc-900 transition-all cursor-pointer">
                                        <p className="text-4xl font-black text-blue-500 mb-1">{s.v}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{s.l}</p>
                                    </a>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-6 mt-12">
                                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1 group">
                                    <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" /> View Resume
                                </a>
                                <a href={RESUME_URL} download="Ganesh_Bobbala_Resume.pdf" className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1 group">
                                    <Download size={18} className="group-hover:translate-y-1 transition-transform" /> Download Resume
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SKILLS --- */}
            <section id="myskills" className="py-12 bg-zinc-950/20">
                <SectionHeader title="My skills" subtitle="Core competencies and frameworks" />
                <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {skills.map((s, i) => (
                        <div key={i} className="bg-zinc-950/80 border border-zinc-900 p-10 rounded-[2rem] hover:border-purple-500/20 transition-all group backdrop-blur-3xl">
                            <h3 className="text-purple-500 text-sm font-black tracking-widest uppercase mb-10">{s.title}</h3>
                            <div className="flex flex-wrap gap-4">
                                {s.items.map(item => (
                                    <span key={item} className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-sm font-black text-zinc-400 hover:text-white hover:border-purple-500/50 transition-all rounded-2xl uppercase tracking-tighter">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PROJECTS --- */}
            <section id="myprojects" className="py-12">
                <SectionHeader title="My projects" subtitle="Some of the things I've built" />
                <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((proj, i) => (
                        <div key={i} className="flex flex-col justify-between border border-zinc-900 bg-zinc-950/40 p-8 md:p-10 rounded-[2.5rem] group hover:border-blue-500/20 transition-all backdrop-blur-3xl hover:bg-zinc-900/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6 leading-snug group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                                <div className="bg-zinc-900/40 p-6 rounded-2xl mb-8 border border-zinc-800/30">
                                    <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
                                        {proj.bullets.map((bullet, idx) => (
                                            <li key={idx} className="marker:text-blue-500">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {proj.tech.map(t => (
                                        <span key={t} className="px-3.5 py-1.5 bg-zinc-900 text-[10px] font-black uppercase text-zinc-500 rounded-lg border border-zinc-800">{t}</span>
                                    ))}
                                </div>
                                {proj.github && (
                                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] hover:text-blue-400 transition-all group-hover:translate-x-1 transition-transform">
                                        <Github size={16} /> View my project
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- EDUCATION --- */}
            <section id="education" className="py-12">
                <SectionHeader title="Education" subtitle="My academic journey" />
                <div className="max-w-4xl mx-auto px-10 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-indigo-500 hidden md:block shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                    <div className="space-y-10">
                        {[
                            { title: "Bachelor of Technology", date: "AUG 2023 - PRESENT", org: "Kalasalingam Academy of Research and Education", f: "Computer Science and Engineering (AI & ML)", grade: "CGPA: 8.63", icon: "🎓", align: "left", c: "purple" },
                            { title: "Higher Secondary Education (MPC)", date: "2021 - 2023", org: "Sri Chaitanya Junior College", grade: "Percentage: 89.7%", icon: "📚", align: "right", c: "pink" },
                            { title: "Secondary School Certificate (SSC)", date: "2020 - 2021", org: "Sri Srinivasa High School", grade: "Percentage: 100%", icon: "🏫", align: "left", c: "blue" }
                        ].map((exp, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${exp.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                <motion.div
                                    whileInView={{ x: exp.align === 'left' ? [20, 0] : [-20, 0], opacity: [0, 1] }}
                                    viewport={{ once: true }}
                                    className={`md:w-[45%] text-center px-10 ${exp.align === 'left' ? 'md:text-left' : 'md:text-right'}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                        <h4 className="text-xl md:text-2xl font-black tracking-normal text-white">{exp.title}</h4>
                                        <div className="bg-zinc-950/90 border-r-4 border-r-pink-500 px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.1)] group-hover:scale-105 transition-all w-fit self-end md:self-auto">
                                            {exp.date.includes(' - ') ? (
                                                <div className="flex flex-col items-end leading-none">
                                                    <span className="text-[10px] font-black text-pink-500/60 uppercase mb-0.5 tracking-tighter">{exp.date.split(' - ')[0]} —</span>
                                                    <span className="text-sm font-black text-pink-500 tracking-wide">{exp.date.split(' - ')[1]}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-end leading-none">
                                                    <span className="text-sm font-black text-pink-500 tracking-wide">{exp.date}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 font-bold text-sm md:text-base mb-4">{exp.org}</p>
                                    {exp.f && <p className="text-zinc-400 font-medium mb-2 text-sm italic">{exp.f}</p>}
                                    {exp.grade && <p className="text-zinc-500 font-semibold text-xs tracking-wide">{exp.grade}</p>}
                                </motion.div>
                                <div className={`z-10 w-16 h-16 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl ${exp.c === 'purple' ? 'shadow-purple-500/10' : exp.c === 'pink' ? 'shadow-pink-500/10' : 'shadow-blue-500/10'}`}>
                                    <span className="text-2xl">{exp.icon}</span>
                                </div>
                                <div className="md:w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CERTS --- */}
            <section id="certifications" className="py-12 bg-zinc-950/10">
                <SectionHeader title="Certifications" subtitle="Courses and achievements I've completed" />
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {certs.map((c, i) => (
                        <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-[3rem] hover:border-blue-500/20 transition-all flex flex-col gap-6 group backdrop-blur-3xl hover:bg-zinc-900/50 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)]">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.c} group-hover:scale-110 transition-transform`}><Award size={24} /></div>
                            <h4 className="text-white font-black tracking-tight text-lg leading-snug h-14 line-clamp-2">{c.n}</h4>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4 h-8 line-clamp-2">{c.i}</p>
                            <a 
                                href={c.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                            >
                                View Certificate <ExternalLink size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </section>


            {/* --- CONTACT --- */}
            <section id="contact" className="py-16 relative overflow-hidden">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.4, 1], 
                        x: [-100, 100, -100], 
                        y: [-100, 100, -100] 
                    }}
                    transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 blur-[200px] rounded-full pointer-events-none" 
                />
                <div className="max-w-6xl mx-auto px-10 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-32">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-black tracking-normal mb-10 leading-none">Let's build <br /><span className="text-purple-500 italic lowercase tracking-normal">something great</span> together.</h2>
                            <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-16 max-w-lg">
                                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out!
                            </p>
                            <div className="space-y-12">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-zinc-950 border border-zinc-900 rounded-[1.5rem] flex items-center justify-center text-zinc-500 group-hover:text-purple-500 transition-colors shadow-xl"><Mail size={24} /></div>
                                    <div>
                                        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-1">Email Me</p>
                                        <p className="text-lg font-bold text-white tracking-tight underline decoration-purple-500/30 underline-offset-8 group-hover:decoration-purple-500 transition-all">ganeshbobbala479@gmail.com</p>
                                    </div>
                                </div>

                            </div>
                            <div className="flex gap-4 mt-16">
                                {[
                                    { i: <Github />, l: 'https://github.com/Ganeshbobbala/portfolio' },
                                    { i: <Linkedin />, l: 'https://www.linkedin.com/in/ganesh-bobbala-9a7a52327' },
                                    { i: <Mail />, l: 'mailto:ganeshbobbala479@gmail.com' }
                                ].map((s, i) => (
                                    <a key={i} href={s.l} className="w-14 h-14 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center text-pink-500/40 hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all">{s.i}</a>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative group">
                            {/* Neon Glow Aura */}
                            <div className="absolute -inset-4 bg-blue-600/10 rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                            
                            <div className="relative bg-zinc-950/50 border-2 border-blue-500/30 p-10 rounded-[3rem] backdrop-blur-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)] group-hover:border-blue-500/60 group-hover:shadow-[0_0_60px_rgba(37,99,235,0.3)] transition-all duration-500">
                                <form 
                                    action="https://api.web3forms.com/submit" 
                                    method="POST"
                                    className="space-y-8 relative z-10"
                                >
                                    {/* Web3Forms Access Key */}
                                    <input type="hidden" name="access_key" value="f68f56d8-f04c-484b-b05b-098118c61c45" />
                                    <input type="hidden" name="subject" value="New Portfolio Message" />
                                    <input type="checkbox" name="botcheck" className="hidden" />

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Your Name</label>
                                        <input 
                                            name="name"
                                            required
                                            type="text" 
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-700 font-bold" 
                                            placeholder="Ganesh Bobbala" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Your Email</label>
                                        <input 
                                            name="email"
                                            required
                                            type="email" 
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-700 font-bold" 
                                            placeholder="ganesh@example.com" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea 
                                            name="message"
                                            required
                                            rows={4} 
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[2rem] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-zinc-700 font-bold resize-none" 
                                            placeholder="Tell me about your vision..."
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full bg-blue-600 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex items-center justify-center gap-4 hover:-translate-y-1 active:translate-y-0"
                                    >
                                        Send Message <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 border-t border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-10 text-center">
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-[0.3em] mb-4">
                        Designed & Built with ❤️ by <span className="text-white">Ganesh Bobbala</span>
                        {' · '}
                        <a href={DEPLOY_URL} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">Live Site</a>
                        {' · '}
                        <a href="https://github.com/Ganeshbobbala/portfolio" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">GitHub</a>
                    </p>
                </div>
            </footer>
        </div >
    );
};

export default App;
