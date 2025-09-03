import axios from 'axios';

export const httpGet = async (url: string, params?: any) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('HTTP GET Error:', error);
    throw error;
  }
};

export const httpPost = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('HTTP POST Error:', error);
    throw error;
  }
};