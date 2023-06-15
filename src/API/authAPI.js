import axios from "axios";

export function registerAPI(data){
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,{
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
    })
}