const API_BASE_URL = 'https://dementia-diary-backend.onrender.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  };

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    console.log('📦 Sending request:', {
      url: `${API_BASE_URL}${endpoint}`,
      method,
      headers,
      body: data,
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    console.log('✅ Raw response:', response.status, response.statusText);

    // Try to parse response JSON anyway, even on error
    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('❌ API error response:', responseData);
      const message = responseData?.message || response.statusText || 'Unknown error';
      throw new Error(message);
    }

    return responseData;
  } catch (error) {
    console.error('🚨 API call failed:', error.message);
    throw error;
  }
};
