import React from "react";
import { logoutUser } from "../api/auth";
import {useNavigate} from 'react-router';

function Navbar() {
    const navigate = useNavigate()
  return (
    <div className="w-full bg-gray-800 mb-5  py-5 ">
      <div className="w-10/12 mx-auto flex justify-between items-center">
        <h1 className="text-xl font-serif font-medium">Farmer's Forum</h1>

        <button className="px-5 py-2.5 bg-gray-700 rounded-md hover:bg-gray-600" onClick={async()=>{
           const res = await logoutUser();
           if(res){
            localStorage.removeItem('currentUser')
           localStorage.removeItem('token')
           navigate('/')
           }
           


        }}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
