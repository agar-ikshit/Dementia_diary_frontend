// src/components/Auth/SignupForm.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
      
      {error && (
        <div className="text-red-500 bg-red-50 p-2 rounded mb-4 text-center">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="flex items-center mb-1 text-gray-600" htmlFor="name">
          <User className="mr-2" /> Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center mb-1 text-gray-600" htmlFor="email">
          <Mail className="mr-2" /> Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center mb-1 text-gray-600" htmlFor="password">
          <Lock className="mr-2" /> Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin mr-2" /> : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
