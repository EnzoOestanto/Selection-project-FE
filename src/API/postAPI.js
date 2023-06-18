import axios from "axios";

export function createPost(data) {
    console.log('datapost',data);
    return axios.post(`${process.env.REACT_APP_API_URL}/posts`,
        {
            post: data.post,
            id: data.id,
            image: data.image
        },
        {
            headers: { Authorization: 'Bearer ' + data.token,
            "Content-Type":"multipart/form-data" }
        })
}

export function getAllPost(){
    return axios.get(`${process.env.REACT_APP_API_URL}/posts`)
}

