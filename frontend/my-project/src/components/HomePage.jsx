import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaBriefcase, FaHandshake, FaRocket, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaLightbulb, FaUsers, FaChartLine } from 'react-icons/fa';
import Navbar from './Navbar';
import Tilt from 'react-parallax-tilt';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import stock1 from '../assets/stock1.png';
import stock2 from '../assets/stock2.png';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <HeroSection />
      <FeaturedInternships />
      <AboutCreators />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 min-h-screen flex items-center justify-center overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />
      
      <Tilt className="absolute left-0 bottom-0 z-10" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
        <motion.img 
          src={stock1}
          alt="People discussing" 
          className="h-80 w-auto opacity-70 p-4"
          style={{ filter: 'brightness(0) invert(1)' }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </Tilt>
      
      <Tilt className="absolute right-0 top-0 z-10" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
        <motion.img 
          src={stock2}
          alt="Person using laptop" 
          className="h-80 w-auto opacity-70 p-4"
          style={{ filter: 'brightness(0) invert(1)' }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </Tilt>
      
      <div className="absolute inset-0 bg-blue-900 opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-extrabold text-white sm:text-7xl md:text-8xl"
        >
          Co-Op <span className="text-yellow-400">Searcher</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto"
        >
          Navigate your way to the perfect co-op/intern opportunity. Connect with top companies and kickstart your career journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#FCD34D", color: "#1E3A8A" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-yellow-400 hover:bg-yellow-300 md:py-4 md:text-lg md:px-10 transition-all duration-300"
          >
            Start Exploring
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#1E3A8A", color: "#FCD34D" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-yellow-400 text-base font-medium rounded-md text-yellow-400 bg-transparent hover:bg-blue-800 md:py-4 md:text-lg md:px-10 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </div>
  );
};


const FeaturedInternships = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const internships = [
    { company: 'TechCorp', role: 'Software Engineering Intern', location: 'San Francisco, CA' },
    { company: 'FinanceHub', role: 'Data Analytics Intern', location: 'New York, NY' },
    { company: 'GreenEnergy', role: 'Sustainability Research Intern', location: 'Austin, TX' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl text-center mb-12">
          Featured Internships
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 p-6 rounded-lg shadow-lg border-2 border-yellow-400"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{internship.role}</h3>
              <p className="text-blue-700 mb-2">{internship.company}</p>
              <p className="text-blue-600">{internship.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AboutCreators = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const creators = [
    {
      name: 'Tilak Patel',
      role: 'Co-creator',
      bio: 'Tilak is a backend developer with love of Robotics and Machine Learning and AI',
      icon: <FaLightbulb className="w-12 h-12 text-yellow-400 mb-4" />,
    },
    {
      name: 'Shreyaan Pathak',
      role: 'Co-creator',
      bio: 'Shreyaan is a backend developer with a knack for Machine Learning and AI systems',
      icon: <FaUsers className="w-12 h-12 text-yellow-400 mb-4" />,
    },
    {
      name: 'Sai Muppasani',
      role: 'Co-creator',
      bio: 'Sai brings his expertise in JavaScript development and Web developemnet',
      icon: <FaChartLine className="w-12 h-12 text-yellow-400 mb-4" />,
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 bg-blue-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl text-center mb-12">
          Meet the Creators
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-800 p-6 rounded-lg shadow-xl text-center border-2 border-yellow-400"
            >
              {creator.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{creator.name}</h3>
              <p className="text-yellow-400 mb-4">{creator.role}</p>
              <p className="text-blue-100">{creator.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    { icon: <FaSearch className="w-10 h-10 text-yellow-400" />, title: 'Search', description: 'Browse through a wide range of internship opportunities.' },
    { icon: <FaBriefcase className="w-10 h-10 text-yellow-400" />, title: 'Apply', description: 'Submit your application to your chosen internships.' },
    { icon: <FaHandshake className="w-10 h-10 text-yellow-400" />, title: 'Connect', description: 'Interview and connect with potential employers.' },
    { icon: <FaRocket className="w-10 h-10 text-yellow-400" />, title: 'Launch', description: 'Start your internship and launch your career!' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 bg-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-yellow-400"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h3>
              <p className="text-blue-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    { name: 'Sarah M.', role: 'Software Engineering Intern', quote: 'This platform helped me land my dream internship at a top tech company!' },
    { name: 'Michael L.', role: 'Marketing Intern', quote: 'The resources and connections I made through this site were invaluable to my career growth.' },
    { name: 'Jessica K.', role: 'Data Science Intern', quote: 'I found opportunities I never knew existed. Highly recommend for all students!' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 bg-blue-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-800 p-6 rounded-lg shadow-xl border-2 border-yellow-400"
            >
              <p className="text-blue-100 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-yellow-400 font-semibold">{testimonial.name}</p>
              <p className="text-blue-200">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">About Us</h3>
            <p className="text-blue-100">We connect students with top companies for internship opportunities, helping launch careers and foster professional growth.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">Home</a></li>
              <li><a href="/internships" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">Internships</a></li>
              <li><a href="/companies" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">Companies</a></li>
              <li><a href="/resources" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h3>
            <p className="text-blue-100">Email: tilakny@gmail.com</p>
            <p className="text-blue-100">Phone: Sai Number</p>
            <p className="text-blue-100">Address: Seattle, WA</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-yellow-400 transition duration-150 ease-in-out">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p className="text-blue-200">&copy; {new Date().getFullYear()} Co-Op Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default HomePage;
