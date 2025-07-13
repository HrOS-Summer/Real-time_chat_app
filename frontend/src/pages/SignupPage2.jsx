import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Sun, Moon, MessageSquare } from 'lucide-react';

const CreateAccountForm = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'you@example.com',
    password: '••••••••'
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Toggle Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
              : 'bg-white hover:bg-gray-100 text-gray-600 shadow-lg'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 ${
                isDarkMode 
                  ? 'bg-indigo-600/20 text-indigo-400' 
                  : 'bg-indigo-100 text-indigo-600'
              }`}>
                <MessageSquare size={24} />
              </div>
              
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Create Account
              </h1>
              
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Get started with your free account
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:bg-slate-700' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:bg-slate-700' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:bg-slate-700' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    } transition-colors`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Community Grid */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-lg">
            {/* Community Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 hover:bg-slate-600/50' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  } hover:scale-105 cursor-pointer`}
                  style={{
                    background: isDarkMode 
                      ? `linear-gradient(135deg, 
                         ${i % 3 === 0 ? '#4f46e5' : i % 3 === 1 ? '#06b6d4' : '#8b5cf6'}20,
                         ${i % 3 === 0 ? '#7c3aed' : i % 3 === 1 ? '#0891b2' : '#6366f1'}30)`
                      : `linear-gradient(135deg, 
                         ${i % 3 === 0 ? '#e0e7ff' : i % 3 === 1 ? '#cffafe' : '#ede9fe'},
                         ${i % 3 === 0 ? '#c7d2fe' : i % 3 === 1 ? '#a5f3fc' : '#ddd6fe'})`
                  }}
                />
              ))}
            </div>

            {/* Community Text */}
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Join our community
              </h2>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Connect with friends, share moments, and stay in touch with your community through our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm; 