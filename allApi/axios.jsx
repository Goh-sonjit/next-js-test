import axios from "axios";
const instance =  axios.create({baseURL:"/api/"})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;

export default instance;
