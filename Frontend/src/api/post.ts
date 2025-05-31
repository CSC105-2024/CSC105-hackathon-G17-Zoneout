import { Axios } from '../../axiosInstance';

export type CreatePostData = {
  title: string;
  category: string;
  description: string;
  location: string; // 'lat, lng'
  icon: string;
};

export const createPost = async (data: CreatePostData) => {
  console.log('Creating post with data:', data);
  const [latitude, longitude] = data.location.split(',').map(Number);
  const postData = {
    content: data.description,
    latitude,
    longitude,
    category: data.category,
    isEvent: data.category === 'Event',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  };
  console.log('Sending to backend:', postData);
  try {
    const response = await Axios.post('/api/posts/create-post', postData);
    console.log('Backend response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  console.log('Fetching posts...');
  try {
    // Log the full request details
    console.log('Request URL:', '/api/posts');
    console.log('Request headers:', Axios.defaults.headers);
    
    const response = await Axios.get('/api/posts');
    console.log('Backend response:', response.data);
    return response.data;
  } catch (error: any) {
    // More detailed error logging
    console.error('Error fetching posts:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw error;
  }
};

export const getUserPosts = async (userId: string) => {
  console.log('Fetching user posts for:', userId);
  try {
    const response = await Axios.get(`/api/posts/user/${userId}`);
    console.log('Backend response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
};