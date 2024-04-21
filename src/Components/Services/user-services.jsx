import axios from "axios";



const API_BASE_URL = "http://127.0.0.1:8000";

const userServices = {


addUser: (user) => {
    return axios.post(API_BASE_URL+"/register", user);
}
}
export default userServices;
