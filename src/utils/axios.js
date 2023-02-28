import axios from 'axios';

export default axios.create({
  // baseURL: process.env.REACT_APP_ENVIRONMENT_BACKEND_URL TODO: Change to your backend URL
  baseURL: 'http://localhost:8080'
});
