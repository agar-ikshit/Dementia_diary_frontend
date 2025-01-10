import React, { useState, useEffect } from 'react';
import { diaryService } from '../../services/diaryService';
import DiaryHeader from './DiaryHeader';
import DiaryEditor from './DiaryEditor';
import EntriesList from './EntriesList';

const DiaryApp = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    title: '', // Added title field
    content: '',
    fontSize: '16px',
    textColor: '#000000',
  });

  // Fetch all entries for the logged-in user
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await diaryService.getAllEntries();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSave = async () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) {
      setError('Title and Content cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      // If it's an existing entry, update it; otherwise, create a new one
      if (currentEntry.id) {
        await diaryService.updateEntry(currentEntry.id, currentEntry);
      } else {
        await diaryService.createEntry({
          title: currentEntry.title, // Send title along with content
          content: currentEntry.content,
        });
      }

      await fetchEntries();
      setCurrentEntry({
        id: null,
        title: '', // Reset title
        content: '',
        fontSize: '16px',
        textColor: '#000000',
      });
    } catch (err) {
      setError('Failed to save entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await diaryService.deleteEntry(id);
      await fetchEntries();
      if (currentEntry.id === id) {
        setCurrentEntry({
          id: null,
          title: '', // Reset title
          content: '',
          fontSize: '16px',
          textColor: '#000000',
        });
      }
    } catch (err) {
      setError('Failed to delete entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <DiaryHeader 
          onNewEntry={() => setCurrentEntry({
            id: null,
            title: '', // Reset title
            content: '',
            fontSize: '16px',
            textColor: '#000000',
          })}
        />
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <DiaryEditor
              currentEntry={currentEntry}
              setCurrentEntry={setCurrentEntry}
              onSave={handleSave}
              loading={loading}
            />
          </div>
          <div>
            <EntriesList
              entries={entries}
              onEdit={setCurrentEntry}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryApp;
