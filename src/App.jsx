import React, { useEffect, useRef, useState } from 'react';
import { Menu, Mail, Phone, MapPin, X } from 'lucide-react';

const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Twitter = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const Linkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const FloatingCube = ({ top, left, right, bottom, size, color, rotation = 0, delay = "delay-200" }) => {
  return (
    <div
      className={`absolute pointer-events-none cube-wrapper animate-fade-up ${delay}`}
      style={{
        top,
        left,
        right,
        bottom,
        '--size': size,
        '--color': color,
      }}
    >
      <div 
        className="cube"
        style={{ transform: `rotateX(35deg) rotateY(45deg) rotateZ(${rotation}deg)` }}
      >
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

const RevealSection = ({ children, className = '', id = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
          if (entry.boundingClientRect.top < 0) {
            entry.target.classList.add('from-top');
            entry.target.classList.remove('from-bottom');
          } else {
            entry.target.classList.add('from-bottom');
            entry.target.classList.remove('from-top');
          }
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`reveal from-bottom w-full relative ${className}`}>
      {children}
    </section>
  );
};

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-darkBg flex flex-col pt-10">
      <FloatingCube top="15%" right="10%" size="40px" color="#E05A00" rotation={25} delay="delay-200" />
      <FloatingCube bottom="15%" left="25%" size="60px" color="#E05A00" rotation={45} delay="delay-400" />
      <FloatingCube top="20%" left="15%" size="50px" color="#2a2a2a" rotation={15} delay="delay-600" />
      <FloatingCube bottom="20%" right="20%" size="50px" color="#2a2a2a" rotation={35} delay="delay-800" />
      
      {/* Sunglasses emoji circle */}
      <div className="absolute top-[18%] right-[5%] animate-fade-up delay-600">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-xl shadow-lg transform rotate-12">
          😎
        </div>
      </div>

      {/* Social Sidebar */}
      <div 
        className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 hidden md:flex group py-8 px-4 -ml-4 rounded-full"
        data-cursor="socials"
      >
        <Linkedin className="w-5 h-5 text-white group-hover:scale-125 hover:!scale-150 hover:text-red-500 transition-all duration-300 cursor-none" />
        <Github className="w-5 h-5 text-white group-hover:scale-125 hover:!scale-150 hover:text-red-500 transition-all duration-300 cursor-none" />
        <Instagram className="w-5 h-5 text-white group-hover:scale-125 hover:!scale-150 hover:text-red-500 transition-all duration-300 cursor-none" />
        <Twitter className="w-5 h-5 text-white group-hover:scale-125 hover:!scale-150 hover:text-red-500 transition-all duration-300 cursor-none" />
      </div>

      {/* Scroll down text */}
      <div className="absolute bottom-16 left-8 transform -rotate-90 origin-left text-[#666] text-[12px] uppercase tracking-wider hidden md:block">
        &lt; scroll down
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10 pt-16 md:pt-0">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 md:pl-16">
          <div className="text-mutedGray flex items-center gap-4 animate-fade-up delay-200">
            <span className="w-8 h-[2px] bg-mutedGray"></span>
            Hello
          </div>
          <h1 className="font-syne text-white text-[clamp(2rem,5vw,3.5rem)] leading-tight animate-fade-up delay-400">
            <span className="font-normal">I'm</span> <span className="font-bold">Joseph Lawrence</span>
          </h1>
          <p className="text-mutedGray text-lg animate-fade-up delay-600">
            A full stack developer based in Toronto.
          </p>
          <a
            href="#about"
            className="mt-6 inline-block bg-accentOrange text-white rounded-md px-7 py-3 font-medium hover:bg-[#c04e00] hover:scale-105 transition-all animate-fade-up delay-800"
          >
            Learn more
          </a>
        </div>

        {/* Right Illustration */}
        <div className="w-full md:w-1/2 mt-16 md:mt-0 flex justify-center items-center relative h-[400px] md:h-[600px] animate-fade-up delay-800">
          <svg viewBox="0 0 400 400" className="w-full max-w-[550px] lg:max-w-[650px] h-auto drop-shadow-2xl">
            {/* Base/Shadow */}
            <ellipse cx="200" cy="350" rx="120" ry="20" fill="#111" opacity="0.5" />
            
            {/* Legs crossed */}
            <path d="M 120 280 Q 200 340 280 280" fill="none" stroke="#ccc" strokeWidth="35" strokeLinecap="round" />
            <path d="M 140 310 Q 200 360 260 310" fill="none" stroke="#e0e0e0" strokeWidth="35" strokeLinecap="round" />
            {/* Shoes */}
            <rect x="95" y="260" width="30" height="40" rx="10" fill="#333" transform="rotate(-30 110 280)" />
            <rect x="275" y="260" width="30" height="40" rx="10" fill="#333" transform="rotate(30 290 280)" />

            {/* Body */}
            <rect x="150" y="160" width="100" height="130" rx="30" fill="#333" />
            
            {/* Head */}
            <circle cx="200" cy="110" r="45" fill="#ccc" />
            
            {/* Eyes */}
            <path d="M 185 110 Q 190 115 195 110" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <path d="M 205 110 Q 210 115 215 110" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            
            {/* Hair */}
            <path d="M 155 90 Q 200 40 245 90 Q 220 70 155 90" fill="#111" />
            
            {/* Headphones */}
            <path d="M 150 110 A 50 50 0 0 1 250 110" fill="none" stroke="#333" strokeWidth="8" />
            <rect x="140" y="95" width="15" height="30" rx="5" fill="#E05A00" />
            <rect x="245" y="95" width="15" height="30" rx="5" fill="#E05A00" />
            
            {/* Arms & Hands */}
            <path d="M 150 190 Q 100 220 180 240" fill="none" stroke="#333" strokeWidth="25" strokeLinecap="round" />
            <path d="M 250 190 Q 300 220 280 260" fill="none" stroke="#333" strokeWidth="25" strokeLinecap="round" />
            <circle cx="180" cy="240" r="12" fill="#ccc" />
            <circle cx="280" cy="260" r="12" fill="#ccc" />

            {/* Laptop */}
            <rect x="150" y="220" width="110" height="70" rx="4" fill="#999" />
            <rect x="140" y="290" width="130" height="10" rx="5" fill="#777" />
            {/* Apple-ish logo */}
            <circle cx="205" cy="255" r="8" fill="#e0e0e0" />
          </svg>
        </div>

      </div>
    </div>
  );
};

