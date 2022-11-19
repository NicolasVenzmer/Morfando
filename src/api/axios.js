import axios from "axios"

export default axios.create({
  baseURL: 'http://192.168.56.1:8000',
  //baseURL: 'https://morfando-inc2022.up.railway.app',
});