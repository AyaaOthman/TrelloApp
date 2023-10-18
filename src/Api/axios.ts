import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://trello-app-iti.onrender.com",
    headers: {
        authorization: `Bearer__${localStorage.getItem('token')}`
    } 
})