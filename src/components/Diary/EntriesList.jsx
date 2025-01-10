import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';

const EntriesList = ({ 
  entries, 
  onEdit, 
  onDelete, 
  loading 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[calc(100vh-12rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar size={20} />
        Previous Entries
      </h2>
      {loading ? (
        <div className="text-center py-4">Loading entries...</div>
      ) : (
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-4">No entries available.</div>
          ) : (
            entries.map(entry => (
              <div
                key={entry._id} // Use _id for MongoDB entries instead of id
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onEdit(entry)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {new Date(entry.createdAt).toLocaleDateString()} {/* Format the date */}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(entry._id); // Use _id for deleting entries
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-800 line-clamp-3" 
                   style={{ color: entry.textColor }}>
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EntriesList;
