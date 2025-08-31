import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { userRoles } from '../data/dummyData'

import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div className={darkMode ? "min-h-screen bg-gray-950 text-gray-100" : "min-h-screen bg-gradient-to-br from-coastal-50 to-white text-gray-900"}>
      {/* Navigation */}
  <nav className={darkMode ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50" : "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={darkMode ? "text-xl font-bold text-gray-100" : "text-xl font-bold text-gray-900"}>Coastal Threat Alert</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className={darkMode ? "btn-primary bg-blue-700 text-white" : "btn-primary bg-coastal-600 text-white"}>
                Sign In
              </Link>
              <button
                onClick={toggleDarkMode}
                className={darkMode ? "px-2 py-1 rounded bg-gray-800 text-yellow-300" : "px-2 py-1 rounded bg-gray-200 text-gray-700"}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={darkMode ? "text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 mb-6" : "text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"}>
              Coastal Threat
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {' '}Alert System
              </span>
            </h1>
            <p className={darkMode ? "text-xl text-gray-400 mb-8 max-w-3xl mx-auto" : "text-xl text-gray-600 mb-8 max-w-3xl mx-auto"}>
              Advanced early warning and alerting system for coastal threats including storm surges, 
              erosion, pollution, and cyclones. Protecting coastal communities through real-time monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className={darkMode ? "btn-primary text-lg px-8 py-3 bg-blue-700 text-white" : "btn-primary text-lg px-8 py-3 bg-coastal-600 text-white"}>
                Get Started
              </Link>
              <button className={darkMode ? "btn-secondary text-lg px-8 py-3 bg-gray-800 text-yellow-300" : "btn-secondary text-lg px-8 py-3 bg-gray-200 text-gray-700"}>
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
  <section className={darkMode ? "py-20 px-4 sm:px-6 lg:px-8 bg-gray-900" : "py-20 px-4 sm:px-6 lg:px-8 bg-white"}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={darkMode ? "text-3xl font-bold text-gray-100 mb-4" : "text-3xl font-bold text-gray-900 mb-4"}>
              Comprehensive Coastal Protection
            </h2>
            <p className={darkMode ? "text-xl text-gray-400 max-w-2xl mx-auto" : "text-xl text-gray-600 max-w-2xl mx-auto"}>
              Our system provides specialized dashboards for different user roles, 
              ensuring everyone gets the information they need to stay safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={darkMode ? "card hover:shadow-lg transition-shadow duration-300 cursor-pointer group bg-gray-800 text-yellow-100" : "card hover:shadow-lg transition-shadow duration-300 cursor-pointer group bg-white text-gray-900"}
              >
                <div className="text-4xl mb-4">{role.icon}</div>
                <h3 className={darkMode ? "text-xl font-semibold text-yellow-100 mb-2" : "text-xl font-semibold text-gray-900 mb-2"}>
                  {role.name}
                </h3>
                <p className={darkMode ? "text-gray-400 mb-4" : "text-gray-600 mb-4"}>
                  {role.description}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-900 text-yellow-200' : `bg-${role.color}-100 text-${role.color}-800`}`}> 
                  {role.name.split(' ')[0]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
  <section className={darkMode ? "py-20 px-4 sm:px-6 lg:px-8 bg-gray-950" : "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-coastal-50 to-ocean-50"}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className={darkMode ? "text-3xl font-bold text-blue-400" : "text-3xl font-bold text-coastal-600"}>24/7</div>
              <div className={darkMode ? "text-yellow-200" : "text-gray-600"}>Monitoring</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <div className={darkMode ? "text-3xl font-bold text-cyan-400" : "text-3xl font-bold text-ocean-600"}>5</div>
              <div className={darkMode ? "text-yellow-200" : "text-gray-600"}>User Roles</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <div className={darkMode ? "text-3xl font-bold text-blue-400" : "text-3xl font-bold text-coastal-600"}>Real-time</div>
              <div className={darkMode ? "text-yellow-200" : "text-gray-600"}>Alerts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <div className={darkMode ? "text-3xl font-bold text-cyan-400" : "text-3xl font-bold text-ocean-600"}>100%</div>
              <div className={darkMode ? "text-yellow-200" : "text-gray-600"}>Coverage</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
  <footer className={darkMode ? "bg-gray-900 text-yellow-100 py-12 px-4 sm:px-6 lg:px-8" : "bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Coastal Threat Alert System</span>
          </div>
          <p className={darkMode ? "text-yellow-200 mb-4" : "text-gray-400 mb-4"}>
            Protecting coastal communities through advanced monitoring and early warning systems.
          </p>
          <div className={darkMode ? "text-sm text-yellow-400" : "text-sm text-gray-500"}>
            © 2024 Coastal Threat Alert System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
