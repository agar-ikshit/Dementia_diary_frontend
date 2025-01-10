// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
      
      {error && (
        <div className="text-red-500 bg-red-50 p-2 rounded mb-4 text-center">
          {error}
        </div>
      )}
      
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
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin mr-2" /> : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
