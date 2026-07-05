import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
    Github, Linkedin, Mail, Code2, ExternalLink, Download, User, MapPin, Search, Menu, X, Landmark, GraduationCap, Briefcase, BrainCircuit, Cpu, Laptop, Send, Phone, MessageSquare, Award, CheckCircle2, Sparkles, Target, Zap, Sun, Moon, Database
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import Tilt from 'react-parallax-tilt';

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
    const [isScrolled, setIsScrolled] = useState(false);
    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#myskills' },
        { label: 'Projects', href: '#myprojects' },
        { label: 'Education', href: '#education' },
        { label: 'Certs', href: '#certifications' },
        { label: 'Contact', href: '#contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed z-[100] transition-all duration-500 ${
            isScrolled 
                ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl px-6 py-2.5 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
                : 'top-0 left-0 right-0 py-4 px-6 md:px-0 border-b border-white/5 bg-black/60 backdrop-blur-3xl'
        }`}>
            <div className="w-full max-w-7xl mx-auto px-2 md:px-4 flex justify-between items-center text-white">
                <a href="#home" className="text-2xl font-black tracking-tighter text-blue-500 italic flex items-center gap-2 hover:text-blue-400 transition-colors group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center italic text-sm transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.8)] group-hover:scale-105">P</div>
                    Portfolio
                </a>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => (
                        <a 
                            key={item.label} 
                            href={item.href} 
                            className="text-xs font-black tracking-[0.1em] text-zinc-300 hover:text-white transition-all px-4 py-2 rounded-xl bg-transparent hover:bg-blue-600/20 border border-transparent hover:border-blue-600/40 uppercase"
                        >
                            {item.label}
                        </a>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className="ml-4 relative w-16 h-8 rounded-full transition-all duration-300 border focus:outline-none"
                        style={{
                            background: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(250,204,21,0.15)',
                            borderColor: isDark ? 'rgba(37,99,235,0.4)' : 'rgba(250,204,21,0.5)'
                        }}
                    >
                        <motion.div
                            layout
                            animate={{ x: isDark ? 2 : 34 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute top-[3px] w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: isDark ? '#3b82f6' : '#facc15' }}
                        >
                            {isDark
                                ? <Moon size={13} className="text-white" />
                                : <Sun size={13} className="text-zinc-900" />}
                        </motion.div>
                    </button>
                </div>

                {/* Mobile Right: Theme Toggle + Hamburger */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        className="relative w-14 h-7 rounded-full transition-all duration-300 border focus:outline-none"
                        style={{
                            background: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(250,204,21,0.15)',
                            borderColor: isDark ? 'rgba(37,99,235,0.4)' : 'rgba(250,204,21,0.5)'
                        }}
                    >
                        <motion.div
                            layout
                            animate={{ x: isDark ? 2 : 28 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute top-[2.5px] w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: isDark ? '#3b82f6' : '#facc15' }}
                        >
                            {isDark
                                ? <Moon size={11} className="text-white" />
                                : <Sun size={11} className="text-zinc-900" />}
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
                    {navItems.map((item) => (
                      <a 
                        key={item.label} 
                        href={item.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-black text-zinc-400 hover:text-white transition-colors py-2 flex items-center justify-between"
                      >
                        {item.label}
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


const Counter = ({ value, duration = 1.5 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const num = parseInt(value, 10);
        if (isNaN(num)) return;
        
        let start = 0;
        const end = num;
        const totalMiliseconds = duration * 1000;
        const stepTime = Math.abs(Math.floor(totalMiliseconds / end));
        
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, Math.max(stepTime, 20));
        
        return () => clearInterval(timer);
    }, [value, duration]);
    
    const suffix = value.includes('+') ? '+' : '';
    return <span>{count}{suffix}</span>;
};

const MagneticButton = ({ children, className, ...props }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.35, y: y * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

const OrbitingTech = () => {
    const icons = [
        { name: 'Java', color: 'text-red-500' },
        { name: 'Python', color: 'text-blue-400' },
        { name: 'React', color: 'text-cyan-400' },
        { name: 'JS', color: 'text-yellow-400' },
        { name: 'MySQL', color: 'text-orange-400' },
        { name: 'Git', color: 'text-red-400' },
        { name: 'VS Code', color: 'text-blue-500' },
        { name: 'OOP', color: 'text-purple-400' }
    ];

    return (
        <div className="relative w-80 h-80 mx-auto flex items-center justify-center overflow-hidden">
            {/* Ambient Radial Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
            
            {/* Center Node */}
            <div className="relative z-10 w-24 h-24 bg-zinc-950 border border-zinc-800 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.15)] group hover:border-blue-500/40 transition-colors duration-500">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-10 group-hover:opacity-25 transition-opacity" />
                <BrainCircuit size={36} className="text-blue-500 group-hover:text-purple-400 transition-colors duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-2">Skills</span>
            </div>

            {/* Orbiting Rings */}
            <div className="absolute w-64 h-64 border border-zinc-800/40 rounded-full border-dashed animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-44 h-44 border border-zinc-800/20 rounded-full border-dashed animate-[spin_25s_linear_infinite_reverse]" />

            {/* Orbiting Items */}
            {icons.map((ico, idx) => {
                const startAngle = (idx * 360) / icons.length;
                return (
                    <div 
                        key={ico.name} 
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            className="absolute w-full h-full flex items-center justify-center"
                            animate={{ rotate: [startAngle, startAngle + 360] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            <motion.div
                                className="absolute top-2 w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center shadow-xl hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all pointer-events-auto cursor-pointer"
                                animate={{ rotate: [-startAngle, -(startAngle + 360)] }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            >
                                <span className={`text-[10px] font-black tracking-widest uppercase ${ico.color}`}>{ico.name}</span>
                            </motion.div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};



const TimelineCanvas = ({ containerRef }) => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let activePos = { x: 40, y: 0, active: false };
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 1.5 - 0.5; // slight upward drift
                this.size = Math.random() * 2.5 + 0.8;
                this.alpha = 1;
                this.decay = Math.random() * 0.012 + 0.006;
                this.color = Math.random() > 0.5 ? '59, 130, 246' : '168, 85, 247'; // Blue or Purple
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
            }
            draw(c) {
                c.save();
                c.globalAlpha = this.alpha;
                c.beginPath();
                c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                c.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                c.shadowBlur = 8;
                c.shadowColor = `rgb(${this.color})`;
                c.fill();
                c.restore();
            }
        }
        
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = canvas.getBoundingClientRect();
            const parentRect = containerRef.current.getBoundingClientRect();
            
            // Timeline line is at x=40px
            const x = 40; 
            
            const windowHeight = window.innerHeight;
            const elementHeight = parentRect.height;
            const elementTop = parentRect.top;
            
            const startScroll = windowHeight;
            const endScroll = -elementHeight;
            const totalScroll = startScroll - endScroll;
            const currentScroll = startScroll - elementTop;
            const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));
            
            // Emitter location matches scaleY offset top/bottom
            const startY = 10;
            const endY = canvas.height - 10;
            const y = startY + (endY - startY) * progress;
            
            activePos.x = x;
            activePos.y = y;
            activePos.active = progress > 0 && progress < 1;
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        let lastSpawn = 0;
        let isVisible = false;
        
        const render = (time) => {
            if (!isVisible) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (activePos.active && time - lastSpawn > 25) {
                particles.push(new Particle(activePos.x, activePos.y));
                particles.push(new Particle(activePos.x, activePos.y));
                lastSpawn = time;
            }
            
            particles = particles.filter(p => p.alpha > 0);
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });
            
            if (activePos.active) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(activePos.x, activePos.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#3b82f6';
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#3b82f6';
                ctx.fill();
                ctx.restore();
            }
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                if (isVisible && !wasVisible) {
                    animationFrameId = requestAnimationFrame(render);
                }
            });
        }, { threshold: 0.01 });
        observer.observe(canvas);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [containerRef]);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-10" style={{ mixBlendMode: 'screen' }} />;
};



const EducationGraphCanvas = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };
        
        canvas.parentElement.addEventListener('mousemove', handleMouseMove);
        canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
        
        let beamProgress1 = 0;
        let beamProgress2 = 0;
        
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const isDesktop = canvas.width >= 768;
            
            // Define positions of the 3 education milestones
            const nodes = [
                {
                    x: isDesktop ? canvas.width * 0.32 : canvas.width * 0.5,
                    y: canvas.height * 0.18,
                    color: '6, 182, 212', // Cyan (B.Tech)
                    label: 'B.Tech'
                },
                {
                    x: isDesktop ? canvas.width * 0.68 : canvas.width * 0.5,
                    y: canvas.height * 0.5,
                    color: '59, 130, 246', // Blue (HSC)
                    label: 'HSC'
                },
                {
                    x: isDesktop ? canvas.width * 0.32 : canvas.width * 0.5,
                    y: canvas.height * 0.82,
                    color: '99, 102, 241', // Indigo (SSC)
                    label: 'SSC'
                }
            ];
            
            // Draw connecting lines
            ctx.lineWidth = 1.5;
            
            const drawPath = (nStart, nEnd) => {
                ctx.beginPath();
                ctx.moveTo(nStart.x, nStart.y);
                ctx.lineTo(nEnd.x, nEnd.y);
                ctx.strokeStyle = 'rgba(161, 161, 170, 0.1)'; // subtle zinc outline
                ctx.stroke();
            };
            
            drawPath(nodes[2], nodes[1]);
            drawPath(nodes[1], nodes[0]);
            
            // Animate flows along paths
            beamProgress1 += 0.004;
            if (beamProgress1 > 1) beamProgress1 = 0;
            
            beamProgress2 += 0.005;
            if (beamProgress2 > 1) beamProgress2 = 0;
            
            const drawBeam = (nStart, nEnd, progress, color) => {
                const x = nStart.x + (nEnd.x - nStart.x) * progress;
                const y = nStart.y + (nEnd.y - nStart.y) * progress;
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${color})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgb(${color})`;
                ctx.fill();
                ctx.restore();
            };
            
            drawBeam(nodes[2], nodes[1], beamProgress1, nodes[1].color);
            drawBeam(nodes[1], nodes[0], beamProgress2, nodes[0].color);
            
            // Draw interactive glowing connections to cursor
            nodes.forEach(node => {
                const time = Date.now() * 0.003;
                const pulse = 10 + Math.sin(time) * 4;
                
                // Pulse halo
                ctx.save();
                ctx.beginPath();
                ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${node.color}, 0.2)`;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                
                // Solid center dot
                ctx.beginPath();
                ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${node.color})`;
                ctx.fill();
                
                // Proximity elastic line
                if (mouseRef.current.active) {
                    const dx = mouseRef.current.x - node.x;
                    const dy = mouseRef.current.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.strokeStyle = `rgba(${node.color}, ${0.3 * (1 - dist / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            });
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        let isVisible = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                if (isVisible && !wasVisible) {
                    animationFrameId = requestAnimationFrame(render);
                }
            });
        }, { threshold: 0.01 });
        observer.observe(canvas);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
            canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80" style={{ mixBlendMode: 'screen' }} />;
};



const CyberParticlesCanvas = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class CyberParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = -Math.random() * 0.5 - 0.2; // slow rise
                this.size = Math.random() * 2.5 + 1.2; // slightly larger for visibility
                this.maxAlpha = Math.random() * 0.5 + 0.15;
                this.alpha = 0;
                this.fadeDirection = 1;
                this.pulseSpeed = Math.random() * 0.01 + 0.004;
                this.isCyan = Math.random() > 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                this.alpha += this.pulseSpeed * this.fadeDirection;
                if (this.alpha >= this.maxAlpha) {
                    this.alpha = this.maxAlpha;
                    this.fadeDirection = -1;
                } else if (this.alpha <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + Math.random() * 20;
                    this.alpha = 0;
                    this.fadeDirection = 1;
                    this.vx = (Math.random() - 0.5) * 0.4;
                    this.vy = -Math.random() * 0.5 - 0.2;
                }
            }
            draw(c) {
                const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                const colorStr = isDark 
                    ? (this.isCyan ? '6, 182, 212' : '59, 130, 246') // Cyan or Blue
                    : (this.isCyan ? '8, 145, 178' : '29, 78, 216'); // Darker Cyan or Darker Blue
                const adjustedAlpha = isDark ? this.alpha : this.alpha * 1.5;
                
                c.save();
                c.globalAlpha = Math.min(1, adjustedAlpha);
                c.fillStyle = `rgba(${colorStr}, ${Math.min(1, adjustedAlpha)})`;
                c.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
                c.restore();
            }
        }
        
        for (let i = 0; i < 40; i++) {
            particles.push(new CyberParticle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
        
        const render = () => {
            if (!isVisible) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(render);
        };
        
        let isVisible = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                if (isVisible && !wasVisible) {
                    animationFrameId = requestAnimationFrame(render);
                }
            });
        }, { threshold: 0.01 });
        observer.observe(canvas);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-60" />;
};



const CyberDataWave = () => {
    const [isDark, setIsDark] = useState(true);
    
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const dark = document.documentElement.getAttribute('data-theme') !== 'light';
            setIsDark(dark);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
        return () => observer.disconnect();
    }, []);

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none transition-opacity duration-300 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.16]'}`}>
            <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
                <motion.path 
                    d="M-100,200 Q200,50 500,200 T1100,200 T1700,100" 
                    fill="none" 
                    stroke="url(#cyanGradient)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    animate={{
                        d: [
                            "M-100,200 Q200,50 500,200 T1100,200 T1700,100",
                            "M-100,150 Q250,150 550,150 T1050,250 T1700,150",
                            "M-100,200 Q200,50 500,200 T1100,200 T1700,100"
                        ]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.path 
                    d="M-50,250 Q250,80 550,250 T1150,250 T1750,150" 
                    fill="none" 
                    stroke="url(#blueGradient)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    animate={{
                        d: [
                            "M-50,250 Q250,80 550,250 T1150,250 T1750,150",
                            "M-50,200 Q200,180 600,200 T1200,200 T1750,200",
                            "M-50,250 Q250,80 550,250 T1150,250 T1750,150"
                        ]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <defs>
                    <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="50%" stopColor="#1d4ed8" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};



