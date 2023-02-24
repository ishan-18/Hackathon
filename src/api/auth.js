import axios from "axios";
import { BaseURL, APIroutes, getHeader  } from "./config";


export const loginUser = async(payload)=>{
    return await axios.post(`${BaseURL}${APIroutes.loginRoute}`,payload).then((res)=>{
        return res.data;
    }).catch((err)=>{


        return {err:err}
    })

}

export const registerUser = async(payload)=>{
    return await axios.post(`${BaseURL}${APIroutes.registerRoute}`,payload).then((res)=>{
        return res.data;
    }).catch((err)=>{
 
        return {err:err}
    })

}


export const logoutUser = async()=>{
    return await axios.post(`${BaseURL}${APIroutes.logout}`,getHeader()).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return {err:err}
    })

}
