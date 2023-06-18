import axios from "axios";


export function getUser(id){
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
}
