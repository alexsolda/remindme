import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})