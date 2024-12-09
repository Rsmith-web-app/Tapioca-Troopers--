import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3060';
console.warn(serverUrl);

const getPostsApi = async () => {
  const response = await axios.get(`${serverUrl}/api/post/`);
  return response.data.posts;
}


const userLogin = async (formData) => {
  const resp = await fetch(`${serverUrl}/api/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return resp;
}


const userRegister = async (formData) => {
  const resp = await fetch("http://localhost:3060/api/register", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export { getPostsApi, userLogin, userRegister };
