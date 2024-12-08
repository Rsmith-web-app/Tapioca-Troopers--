import axios from 'axios';


const getPostsApi = async () => {
  const response = await axios.get('http://localhost:3060/api/post/');
  return response.data.posts;
}
export { getPostsApi };
