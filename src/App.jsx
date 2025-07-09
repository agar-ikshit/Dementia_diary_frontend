import React, { useState } from 'react';
import Modal from 'react-modal';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import DiaryApp from './components/Diary/DiaryApp';

const emotionGroups = {
  Positive: ["happy", "joy", "surprise"],
  Negative: ["sad", "sadness", "anger", "disgust", "shame", "fear"],
  Neutral: ["neutral"]
};

// Bind modal to your root element (important for accessibility)
Modal.setAppElement('#root');

const ProtectedApp = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  console.log("Loading:", loading, "isAuthenticated:", isAuthenticated, "User:", user);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    return <DiaryApp />;
  }

  return (
    <>
      <Modal
        isOpen={showWelcomeModal}
        onRequestClose={() => setShowWelcomeModal(false)}
        contentLabel="Welcome to Dementia Diaries"
        className="bg-white rounded-xl max-w-lg w-full p-6 mx-auto mt-20 shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <h2 className="text-2xl font-bold mb-4">🧠 Dementia Diaries</h2>
        <p className="mb-3 text-gray-700">
          This is a journaling app to help people with dementia. You can write daily diary entries, and a model deployed on Hugging Face detects the emotion of each entry.
        </p>
        <p className="mb-3 text-gray-700">
          Later, you can search your memories by these emotion groups:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700">
          <li><strong>Positive:</strong> happy, joy, surprise</li>
          <li><strong>Negative:</strong> sad, sadness, anger, disgust, shame, fear</li>
          <li><strong>Neutral:</strong> neutral</li>
        </ul>

        <p className="mb-3 text-gray-700 font-semibold">✨ Steps to use:</p>
        <ol className="list-decimal ml-6 mb-4 text-gray-700">
          <li>Sign up or log in to your account.</li>
          <li>Add a new diary entry about your day or feelings.</li>
          <li>The AI model will detect the emotion and save it with your entry.</li>
          <li>Later, search your past entries by emotion category (e.g., Positive days).</li>
        </ol>

        <p className="mb-4 text-sm text-yellow-600 bg-yellow-100 p-2 rounded">
  ⚠️ Please note: The first request might take a minute as the backend is hosted on Render and may need to wake up.
</p>

        <p className="mb-4 text-gray-700">📦 Check out the source code:</p>
        <ul className="list-disc ml-6 mb-4 text-blue-600">
          <li>
            <a href="https://github.com/agar-ikshit/Dementia_diary_frontend" target="_blank" rel="noopener noreferrer" className="underline">
              Frontend GitHub
            </a>
          </li>
          <li>
            <a href="https://github.com/agar-ikshit/Dementia_diary_backend" target="_blank" rel="noopener noreferrer" className="underline">
              Backend GitHub
            </a>
          </li>
        </ul>
        <div className="flex justify-end">
          <button
            onClick={() => setShowWelcomeModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </Modal>

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
