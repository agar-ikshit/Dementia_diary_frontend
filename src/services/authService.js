import { api } from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api('/auth/login', 'POST', credentials);
    console.log(response);

    let user = null; // Declare user variable outside the if block

    if (response.token) {
      localStorage.setItem('token', response.token);
      user = { id: response.userId, email: response.email }; // Construct user object
      localStorage.setItem('userData', JSON.stringify(user)); // Save user object, not response.user
    } else {
      throw new Error("Login failed: No token received");
    }

    return { user, token: response.token }; // Return user and token
  },

  signup: async (userData) => {
    const response = await api('/auth/signup', 'POST', userData);
    console.log(response);

    if (response.token) {
      localStorage.setItem('token', response.token);
      const user = { id: response.userId, email: response.email };
      localStorage.setItem('userData', JSON.stringify(user));
    }

    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.clear();
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return null;
    }
  },
};
