import axios from "axios";

const backend_url = () => {
  // if (process.env.NODE_ENV === "production") {
    return "https://backend-2102.herokuapp.com";
  // }

  // local testing
  // console.log("hello");
  // return "http://127.0.0.1:8080";
};

export default axios.create({
  baseURL: backend_url(),
});
