import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-project-15701.firebaseio.com/"
});

export default instance;
