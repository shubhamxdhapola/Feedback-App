import axios from "axios"
import { HOST } from "./constants.js"

export const apiClient = axios.create({
    baseURL : HOST,
    withCredentials : true,
})