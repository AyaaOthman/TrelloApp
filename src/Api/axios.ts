import axios from 'axios'
import {useContext} from 'react'
import { AuthContext } from '../Context/auth.context'

const {state} = useContext(AuthContext)

const baseURL = "https://trello-app-iti.onrender.com"

export const axiosInstance = axios.create({
    baseURL,
    headers: {
        authorization: `Bearer__${state.token}`
    } 
})

export const nonAuthAxiosInstance = axios.create({
    baseURL
})