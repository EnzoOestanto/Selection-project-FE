import axios from "axios";

export function getLikesAPI(data){
    return axios.get(`${process.env.REACT_APP_API_URL}/likes?postId=${data.postId}&userId=${data.userId}`)
}

export function addLikeAPI(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/likes/`, {
        postId: data.postId,
        userId: data.userId
    });
}
export function deleteLikeAPI(data) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/likes?postId=${data.postId}&userId=${data.userId}`)
}
