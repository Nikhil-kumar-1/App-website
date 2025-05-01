import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  // Refs for sections
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);
  
  // State for active nav item
  const [activeSection, setActiveSection] = useState("home");
  
  // Hero animations
  const controls = useAnimation();
  const [ref, inView] = useInView();

  // Scroll handler
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  // Scroll listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (scrollPosition < aboutRef.current.offsetTop) {
        setActiveSection("home");
      } else if (scrollPosition < servicesRef.current.offsetTop) {
        setActiveSection("about");
      } else if (scrollPosition < galleryRef.current.offsetTop) {
        setActiveSection("services");
      } else if (scrollPosition < contactRef.current.offsetTop) {
        setActiveSection("gallery");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero animation triggers
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Hero animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-green-600 flex items-center"
            >
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm4.5 5.5v9h9v-9h-9z" />
              </svg>
              VNM_APP
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 ${activeSection === "home" ? "text-green-600 font-medium" : "text-gray-600"}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 ${activeSection === "about" ? "text-green-600 font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(aboutRef)}
              >
                About
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 ${activeSection === "services" ? "text-green-600 font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(servicesRef)}
              >
                Services
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 ${activeSection === "gallery" ? "text-green-600 font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(galleryRef)}
              >
                Portfolio
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 ${activeSection === "contact" ? "text-green-600 font-medium" : "text-gray-600"}`}
                onClick={() => scrollToSection(contactRef)}
              >
                Contact
              </motion.button>
            </div>
            
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="overflow-hidden   container mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={heroVariants}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                Transforming Ideas Into Apps
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              We Build <span className="text-green-600">Digital Experiences</span> That Matter
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8">
              AppCraft specializes in creating custom mobile and web applications that drive business growth and engage users. Our team of expert developers turns your vision into reality.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
                onClick={() => scrollToSection(servicesRef)}
              >
                Our Services
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium"
                onClick={() => scrollToSection(contactRef)}
              >
                Get a Quote
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.8,
                delay: 0.4
              }
            }}
            className="md:w-1/2 relative"
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <motion.img 
              src="https://plus.unsplash.com/premium_photo-1721080250995-5a83519eb2a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D" 
              alt="App Development" 
              className="relative rounded-lg shadow-xl w-full z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        className="py-20 px-6 bg-white"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About AppCraft</h2>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">Who We Are</h3>
                <p className="text-gray-600 mb-4">
                  Founded in 2015, AppCraft is a leading app development company with a team of 50+ passionate developers, designers, and strategists. We've delivered over 200 successful projects to clients across 15 countries.
                </p>
                <p className="text-gray-600 mb-6">
                  Our mission is to create digital solutions that solve real problems while delivering exceptional user experiences. We combine technical expertise with creative thinking to build apps that stand out in the market.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">10M+</h4>
                    <p className="text-sm text-gray-600">App Downloads</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">200+</h4>
                    <p className="text-sm text-gray-600">Projects Completed</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">50+</h4>
                    <p className="text-sm text-gray-600">Team Members</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-700 mb-2">15+</h4>
                    <p className="text-sm text-gray-600">Countries Served</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Our Team" 
                    className="rounded-lg shadow-lg w-full"
                  />
                  <motion.div 
                    className="absolute -bottom-5 -right-5 bg-green-600 text-white p-4 rounded-lg shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-xl font-bold">8+ Years</div>
                    <div className="text-sm">Of Experience</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-20 px-6 bg-gray-100"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Our App Development Services</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              We offer end-to-end app development services from concept to deployment and beyond.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500"
              >
                <div className="text-green-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile App Development</h3>
                <p className="text-gray-600 mb-4">
                  Custom native and cross-platform mobile apps for iOS and Android with flawless performance and intuitive interfaces.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    iOS & Android Development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    React Native & Flutter
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    App Store Optimization
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500"
              >
                <div className="text-blue-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Web Application Development</h3>
                <p className="text-gray-600 mb-4">
                  Powerful, scalable web applications with modern frameworks and cloud-ready architectures.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    React, Angular & Vue.js
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Node.js & Django Backends
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Progressive Web Apps
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500"
              >
                <div className="text-purple-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                <p className="text-gray-600 mb-4">
                  Beautiful, intuitive interfaces designed to maximize user engagement and satisfaction.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    User Research & Testing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Wireframing & Prototyping
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Design Systems
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500"
              >
                <div className="text-yellow-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">App Maintenance</h3>
                <p className="text-gray-600 mb-4">
                  Ongoing support and updates to keep your app running smoothly and securely.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Bug Fixes & Updates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Performance Optimization
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Security Patches
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500"
              >
                <div className="text-red-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">App Security</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive security solutions to protect your app and user data.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Penetration Testing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Data Encryption
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Compliance Consulting
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500"
              >
                <div className="text-indigo-600 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics & Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Data-driven insights to improve your app's performance and user engagement.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    User Behavior Tracking
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    A/B Testing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Conversion Optimization
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery/Portfolio Section */}
      <section 
        ref={galleryRef}
        className="py-20 px-6 bg-white"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Our Portfolio</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore some of our recent projects that showcase our expertise and creativity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "HealthTrack Pro",
                  description: "A comprehensive health monitoring app for iOS and Android with wearable integration.",
                  image: "https://cdn.dribbble.com/users/1787323/screenshots/14139196/media/0c782d21e1a4e8e7a3c7d3b4a6f6e5e1.png",
                  tags: ["Mobile", "Health Tech", "React Native"]
                },
                {
                  title: "EduConnect Platform",
                  description: "Web-based learning management system with real-time collaboration tools.",
                  image: "https://cdn.dribbble.com/users/1998175/screenshots/14575409/media/a7d7d9f6a9f045a9aa5e0d447ad05a3d.png",
                  tags: ["Web", "Education", "React"]
                },
                {
                  title: "FinWise Mobile Banking",
                  description: "Secure banking app with biometric authentication and financial insights.",
                  image: "https://cdn.dribbble.com/users/15687/screenshots/15535926/media/5a0d1a7a752d4d6c5e1c3e3e3e3e3e3e.png",
                  tags: ["Mobile", "FinTech", "Flutter"]
                },
                {
                  title: "ShopEasy E-Commerce",
                  description: "Complete e-commerce solution with AR product preview and one-click checkout.",
                  image: "https://cdn.dribbble.com/users/15687/screenshots/15535926/media/5a0d1a7a752d4d6c5e1c3e3e3e3e3e3e.png",
                  tags: ["Web", "E-Commerce", "Vue.js"]
                },
                {
                  title: "FitCoach AI",
                  description: "AI-powered fitness coaching app with personalized workout plans.",
                  image: "https://cdn.dribbble.com/users/1787323/screenshots/14139196/media/0c782d21e1a4e8e7a3c7d3b4a6f6e5e1.png",
                  tags: ["Mobile", "Fitness", "Machine Learning"]
                },
                {
                  title: "TaskMaster Pro",
                  description: "Productivity app with team collaboration and project management features.",
                  image: "https://cdn.dribbble.com/users/1998175/screenshots/14575409/media/a7d7d9f6a9f045a9aa5e0d447ad05a3d.png",
                  tags: ["Web & Mobile", "Productivity", "React & React Native"]
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-lg shadow-lg bg-white"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <div className="flex flex-wrap mt-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-green-600 text-white px-2 py-1 rounded-full mr-2 mb-2">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-green-600 border border-green-600 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      View Case Study
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
              >
                View All Projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="py-20 px-6 bg-green-800 text-white"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-center mb-4">Ready to Build Your App?</h2>
            <p className="text-center mb-12 max-w-2xl mx-auto opacity-90">
              Get in touch with our team to discuss your project and receive a free consultation.
            </p>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-700 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Our Office</h4>
                      <p className="opacity-90">
                        123 Tech Park, Silicon Valley<br />
                        San Francisco, CA 94107<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-700 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="opacity-90">
                        +1 (415) 555-0123<br />
                        Mon-Fri, 9am-6pm PST
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-700 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="opacity-90">
                        hello@appcraft.com<br />
                        We reply within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <form className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-4 py-3 rounded-lg bg-green-700 bg-opacity-50 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-4 py-3 rounded-lg bg-green-700 bg-opacity-50 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <input 
                      type="text" 
                      placeholder="Company Name" 
                      className="w-full px-4 py-3 rounded-lg bg-green-700 bg-opacity-50 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <select 
                      className="w-full px-4 py-3 rounded-lg bg-green-700 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-white appearance-none"
                    >
                      <option value="">What service are you interested in?</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="web">Web Application Development</option>
                      <option value="design">UI/UX Design</option>
                      <option value="maintenance">App Maintenance</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <textarea 
                      placeholder="Tell us about your project" 
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg bg-green-700 bg-opacity-50 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white text-green-800 px-6 py-3 rounded-lg font-medium shadow-md w-full md:w-auto"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm4.5 5.5v9h9v-9h-9z" />
                </svg>
                AppCraft
              </h3>
              <p className="text-green-200 mb-4">
                Transforming ideas into exceptional digital experiences through innovative app development.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="text-green-300 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={`M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z`} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">Mobile App Development</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Web App Development</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">UI/UX Design</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">App Maintenance</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">App Security</a></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Our Team</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Contact</a></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg mb-4">Newsletter</h4>
              <p className="text-green-200 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg bg-green-800 text-white focus:outline-none w-full"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-4 py-2 rounded-r-lg"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-300">
            <p>© {new Date().getFullYear()} AppCraft Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;