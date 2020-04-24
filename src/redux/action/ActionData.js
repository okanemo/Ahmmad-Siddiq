import Axios from 'axios';
require('dotenv').config();
const BASE_URL = 'http://192.168.1.12:4000';


export const login=(data)=>{
    return{
        type: "GET_USER",
        payload: data
    };
};
export const logOut=(data)=>{
    return{
        type: "LOG_OUT",
        payload: Axios.delete(BASE_URL+'/logout', data)
    };
};