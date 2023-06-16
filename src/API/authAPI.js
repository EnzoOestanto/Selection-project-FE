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

export function loginAPI(data){
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,{
        loginDetails: data.loginDetails,
        password: data.password
    })
}

export function activationAPI(token){
    return axios.get(`${process.env.REACT_APP_API_URL}/auth/activate/${token}`)
}
