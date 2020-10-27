import axios from 'axios';

const backend_url = () => {
  return 'https://backend-2102.herokuapp.com';
}

export default axios.create({
  baseURL: backend_url(),
});