const About = () => {
  return (
    <RevealSection id="about" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <FloatingCube top="10%" right="5%" size="45px" color="#E05A00" rotation={30} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image */}
        <div className="relative">
          <div className="bg-cardBg p-4 rounded-lg border-l-4 border-accentOrange w-fit max-w-[320px] mx-auto md:mx-0 shadow-2xl">
            <img 
              src="https://i.pravatar.cc/300?img=11" 
              alt="Joseph Lawrence" 
              className="w-full h-auto rounded grayscale filter hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Column: Text */}
        <div className="flex flex-col gap-4">
          <span className="text-accentOrange uppercase tracking-[3px] text-[13px] font-semibold">
            About me
          </span>
          <h2 className="font-syne text-[2rem] leading-tight text-white mb-2">
            I will <span className="text-accentOrange italic font-bold">Design & Develop</span> the best websites
          </h2>
          <p className="text-mutedGray leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </RevealSection>
  );
};

const FeaturedWorks = () => {
  const works = [
    { title: "Brandon F.", subtitle: "A Toronto based Multimedia Producer" },
    { title: "Toned Magazine", subtitle: "A publication committed to Black Canadians" },
    { title: "In The Mood", subtitle: "film recommendation generator" },
  ];

  return (
    <RevealSection id="works" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <FloatingCube bottom="5%" left="5%" size="50px" color="#2a2a2a" rotation={-15} />
      
      <h2 className="font-syne text-white text-3xl font-bold mb-10 text-center md:text-left">
        Featured Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {works.map((work, idx) => (
          <div 
            key={idx} 
            className="bg-cardBg border border-[#333] border-l-4 border-l-accentOrange rounded-lg p-6 flex flex-col justify-between min-h-[180px] hover:-translate-y-2 hover:border-accentOrange transition-all duration-300"
          >
            <div>
              <h3 className="text-white text-xl font-bold mb-2">{work.title}</h3>
              <p className="text-mutedGray text-sm">{work.subtitle}</p>
            </div>
            <button className="mt-6 self-start text-[12px] px-[14px] py-[6px] border border-accentOrange text-accentOrange rounded hover:bg-accentOrange hover:text-white transition-colors duration-300">
              View live
            </button>
          </div>
        ))}
      </div>
    </RevealSection>
  );
};

