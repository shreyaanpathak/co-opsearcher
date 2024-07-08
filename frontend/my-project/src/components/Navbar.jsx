import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const greetings = ["Internships", "Co-Ops", "Jobs", "Life"];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const dragControls = useDragControls();
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState(() => {
    const saved = localStorage.getItem('sidebarButtonPosition');
    return saved ? JSON.parse(saved) : { y: window.innerHeight / 2 };
  });

  const navItems = [
    { name: 'Intro', emoji: '🌟', id: 'intro' },
  ];

  useEffect(() => {
    const typeWriter = (text, i = 0) => {
      if (i < text.length) {
        setTypewriterText(text.substring(0, i + 1));
        setTimeout(() => typeWriter(text, i + 1), 100);
      } else {
        setTimeout(() => {
          setTypewriterText('');
          setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 10000);
      }
    };

    typeWriter(greetings[currentGreetingIndex]);
  }, [currentGreetingIndex]);

  useEffect(() => {
    localStorage.setItem('sidebarButtonPosition', JSON.stringify(buttonPosition));
  }, [buttonPosition]);

  useEffect(() => {
    const handleResize = () => {
      if (buttonRef.current) {
        const buttonHeight = buttonRef.current.offsetHeight;
        const maxY = window.innerHeight - buttonHeight;
        setButtonPosition(prev => ({
          y: Math.min(Math.max(prev.y, 0), maxY)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (event, info) => {
    if (buttonRef.current) {
      const buttonHeight = buttonRef.current.offsetHeight;
      const maxY = window.innerHeight - buttonHeight;
      const newY = Math.min(Math.max(info.point.y, 0), maxY);
      setButtonPosition({ y: newY });
    }
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        drag="y"
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={{
          top: 0,
          bottom: buttonRef.current ? window.innerHeight - buttonRef.current.offsetHeight : window.innerHeight
        }}
        onDragEnd={handleDragEnd}
        initial={buttonPosition}
        animate={buttonPosition}
        style={{ position: 'fixed', left: 0 }}
        className="z-50 text-white p-2 rounded-r-lg cursor-ns-resize bg-gray-800"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </motion.button>

      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-64 bg-black text-white p-6 z-40 overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-8"
          >
            <div className="bg-gray-900 rounded-lg px-7 w-full h-12 items-center text-base font-bold relative group block py-2">
              <h1 className="text-xl text-white font-bold">
                Co-Op Searcher
              </h1>
            </div>
          </motion.div>

          <div className="flex-grow">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>

          <div className="mt-auto">
            <div className="text-2xl font-bold text-gray-500 mb-4">
              {typewriterText}
              <span className="animate-blink">|</span>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

function NavItem({ item }) {
  return (
    <motion.a
      href={`#${item.id}`}
      className="text-base font-bold relative group block py-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-gray-500">
        {item.name}
      </span>
      {' '}
      <span>{item.emoji}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-500 transition-all group-hover:w-full"></span>
    </motion.a>
  );
}

function TopBar() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-black h-20 flex items-center justify-center z-30 rounded-b-lg"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="flex space-x-8"
      >
        <div className="flex justify-center items-center bg-gray-900 rounded-lg w-full h-12 px-6">
          <div className="font-bold text-2xl text-white">
            Co-OpSearcher
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-16 bg-white text-black">
        {children}
      </main>
    </>
  );
}
