import axios from "axios";
const instance =  axios.create({baseURL:"http://localhost:3000/api/"})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;

export default instance;
