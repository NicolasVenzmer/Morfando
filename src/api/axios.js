import axios from "axios"

export default axios.create({
  //baseURL: 'https://morfando-inc2022.herokuapp.com', // verificar que puede cambiar porque el router lo cambia
  baseURL: 'http://192.168.1.7:8000',
  //baseURL: 'https://morfando-inc2022.herokuapp.com',
});