import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { diaryService } from '../../services/diaryService';

const emotionOptions = [
  "anger", "disgust", "fear", "happy", "joy", "neutral", "sad", "sadness", "shame", "surprise"
];

const DiarySearch = ({ onSelect }) => {
  const [emotionQuery, setEmotionQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!emotionQuery) return;
    setLoading(true);
    setError('');

    try {
      const results = await diaryService.searchEntries(emotionQuery);
      setFilteredEntries(results);
    } catch (err) {
      console.error(err);
      setError('Failed to search entries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-8 w-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Search size={20} /> Search by Emotion
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <select
          value={emotionQuery}
          onChange={(e) => setEmotionQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        >
          <option value="">Select emotion</option>
          {emotionOptions.map(emotion => (
            <option key={emotion} value={emotion}>{emotion}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          disabled={loading || !emotionQuery}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <Search size={18} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded">
          {error}
        </div>
      )}

      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              onClick={() => onSelect(entry)}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-500">
                  {entry.emotion}
                </span>
              </div>
              <p className="text-sm text-gray-800 line-clamp-3" style={{ color: entry.textColor }}>
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className="text-gray-500">No matching entries found.</div>
      )}
    </div>
  );
};

export default DiarySearch;
