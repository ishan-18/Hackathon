import axios from "axios";
import { BaseURL, APIroutes, getHeader  } from "./config";


export const createMessage = async(msg) =>{
    console.log(msg)
    return await axios.post(`http://localhost:5001/api/v1/messages`,msg , getHeader()).then((res)=>{
        console.log(res)
        return res.data;
    }).catch((err)=>{
        console.log("error")
        return {err:err}
    })
}


export const getAllMessage = async(msg) =>{
    console.log(msg)
    return await axios.get(`http://localhost:5001/api/v1/messages`, getHeader()).then((res)=>{
        console.log(res)
        return res.data;
    }).catch((err)=>{
        console.log("error")
        return {err:err}
    })
}