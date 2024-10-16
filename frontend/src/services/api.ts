import axios from "axios";

axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export default axios;
