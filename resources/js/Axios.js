import axios from 'axios';

const apiKey = import.meta.env.VITE_GITHUB_API_KEY;


const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json",
    "Authorization": `Bearer ${apiKey}`,
    "X-GitHub-Api-Version": "2022-11-28"
  },
  // timeout: 1000,
});

export default instance;