const CertificateCard = ({ cert, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const floatDuration = 4.5 + (index % 3);
    const floatDelay = index * 0.25;
    
    return (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay
            }}
            className="flex relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <>
                    {/* Cyber crosshair marker top-left */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-1.5 -left-1.5 text-cyan-400 z-30 font-mono text-[10px] font-black pointer-events-none select-none"
                    >
                        +
                    </motion.div>
                    {/* Cyber bracket marker bottom-right */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -bottom-2 -right-2 text-blue-400 z-30 font-mono text-[9px] font-black pointer-events-none select-none"
                    >
                        &lt;/&gt;
                    </motion.div>
                    {/* Cyber cursor marker middle-right */}
                    <motion.div 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute top-1/2 -right-3 text-cyan-400 z-30 font-mono text-[11px] font-black pointer-events-none select-none"
                    >
                        _
                    </motion.div>
                </>
            )}

            <Tilt 
                tiltMaxAngleX={6} 
                tiltMaxAngleY={6} 
                glareEnable={true} 
                glareMaxOpacity={0.12} 
                glareColor="#06b6d4" 
                glarePosition="all"
                glareBorderRadius="3rem"
                className="w-full flex"
            >
                <div 
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                    }}
                    className="w-full bg-zinc-950/40 border border-zinc-900 p-8 rounded-[3rem] hover:border-cyan-500/20 transition-all flex flex-col gap-6 group backdrop-blur-3xl hover:bg-zinc-900/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.04)] relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(300px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(6,182,212,0.12),transparent_80%)]" />
                    
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cert.c} group-hover:scale-110 transition-transform`}><Award size={24} /></div>
                    <h4 className="text-white font-black tracking-tight text-lg leading-snug h-14 line-clamp-2">{cert.n}</h4>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4 h-8 line-clamp-2">{cert.i}</p>
                    {cert.link ? (
                        <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                        >
                            View Certificate <ExternalLink size={16} />
                        </a>
                    ) : (
                        <div className="mt-auto flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-500 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest select-none">
                            Verification Pending
                        </div>
                    )}
                </div>
            </Tilt>
        </motion.div>
    );
};



const ProjectsBackgroundCanvas = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const vertices = [
            [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
            [-1,-1, 1], [1,-1, 1], [1,1, 1], [-1,1, 1]
        ];
        const edges = [
            [0,1], [1,2], [2,3], [3,0],
            [4,5], [5,6], [6,7], [7,4],
            [0,4], [1,5], [2,6], [3,7]
        ];
        
        const rotate = (vert, rx, ry, rz) => {
            let p = [...vert];
            let c = Math.cos(rx), s = Math.sin(rx);
            p = [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
            c = Math.cos(ry); s = Math.sin(ry);
            p = [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
            c = Math.cos(rz); s = Math.sin(rz);
            p = [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
            return p;
        };
        
        let gridOffset = 0;
        let rx1 = 0, ry1 = 0, rz1 = 0;
        let rx2 = 0.5, ry2 = 0.5, rz2 = 0.5;
        
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            gridOffset += 0.2;
            if (gridOffset >= 40) gridOffset = 0;
            
            ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.04)' : 'rgba(8, 145, 178, 0.15)';
            for (let x = gridOffset; x < canvas.width; x += 40) {
                for (let y = 0; y < canvas.height; y += 40) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            const drawCube = (centerX, centerY, size, rx, ry, rz, color) => {
                const projected = vertices.map(v => {
                    const r = rotate(v, rx, ry, rz);
                    return [centerX + r[0] * size, centerY + r[1] * size];
                });
                
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                edges.forEach(e => {
                    ctx.beginPath();
                    ctx.moveTo(projected[e[0]][0], projected[e[0]][1]);
                    ctx.lineTo(projected[e[1]][0], projected[e[1]][1]);
                    ctx.stroke();
                });
            };
            
            rx1 += 0.005; ry1 += 0.008; rz1 += 0.003;
            drawCube(120, 150, 40, rx1, ry1, rz1, isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(8, 145, 178, 0.45)');
            
            rx2 += 0.006; ry2 += 0.004; rz2 += 0.007;
            drawCube(canvas.width - 120, canvas.height - 150, 55, rx2, ry2, rz2, isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(29, 78, 216, 0.45)');
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        let isVisible = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                if (isVisible && !wasVisible) {
                    animationFrameId = requestAnimationFrame(render);
                }
            });
        }, { threshold: 0.01 });
        observer.observe(canvas);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0" />;
};



const ContactNetworkCanvas = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let nodes = [];
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class NetworkNode {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw(c) {
                const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                c.beginPath();
                c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                c.fillStyle = isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(8, 145, 178, 0.65)';
                c.fill();
            }
        }
        
        const nodeCount = Math.floor((canvas.width * canvas.height) / 18000);
        for (let i = 0; i < Math.max(20, Math.min(nodeCount, 60)); i++) {
            nodes.push(new NetworkNode());
        }
        
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };
        
        canvas.parentElement.addEventListener('mousemove', handleMouseMove);
        canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
        
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            
            if (mouseRef.current.active) {
                ctx.save();
                const grad = ctx.createRadialGradient(
                    mouseRef.current.x, mouseRef.current.y, 0,
                    mouseRef.current.x, mouseRef.current.y, 180
                );
                grad.addColorStop(0, isDark ? 'rgba(6, 182, 212, 0.03)' : 'rgba(8, 145, 178, 0.08)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(mouseRef.current.x, mouseRef.current.y, 180, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            nodes.forEach(n => {
                n.update();
                n.draw(ctx);
            });
            
            ctx.lineWidth = 0.8;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = isDark 
                            ? `rgba(59, 130, 246, ${0.12 * (1 - dist / 100)})`
                            : `rgba(29, 78, 216, ${0.35 * (1 - dist / 100)})`;
                        ctx.stroke();
                    }
                }
                
                if (mouseRef.current.active) {
                    const dx = nodes[i].x - mouseRef.current.x;
                    const dy = nodes[i].y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                        ctx.strokeStyle = isDark
                            ? `rgba(6, 182, 212, ${0.25 * (1 - dist / 140)})`
                            : `rgba(8, 145, 178, ${0.6 * (1 - dist / 140)})`;
                        ctx.stroke();
                    }
                }
            }
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        let isVisible = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                if (isVisible && !wasVisible) {
                    animationFrameId = requestAnimationFrame(render);
                }
            });
        }, { threshold: 0.01 });
        observer.observe(canvas);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
            canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);
    
    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-70" />;
};



const App = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return saved ? saved === 'dark' : true;
    });

    const experienceRef = useRef(null);
    const { scrollYProgress: expScrollY } = useScroll({
        target: experienceRef,
        offset: ["start end", "end start"]
    });
    const expScaleY = useSpring(expScrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    const roles = ["Problem Solver", "Frontend Developer", "Software Engineering Enthusiast", "Full-Stack Developer"]
    const skills = [
        { title: "Programming Languages", items: ["Java", "Python (Basics)"] },
        { title: "Web Technologies", items: ["HTML", "CSS", "JavaScript", "React.js (Basics)"] },
        { title: "Database Technologies", items: ["PostgreSQL", "SQL"] },
        { title: "Tools & Platforms", items: ["Git", "GitHub", "Visual Studio Code"] },
        { title: "Soft Skills", items: ["Problem Solving", "Team Collaboration", "Communication", "Adaptability"] }
    ];

// (removed unused education constant; education UI uses inline data)

    const certs = [
        { n: "Software Engineering Job Simulation", i: "JPMorgan Chase & Co. (Forage)", link: "/Software Engineering Job Simulation.pdf", c: "bg-blue-500/10 text-blue-500" },
        { n: "Generative AI for Beginners", i: "Simplilearn SkillUp", link: "/Generative AI for Beginners.pdf", c: "bg-pink-500/10 text-pink-500" },
        { n: "Artificial Intelligence", i: "Infosys Springboard", link: "/Artificial Intelligence.pdf", c: "bg-purple-500/10 text-purple-500" },
        { n: "Prompt Engineering", i: "Infosys Springboard", link: "/prompt Engineering.pdf", c: "bg-emerald-500/10 text-emerald-500" },
        { n: "Java Programming for Beginners", i: "Simplilearn SkillUp", link: "/Java Programming for Beginners.pdf", c: "bg-blue-500/10 text-blue-500" },
        { n: "Web Development using VS Code", i: "Microsoft Learn", link: "/Get started with web development using Visual Studio Code.pdf", c: "bg-indigo-500/10 text-indigo-500" }
    ];

    const projects = [
        {
            title: "Smart PDS: Automated Time-Slot Booking & Distribution System",
            bullets: [
                "Developed a scalable full-stack web application with role-based authentication, automated time-slot booking, multilingual support (7 languages), and Progressive Web App (PWA) capabilities.",
                "Integrated a Scikit-learn eligibility prediction model using a Flask API to automate beneficiary verification and improve the efficiency of the distribution process.",
                "Built real-time administrative dashboards using Socket.io, Supabase PostgreSQL, and Chart.js for live booking synchronization, inventory tracking, analytics, and secure transaction processing."
            ],
            tech: ["HTML", "CSS", "JavaScript", "Node.js", "Socket.io", "Supabase", "Python", "Flask", "Scikit-Learn"],
            github: "https://github.com/Ganeshbobbala/portfolio"
        },
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
            title: "Behavior Recognition in Videos for Autism Detection",
            bullets: [
                "Developed an AI-powered web application for autism behavior recognition by analyzing uploaded videos using CNN-LSTM deep learning models for accurate behavioral pattern classification.",
                "Utilized OpenCV and MediaPipe for video preprocessing, human pose estimation, and feature extraction to improve the accuracy and reliability of behavior detection.",
                "Integrated the trained deep learning model into a responsive web interface, enabling secure video uploads, real-time prediction, and visualization of behavioral analysis results."
            ],
            tech: ["Python", "TensorFlow/Keras", "OpenCV", "MediaPipe", "HTML", "CSS", "JavaScript"],
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
        <div className="bg-[#020202] text-white min-h-screen selection:bg-purple-500/30 overflow-x-hidden font-sans portfolio-root relative">
            {/* Aurora Background */}
            <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none overflow-hidden z-0 opacity-40">
                <div className="absolute top-[-30%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-transparent blur-[130px] animate-[pulse_10s_ease-in-out_infinite]" />
                <div className="absolute top-[-10%] right-[-20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-transparent blur-[130px] animate-[pulse_15s_ease-in-out_infinite_2s]" />
            </div>

            <Navbar isDark={isDark} toggleTheme={toggleTheme} />

            {/* --- HERO --- */}
            <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
                    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-20 dark:opacity-30">
                        {/* Outer Tech Ring */}
                        <div className="absolute inset-0 border border-dashed border-cyan-500/30 rounded-full animate-[spin_40s_linear_infinite]" />
                        
                        {/* Inner Tech Ring */}
                        <div className="absolute inset-4 border border-double border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                        
                        {/* Radar Line Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
                        
                        {/* Center Target Crosshair */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/20" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cyan-500/20" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-cyan-500/40 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-blue-500/40 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full" />

                        {/* Coding symbol floaters */}
                        <div className="absolute top-[10%] left-[10%] text-xs font-mono text-cyan-500/40 animate-bounce">{'</>'}</div>
                        <div className="absolute bottom-[15%] left-[20%] text-xs font-mono text-blue-500/40 animate-pulse">{'git'}</div>
                        <div className="absolute top-[25%] right-[15%] text-xs font-mono text-indigo-500/40 animate-pulse">{'db'}</div>
                        <div className="absolute bottom-[20%] right-[20%] text-xs font-mono text-cyan-400/40 animate-bounce">{'await'}</div>
                    </div>
                </div>
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full opacity-50 pointer-events-none animate-pulse" 
                    style={{ animationDuration: '8s' }}
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
                        <MagneticButton className="w-full md:w-auto">
                            <a href="#myprojects" className="block w-full md:w-auto bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1 text-center">View Projects</a>
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* --- ABOUT --- */}
            {/* --- ABOUT --- */}
            <section id="about" className="py-20 relative overflow-hidden bg-zinc-950/5">
                {/* Slow-moving cyber background blobs */}
                <motion.div 
                    animate={{ x: [0, 30, 0], y: [0, 15, 0] }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" 
                />
                <motion.div 
                    animate={{ x: [0, -25, 0], y: [0, -35, 0] }} 
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" 
                />

                {/* Animated Grid Pattern Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

                {/* Floating vector shapes for parallax effect */}
                <motion.div 
                    animate={{ y: [0, -12, 0], rotate: 45 }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-24 left-[10%] w-4 h-4 border border-cyan-500/10 pointer-events-none rounded-sm hidden lg:block" 
                />
                <motion.div 
                    animate={{ y: [0, 15, 0] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-24 right-[15%] w-6 h-6 border border-blue-500/10 rounded-full pointer-events-none hidden lg:block" 
                />
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-[5%] font-mono text-[10px] text-cyan-500/20 pointer-events-none hidden lg:block"
                >
                    +
                </motion.div>

                <SectionHeader title="About Me" subtitle="Get to know me a little better" />
                <div className="max-w-6xl mx-auto px-10 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-center">
                        {/* Slow parallax profile photo wrapper */}
                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="lg:w-[40%] relative group w-full max-w-[320px] lg:max-w-none"
                        >
                            {/* Neon Glow Aura */}
                            <div className="absolute -inset-4 bg-cyan-500/10 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/10 z-10">
                                <img src="/My Photo.png" alt="Ganesh Bobbala" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                {/* Inner Gloss Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                        
                        <div className="lg:w-[60%] w-full">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-8 tracking-normal">Aspiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Software Engineer</span></h2>
                            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
                            Hi, I'm Ganesh Bobbala, a Computer Science (AI & ML) student with a passion for software development and Full-Stack Web Development. I have hands-on experience building web applications and AI-powered solutions through academic and personal projects. I enjoy learning new technologies, writing clean and maintainable code, and solving real-world problems. My goal is to grow as a Software Engineer while contributing to impactful and innovative software solutions.
                            </p>
                            <div className="flex flex-wrap gap-8 mb-12">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><GraduationCap size={16} className="text-cyan-500" /> B.Tech CSE (AI & ML)</div>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><MapPin size={16} className="text-cyan-500" /> India</div>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><Code2 size={16} className="text-cyan-500" /> Open to Opportunities</div>
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none"><Sparkles size={16} className="text-cyan-500" /> Passionate Learner</div>
                            </div>
                            {/* Glassmorphism Overlays stats cards */}
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { l: 'Projects', v: '5+', href: '#myprojects' }, { l: 'Certifications', v: '5+', href: '#certifications' }
                                ].map((s, i) => (
                                    <a key={i} href={s.href} className="bg-zinc-950/30 border border-zinc-900/50 p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-zinc-900/40 hover:border-cyan-500/20 backdrop-blur-3xl hover:shadow-[0_20px_50px_rgba(6,182,212,0.03)] transition-all cursor-pointer">
                                        <p className="text-4xl font-black text-cyan-400 mb-1"><Counter value={s.v} /></p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{s.l}</p>
                                    </a>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-6 mt-12">
                                <MagneticButton className="w-full md:w-auto">
                                    <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1 group">
                                        <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" /> View Resume
                                    </a>
                                </MagneticButton>
                                <MagneticButton className="w-full md:w-auto">
                                    <a href={RESUME_URL} download="Ganesh_Bobbala_Resume.pdf" className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1 group">
                                        <Download size={18} className="group-hover:translate-y-1 transition-transform" /> Download Resume
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE --- */}
            <section id="experience" ref={experienceRef} className="py-16 relative overflow-hidden">
                {/* Soft Glowing Background Blob */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none animate-[pulse_10s_ease-in-out_infinite_2s]" />

                <SectionHeader title="Internship Experience" subtitle="My professional journey" />
                
                <div className="max-w-4xl mx-auto px-6 md:px-10 relative min-h-[450px]">
                    {/* Timeline Particle Canvas */}
                    <TimelineCanvas containerRef={experienceRef} />

                    {/* Timeline background track (vertical line at x=40px) */}
                    <div className="absolute left-10 top-2 bottom-2 w-[2px] bg-zinc-900 z-0 rounded-full" />
                    
                    {/* Active scrolling glowing line */}
                    <motion.div 
                        style={{ scaleY: expScaleY, originY: 0 }} 
                        className="absolute left-10 top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 z-0 origin-top shadow-[0_0_10px_rgba(59,130,246,0.5)] rounded-full" 
                    />

                    {/* Timeline Dots */}
                    {/* 1. Start Dot (top) */}
                    <div className="absolute left-[34px] top-0 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-zinc-800 z-20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    </div>

                    {/* 2. Middle Milestone Dot (aligned with the card) */}
                    <motion.div 
                        whileInView={{ scale: [1, 1.2, 1], borderColor: ["#18181b", "#3b82f6", "#18181b"] }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute left-[31px] top-[140px] w-5 h-5 rounded-full bg-zinc-950 border-2 border-zinc-800 z-20 flex items-center justify-center shadow-lg"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping absolute" />
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 z-30" />
                    </motion.div>

                    {/* 3. End Dot (bottom) */}
                    <div className="absolute left-[34px] bottom-0 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-zinc-800 z-20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    </div>

                    {/* Experience Cards container (aligned to the right, ml-20) */}
                    <div className="ml-20 pl-2 md:pl-4 py-8 relative z-20">
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: 'spring', bounce: 0.25 }}
                            className="relative group max-w-2xl"
                        >
                            {/* Neon Glow Aura */}
                            <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            
                            <div className="relative border border-zinc-900 bg-zinc-950/40 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-3xl hover:border-blue-500/20 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                            <Briefcase size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">AI Web Development Intern</h3>
                                            <p className="text-blue-500 font-bold text-sm md:text-base mt-1">In Amigos Foundation</p>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-950/90 border-r-4 border-r-blue-500 px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.1)] shrink-0 self-end md:self-auto">
                                        <span className="text-xs md:text-sm font-black text-blue-500 tracking-wide">May 2026 – Jun 2026</span>
                                    </div>
                                </div>
                                
                                <ul className="list-disc pl-5 space-y-4 text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
                                    <li className="marker:text-blue-500">Completed 5 AI-focused web development assignments, including AI-powered website creation, website analysis, Figma prototyping, and UI/UX improvement proposals, while meeting all project deadlines.</li>
                                    <li className="marker:text-blue-500">Collaborated with the development team to evaluate website usability, propose design improvements, and deliver project documentation while following software development best practices.</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- SKILLS --- */}
            <section id="myskills" className="py-12 bg-zinc-950/20">
                <SectionHeader title="My skills" subtitle="Core competencies and frameworks" />
                <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                    {/* Left Column (first 3 skill categories) */}
                    <div className="space-y-10">
                        {skills.slice(0, 3).map((s, i) => (
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

                    {/* Center Column (Orbiting tech icons visual) */}
                    <div className="hidden lg:block">
                        <OrbitingTech />
                    </div>

                    {/* Right Column (last 3 skill categories) */}
                    <div className="space-y-10">
                        {skills.slice(3, 6).map((s, i) => (
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
                </div>
            </section>

            {/* --- PROJECTS --- */}
            <section id="myprojects" className="py-20 bg-zinc-950/5 relative overflow-hidden">
                {/* Dotted grid & rotating wireframe cubes */}
                <ProjectsBackgroundCanvas />
                
                {/* Subtle gradient waves */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.06),transparent)] pointer-events-none" />

                <SectionHeader title="My projects" subtitle="Some of the things I've built" />
                <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {projects.map((proj, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 5 + (i % 2) * 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.4
                            }}
                            className="flex relative w-full"
                        >
                            <Tilt 
                                tiltMaxAngleX={6} 
                                tiltMaxAngleY={6} 
                                glareEnable={true} 
                                glareMaxOpacity={0.1} 
                                glareColor="#06b6d4" 
                                glarePosition="all"
                                glareBorderRadius="2.5rem"
                                className="w-full flex"
                            >
                                <div 
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                                        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                                    }}
                                    className="w-full flex flex-col justify-between border border-zinc-900 bg-zinc-950/40 p-8 md:p-10 rounded-[2.5rem] group hover:border-cyan-500/20 transition-all backdrop-blur-3xl hover:bg-zinc-900/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
                                >
                                    {/* Spotlight layer */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(350px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(6,182,212,0.12),transparent_80%)]" />
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6 leading-snug group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                                        <div className="bg-zinc-900/40 p-6 rounded-2xl mb-8 border border-zinc-800/30">
                                            <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
                                                {proj.bullets.map((bullet, idx) => (
                                                    <li key={idx} className="marker:text-cyan-500">{bullet}</li>
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
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] hover:text-cyan-400 transition-all group-hover:translate-x-1 transition-transform">
                                                <Github size={16} /> View my project
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- EDUCATION --- */}
            <section id="education" className="py-20 relative overflow-hidden animated-blueprint-grid">
                {/* Connected Node Graph Canvas */}
                <EducationGraphCanvas />
                
                {/* Floating Blueprint Decorations */}
                <div className="absolute top-12 left-10 w-8 h-8 border border-blue-500/10 rounded-lg rotate-12 opacity-60 animate-[spin_25s_linear_infinite] pointer-events-none" />
                <div className="absolute bottom-24 right-16 w-12 h-12 border border-purple-500/10 rounded-full opacity-50 animate-[pulse_6s_ease-in-out_infinite] pointer-events-none" />
                <div className="absolute top-1/3 left-[15%] w-6 h-6 border-l border-t border-zinc-800 opacity-40 rotate-45 pointer-events-none" />
                <div className="absolute bottom-1/3 right-[15%] w-6 h-6 border-r border-b border-zinc-800 opacity-40 -rotate-12 pointer-events-none" />
                <div className="absolute top-1/2 right-12 text-[10px] font-mono text-zinc-600/30 select-none pointer-events-none">COORD_X // 45.92</div>
                <div className="absolute bottom-12 left-12 text-[10px] font-mono text-zinc-600/30 select-none pointer-events-none">SCALE // 1.00</div>

                <SectionHeader title="Education" subtitle="My academic journey" />
                
                <div className="max-w-4xl mx-auto px-10 relative z-10">
                    {/* Vertical timeline track */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-zinc-900/50 hidden md:block" />
                    
                    <div className="space-y-16">
                        {[
                            { title: "B. Tech in Computer Science and Engineering (AI & ML)", date: "2023 – 2027 (Expected)", org: "Kalasalingam Academy of Research and Education", grade: "CGPA: 8.64", icon: "🎓", align: "left", c: "cyan" },
                            { title: "Higher Secondary Education (MPC)", date: "2021 – 2023", org: "Sri Chaitanya Junior College", grade: "Percentage: 89.7%", icon: "📚", align: "right", c: "blue" },
                            { title: "Secondary School Certificate (SSC)", date: "2020 – 2021", org: "Sri Srinivasa High School", grade: "Percentage: 100%", icon: "🏫", align: "left", c: "indigo" }
                        ].map((exp, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${exp.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                <motion.div
                                    whileInView={{ x: exp.align === 'left' ? [20, 0] : [-20, 0], opacity: [0, 1] }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, type: 'spring' }}
                                    className={`md:w-[45%] text-center px-10 ${exp.align === 'left' ? 'md:text-left' : 'md:text-right'}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                        <h4 className="text-xl md:text-2xl font-black tracking-normal text-white">{exp.title}</h4>
                                        <div className={`bg-zinc-950/90 border-r-4 px-4 py-2 rounded-lg transition-all w-fit self-end md:self-auto shrink-0 hover:scale-105 ${exp.c === 'cyan' ? 'border-r-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : exp.c === 'blue' ? 'border-r-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-r-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]'}`}>
                                            {exp.date.includes(' – ') || exp.date.includes(' - ') ? (
                                                <div className="flex flex-col items-end leading-none">
                                                    <span className={`text-[10px] font-black uppercase mb-0.5 tracking-tighter ${exp.c === 'cyan' ? 'text-cyan-500/60' : exp.c === 'blue' ? 'text-blue-500/60' : 'text-indigo-500/60'}`}>{(exp.date.includes(' – ') ? exp.date.split(' – ') : exp.date.split(' - '))[0]} —</span>
                                                    <span className={`text-sm font-black tracking-wide ${exp.c === 'cyan' ? 'text-cyan-500' : exp.c === 'blue' ? 'text-blue-500' : 'text-indigo-500'}`}>{(exp.date.includes(' – ') ? exp.date.split(' – ') : exp.date.split(' - '))[1]}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-end leading-none">
                                                    <span className={`text-sm font-black tracking-wide ${exp.c === 'cyan' ? 'text-cyan-500' : exp.c === 'blue' ? 'text-blue-500' : 'text-indigo-500'}`}>{exp.date}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 font-bold text-sm md:text-base mb-4">{exp.org}</p>
                                    {exp.grade && <p className="text-zinc-500 font-semibold text-xs tracking-wide">{exp.grade}</p>}
                                </motion.div>
                                
                                {/* Floating Illustration Milestone Circle */}
                                <motion.div 
                                    animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
                                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                                    className={`z-10 w-16 h-16 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl ${exp.c === 'cyan' ? 'shadow-cyan-500/10' : exp.c === 'blue' ? 'shadow-blue-500/10' : 'shadow-indigo-500/10'}`}
                                >
                                    <span className="text-2xl select-none">{exp.icon}</span>
                                </motion.div>
                                <div className="md:w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CERTS --- */}
            <section id="certifications" className="py-20 bg-zinc-950/10 relative overflow-hidden">
                {/* Cyber particles floating background */}
                <CyberParticlesCanvas />

                {/* Translucent animated flowing wave */}
                <CyberDataWave />

                <SectionHeader title="Certifications" subtitle="Courses and achievements I've completed" />
                
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {certs.map((c, i) => (
                        <CertificateCard key={i} cert={c} index={i} />
                    ))}
                </div>
            </section>


                <section id="contact" className="py-20 relative overflow-hidden bg-zinc-950/10">
                {/* Connected network lines & spotlight halo */}
                <ContactNetworkCanvas />

                {/* Floating envelopes / vector icons */}
                <motion.div 
                    animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 right-[10%] text-cyan-500/10 pointer-events-none hidden lg:block"
                >
                    <Mail size={40} />
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -15, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-16 left-[8%] text-blue-500/10 pointer-events-none hidden lg:block"
                >
                    <Send size={32} />
                </motion.div>

                <div className="max-w-6xl mx-auto px-10 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-32">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-black tracking-normal mb-10 leading-none">Let's build <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic lowercase tracking-normal">something great</span> together.</h2>
                            <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-16 max-w-lg">
                                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out!
                            </p>
                            <div className="space-y-12">
                                {/* Email Me Info Card */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-zinc-950 border border-zinc-900 rounded-[1.5rem] flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 transition-colors shadow-xl relative">
                                        <Mail size={24} />
                                        {/* Dynamic Pulse Ring */}
                                        <div className="absolute inset-0 rounded-[1.5rem] border border-cyan-500/30 animate-[ping_2s_infinite]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-1">Email Me</p>
                                        <p className="text-lg font-bold text-white tracking-tight underline decoration-cyan-500/30 underline-offset-8 group-hover:decoration-cyan-500 transition-all">ganeshbobbala44@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cyber styled social list */}
                            <div className="flex gap-4 mt-16">
                                {[
                                    { i: <Github size={20} />, l: 'https://github.com/Ganeshbobbala/portfolio' },
                                    { i: <Linkedin size={20} />, l: 'https://www.linkedin.com/in/ganesh-bobbala-9a7a52327' },
                                    { i: <Mail size={20} />, l: 'mailto:ganeshbobbala44@gmail.com' }
                                ].map((s, i) => (
                                    <a key={i} href={s.l} className="w-14 h-14 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center text-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all">{s.i}</a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative group">
                            {/* Neon Glow Aura */}
                            <div className="absolute -inset-4 bg-cyan-500/10 rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                            
                            <div className="relative bg-zinc-950/50 border-2 border-cyan-500/20 p-10 rounded-[3rem] backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.1)] group-hover:border-cyan-500/40 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] transition-all duration-500">
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
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder-zinc-700 font-bold text-white" 
                                            placeholder="Ganesh Bobbala" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Your Email</label>
                                        <input 
                                            name="email"
                                            required
                                            type="email" 
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] px-8 py-5 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder-zinc-700 font-bold text-white" 
                                            placeholder="ganesh@example.com" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea 
                                            name="message"
                                            required
                                            rows={4} 
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[2rem] px-8 py-6 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder-zinc-700 font-bold resize-none text-white" 
                                            placeholder="Tell me about your vision..."
                                        ></textarea>
                                    </div>
                                    <MagneticButton className="w-full">
                                        <button 
                                            type="submit"
                                            className="w-full bg-blue-600 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex items-center justify-center gap-4 hover:-translate-y-1 active:translate-y-0 text-white"
                                        >
                                            Send Message <Send size={18} />
                                        </button>
                                    </MagneticButton>
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
