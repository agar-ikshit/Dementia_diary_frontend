import { api } from './api';

export const diaryService = {
  getAllEntries: async () => {
    try {
      const response = await api('/entries/recent');
      return response;
    } catch (error) {
      console.error("Failed to fetch entries:", error);
      throw error;
    }
  },

  getEntry: async (id) => {
    try {
      const response = await api(`/entries/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch entry with ID ${id}:`, error);
      throw error;
    }
  },

  createEntry: async (entry) => {
    try {
      console.log("Sending entry data:", entry);
      const response = await api('/entries', 'POST', entry);
      return response;
    } catch (error) {
      console.error("Failed to create entry:", error);
      throw error;
    }
  },

  updateEntry: async (id, entry) => {
    try {
      const response = await api(`/entries/${id}`, 'PUT', entry);
      
      return response;
    } catch (error) {
      console.error(`Failed to update entry with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a diary entry by its ID
  deleteEntry: async (id) => {
    try {
      const response = await api(`/entries/${id}`, 'DELETE');
      return response;
    } catch (error) {
      console.error(`Failed to delete entry with ID ${id}:`, error);
      throw error;
    }
  },
};
