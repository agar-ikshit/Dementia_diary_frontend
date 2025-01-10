import React from 'react';
import { Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DiaryHeader = ({ onNewEntry }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">My Diary</h1>
        <span className="text-gray-600">Welcome</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onNewEntry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          New Entry
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DiaryHeader;