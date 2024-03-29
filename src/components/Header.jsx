import { useState } from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoUser from '../assets/sss.png'
import Logo from '../assets/Logo.png'
export default function Header() {
  const{ user,logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = ()=>{
    logout();
  }
  return (
    <nav className="bg-white  sticky top-0 z-10 w-full  border-b border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Flowbite Logo" />
         
        </a>
        
           <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex items-center space-x-6 rtl:space-x-reverse ">
            {user?.id && (
              <>
              <div className="dropdown dropdown-end">
           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={LogoUser} />
        </div>
      </div>
      
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
          {user?.email}
          </a>
        </li>
        <li><a>ประวัติการจอง/ซื้อ</a></li>
        <li><a>ข้อมูลส่วนตัว</a></li>
        <li className="border-t-2 border-gay-500">
          <button  onClick={handleLogout}>ออกจากระบบ</button>
          </li>
      </ul>
    </div>
              </>
            )}
            {!user?.id && (
            <>
            <Link to="/login" className="text-sm  text-gray-900  hover:underline md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 "> เข้าสู่ระบบ/สมัครสมาชิก</Link>
        
         
          <button 
            type="button" 
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${mobileMenuOpen ? 'bg-gray-100' : ''}`}
            aria-controls="navbar-sticky" 
            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
              </>
            )}
        </div></div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg text-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <a href="/" className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  " aria-current="page">หน้าหลัก</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500">About</a>
            </li>

            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500">Contact</a>
            </li>
          </ul>
        </div>
        
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-indigo-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-indigo-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  ">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-indigo-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  ">Services</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-indigo-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  ">ContactM</a>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  );
}