import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit) //DB(server/index.js)
    .then(response => response.data)

    return {
        type:"LOGIN_USER",
        payload: request
        //send to reducer
    }

}

export function registerUser(dataTosubmit) {

    const request = axios.post('/api/users/register', dataTosubmit) //DB(server/index.js)
    .then(response => response.data)

    return {
        type: "REGISTER_USER",
        payload: request
    }

}

export function auth() {

    const request = axios.get('/api/users/auth') //DB(server/index.js)
    .then(response => response.data)

    return {
        type: "AUTH_USER",
        payload: request
    }

}