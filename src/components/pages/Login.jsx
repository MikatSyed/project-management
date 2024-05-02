"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useEffect } from "react";

import FormInput from "../Forms/FormInput";
import Form from "../Forms/Form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      // Mock login functionality
      if (values.email === "test@gmail.com" && values.password === "test123") {
        // Successful login
        toast("Successful login", {
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#1e3d9c",
          },
        });
        router.push("/dashboard/project");
        setLoginError(false);
      } else {
        // Invalid credentials
        toast("Invalid credentials", {
          style: {
            borderRadius: "10px",
            background: "red",
            color: "#fff",
          },
        });
        console.log("Invalid credentials");
        setLoginError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const defaultValues = {
    email: "test@gmail.com",
    password: "test123",
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="bg-blue-900 absolute top-0 left-0 bg-gradient-to-r from-blue-900 to-blue-800 bottom-0 leading-5 h-full w-full overflow-hidden">
        {/* Background */}
      </div>
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl text-white">
              Welcome To Project Manager
            </h1>
            <p className="pr-3 text-sm text-white">
              Project management is the systematic approach of planning,
              executing, and closing projects to achieve specific goals within
              defined parameters.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10 mt-5">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Login In</h3>
              <p className="text-gray-400">
                Don't have an account?
                <a
                  href="#"
                  className="text-sm text-blue-700 hover:text-blue-700"
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div className="space-y-6">
              <div>
                {/* <input
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                type="text"
                placeholder="Email"
              /> */}
                <Form submitHandler={onSubmit} defaultValues={defaultValues}>
                  <FormInput
                    name="email"
                    placeholder="Enter your email"
                    type="text"
                    className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                  <div className="relative mt-5" x-data="{ show: true }">
                    <FormInput
                      name="password"
                      placeholder="Password"
                      type={passwordVisible ? "text" : "password"}
                      className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                    <div className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5">
                      {passwordVisible ? (
                        <FaEyeSlash
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      ) : (
                        <FaEye
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full mt-5 flex justify-center bg-blue-800 hover:bg-blue-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 border-none"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <a href="#" className="text-blue-700 hover:text-blue-600">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
        <div className="container p-5 mx-auto flex items-center justify-between">
          <div className="flex mr-auto">
            <img
              src={logo}
              alt="logo"
              className="object-cover mx-auto  rounded-full w-full"
            />
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default Login;
