import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useAuthUpdate } from "../context/AuthContext";

function Register() {
    const { updateAuth }= useAuthUpdate()
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, "Too Short!").required("Required"),
      password: Yup.string().min(2, "Too Short!").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),

    onSubmit: async (values) => {
     console.log(values)
     const res = await registerUser(values);
     console.log(res)
     if(res.err){
        console.log("error occurred")
        alert("error occurred")
      }else{
        updateAuth({user:res.user , token:res.token})
        navigate('/dashboard')
        
        
      }
    },
  });

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
           Register
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div>
              <label
                for="name"
                class="flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your name
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex justify-start  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required=""
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-400">{formik.errors.name}</span>
              )}
            </div>

            <div>
              <label
                for="email"
                class="flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your email
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex justify-start  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-400">{formik.errors.email}</span>
              )}
            </div>
            <div>
              <label
                for="password"
                class="flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your Password
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 flex justify-start  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-400">{formik.errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 w-full py-2.5  rounded-md text-white"
            >
              Register My Account
            </button>
            <Link to={'/'}>
            <h1 className="text-white mt-10">Don't have an account yet ?  <span className="text-blue-600">Sign in</span></h1>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
