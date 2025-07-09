import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { diaryService } from '../../services/diaryService';

// Grouped categories
const emotionGroups = {
  Positive: ["happy", "joy", "surprise"],
  Negative: ["sad", "sadness", "anger", "disgust", "shame", "fear"],
  Neutral: ["neutral"]
};

const DiarySearch = ({ onSelect }) => {
  const [category, setCategory] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!category) return;
    setLoading(true);
    setError('');

    try {
      // Get the list of emotions in this category
      const emotions = emotionGroups[category];
      let allResults = [];

      // Make parallel requests for each emotion
      const responses = await Promise.all(
        emotions.map(emotion => diaryService.searchEntries(emotion))
      );

      // Merge all results into one array
      responses.forEach(result => {
        allResults = allResults.concat(result);
      });

      setFilteredEntries(allResults);
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
        <Search size={20} /> Search by Emotion Category
      </h2>

      <div className="flex items-center gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md"
        >
          <option value="">Select category</option>
          {Object.keys(emotionGroups).map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          disabled={loading || !category}
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
