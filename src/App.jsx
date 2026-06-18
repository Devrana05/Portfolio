import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Mail, Phone, MapPin, X, FileText, ArrowUpRight } from 'lucide-react';
import heroImg from './assets/images/hero.png';
import seabornLogo from './assets/icons/seaborn.svg';
import matplotlibLogo from './assets/icons/matplotlib.svg';
import cLogo from './assets/icons/c.svg';
import css3Logo from './assets/icons/css3.svg';
import javascriptLogo from './assets/icons/javascript.svg';
import profileImg from './assets/images/profile.png';

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

const FloatingCube = ({ top, left, right, bottom, size, color, rotation = 0, delay = "delay-200", className = "" }) => {
  return (
    <div
      className={`absolute pointer-events-none cube-wrapper animate-fade-up ${delay} ${className}`}
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
  const scrollTextRef = useRef(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;

    const updateHover = () => {
      if (!scrollTextRef.current) return;
      const elUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isHovering = elUnderMouse && (elUnderMouse === scrollTextRef.current || scrollTextRef.current.contains(elUnderMouse));
      
      if (isHovering) {
        scrollTextRef.current.classList.remove('text-[#666]', 'tracking-wider');
        scrollTextRef.current.classList.add('text-[#E05A00]', 'tracking-[0.2em]');
      } else {
        scrollTextRef.current.classList.remove('text-[#E05A00]', 'tracking-[0.2em]');
        scrollTextRef.current.classList.add('text-[#666]', 'tracking-wider');
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateHover();
    };

    const onScroll = () => {
      updateHover();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-darkBg flex flex-col pt-10">
      <FloatingCube className="lg:!top-[16%] lg:!right-[20%] max-md:opacity-60 max-md:!top-[22%] max-md:!right-[15%] max-md:scale-[0.3] mobile-fill-both" top="15%" right="10%" size="55px" color="#E05A00" rotation={25} delay="delay-200" />
      <FloatingCube bottom="15%" left="25%" size="60px" color="#E05A00" rotation={45} delay="delay-400" className="max-md:hidden" />
      <FloatingCube top="20%" left="15%" size="50px" color="#2a2a2a" rotation={15} delay="delay-600" className="max-md:scale-[0.15] max-md:opacity-50 max-md:!top-[15%] max-md:!left-[20%]" />
      <FloatingCube bottom="20%" right="20%" size="50px" color="#2a2a2a" rotation={35} delay="delay-800" className="max-md:hidden" />
      
      {/* Sunglasses emoji circle */}
      <div className="absolute top-[18%] lg:top-[26%] right-[5%] lg:right-[15%] max-md:!top-[28%] max-md:!right-[15%] max-md:scale-50 max-md:opacity-90 animate-fade-up delay-600 mobile-fill-both">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center text-xl lg:text-3xl shadow-lg transform rotate-12">
          😎
        </div>
      </div>

      {/* Social Sidebar */}
      <div 
        className="fixed left-8 bottom-8 flex flex-col gap-8 hidden xl:flex group py-4 px-4 -ml-4 rounded-full z-50"
        data-cursor="socials"
      >
        <a href="https://www.linkedin.com/in/dev-rana-cs05/" target="_blank" rel="noopener noreferrer" className="cursor-none"><Linkedin className="w-7 h-7 text-white group-hover:scale-125 hover:!scale-150 hover:text-accentOrange transition-all duration-300 cursor-none" /></a>
        <a href="https://github.com/Devrana05" target="_blank" rel="noopener noreferrer" className="cursor-none"><Github className="w-7 h-7 text-white group-hover:scale-125 hover:!scale-150 hover:text-accentOrange transition-all duration-300 cursor-none" /></a>
        <a href="https://www.instagram.com/__rana__056/" target="_blank" rel="noopener noreferrer" className="cursor-none"><Instagram className="w-7 h-7 text-white group-hover:scale-125 hover:!scale-150 hover:text-accentOrange transition-all duration-300 cursor-none" /></a>
        <a href="https://x.com/dev_056" target="_blank" rel="noopener noreferrer" className="cursor-none"><Twitter className="w-7 h-7 text-white group-hover:scale-125 hover:!scale-150 hover:text-accentOrange transition-all duration-300 cursor-none" /></a>
      </div>

      {/* Scroll down text */}
      <a 
        ref={scrollTextRef}
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById('contact');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          e.currentTarget.blur();
        }}
        className="absolute bottom-16 left-8 transform -rotate-90 origin-left transition-all duration-75 text-[12px] uppercase cursor-none text-[#666] tracking-wider z-20 hidden lg:block"
      >
        &lt; scroll down
      </a>

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-12 md:gap-0 relative z-10 pt-16 md:pt-0">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 md:pl-16">
          <div className="text-mutedGray text-sm md:text-base flex items-center gap-4 animate-fade-up delay-200">
            <span className="w-6 md:w-8 h-[2px] bg-mutedGray"></span>
            Hello
          </div>
          <h1 className="font-syne text-white text-4xl max-[380px]:text-3xl md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight animate-fade-up delay-400">
            <span className="font-normal">I'm</span> <span className="font-bold text-[#E05A00]">DEV RANA</span>
          </h1>
          <p className="text-mutedGray text-base md:text-xl animate-fade-up delay-600">
            A Data Scientist based in Delhi.
          </p>
          <a
            href="#about"
            className="mt-6 inline-block bg-accentOrange text-white rounded-md px-7 py-3 font-medium hover:bg-[#c04e00] hover:scale-105 transition-all animate-fade-up delay-800"
          >
            Learn more
          </a>
        </div>

        {/* Right Illustration */}
        <div className="w-full md:w-1/2 max-md:-mt-10 md:mt-0 flex justify-center items-center relative max-md:h-auto md:h-[600px] animate-fade-up delay-800 max-md:overflow-hidden max-w-full max-md:pb-8">
          <img 
            src={heroImg} 
            alt="Hero character" 
            className="max-md:w-[260px] md:w-full max-w-[550px] lg:max-w-[650px] h-auto drop-shadow-2xl object-contain block mx-auto" 
          />
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
          <div className="bg-cardBg p-4 rounded-lg border-l-4 border-accentOrange w-fit max-w-[360px] mx-auto md:mx-0 shadow-2xl">
            <img 
              src={profileImg} 
              alt="Dev Rana" 
              className="w-full h-auto rounded lg:grayscale filter lg:hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Column: Text */}
        <div className="flex flex-col gap-4">
          <span className="text-accentOrange uppercase tracking-[3px] text-[13px] font-semibold">
            About me
          </span>
          <h2 className="font-syne text-[2rem] leading-tight text-white mb-2">
            I find <span className="text-accentOrange italic font-bold">Patterns & Insights</span> in every dataset
          </h2>
          <p className="text-mutedGray leading-relaxed">
            I build intelligent systems that learn from data. With hands-on experience in Python, machine learning, deep learning, and business intelligence tools, I help organizations move from gut-feeling decisions to data-driven strategies. Every dataset is a puzzle — I love solving them.
          </p>
        </div>
      </div>
    </RevealSection>
  );
};

const Project2Table = () => {
  return (
    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center p-4 transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform">
      <div className="w-full border border-[#333] rounded-sm overflow-x-auto text-white font-inter" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}>
        <table className="w-full text-left border-collapse text-[11px] sm:text-[13px] md:text-[15px]">
          <thead>
            <tr className="border-b border-[#333] bg-[#1a1a1a]">
              <th className="py-3 px-3 md:px-6 font-bold text-accentOrange text-center border-r border-[#333]">Model</th>
              <th className="py-3 px-3 md:px-6 font-bold text-accentOrange text-center border-r border-[#333]">Precision</th>
              <th className="py-3 px-3 md:px-6 font-bold text-accentOrange text-center border-r border-[#333]">Recall</th>
              <th className="py-3 px-3 md:px-6 font-bold text-accentOrange text-center border-r border-[#333]">Accuracy</th>
              <th className="py-3 px-3 md:px-6 font-bold text-accentOrange text-center">F1 Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#333] bg-[#1a1a1a] font-bold">
              <td className="py-3 px-3 md:px-6 border-r border-[#333]">Logistic Regression</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">0.790</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">0.803</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">87.5%</td>
              <td className="py-3 px-3 md:px-6 text-left">0.797</td>
            </tr>
            <tr className="border-b border-[#333] bg-[#1a1a1a]">
              <td className="py-3 px-3 md:px-6 border-r border-[#333]">k-Nearest Neighbors (k=13)</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">0.737</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">0.459</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">78.5%</td>
              <td className="py-3 px-3 md:px-6 text-left">0.566</td>
            </tr>
            <tr className="bg-[#1a1a1a]">
              <td className="py-3 px-3 md:px-6 border-r border-[#333]">Naive Bayes</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">0.783</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">0.770</td>
              <td className="py-3 px-3 md:px-6 text-left border-r border-[#333]">86.5%</td>
              <td className="py-3 px-3 md:px-6 text-left">0.777</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FeaturedWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [isDesktopInteraction, setIsDesktopInteraction] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktopInteraction(mediaQuery.matches);
    
    const handler = (e) => setIsDesktopInteraction(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  const [direction, setDirection] = useState('right');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const [activeDlTab, setActiveDlTab] = useState('cnn');
  const [tabTransitioning, setTabTransitioning] = useState(false);

  const handleTabChange = (tabId) => {
    if (tabId === activeDlTab) return;
    setTabTransitioning(true);
    setTimeout(() => {
      setActiveDlTab(tabId);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTabTransitioning(false);
        });
      });
    }, 75);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  const works = [
    { 
      title: "Customer Segmentation", 
      subtitle: "Unsupervised K-Means clustering of customer behavior data",
      tools: "Python, Scikit-learn, K-Means, Matplotlib, PCA",
      image: "/project1_dark.png",
      repoLink: 'https://github.com/Devrana05/Unsupervised-Learning-Minor-Project'
    },
    { 
      title: "Loan Approval Prediction", 
      subtitle: "Supervised ML model to predict loan eligibility",
      tools: "Python, Scikit-learn, Matplotlib, Pandas",
      customRender: <Project2Table />,
      repoLink: 'https://github.com/Devrana05/Supervised-Learning-Minor-Project'
    },
    { 
      isTabbedProject: true
    },
  ];

  const dlProjects = {
    fnn: {
      title: "Feedforward Neural Network",
      subtitle: "FNN models for both regression and classification tasks",
      tools: "Python, PyTorch, NumPy, Pandas, Matplotlib",
      image: "/fnn_chart_dark.png",
      imageClassName: "w-[85%] h-[85%] object-contain -translate-x-4 md:-translate-x-6",
      repoLink: 'https://github.com/Devrana05/Deep-Learning/tree/main/ANN'
    },
    rnn: {
      title: "IMDB Sentiment Analysis",
      subtitle: "RNN-based sentiment classifier for movie reviews",
      tools: "Python, PyTorch, RNN/LSTM, NLP, IMDB Dataset",
      image: "/rnn_chart_dark.png",
      imageClassName: "w-[85%] h-[85%] object-contain -translate-x-4 md:-translate-x-6",
      repoLink: 'https://github.com/Devrana05/Deep-Learning/tree/main/RNN'
    },
    cnn: {
      title: "CIFAR-10 Image Classifier",
      subtitle: "CNN model to classify 10 categories of images",
      mobileSubtitle: "CNN model to classify 10 categories of images",
      tools: "Python, PyTorch, CNN, Computer Vision",
      image: "/cnn_chart_dark.png",
      imageClassName: "w-[85%] h-[85%] object-contain -translate-x-4 md:-translate-x-6",
      repoLink: 'https://github.com/Devrana05/Deep-Learning/tree/main/CNN'
    }
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  const handleDotClick = (idx) => {
    setDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  const currentWork = works[currentIndex];
  const displayWork = currentWork.isTabbedProject ? dlProjects[activeDlTab] : currentWork;

  const outerUnderlineStyle = {
    backgroundImage: 'linear-gradient(#E05A00, #E05A00)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left bottom',
    backgroundSize: isTitleHovered ? '100% 2px' : '0% 2px',
    transition: isTitleHovered ? 'background-size 400ms ease' : 'background-size 300ms ease',
    paddingBottom: '4px'
  };

  const innerTextStyle = {
    background: 'linear-gradient(to right, #E05A00 50%, white 50%)',
    backgroundSize: '200% 100%',
    backgroundPosition: isTitleHovered ? 'left bottom' : 'right bottom',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: isTitleHovered ? 'background-position 400ms ease' : 'background-position 300ms ease',
  };

  return (
    <RevealSection id="works" className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto min-h-[600px] flex flex-col justify-center relative">
      <FloatingCube bottom="5%" left="5%" size="50px" color="#2a2a2a" rotation={-15} />
      
      <h2 className="font-syne text-white text-4xl md:text-5xl font-bold mb-12 text-left w-full px-4 lg:px-8">
        Featured Works
      </h2>

      {/* Mobile Grid View (Hidden on sm and up) */}
      <div className="sm:hidden w-full relative z-10">
        <div className="grid grid-cols-1 gap-8">
          {works.map((work, idx) => {
            const displayData = work.isTabbedProject ? dlProjects[activeDlTab] : work;
            return (
              <div 
                key={idx} 
                className="bg-cardBg border border-transparent border-l-4 border-l-accentOrange rounded-lg p-5 flex flex-col justify-between min-h-[180px] hover:-translate-y-2 hover:border-accentOrange active:-translate-y-2 active:border-accentOrange transition-all duration-300"
              >
                <div className="w-full">
                  {work.isTabbedProject && (
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                      {['fnn', 'rnn', 'cnn'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => handleTabChange(tab)}
                          className={`text-[11px] font-bold uppercase tracking-wider transition-all duration-150 transform active:scale-95 shrink-0 ${
                            activeDlTab === tab 
                              ? 'bg-accentOrange text-white border border-accentOrange rounded-md px-3 py-1' 
                              : 'bg-transparent border border-[#333] text-[#999] rounded-md px-3 py-1 hover:text-white hover:border-[#666]'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className={`transition-all duration-150 transform min-h-[64px] ${work.isTabbedProject && tabTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <h3 className="text-white text-xl font-bold mb-2">{displayData.title}</h3>
                    <p className="text-mutedGray text-sm">{displayData.mobileSubtitle || displayData.subtitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(displayData.repoLink, '_blank', 'noopener,noreferrer')}
                  className="mt-4 self-start text-[12px] px-[14px] py-[6px] border border-accentOrange text-accentOrange rounded hover:bg-accentOrange hover:text-white active:bg-accentOrange active:text-white transition-colors duration-300"
                >
                  View Project
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop/Tablet Slider View (Hidden on mobile) */}
      <div 
        className="hidden sm:flex flex-col items-center w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        <div className="flex w-full items-center justify-between gap-8 xl:gap-16">
          
          {/* Desktop Left Arrow */}
          <button 
            onClick={handlePrev}
            className="hidden xl:flex w-12 h-12 rounded-full border border-[#444] items-center justify-center text-white hover:bg-accentOrange/10 hover:border-accentOrange hover:text-accentOrange transition-all shrink-0 cursor-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>

          {/* Center Content Wrapper - NO KEY */}
          <div className="flex-1 min-w-0 flex flex-col xl:flex-row items-center gap-12 xl:gap-16">
            
            {/* Details */}
            <div key={`details-${currentIndex}`} className={`w-full xl:w-[35%] flex gap-6 shrink-0 px-8 xl:px-0 ${direction === 'right' ? 'animate-fade-switch-right' : 'animate-fade-switch-left'}`}>
              <div className="text-6xl xl:text-7xl font-syne font-bold text-white leading-none tracking-tighter">
                {String(currentIndex + 1).padStart(2, '0')}
              </div>
              <div className="flex flex-col pt-2 w-full">
                {currentWork.isTabbedProject && (
                  <div className="flex gap-2 mb-6">
                    {['fnn', 'rnn', 'cnn'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`text-[12px] font-bold uppercase tracking-wider transition-all duration-150 transform active:scale-95 ${
                          activeDlTab === tab 
                            ? 'bg-accentOrange text-white border border-accentOrange rounded-md px-4 py-1.5' 
                            : 'bg-transparent border border-[#333] text-[#999] rounded-md px-4 py-1.5 hover:text-white hover:border-[#666] cursor-none'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className={`transition-all duration-150 transform min-h-[200px] xl:min-h-[220px] ${tabTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  {isDesktopInteraction ? (
                    <div 
                      className="relative inline-block cursor-pointer mb-2"
                      onMouseEnter={() => setIsTitleHovered(true)}
                      onMouseLeave={() => setIsTitleHovered(false)}
                      onClick={() => window.open(displayWork.repoLink, '_blank', 'noopener,noreferrer')}
                    >
                      <h3 
                        className="text-2xl xl:text-3xl font-bold m-0 p-0"
                        style={{
                          display: 'inline'
                        }}
                      >
                        {displayWork.title === "Feedforward Neural Network" ? (
                          <>
                            <span style={outerUnderlineStyle}>
                              <span style={innerTextStyle}>
                                Feedforward
                              </span>
                            </span>
                            <ArrowUpRight 
                              size={22} 
                              color="#E05A00" 
                              style={{
                                display: 'inline-flex',
                                verticalAlign: 'middle',
                                marginLeft: '8px',
                                marginBottom: '4px',
                                opacity: isTitleHovered ? 1 : 0,
                                transform: isTitleHovered ? 'translateX(4px)' : 'translateX(-8px)',
                                transition: isTitleHovered ? 'all 300ms ease 100ms' : 'all 200ms ease'
                              }}
                            />
                            <span style={outerUnderlineStyle}>
                              <span style={innerTextStyle}>
                                {' '}Neural Network
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span style={outerUnderlineStyle}>
                              <span style={innerTextStyle}>
                                {displayWork.title}
                              </span>
                            </span>
                            <ArrowUpRight 
                              size={22} 
                              color="#E05A00" 
                              style={{
                                display: 'inline-flex',
                                verticalAlign: 'middle',
                                marginLeft: '8px',
                                marginBottom: '4px',
                                opacity: isTitleHovered ? 1 : 0,
                                transform: isTitleHovered ? 'translateX(4px)' : 'translateX(-8px)',
                                transition: isTitleHovered ? 'all 300ms ease 100ms' : 'all 200ms ease'
                              }}
                            />
                          </>
                        )}
                      </h3>
                    </div>
                  ) : (
                    <h3 
                      className="text-2xl xl:text-3xl font-bold text-white mb-2 cursor-pointer active:text-accentOrange transition-colors inline-block"
                      onClick={() => window.open(displayWork.repoLink, '_blank', 'noopener,noreferrer')}
                    >
                      {displayWork.title}
                    </h3>
                  )}
                  <p className="text-[#999] text-[15px] mb-12">{displayWork.subtitle}</p>
                  
                  <h4 className="text-[12px] text-[#999] tracking-[0.2em] uppercase font-bold mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-[6px]">
                    {displayWork.tools.split(',').map((tech, i) => (
                      <span 
                        key={i} 
                        className="bg-[#1a1a1a] border border-[#333] text-[#ccc] text-[11px] px-[10px] py-[4px] rounded-[4px] inline-block"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Wrapper with Tablet Arrows */}
            <div className="w-full min-w-0 xl:w-[65%] flex items-center gap-4">
              
              {/* Tablet Left Arrow */}
              <button 
                onClick={handlePrev}
                className="xl:hidden flex w-10 h-10 rounded-full border border-[#444] items-center justify-center text-white hover:bg-accentOrange/10 hover:border-accentOrange hover:text-accentOrange active:bg-accentOrange/20 active:border-accentOrange active:text-accentOrange transition-all shrink-0 cursor-none"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              </button>

              <div key={`image-${currentIndex}`} className={`flex-1 min-w-0 h-[400px] xl:h-[450px] bg-[#1a1a1a] rounded-lg overflow-hidden relative group transform-gpu shadow-lg ${direction === 'right' ? 'animate-fade-switch-right' : 'animate-fade-switch-left'}`}>
                <div className={`w-full h-full flex items-center justify-center transition-all duration-150 transform origin-center ${tabTransitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}>
                  {displayWork.customRender ? (
                    displayWork.customRender
                  ) : (
                    <img 
                      src={displayWork.image} 
                      alt={displayWork.title}
                      className={`${displayWork.imageClassName || "w-full h-full object-cover scale-[1.01]"} transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform`}
                    />
                  )}
                </div>
              </div>

              {/* Tablet Right Arrow */}
              <button 
                onClick={handleNext}
                className="xl:hidden flex w-10 h-10 rounded-full border border-[#444] items-center justify-center text-white hover:bg-accentOrange/10 hover:border-accentOrange hover:text-accentOrange active:bg-accentOrange/20 active:border-accentOrange active:text-accentOrange transition-all shrink-0 cursor-none"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </button>
              
            </div>
            
          </div>

          {/* Desktop Right Arrow */}
          <button 
            onClick={handleNext}
            className="hidden xl:flex w-12 h-12 rounded-full border border-[#444] items-center justify-center text-white hover:bg-accentOrange/10 hover:border-accentOrange hover:text-accentOrange transition-all shrink-0 cursor-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </button>

        </div>

        {/* Dots */}
        <div className="relative flex items-center gap-4 mt-16 h-4">
          {/* Animated Active Dot */}
          <div 
            className="absolute left-0 w-2 h-2 bg-accentOrange rounded-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0"
            style={{ transform: `translateX(${currentIndex * 24}px) scale(1.5)` }}
          />

          {/* Clickable Background Dots */}
          {works.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-2 h-2 rounded-full border hover:border-white transition-colors cursor-none z-10 ${
                idx === currentIndex ? 'border-transparent' : 'border-[#777]'
              }`}
            />
          ))}
        </div>
      </div>
    </RevealSection>
  );
};

const MySkills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isCentered, setIsCentered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHoverLocked, setIsHoverLocked] = useState(false);
  const [originalRect, setOriginalRect] = useState(null);

  // Lock scrolling when the modal is open using event interception to prevent scrollbar layout shifts
  useEffect(() => {
    if (!selectedSkill) return;
    
    const preventScroll = (e) => e.preventDefault();
    const preventKeyScroll = (e) => {
      const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
      if (keys.includes(e.code)) e.preventDefault();
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [selectedSkill]);

  const languages = [
    { name: 'HTML5', icon: 'html5', def: 'The standard markup language for creating web pages and web applications.' },
    { name: 'CSS3', icon: 'css3', def: 'The design language of the web. It controls the colors, fonts, layouts, and animations to make websites look beautiful and modern.' },
    { name: 'JavaScript', icon: 'javascript', def: 'The engine that brings websites to life. It adds interactivity, dynamic content, and logic, making pages respond to user actions.' },
    { name: 'C++', icon: 'cplusplus', def: 'A general-purpose programming language created as an extension of the C programming language.' },
    { name: 'Python', icon: 'python', def: 'An interpreted, high-level and general-purpose programming language.' },
    { name: "C", icon: "c", def: "A general-purpose, procedural computer programming language supporting structured programming." },
    { name: 'MySQL', icon: 'mysql', def: 'A reliable digital filing cabinet. It safely stores, organizes, and instantly retrieves large amounts of information like user accounts or product data.' }
  ];
  const frameworks = [
    { name: "PyTorch", icon: "pytorch", def: "A powerful tool for building Artificial Intelligence. It helps train deep neural networks to recognize images, understand language, and learn from complex data." },
    { name: "Pandas", icon: "pandas", def: "A fast, powerful, flexible and easy to use open source data analysis and manipulation tool." },
    { name: "NumPy", icon: "numpy", def: "The fundamental package for scientific computing with Python, providing powerful N-dimensional array objects." },
    { name: "Matplotlib", icon: "matplotlib", def: "A comprehensive library for creating static, animated, and interactive visualizations in Python." },
    { name: "Seaborn", icon: "seaborn", def: "A Python data visualization library based on matplotlib providing a high-level interface for statistical graphics." },
    { name: "Scikit-learn", icon: "scikitlearn", def: "A toolkit for teaching computers how to learn from data. It provides ready-to-use algorithms to find hidden patterns and make smart predictions." },
    { name: "GitHub", icon: "github", def: "A cloud-based platform for version control, allowing developers to track code securely." },
    { name: "Git", icon: "git", def: "A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." }
  ];

  const handleSkillClick = (skill, event) => {
    if (isAnimating || selectedSkill) return;
    
    // Get exact screen coordinates and computed styles of the clicked tile
    const tileEl = event.currentTarget;
    const rect = tileEl.getBoundingClientRect();
    const imgEl = tileEl.querySelector('img');
    const spanEl = tileEl.querySelector('span');
    
    setOriginalRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
    
    setSelectedSkill(skill);
    setIsAnimating(true);
    setIsHoverLocked(true);
    
    // Wait for React to render the fixed card at the original position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Trigger CSS transition to center
        setIsCentered(true);
        
        // Trigger flip midway through the 500ms flight
        setTimeout(() => {
          setIsFlipped(true);
          setIsAnimating(false);
        }, 150);
      });
    });
  };

  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Recalculate placeholder rect in case user scrolled the page
    const placeholder = document.getElementById(`placeholder-${selectedSkill.name}`);
    if (placeholder) {
      const rect = placeholder.getBoundingClientRect();
      setOriginalRect(prev => ({
        ...prev,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }));
    }
    
    // Trigger flip and fly back synchronously for a mathematically perfect return
    setIsFlipped(false);
    setIsCentered(false);
    
    // Wait for the synchronous 500ms flight & flip to finish, plus a 50ms buffer 
    // to guarantee the CSS engine perfectly settles before DOM removal (prevents snap flicker)
    setTimeout(() => {
      // Restore grid
      setSelectedSkill(null);
      setIsAnimating(false);
      
      // Keep hover locked for a split second after mount to ensure the resting 
      // state renders first, preventing an instant 110% scale pop if mouse is over it.
      setTimeout(() => {
        setIsHoverLocked(false);
      }, 50);
    }, 550);
  };

  const renderSkill = (skill) => {
    const isSelected = selectedSkill?.name === skill.name;

    return (
      <div 
        key={skill.name} 
        id={`placeholder-${skill.name}`}
        onClick={(e) => !isSelected && handleSkillClick(skill, e)}
        className={`w-full max-w-[150px] mx-auto aspect-square rounded-2xl transition-all duration-300 ${
          isSelected 
            ? 'bg-[#1a1a1a] border border-dashed border-[#333]' 
            : `bg-[#1a1a1a] border border-[#333] group cursor-pointer ${isHoverLocked ? '' : 'hover:-translate-y-2 hover:border-accentOrange hover:shadow-[0_0_15px_rgba(255,107,0,0.2)]'}`
        }`}
      >
        <div 
          className={`w-full h-full p-6 rounded-2xl ${isSelected ? 'opacity-0' : 'opacity-100'}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full" style={{ transform: 'scale(1)' }}>
            <img 
              src={skill.icon === 'seaborn' ? seabornLogo : skill.icon === 'matplotlib' ? matplotlibLogo : skill.icon === 'c' ? cLogo : skill.icon === 'css3' ? css3Logo : skill.icon === 'javascript' ? javascriptLogo : `https://cdn.simpleicons.org/${skill.icon}/white`} 
              alt={skill.name} 
              className={`w-16 h-16 object-contain mb-4 transform-gpu transition-transform duration-300 ${
                isHoverLocked || isSelected ? '' : 'group-hover:scale-110'
              }`}
            />
            <span className={`text-white text-base font-bold transition-colors text-center transform-gpu whitespace-nowrap ${
              isHoverLocked || isSelected ? '' : 'group-hover:text-accentOrange'
            }`}>
              {skill.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <RevealSection id="skills" className="py-24 px-6 md:px-16 max-w-6xl mx-auto relative">
      {/* 3 Floating Cubes following color palette */}
      <FloatingCube top="15%" right="5%" size="35px" color="#2a2a2a" rotation={10} className="max-md:!top-[2%] max-md:!right-[2%] max-md:scale-50 max-md:opacity-50" />
      <FloatingCube bottom="15%" left="2%" size="45px" color="#E05A00" rotation={-20} className="opacity-30 max-md:hidden" />
      <FloatingCube top="45%" left="50%" size="20px" color="#2a2a2a" rotation={45} className="opacity-40 max-md:hidden" />
      
      <h2 className="font-syne text-white text-4xl font-bold mb-16 text-center">My Skills</h2>
      
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 w-full relative z-10 items-start justify-center max-w-5xl mx-auto">
        
        {/* Languages Section */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-10">
            <h3 className="text-white text-3xl font-bold tracking-wide">Languages</h3>
            <div className="w-24 h-1 bg-accentOrange mt-3"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full max-w-[400px]">
            {languages.map(renderSkill)}
          </div>
        </div>

        {/* Separator Line */}
        <div className="hidden lg:block w-[1px] min-h-full bg-gradient-to-b from-transparent via-[#555] to-transparent self-stretch"></div>
        <div className="block lg:hidden w-full h-[1px] max-w-[400px] mx-auto bg-gradient-to-r from-transparent via-[#555] to-transparent my-2"></div>

        {/* Frameworks Section */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-10">
            <h3 className="text-white text-3xl font-bold tracking-wide">Frameworks</h3>
            <div className="w-24 h-1 bg-accentOrange mt-3"></div>
          </div>
          <div className="grid grid-cols-2 gap-6 w-full max-w-[400px]">
            {frameworks.map(renderSkill)}
          </div>
        </div>

      </div>

      {/* THE BACKDROP OVERLAY & ANIMATED FLIP CARD */}
      {createPortal(
        <>
          {/* Overlay Background */}
          {selectedSkill && (
            <div 
              className="fixed inset-0 z-[9998]"
              style={{
                backgroundColor: 'rgba(0,0,0,0.75)',
                opacity: isCentered ? 1 : 0,
                transition: 'opacity 500ms ease',
                pointerEvents: isCentered ? 'auto' : 'none'
              }}
              onClick={handleClose}
            />
          )}

          {/* Animated Flying Card */}
          {selectedSkill && (
            <div
              className="fixed z-[9999]"
              style={{
                transition: 'all 500ms cubic-bezier(0.76, 0, 0.24, 1)',
                top: `${originalRect?.top}px`,
                left: `${originalRect?.left}px`,
                width: isCentered ? '300px' : `${originalRect?.width}px`,
                height: isCentered ? '300px' : `${originalRect?.height}px`,
                transform: isCentered 
                  ? `translate(calc(50vw - ${originalRect?.left}px - 150px), calc(50vh - ${originalRect?.top}px - 150px))` 
                  : 'translate(0px, 0px)',
                perspective: '1000px',
                pointerEvents: 'none' // Let clicks pass to the flip inner or overlay
              }}
            >
              {/* 3D Flip Container */}
              <div
                className="w-full h-full relative"
                style={{
                  transition: isFlipped ? 'transform 600ms ease' : 'transform 500ms cubic-bezier(0.76, 0, 0.24, 1)',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  pointerEvents: 'auto'
                }}
              >
                {/* Front Face (Looks like grid tile) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-[#1a1a1a] border border-[#333] rounded-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="w-full h-full p-6 rounded-2xl" style={{ transform: 'translateZ(0)' }}>
                    <div
                      className="flex flex-col items-center justify-center w-full h-full"
                      style={{
                        transition: 'transform 500ms cubic-bezier(0.76, 0, 0.24, 1)',
                        transform: isCentered ? 'scale(1.5625)' : 'scale(1)'
                      }}
                    >
                    <img 
                      src={selectedSkill.icon === 'seaborn' ? seabornLogo : selectedSkill.icon === 'matplotlib' ? matplotlibLogo : selectedSkill.icon === 'c' ? cLogo : selectedSkill.icon === 'css3' ? css3Logo : selectedSkill.icon === 'javascript' ? javascriptLogo : `https://cdn.simpleicons.org/${selectedSkill.icon}/white`} 
                      alt={selectedSkill.name} 
                      className="w-16 h-16 object-contain transform-gpu mb-4"
                    />
                    <span 
                      className="text-white text-base font-bold text-center transform-gpu whitespace-nowrap"
                    >
                      {selectedSkill.name}
                    </span>
                  </div>
                </div>
              </div>

                {/* Back Face (Details Card) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-[#252525] border-2 border-accentOrange flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: '16px'
                  }}
                >
                  <div
                    className="absolute flex flex-col items-center justify-center p-8 text-center"
                    style={{
                      width: '300px',
                      height: '300px',
                      transform: `scale(${isCentered ? 1 : (originalRect?.width || 150) / 300})`,
                      transition: 'transform 500ms cubic-bezier(0.76, 0, 0.24, 1)',
                    }}
                  >
                    <button 
                      onClick={handleClose}
                      className="absolute top-4 right-4 text-[#999] hover:text-accentOrange transition-colors cursor-pointer"
                      style={{ pointerEvents: isCentered ? 'auto' : 'none' }}
                    >
                      <X className="w-6 h-6" />
                    </button>
                    
                    <img 
                      src={selectedSkill.icon === 'seaborn' ? seabornLogo : selectedSkill.icon === 'matplotlib' ? matplotlibLogo : selectedSkill.icon === 'c' ? cLogo : selectedSkill.icon === 'css3' ? css3Logo : selectedSkill.icon === 'javascript' ? javascriptLogo : `https://cdn.simpleicons.org/${selectedSkill.icon}/white`} 
                      alt={selectedSkill.name} 
                      className="w-16 h-16 object-contain mb-4 opacity-10 absolute top-6 left-6"
                    />
                    
                    <h3 className="text-accentOrange text-3xl font-bold mb-4 z-10">{selectedSkill.name}</h3>
                    <p className="text-[#ccc] text-sm leading-relaxed z-10">{selectedSkill.def}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </RevealSection>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [buttonText, setButtonText] = useState('Send message');

  const validateForm = () => {
    let newErrors = { name: '', email: '', phone: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await window.emailjs.send('service_htvebth', 'template_ywrq9at', {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }, '-WmfDKfvGSoRw0Umq');
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setButtonText('Message sent!');
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 4000);

        setTimeout(() => {
          setButtonText('Send message');
        }, 2500);
      } catch (error) {
        console.error("Failed to send email:", error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <RevealSection id="contact" className="py-24 px-6 md:px-16 max-w-6xl mx-auto mb-10">
      
      <div className="bg-cardBg rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-12 shadow-2xl relative overflow-hidden">
        {/* Left Col */}
        <div className="w-full md:w-5/12 flex flex-col gap-8 z-10">
          <h2 className="font-syne text-white text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-mutedGray text-sm leading-relaxed">
            Available for freelance projects, collaborations, and full-time opportunities. Let's build something data-driven together.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#333] rounded-full flex items-center justify-center text-white font-bold tracking-wider">
              DR
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg">Dev Rana</span>
              <span className="text-[#999] text-[13px]">Data Scientist</span>
            </div>
          </div>

          <div className="flex gap-4 xl:hidden">
            <a href="https://www.linkedin.com/in/dev-rana-cs05/" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 text-white hover:text-accentOrange active:text-accentOrange transition-colors cursor-pointer" /></a>
            <a href="https://github.com/Devrana05" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 text-white hover:text-accentOrange active:text-accentOrange transition-colors cursor-pointer" /></a>
            <a href="https://www.instagram.com/__rana__056/" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-white hover:text-accentOrange active:text-accentOrange transition-colors cursor-pointer" /></a>
            <a href="https://x.com/dev_056" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 text-white hover:text-accentOrange active:text-accentOrange transition-colors cursor-pointer" /></a>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-3 text-mutedGray">
              <Mail className="w-5 h-5 text-accentOrange" />
              <span className="text-sm">devrana209076@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-mutedGray">
              <Phone className="w-5 h-5 text-accentOrange" />
              <span className="text-sm">+91 98913 05158</span>
            </div>
            <div className="flex items-center gap-3 text-mutedGray">
              <MapPin className="w-5 h-5 text-accentOrange" />
              <span className="text-sm">Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="w-full md:w-7/12 bg-accentOrange rounded-lg p-8 z-10 shadow-lg">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name" 
                className={`w-full bg-[rgba(255,255,255,0.15)] border-b text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none transition-colors ${errors.name ? 'border-[#ff6b6b]' : 'border-[rgba(255,255,255,0.4)] focus:border-white'}`}
              />
              {errors.name && <span className="text-[#ffcccc] text-[12px]">{errors.name}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                className={`w-full bg-[rgba(255,255,255,0.15)] border-b text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none transition-colors ${errors.email ? 'border-[#ff6b6b]' : 'border-[rgba(255,255,255,0.4)] focus:border-white'}`}
              />
              {errors.email && <span className="text-[#ffcccc] text-[12px]">{errors.email}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number" 
                className={`w-full bg-[rgba(255,255,255,0.15)] border-b text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none transition-colors ${errors.phone ? 'border-[#ff6b6b]' : 'border-[rgba(255,255,255,0.4)] focus:border-white'}`}
              />
              {errors.phone && <span className="text-[#ffcccc] text-[12px]">{errors.phone}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message" 
                rows={4}
                className={`w-full bg-[rgba(255,255,255,0.15)] border-b text-white placeholder-[rgba(255,255,255,0.7)] p-3 outline-none transition-colors resize-none ${errors.message ? 'border-[#ff6b6b]' : 'border-[rgba(255,255,255,0.4)] focus:border-white'}`}
              ></textarea>
              {errors.message && <span className="text-[#ffcccc] text-[12px]">{errors.message}</span>}
            </div>
            
            {submitStatus === 'error' && (
              <div className="text-red-500 text-sm font-medium">Failed to send. Please try again or email me directly.</div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting || buttonText === 'Message sent!'}
              className="bg-[#1a1a1a] text-accentOrange border border-transparent font-bold rounded-md px-6 py-2.5 self-end hover:shadow-xl hover:scale-[1.02] active:bg-[#2a2a2a] active:scale-95 transition-all cursor-none disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : buttonText}
            </button>
          </form>
        </div>
      </div>
    </RevealSection>
  );
};

const CustomCursor = ({ introVisible }) => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hoverType, setHoverType] = useState('none');
  const hoverStateRef = useRef('none');
  const opacityRef = useRef('0');
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (introVisible) {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
      opacityRef.current = '0';
    } else {
      if (cursorRef.current && mousePos.current.x !== -100) {
        cursorRef.current.style.opacity = '1';
        opacityRef.current = '1';
      }
      if (dotRef.current && mousePos.current.x !== -100) {
        dotRef.current.style.opacity = '1';
      }
    }
  }, [introVisible]);

  useEffect(() => {
    const updateHoverPosition = () => {
      if (hoverStateRef.current !== 'none' && cursorRef.current) {
        const target = document.querySelector(`[data-cursor="${hoverStateRef.current}"]`);
        if (target) {
          const rect = target.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          cursorRef.current.style.transform = `translate3d(${centerX}px, ${centerY}px, 0)`;
          
          if (hoverStateRef.current === 'nav') {
            cursorRef.current.style.width = `${rect.width + 40}px`;
            cursorRef.current.style.height = `${rect.height + 20}px`;
            cursorRef.current.style.marginLeft = `-${(rect.width + 40) / 2}px`;
            cursorRef.current.style.marginTop = `-${(rect.height + 20) / 2}px`;
          } else if (hoverStateRef.current === 'socials') {
            cursorRef.current.style.width = '72px';
            cursorRef.current.style.height = '280px';
            cursorRef.current.style.marginLeft = '-36px';
            cursorRef.current.style.marginTop = '-140px';
          }
        }
      } else if (cursorRef.current) {
        cursorRef.current.style.width = '32px';
        cursorRef.current.style.height = '32px';
        cursorRef.current.style.marginLeft = '-16px';
        cursorRef.current.style.marginTop = '-16px';
      }
    };

    const onMouseMove = (e) => {
      if (e.clientX === mousePos.current.x && e.clientY === mousePos.current.y) {
        return;
      }
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current && opacityRef.current === '0' && !introVisible) {
        opacityRef.current = '1';
        cursorRef.current.style.opacity = '1';
      }
      if (dotRef.current && dotRef.current.style.opacity === '0' && !introVisible) {
        dotRef.current.style.opacity = '1';
      }
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const socialTarget = e.target.closest('[data-cursor="socials"]');
      const navTarget = e.target.closest('[data-cursor="nav"]');
      
      if (socialTarget && hoverStateRef.current !== 'socials') {
        hoverStateRef.current = 'socials';
        setHoverType('socials');
        updateHoverPosition();
      } else if (navTarget && hoverStateRef.current !== 'nav') {
        hoverStateRef.current = 'nav';
        setHoverType('nav');
        updateHoverPosition();
      } else if (!socialTarget && !navTarget && hoverStateRef.current !== 'none') {
        hoverStateRef.current = 'none';
        setHoverType('none');
        updateHoverPosition();
      }

      if (hoverStateRef.current === 'none' && cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onScroll = () => {
      const { x, y } = mousePos.current;
      if (x !== -100 && y !== -100) {
        const elUnderMouse = document.elementFromPoint(x, y);
        if (elUnderMouse) {
          const socialTarget = elUnderMouse.closest('[data-cursor="socials"]');
          const navTarget = elUnderMouse.closest('[data-cursor="nav"]');
          
          if (socialTarget && hoverStateRef.current !== 'socials') {
            hoverStateRef.current = 'socials';
            setHoverType('socials');
          } else if (navTarget && hoverStateRef.current !== 'nav') {
            hoverStateRef.current = 'nav';
            setHoverType('nav');
          } else if (!socialTarget && !navTarget && hoverStateRef.current !== 'none') {
            hoverStateRef.current = 'none';
            setHoverType('none');
            if (cursorRef.current) {
              cursorRef.current.style.width = '32px';
              cursorRef.current.style.height = '32px';
              cursorRef.current.style.marginLeft = '-16px';
              cursorRef.current.style.marginTop = '-16px';
              cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
          }
        }
      }
      updateHoverPosition();
    };

    const onWindowBlur = () => {
      hoverStateRef.current = 'none';
      setHoverType('none');
      updateHoverPosition();
      opacityRef.current = '0';
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = '0';
      }
    };

    const onMouseOut = (e) => {
      if (!e.relatedTarget) {
        hoverStateRef.current = 'none';
        setHoverType('none');
        updateHoverPosition();
        opacityRef.current = '0';
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0';
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = '0';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [introVisible]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor main-custom-cursor fixed top-0 left-0 pointer-events-none z-[999999] duration-300 ease-out flex items-center justify-center rounded-full max-lg:hidden ${
          hoverType !== 'none'
            ? 'border-2 border-accentOrange shadow-[0_0_15px_rgba(224,90,0,0.8)] bg-transparent' 
            : 'border-2 border-accentOrange/80 bg-accentOrange/10 shadow-[0_0_10px_rgba(224,90,0,0.4)]'
        }`}
        style={{
          width: '32px',
          height: '32px',
          marginLeft: '-16px',
          marginTop: '-16px',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          transitionProperty: 'width, height, margin-left, margin-top, background-color, border-color, box-shadow, opacity',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[1000000] max-lg:hidden main-custom-cursor"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          marginLeft: '-5px',
          marginTop: '-5px',
          opacity: 0,
          transition: 'opacity 300ms ease-out'
        }}
      >
        <div 
          className={`custom-cursor w-2.5 h-2.5 bg-accentOrange rounded-full duration-300 ease-out ${
            hoverType !== 'none' ? 'scale-100' : 'scale-0'
          }`}
          style={{ transitionProperty: 'transform' }}
        />
      </div>
    </>
  );
};

const IntroCurtain = ({ onCurtainGone }) => {
  const [isCurtainGone, setIsCurtainGone] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [animPhase, setAnimPhase] = useState('initial');
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' 
      ? window.innerWidth >= 1024 && window.matchMedia('(hover: hover) and (pointer: fine)').matches 
      : true
  );
  const isScrollEnabledRef = useRef(false);
  const measureRef = useRef(null);
  const introCursorRef = useRef(null);
  const lastMousePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const hasMovedMouseAfterCursoring = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(
      window.innerWidth >= 1024 && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
    const handleMouse = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      if (['cursoring', 'done'].includes(animPhase)) {
        hasMovedMouseAfterCursoring.current = true;
        if (introCursorRef.current) {
          introCursorRef.current.style.top = `${e.clientY}px`;
          introCursorRef.current.style.left = `${e.clientX}px`;
          introCursorRef.current.style.transform = 'translate(-50%, -50%)';
        }
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [animPhase]);

  useEffect(() => {
    if (!fontsLoaded) return;

    if (measureRef.current) {
      setTextWidth(measureRef.current.offsetWidth);
      setTextHeight(measureRef.current.offsetHeight);
    }

    const t1 = setTimeout(() => setAnimPhase('expanding'), 0);
    const t2 = setTimeout(() => setAnimPhase('revealing'), 700);
    const t3 = setTimeout(() => setAnimPhase('shrinking'), 1500);
    const t4 = setTimeout(() => setAnimPhase('cursoring'), 1800);
    const t5 = setTimeout(() => setAnimPhase('done'), 2100);
    const t6 = setTimeout(() => {
      isScrollEnabledRef.current = true;
      setShowArrow(true);
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [fontsLoaded]);
  const curtainRef = useRef(null);
  const arrowRef = useRef(null);
  const scrollDeltaRef = useRef(0);
  const touchStartRef = useRef(0);
  const scrollUnlockTimeoutRef = useRef(null);
  const isAnimatingAwayRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('curtain-active');
    document.body.style.cursor = 'none';

    const preventScroll = (e) => {
      if (e.type === 'keydown') {
        const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
        if (keys.includes(e.code)) e.preventDefault();
      } else {
        e.preventDefault();
      }
    };
    window._tempPreventScroll = preventScroll;
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScroll, { passive: false });

    return () => {
      document.body.classList.remove('curtain-active');
      document.body.style.cursor = '';
      if (scrollUnlockTimeoutRef.current) clearTimeout(scrollUnlockTimeoutRef.current);
      if (window._tempPreventScroll) {
        window.removeEventListener('wheel', window._tempPreventScroll);
        window.removeEventListener('touchmove', window._tempPreventScroll);
        window.removeEventListener('keydown', window._tempPreventScroll);
        delete window._tempPreventScroll;
      }
    };
  }, []);

  useEffect(() => {
    if (isCurtainGone) return;

    const triggerCurtainComplete = () => {
      setIsCurtainGone(true);
      if (onCurtainGone) onCurtainGone();
      
      document.body.classList.remove('curtain-active');
      document.body.style.cursor = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      if (window._tempPreventScroll) {
        scrollUnlockTimeoutRef.current = setTimeout(() => {
          window.removeEventListener('wheel', window._tempPreventScroll);
          window.removeEventListener('touchmove', window._tempPreventScroll);
          window.removeEventListener('keydown', window._tempPreventScroll);
          delete window._tempPreventScroll;
        }, 1200);
      }
    };

    const updateCurtain = (newDelta) => {
      if (isAnimatingAwayRef.current) return;
      const maxScroll = window.innerHeight;
      let clampedDelta = Math.max(0, Math.min(newDelta, maxScroll));
      scrollDeltaRef.current = clampedDelta;

      if (arrowRef.current) {
        arrowRef.current.style.opacity = clampedDelta > 10 ? '0' : '1';
      }

      if (curtainRef.current) {
        curtainRef.current.style.transform = `translateY(-${clampedDelta}px)`;
      }

      if (clampedDelta >= maxScroll) {
        triggerCurtainComplete();
      }
    };

    const handleWheel = (e) => {
      if (!isScrollEnabledRef.current || isCurtainGone) return;
      updateCurtain(scrollDeltaRef.current + e.deltaY);
    };

    const handleTouchStart = (e) => {
      if (!isScrollEnabledRef.current) return;
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isScrollEnabledRef.current || isAnimatingAwayRef.current) return;
      const currentY = e.touches[0].clientY;
      const totalSwipeDistance = touchStartRef.current - currentY;

      // If the user swipes UP by more than 40px, dismiss the curtain automatically
      if (totalSwipeDistance > 40) {
        isAnimatingAwayRef.current = true;
        const maxScroll = window.innerHeight;
        scrollDeltaRef.current = maxScroll;
        
        if (arrowRef.current) arrowRef.current.style.opacity = '0';
        
        if (curtainRef.current) {
          curtainRef.current.style.transition = 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
          curtainRef.current.style.transform = `translateY(-${maxScroll}px)`;
        }
        
        setTimeout(() => {
          triggerCurtainComplete();
        }, 800);
      } else if (totalSwipeDistance > 0) {
        // Show 1:1 drag feedback for the first 40px
        updateCurtain(totalSwipeDistance);
      }
    };

    const handleMouseMove = (e) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    const handleKeyDown = (e) => {
      if (!isScrollEnabledRef.current) return;
      if (e.key === 'Enter' && !isAnimatingAwayRef.current) {
        e.preventDefault();
        isAnimatingAwayRef.current = true;
        const maxScroll = window.innerHeight;
        scrollDeltaRef.current = maxScroll;
        
        if (arrowRef.current) arrowRef.current.style.opacity = '0';
        
        if (curtainRef.current) {
          curtainRef.current.style.transition = 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
          curtainRef.current.style.transform = `translateY(-${maxScroll}px)`;
        }
        
        setTimeout(() => {
          triggerCurtainComplete();
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCurtainGone]);

  if (isCurtainGone) return null;

  return (
    <>
      
      {/* Portfolio Text Layer - Blocks the main app, stays completely static */}
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#1a1a1a] z-[9998] flex items-center justify-center pointer-events-auto cursor-none">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.04
          }}
        />

        {/* Hidden Measurement Ref */}
        <span 
          ref={measureRef} 
          style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap', fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-2px' }}
        >
          Portfolio
        </span>

        {/* Sequence Start */}

        {/* PHASES 2 to 5: JS Controlled Animations */}
        {animPhase !== 'bouncing' && (
          <div className="absolute inset-0 z-[99999] pointer-events-none">
            
            {/* Phase 4: Text Clip Mask */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                overflow: 'hidden',
                height: textHeight ? `${textHeight}px` : 'auto',
                width: textWidth ? `${textWidth}px` : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: '#E05A00',
                  fontFamily: 'Syne',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  letterSpacing: '-2px',
                  whiteSpace: 'nowrap',
                  transform: ['revealing', 'shrinking', 'cursoring', 'done'].includes(animPhase) ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)'
                }}
              >
                Portfolio
              </span>
            </div>

            {/* Phase 2: Squishing Ball */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#E05A00',
                transformOrigin: 'bottom',
                opacity: animPhase === 'submerging' ? 1 : 0,
                animation: animPhase === 'submerging' ? 'squishBall 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'
              }}
            />

            {/* Anchor Line -> Text Reveal -> Live Cursor */}
            <div 
              ref={introCursorRef}
              style={{
                position: 'absolute',
                top: hasMovedMouseAfterCursoring.current ? `${lastMousePos.current.y}px` : '50%',
                left: hasMovedMouseAfterCursoring.current ? `${lastMousePos.current.x}px` : '50%',
                transform: hasMovedMouseAfterCursoring.current
                  ? 'translate(-50%, -50%)' 
                  : `translate(-50%, calc(-50% - ${['revealing', 'shrinking', 'cursoring', 'done'].includes(animPhase) ? textHeight : 0}px))`,
                width: ['shrinking', 'cursoring', 'done'].includes(animPhase) ? (isDesktop ? '12px' : '0px') : (['expanding', 'revealing'].includes(animPhase) ? `${textWidth}px` : '0px'),
                height: ['shrinking', 'cursoring', 'done'].includes(animPhase) ? (isDesktop ? '12px' : '3px') : '3px',
                borderRadius: ['shrinking', 'cursoring', 'done'].includes(animPhase) ? (isDesktop ? '50%' : '2px') : '2px',
                background: '#E05A00',
                opacity: 1,
                transition: animPhase === 'cursoring'
                  ? (isDesktop 
                      ? 'top 0ms, left 0ms, width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 0ms'
                      : 'top 0ms, left 0ms, width 600ms cubic-bezier(0.76, 0, 0.24, 1), transform 0ms')
                  : animPhase === 'shrinking'
                    ? (isDesktop 
                        ? 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                        : 'width 600ms cubic-bezier(0.76, 0, 0.24, 1)')
                    : animPhase === 'revealing' 
                      ? 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)' 
                      : animPhase === 'done'
                        ? 'top 0ms, left 0ms, transform 0ms'
                        : 'width 600ms cubic-bezier(0.76, 0, 0.24, 1)',
              }}
            />
          </div>
        )}

        {/* Top Left Name */}
        <div 
          className="absolute top-8 left-8 text-[#E05A00] font-inter text-[11px] font-bold tracking-[4px] uppercase select-none"
          style={{
            opacity: animPhase === 'done' ? 1 : 0,
            transform: animPhase === 'done' ? 'translateX(0)' : 'translateX(-10px)',
            transition: 'opacity 400ms ease-out, transform 400ms ease-out'
          }}
        >
          DEV RANA
        </div>

        {/* Bottom Right Year */}
        <div 
          className="absolute max-lg:bottom-20 lg:bottom-8 max-lg:right-6 lg:right-8 text-[#E05A00] font-inter text-[12px] font-semibold select-none"
          style={{
            opacity: animPhase === 'done' ? 1 : 0,
            transform: animPhase === 'done' ? 'translateX(0)' : 'translateX(10px)',
            transition: 'opacity 400ms ease-out, transform 400ms ease-out'
          }}
        >
          © 26
        </div>



        {/* The arrow */}
        <div 
          ref={arrowRef}
          className="absolute max-lg:bottom-20 lg:bottom-10 flex flex-col items-center"
          style={{
            opacity: showArrow ? 1 : 0,
            transition: 'opacity 500ms ease-in'
          }}
        >
          <span 
            className={`text-[#E05A00] text-[28px] ${showArrow ? 'animate-bounce' : ''}`}
            style={{ animationDuration: '2s' }}
          >
            ↓
          </span>
        </div>
      </div>

      {/* Masking Layer - Starts below screen, slides up to cover text */}
      <div 
        ref={curtainRef}
        className="fixed top-full left-0 w-[100vw] h-[100vh] bg-[#1a1a1a] z-[9999] flex flex-col items-center justify-center will-change-transform pointer-events-none overflow-hidden"
      >
        {/* Subtle Noise Texture on mask as well to maintain illusion */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.04
          }}
        />
      </div>
    </>
  );
};

const FloatingResumeButton = ({ introVisible }) => {
  const handleClick = () => {
    window.open('https://docs.google.com/document/d/1TlJd13p9aTGAX5duUoCMQMxkwa3qjUYx/preview', '_blank');
  };

  return (
    <button
      className={`resume-btn group fixed bottom-8 right-6 z-[9998] h-12 flex items-center justify-end pr-[11px] cursor-pointer overflow-hidden box-border
                 w-12 rounded-full bg-accentOrange border border-transparent shadow-[0_4px_20px_rgba(224,90,0,0.4)]
                 md:hover:w-[140px] md:hover:rounded-[24px] md:hover:bg-[#1a1a1a] md:hover:border-accentOrange
                 ${introVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        transition: 'opacity 500ms ease, width 300ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms ease, background-color 200ms ease, border-color 200ms ease'
      }}
      onClick={handleClick}
    >
      <span
        className="absolute left-5 text-accentOrange font-semibold text-[14px] tracking-[1px] whitespace-nowrap pointer-events-none
                   opacity-0 translate-x-[10px] transition-all duration-150 ease-out delay-0
                   md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:duration-200 md:group-hover:delay-100"
      >
        Resume
      </span>
      <FileText 
        size={24} 
        color="white"
        className="shrink-0 transition-transform duration-300 ease-out md:group-hover:-rotate-[10deg]"
      />
    </button>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);

  // Detect initial mouse presence for custom cursor display
  useEffect(() => {
    const onMouseMove = (e) => {
      // Ignore pure touch events, but allow 'mouse', 'pen', or empty (trackpads/older browsers)
      if (e.pointerType === 'touch') return;
      
      document.body.classList.add('has-mouse');
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
    };
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#works' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="bg-[#1a1a1a] min-h-screen p-2 md:p-6 lg:p-8">
      <IntroCurtain onCurtainGone={() => setIntroVisible(false)} />
      <CustomCursor introVisible={introVisible} />
      <FloatingResumeButton introVisible={introVisible} />
      
      {/* Outer wrapper frame as requested */}
      <div className="portfolio-outer font-inter">
        <div className="portfolio-inner">
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 max-w-7xl mx-auto">
          {/* Mobile Elements */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-accentOrange transition-colors"
          >
            <Menu className="w-8 h-8" />
          </button>
          
          <div className="md:hidden font-syne text-[32px] font-[800] tracking-tighter italic z-50 drop-shadow-lg select-none flex items-baseline">
            <span className="text-[#fcfcfc]">D</span>
            <span className="text-accentOrange drop-shadow-[0_0_8px_rgba(224,90,0,0.4)]">R</span>
          </div>
          
          {/* Spacer to balance flex layout on mobile */}
          <div className="md:hidden w-8"></div>

          {/* Desktop/Tablet Elements */}
          <div className="hidden md:flex w-full justify-center items-center z-50">
            <div className="flex justify-center items-center gap-10 px-8 py-3 transition-all duration-300 cursor-none group" data-cursor="nav">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-white/80 font-inter font-semibold uppercase text-sm tracking-widest transition-all duration-300 outline-none cursor-none inline-block will-change-transform group-hover:scale-110 hover:!scale-125 hover:!text-accentOrange"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Slide-in Menu */}
        <div className={`md:hidden absolute inset-0 z-[100] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
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
                  className="text-white hover:text-accentOrange font-inter font-semibold uppercase tracking-widest text-base transition-colors"
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
        <Contact />

      </div>
      </div>
    </div>
  );
}
