import axios from 'axios';

const backend_url = () => {
  // return 'https://backend-2102.herokuapp.com';
  return 'http://127.0.0.1:8080';
}

export default axios.create({
  baseURL: backend_url(),
});