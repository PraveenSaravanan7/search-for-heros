import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_ACCESS_TOKEN}`,
  timeout: 5000,
});
