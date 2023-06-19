import axios from "axios";

export function createCommentAPI(data) {
    return axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
        comment: data.comment,
        postId: data.postId,
        userId: data.userId
    })
}

export function getAllCommentAPI(data){
    return axios.get(`${process.env.REACT_APP_API_URL}/comments?postId=${data.postId}&limit=${data.limit}`)
}