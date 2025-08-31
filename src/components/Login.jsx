import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Eye, EyeOff, ArrowRight, AlertCircle, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { userRoles } from '../data/dummyData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthForm = ({ onSuccess, darkMode }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { login, signUp, signInWithGoogle } = useAuth()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const authFunction = isSignUp ? signUp : login
      const user = await authFunction(formData.email, formData.password)
      onSuccess(user)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const user = await signInWithGoogle()
      onSuccess(user)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
  <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-lg shadow-sm focus:ring-coastal-500 focus:border-coastal-500`}
          />
        </div>

        <div>
          <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Password</label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-lg shadow-sm focus:ring-coastal-500 focus:border-coastal-500 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              ) : (
                <Eye className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium ${darkMode ? 'text-white bg-coastal-700 hover:bg-coastal-800' : 'text-white bg-coastal-600 hover:bg-coastal-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coastal-500`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            isSignUp ? 'Sign Up' : 'Sign In'
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-2 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-100 hover:bg-gray-800' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'} shadow-sm text-sm font-medium rounded-lg`}
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-2" />
        Continue with Google
      </button>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className={darkMode ? 'text-coastal-300 hover:text-coastal-200' : 'text-coastal-600 hover:text-coastal-500'}
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </motion.div>
  )
}

const RoleSelector = ({ onSelect, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Select your department</h3>
      <div className="grid grid-cols-1 gap-3">
        {userRoles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={`p-4 text-left rounded-lg border-2 ${darkMode ? 'border-gray-700 bg-gray-900 hover:border-coastal-400 hover:bg-gray-800' : 'border-gray-200 bg-white hover:border-coastal-300 hover:bg-gray-50'} transition-all duration-200`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{role.icon}</span>
              <div>
                <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{role.name}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{role.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

const Login = () => {
  const [step, setStep] = useState('auth'); // 'auth' or 'role'
  const [authUser, setAuthUser] = useState(null);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleAuthSuccess = (user) => {
    setAuthUser(user);
    setStep('role');
  };

  const handleRoleSelect = (roleId) => {
    setUserRole(roleId);
    const role = userRoles.find((r) => r.id === roleId);
    localStorage.setItem('userData', JSON.stringify({
      role: roleId,
      roleName: role?.name,
    }));
    toast.success('Department selected successfully!');
    navigate('/dashboard');
  };

  return (
    <div className={darkMode ? "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 to-gray-900" : "min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-coastal-50 to-ocean-50"}>
      <div className={darkMode ? "max-w-md w-full space-y-8 bg-gray-900 rounded-xl shadow-xl p-8" : "max-w-md w-full space-y-8 bg-white rounded-xl shadow-xl p-8"}>
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={darkMode ? "mx-auto h-12 w-12 bg-gradient-to-br from-coastal-700 to-ocean-700 rounded-lg flex items-center justify-center" : "mx-auto h-12 w-12 bg-gradient-to-br from-coastal-500 to-ocean-500 rounded-lg flex items-center justify-center"}
          >
            <Shield className="h-6 w-6 text-white" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={darkMode ? "mt-6 text-3xl font-bold text-gray-100" : "mt-6 text-3xl font-bold text-gray-900"}
          >
            {step === 'auth' ? 'Welcome Back' : 'Select Your Department'}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={darkMode ? "mt-2 text-sm text-gray-400" : "mt-2 text-sm text-gray-600"}
          >
            {step === 'auth'
              ? 'Sign in to access your dashboard'
              : 'Choose your department to continue'}
          </motion.p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className={darkMode ? "px-2 py-1 rounded bg-gray-800 text-yellow-300" : "px-2 py-1 rounded bg-gray-200 text-gray-700"}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'auth' ? (
            <AuthForm key="auth" onSuccess={handleAuthSuccess} darkMode={darkMode} />
          ) : (
            <RoleSelector key="role" onSelect={handleRoleSelect} darkMode={darkMode} />
          )}
        </AnimatePresence>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login


