import axios from "axios";

export function createPostAPI(data) {
    console.log('datapost', data);
    return axios.post(`${process.env.REACT_APP_API_URL}/posts`,
        {
            post: data.post,
            id: data.id,
            image: data.image
        },
        {
            headers: {
                Authorization: 'Bearer ' + data.token,
                "Content-Type": "multipart/form-data"
            }
        })
}

export function getAllPostAPI(page, limit) {
    return axios.get(`${process.env.REACT_APP_API_URL}/posts?page=${page}&limit=${limit}`)
}

export function editPostAPI(data) {
    return axios.put(`${process.env.REACT_APP_API_URL}/posts/${data.postId}`,
        {
            text: data.text
        })
}

export function deletePostAPI(postId) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
}

export function getSinglePostAPI(postId) {
    console.log('postid', postId)
    return axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
}

