import axios from "axios";


export function getUserAPI(id) {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
}

export function editProfileAPI(data) {
    return axios.put(`${process.env.REACT_APP_API_URL}/users/${data.id}`,
        {
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
