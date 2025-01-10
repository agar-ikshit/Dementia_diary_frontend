// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import DiaryApp from './components/Diary/DiaryApp';

const ProtectedApp = () => {
  const { isAuthenticated, loading, user } = useAuth();
  
  const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and Signup
  console.log("Loading:", loading, "isAuthenticated:", isAuthenticated, "User:", user);
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    return <DiaryApp />;
  }

  return (
    <>
    {showLogin ? <LoginForm /> : <SignupForm />}
    <div className="flex flex-col items-center">
      
      
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="mt-4 text-blue-600 hover:text-blue-800 transition duration-200 underline"
      >
        {showLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </button>
    </div>
    </>
  );  
};

function App() {
  return (
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  );
}

export default App;
