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
    icon: data.icon,
    isEvent: data.category === 'Event',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  };
  console.log('Sending to backend:', postData);
  try {
    const response = await Axios.post('/api/posts/create-post', postData);
    console.log('Backend response:', response.data);
    return response.data;
  } catch (error: any) {
    // More detailed error logging
    console.error('Error creating post:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });
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
    if (!userId) {
      console.error('No userId provided to getUserPosts');
      return { success: false, data: [], msg: 'No userId provided' };
    }
    
    const response = await Axios.get(`/api/posts/user/${userId}`);
    console.log('Backend response for user posts:', response.data);
    
    if (!response.data.success) {
      console.error('Backend returned error:', response.data.msg);
      return { success: false, data: [], msg: response.data.msg };
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user posts:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    throw error;
  }
};

export const editPost = async (postId: number, data: any) => {
  const response = await Axios.put(`/api/posts/edit-post/${postId}`, data, {
    withCredentials: true,
  });
  return response.data;
};
