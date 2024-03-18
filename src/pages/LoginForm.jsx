import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link ,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Logo from '../assets/logo.png';
import Logo1 from '../assets/logo1.png';

function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();

      const rs = await axios.post("http://localhost:8000/auth/login", input);
      localStorage.setItem("token", rs.data.token);

      const rs1 = await axios.get("http://localhost:8000/auth/profile", {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });

      setUser(rs1.data);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome ${rs1.data.email}`,
        confirmButtonText: 'OK'
      });

      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'Invalid email or password. Please try again.',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data.message || "Something went wrong!",
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 text-gray-900 flex justify-center ">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-[50px] flex justify-center ">
          <div className="lg:w-1/2 xl:w-96 p-6 sm:p-12">
            <div>
              <img src={Logo}
                className="w-32 mx-auto" alt="Logo" />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Sign In
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">

                  <button className="w-full  font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"></path>
                        <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"></path>
                        <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"></path>
                        <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"></path>
                      </svg>
                    </div>
                    <span className="ml-4">
                      Sign In with Google
                    </span>
                  </button>
                  <button className="w-full  font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white  p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 48 48">
                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                        <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                      </svg>

                    </div>
                    <span className="ml-4">
                      Sign In with Facebook
                    </span>
                  </button>
                  <div className="divider divider-neutral">OR</div>
                  <form onSubmit={hdlSubmit}>
                    <input 
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                      type="email"
                      placeholder="Email"
                      autoComplete="current-email"
                      name="email"
                      value={input.email}
                      onChange={hdlChange}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="current-password"
                      value={input.password}
                      onChange={hdlChange}
                    />
                    <button 
                      type="submit" 
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <span className="ml-3">Login</span>
                    </button>
                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                      Don&apos;t have an account?{" "}
                      <Link to='/register' className="text-red-600 hover:underline hover:underline-offset-4">
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-96  bg-indigo-100 text-center hidden lg:flex rounded-r-[50px]">
            {/* <div className="w-full bg-contain bg-center bg-no-repeat"> */}
              <img src={Logo} alt="Logo" className="w-full object-none bg-contain bg-center bg-no-repeat" />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
