import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// GST Search API
export const searchGST = (query) => {
  return api.get('/gst/search', {
    params: { query }
  });
};

// CSV Upload API
export const uploadCSV = (formData) => {
  return api.post('/gst/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default api;