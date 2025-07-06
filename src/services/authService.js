import { api } from './api';

export const authService = {
 login: async (credentials) => {
  const response = await api('/auth/login', 'POST', credentials);
  console.log('Login response:', response);

  let user = null;
  if (response.token) {
    localStorage.setItem('token', response.token);
    user = { id: response.userId, email: response.email };
    localStorage.setItem('userData', JSON.stringify(user));
  } else {
    throw new Error("Login failed: No token received");
  }

  return { user, token: response.token };
},


signup: async (userData) => {
  const response = await api('/auth/signup', 'POST', userData);
  console.log('Signup response:', response);

  if (response.token) {
    localStorage.setItem('token', response.token);
    const user = { id: response.user.id, email: response.user.email };
    localStorage.setItem('userData', JSON.stringify(user));
  } else {
    throw new Error("Signup failed: No token received");
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
