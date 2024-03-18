import {useEffect , useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/logo.png';
import Logo1 from '../assets/logo1.png';
function Register() {
    const initialState = {
        username : '',
        phone: '', 
        password : '',
        confirmPassword : '',
        email : ''
      };
    
      const [input, setInput] = useState(initialState);
      const navigate = useNavigate();
      const hdlChange = e => {
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
      };
    
      const hdlSubmit = async e => {
        try {
          e.preventDefault();
          // validation
          if (input.password !== input.confirmPassword) {
            return alert('Please check confirm password');
          }
          const rs = await axios.post('http://localhost:8000/auth/register', input);
          console.log(rs);
          if (rs.status === 200) {
            alert('Register Successful');
            // Clear the form
            setInput(initialState);
            navigate('/login');
          }
        } catch(err) {
          console.log(err.message);
        }
      };
    

    return (
        <div className="min-h-screen">
            <div className="bg-gray-100 text-gray-900 flex justify-center  ">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-[50px] flex justify-center ">
                    <div className="lg:w-1/2 xl:w-full p-6 sm:p-12">
                        <div>
                            <img src={Logo}
                                className="w-32 mx-auto" alt="Logo" />
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign Up
                            </h1>
                        
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
 
                                    <form  onSubmit={hdlSubmit}>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                 name :
                                            </label>
                                            <div className="mt-2 ">
                                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                    type="text"
                                                    placeholder="username"
                                                    name="username"
                                                    id="username"
                                                    autoComplete="username"
                                                    value={input.username}
                                                    onChange={ hdlChange }
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            phone :
                                            </label>
                                            <div className="mt-2">
                                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                    type="text"
                                                    placeholder="phone"
                                                    name="phone"
                                                    id="phone"
                                                    autoComplete="phone"
                                                    value={input.phone}
                                                    onChange={ hdlChange }
                                                />
                                            </div>
                                        </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address :
                                            </label>
                                            <div className="mt-2">
                                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                    placeholder="@Email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={input.email}
                                                    onChange={ hdlChange }
                                                />
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Password :</span>
                                            </label>
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                                required
                                                name="password"
                                                autoComplete="new-password"
                                                value={input.password}
                                                onChange={ hdlChange }
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">ConfirmPassword :</span>
                                            </label>
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                type="password"
                                                placeholder="ConfirmPassword"
                                                id="confirmPassword"
                                                required
                                                name="confirmPassword"
                                                autoComplete="confirmPassword"
                                                value={input.confirmPassword}
                                                onChange={ hdlChange }
                                            />
                                        </div>
                                        <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <span className="ml-3">Register</span>
                                        </button>
               
        
                                    </form>
                                    {/* สิ้นสุดการแก้ไขที่นี่ */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                        
                    
                </div>
            </div>

        </div>
    )
}

export default Register