import axios from 'axios'

const baseURL = "https://trello-app-iti.onrender.com"

export const axiosInstance = axios.create({
    baseURL
})