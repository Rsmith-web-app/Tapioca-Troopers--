import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

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
  const resp = await fetch(`${serverUrl}/api/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return resp;
}

export { getPostsApi, userLogin, userRegister };
