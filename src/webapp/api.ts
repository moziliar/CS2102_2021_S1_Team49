import axios from 'axios';

const backend_url = () => {
  if (process.env.NODE_ENV === 'development') {
     return 'http://localhost:8080/'
  }

  return 'http://localhost:80/'
}

export default axios.create({
  baseURL: backend_url(),
});