const MySkills = () => {
  const row1 = ["HTML5", "CSS3", "Sass", "JavaScript", "React", "WordPress"];
  const row2 = ["GitHub", "Squarespace", "Figma", "Sketch", "Adobe XD", "Adobe Creative Cloud"];

  const renderSkill = (name) => (
    <div key={name} className="bg-cardBg rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border hover:border-accentOrange transition-all duration-300 group border border-transparent shadow-lg">
      <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center group-hover:bg-accentOrange transition-colors duration-300">
        <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
      </div>
      <span className="text-white text-[13px] text-center">{name}</span>
    </div>
  );

  return (
    <RevealSection id="skills" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <FloatingCube top="20%" right="8%" size="35px" color="#2a2a2a" rotation={10} />
      
      <h2 className="font-syne text-white text-3xl font-bold mb-10 text-center">My Skills</h2>
      
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {row1.map(renderSkill)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {row2.map(renderSkill)}
        </div>
      </div>
    </RevealSection>
  );
};

const BlogPosts = () => {
  const posts = [
    { title: "Back VS Front-end flow when implementing new API calls", date: "March 20, 2026", id: 101 },
    { title: "User-testing my Pins N Patches app", date: "April 15, 2026", id: 202 },
    { title: "Why I Quit Adobe From Social Media", date: "May 10, 2026", id: 303 },
  ];

  return (
    <RevealSection id="blog" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <FloatingCube top="-5%" left="15%" size="40px" color="#E05A00" rotation={-25} />
      
      <h2 className="font-syne text-white text-3xl font-bold mb-10 text-center md:text-left">
        Blog posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="w-full overflow-hidden rounded-lg mb-4 relative h-[220px]">
              <img 
                src={`https://picsum.photos/seed/${post.id}/400/220`} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
            <h3 className="text-white text-lg font-medium mb-2 group-hover:text-accentOrange transition-colors">
              {post.title}
            </h3>
            <p className="text-[#666] text-[12px]">{post.date}</p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
};

const Contact = () => {
  return (
    <RevealSection id="contact" className="py-24 px-6 md:px-16 max-w-6xl mx-auto mb-10">
      <FloatingCube bottom="-5%" right="10%" size="60px" color="#2a2a2a" rotation={20} />
      
      <div className="bg-cardBg rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-12 shadow-2xl relative overflow-hidden">
        {/* Left Col */}
        <div className="w-full md:w-5/12 flex flex-col gap-8 z-10">
          <h2 className="font-syne text-white text-3xl font-bold mb-2">Get a quote</h2>
          <p className="text-mutedGray text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#333] rounded-full flex items-center justify-center text-white font-bold tracking-wider">
              JL
            </div>
            <span className="text-white font-bold text-lg">Joseph Lawrence</span>
          </div>

          <div className="flex gap-4">
            <Linkedin className="w-5 h-5 text-white hover:text-accentOrange transition-colors cursor-pointer" />
            <Github className="w-5 h-5 text-white hover:text-accentOrange transition-colors cursor-pointer" />
            <Instagram className="w-5 h-5 text-white hover:text-accentOrange transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-white hover:text-accentOrange transition-colors cursor-pointer" />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-3 text-mutedGray">
              <Mail className="w-5 h-5 text-accentOrange" />
              <span className="text-sm">josephlawrence@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-mutedGray">
              <Phone className="w-5 h-5 text-accentOrange" />
              <span className="text-sm">+1 416-256-0026</span>
            </div>
            <div className="flex items-center gap-3 text-mutedGray">
              <MapPin className="w-5 h-5 text-accentOrange" />
              <span className="text-sm">CSS Mindset - Toronto, Ontario, Canada</span>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="w-full md:w-7/12 bg-accentOrange rounded-lg p-8 z-10 shadow-lg">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Full Name" 
              className="w-full bg-[rgba(255,255,255,0.15)] border-b border-[rgba(255,255,255,0.4)] text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none focus:border-white transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full bg-[rgba(255,255,255,0.15)] border-b border-[rgba(255,255,255,0.4)] text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none focus:border-white transition-colors"
            />
            <input 
              type="tel" 
              placeholder="Your Phone Number" 
              className="w-full bg-[rgba(255,255,255,0.15)] border-b border-[rgba(255,255,255,0.4)] text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none focus:border-white transition-colors"
            />
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full bg-[rgba(255,255,255,0.15)] border-b border-[rgba(255,255,255,0.4)] text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none focus:border-white transition-colors resize-none"
            ></textarea>
            
            <button className="bg-white text-accentOrange font-bold rounded-md px-6 py-2.5 self-end hover:shadow-xl hover:scale-[1.02] transition-all cursor-none">
              Send message
            </button>
          </form>
        </div>
      </div>
    </RevealSection>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHoveringSocials, setIsHoveringSocials] = useState(false);
  const isHoveringRef = useRef(false);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (!isHoveringRef.current && cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor="socials"]');
      if (target) {
        isHoveringRef.current = true;
        setIsHoveringSocials(true);
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${centerX}px, ${centerY}px, 0)`;
        }
      } else {
        isHoveringRef.current = false;
        setIsHoveringSocials(false);
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] duration-300 ease-out flex items-center justify-center ${
          isHoveringSocials 
            ? 'w-[60px] h-[220px] rounded-full border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] bg-transparent' 
            : 'w-8 h-8 rounded-full border-2 border-accentOrange/80 bg-accentOrange/10 shadow-[0_0_10px_rgba(224,90,0,0.4)]'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          marginLeft: isHoveringSocials ? '-30px' : '-16px',
          marginTop: isHoveringSocials ? '-110px' : '-16px',
          transitionProperty: 'width, height, margin-left, margin-top, background-color, border-color, box-shadow',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          marginLeft: '-5px',
          marginTop: '-5px',
        }}
      >
        <div 
          className={`w-2.5 h-2.5 bg-red-500 rounded-full duration-300 ease-out ${
            isHoveringSocials ? 'scale-100' : 'scale-0'
          }`}
          style={{ transitionProperty: 'transform' }}
        />
      </div>
    </>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inject Google Fonts via useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@400;600;700;800&display=swap');
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#works' },
    { name: 'Skills', href: '#skills' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="bg-[#1a1a1a] min-h-screen p-2 md:p-6 lg:p-8">
      <CustomCursor />
      
      {/* Outer wrapper frame as requested */}
      <div className="portfolio-frame font-inter">
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 max-w-7xl mx-auto">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-white hover:text-accentOrange transition-colors"
          >
            <Menu className="w-8 h-8" />
          </button>
          
          <div className="font-syne text-2xl font-bold tracking-tight z-50">
            <span className="text-white">Black</span>
            <span className="text-accentOrange">Orange</span>
          </div>
          
          {/* Spacer to balance flex layout */}
          <div className="w-8"></div>
        </nav>

        {/* Mobile Slide-in Menu */}
        <div className={`absolute inset-0 z-[100] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop Overlay */}
          <div 
            className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div 
            className={`absolute top-0 left-0 bottom-0 w-64 bg-cardBg transform transition-transform duration-500 ease-in-out flex flex-col pt-20 px-8 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-accentOrange"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-6 text-lg">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-accentOrange font-syne font-semibold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <Hero />
        <About />
        <FeaturedWorks />
        <MySkills />
        <BlogPosts />
        <Contact />

      </div>
    </div>
  );
}
