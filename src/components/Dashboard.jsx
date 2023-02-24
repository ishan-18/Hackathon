import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuthState } from "../context/AuthContext";
import { createMessage, getAllMessage } from "../api/message";
  
import profile from "./farmer.webp"
import Navbar from "./Navbar";

function Dashboard() {

  
    const getMessage = async()=>{
        const res =await getAllMessage();
        console.log(res)
        if(res){
          setmessage(res.data)
    
        }
      }
    
      const [message, setmessage] = useState([]);
    
      useEffect(()=>{
         getMessage() 
      },[])


    const formik = useFormik({
        initialValues: {
    
          message: "",
       
        },
    
        onSubmit: async (values) => {
        console.log(values)
        const res = await createMessage({text:values.message})
        console.log(res)
        if(res){
            getMessage()
        }
        },
      });
    
  return (
    <div className="w-full flex-col bg-gray-900 min-h-screen text-white flex justify-start items-center">
      <Navbar/>
      <div className="bg-gray-800 p-5 overflow-y-auto w-10/12 rounded-lg" style={{marginTop: "8%"}}>


      <div className="w-full bg-gray-700 py-2.5 rounded-md min-h-[60vh] max-h-[60vh] overflow-scroll flex justify-start items-center flex-col ">
    
    {
      message.length > 0 && 
   
      <div className="block w-full">
        {
          message.map((msg)=>{
          return  <div className="card  w-11/12 mx-auto my-5 flex justify-start items-center ">
            <img src={profile} className="w-12 h-12 rounded-full object-cover" alt="/" />
           
            <div className="block w-full ">
            <h1 className="mx-5 text-left  font-bold">{msg.postedBy.name}  </h1>
            <p className="text-sm mx-5 opacity-50 text-left  w-full">
              {msg.text}
            </p>
            </div>
          </div>
          })
        }
      </div>
    }
    
        

    </div>



        <form  onSubmit={formik.handleSubmit} action="#" className="mt-5">
          <label
            for="default-search"
            class="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="text"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-white bg-gray-700/50 rounded-md focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Enter Your Query Here"
              onChange={formik.handleChange}
              value={formik.values.message}
              name="message"
            />
            <button
              type="submit"
              class="text-white absolute px-10 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
