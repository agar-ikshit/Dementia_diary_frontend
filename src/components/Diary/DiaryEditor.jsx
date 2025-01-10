import React from 'react';
import { Save } from 'lucide-react';

const DiaryEditor = ({ 
  currentEntry, 
  setCurrentEntry, 
  onSave, 
  loading 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Title input */}
      <div className="mb-4">
        <input
          type="text"
          value={currentEntry.title}
          onChange={(e) => setCurrentEntry({
            ...currentEntry,
            title: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter title"
        />
      </div>
      
      {/* Date, font size, and text color controls */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="date"
          value={currentEntry.date}
          onChange={(e) => setCurrentEntry({
            ...currentEntry,
            date: e.target.value
          })}
          className="px-3 py-2 border rounded-md"
        />
        <select
          value={currentEntry.fontSize}
          onChange={(e) => setCurrentEntry({
            ...currentEntry,
            fontSize: e.target.value
          })}
          className="px-3 py-2 border rounded-md"
        >
          <option value="14px">Small</option>
          <option value="16px">Medium</option>
          <option value="18px">Large</option>
        </select>
        <input
          type="color"
          value={currentEntry.textColor}
          onChange={(e) => setCurrentEntry({
            ...currentEntry,
            textColor: e.target.value
          })}
          className="w-10 h-10 p-1 border rounded-md"
        />
      </div>
      
      {/* Content text area */}
      <textarea
        value={currentEntry.content}
        onChange={(e) => setCurrentEntry({
          ...currentEntry,
          content: e.target.value
        })}
        style={{
          fontSize: currentEntry.fontSize,
          color: currentEntry.textColor
        }}
        className="w-full h-64 p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your thoughts..."
      />
      
      {/* Save button */}
      <button
        onClick={onSave}
        disabled={loading}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        <Save size={20} />
        Save Entry
      </button>
    </div>
  );
};

export default DiaryEditor;
