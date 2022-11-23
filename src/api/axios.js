import axios from "axios"

export default axios.create({
  baseURL: 'http://192.168.1.7:8000', // verificar que puede cambiar porque el router lo cambia
  //baseURL: 'https://morfando-inc2022.up.railway.app',
});