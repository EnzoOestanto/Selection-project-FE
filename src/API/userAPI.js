import axios from "axios";


export function getUserAPI(id) {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
}

export function editProfileAPI(data) {
    // console.log('api', data,data.oldUsername, data.newUsername);
    const id = data.id
    console.log(id);
    return axios.post(`${process.env.REACT_APP_API_URL}/users/profile/${id}`,
        {
            oldUsername: data.oldUsername,
            newUsername: data.newUsername,
            full_name: data.full_name,
            username: data.username,
            bio: data.bio,
            image: data.image
        },
        {
            headers: {
                Authorization: 'Bearer ' + data.token,
                "Content-Type": "multipart/form-data"
            }
        });
}

export function emailRequestAPI(data) {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/emailrequest/${data.id}`,
        {
            text: data.text
        });
}

