"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormInput from "../Forms/FormInput";
import Form from "../Forms/Form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      // Mock login functionality
      if (values.email === "test@gmail.com" && values.password === "test123") {
       
        router.push("/dashboard/project");
      } else {
        // Invalid credentials
        toast("Invalid credentials", {
          style: {
            borderRadius: "10px",
            background: "red",
            color: "#fff",
          },
        });
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
      <div className=" absolute top-0 left-0 bottom-0 leading-5 h-full w-full overflow-hidden" />
      <div className="relative min-h-screen flex flex-col sm:flex-row justify-center items-center bg-transparent rounded-3xl shadow-xl">
       
        <div className="flex justify-center self-center z-10 mt-5">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
            <h3 className="font-semibold text-2xl text-gray-800 mb-5">Login In</h3>
            <p className="text-gray-400 mb-5">
              Don't have an account?
              <a href="#" className="text-sm text-blue-700 hover:underline ml-1">Sign Up</a>
            </p>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <FormInput
                name="email"
                placeholder="Enter your email"
                type="text"
                className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 mb-5"
              />
              <div className="relative mb-5">
                <FormInput
                  name="password"
                  placeholder="Password"
                  type={passwordVisible ? "text" : "password"}
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  {passwordVisible ? (
                    <FaEyeSlash onClick={() => setPasswordVisible(!passwordVisible)} />
                  ) : (
                    <FaEye onClick={() => setPasswordVisible(!passwordVisible)} />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-5 flex justify-center bg-[#008080] hover:bg-[#00B3B3] text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 border-none"
              >
                Login
              </button>
            </Form>
            <div className="flex items-center justify-between mt-3">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
