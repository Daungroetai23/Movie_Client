import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../pages/LoginForm'
import RegisterForm from '../pages/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import UserHome from '../pages/users/UserHome'
import UserProfile from '../pages/users/UserProfile'
import HomePage from '../pages/HomePage'
import Footer from '../components/Footer'
import Showtime from '../pages/users/Showtime'
import Seats from '../pages/users/Seats'
import Payment from '../pages/users/payment'
import BookingSuccess from '../pages/users/bookingSuccess'
// สร้าง Router สำหรับผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ
const guestRouter = createBrowserRouter([
  {
    // เส้นทางหลักที่มี Header และ Outlet (เพื่อแสดง component ย่อย)
    path: '/',
    element: <>
      <Header />
      <Outlet />
      <Footer />
    </>,
    children: [
      // หน้าหลักที่เป็นหน้า login
      { index: true, element: <HomePage /> },
       { path: '/login', element: <LoginForm /> },
       { path: '/Showtime/:id', element: <Showtime/>},
       { path: '/select-seat/:id', element: <Seats/>},
       { path: '/payment', element: <Payment/>},
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

// สร้าง Router สำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว
const userRouter = createBrowserRouter([
  {
    // เส้นทางหลักที่มี Header และ Outlet (เพื่อแสดง component ย่อย)
    path: '/',
    element: <>
      <Header />
      <Outlet />
      <Footer />
    </>,
    children : [
      // หน้าหลักสำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว
      { index: true, element: <UserHome /> },
      // หน้ารายการสิ่งที่ต้องทำสำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว
      { path: '/Profile', element: <UserProfile/>},
      { path: '/Showtime/:id', element: <Showtime/>},
      { path: '/select-seat/:id', element: <Seats/>},
      { path: '/payment', element: <Payment/>},
      {path:'/BookingSuccess',element: <BookingSuccess/>},
    ]
  }
])

// ตรวจสอบสถานะการเข้าสู่ระบบของผู้ใช้และเลือก Router ที่เหมาะสม
export default function AppRouter() {
  const {user} = useAuth()
  // เลือก Router ตามสถานะการเข้าสู่ระบบ
  const finalRouter = user?.id  ? userRouter : guestRouter
  // ส่ง Router ที่ถูกเลือกไปยัง RouterProvider เพื่อให้ระบบทำงาน
  return (
    <RouterProvider router={finalRouter} />
  )
}
