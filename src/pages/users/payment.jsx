import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import {toast}  from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(() => {
    const remainingTime = localStorage.getItem('remainingTime');
    return remainingTime ? parseInt(remainingTime, 10) : 180;
  });
  const {
    selectedSeats,
    seats,
    totalPrice,
    cinema,
    movie,
    movieDate,
    time,
    id,
  } = location.state;

  const isoDate = movieDate;
  const thaiDateFormat = 'd MMMM yyyy';
  const thaiDate = format(new Date(isoDate), thaiDateFormat, { locale: th });

  const isoTime = time;
  const thaiTimeFormat = 'HH:mm';
  const thaiTime = format(new Date(isoTime), thaiTimeFormat, { locale: th });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        toast.warn('หมดเวลาชำระเงิน');
        navigate(-1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, navigate]);

  useEffect(() => {
    localStorage.setItem('remainingTime', timeLeft);
    return () => localStorage.removeItem('remainingTime');
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const selectedSeatIds = selectedSeats.map((seatNumber) => {
    const selectedSeat = seats.find((seat) => seat.seatNumber === seatNumber);
    return selectedSeat.id;
  });

  const handlePayment = async () => {
    if (!user?.id) {
      navigate('/login',{replace: true});
      toast.info('กรุณาเข้าสู่ระบบก่อนทำการจอง',{
        position: "top-center",
      });
      return
    };
    try {
      const bookingCode = uuidv4(); // สร้างรหัสการจองโดยใช้ uuidv4
      const response = await axios.post(`http://localhost:8000/bookings/`, {
        selectedSeatIds: selectedSeatIds,
        totalPrice: totalPrice,
        userId: user.id,
        movieId: movie.id,
        showtimeId: id,
        bookingCode: bookingCode // ใช้รหัสการจองที่สร้างขึ้น
      });
      localStorage.removeItem('remainingTime'); 
      navigate(`/bookingSuccess`, { 
        state: {
          bookingDetails: {
            movieName: movie.name,
            movieImg:movie.Img,
            cinema: cinema,
            dateTime: `${thaiDate} | ${thaiTime}`,
            selectedSeats: selectedSeats.join(', '),
            totalPrice: totalPrice,
            bookingCode: bookingCode
          }
        },
        replace: true 
      }); 
    } catch (error) {
      console.error('Error making booking:', error);
      alert('Could not make booking. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
    <div className="grid gap-5 sm:w-[900px] mt-4">
        <div className="col-span-2">
            <div className="bg-white pl-10 pr-10 p-4 rounded-lg shadow-md flex">
                {/* รูป */}
                <div className="mr-8 relative">
                    <img
                        className="w-full h-full object-cover  shadow-2xl"
                        src={`http://localhost:8000/uploads/${movie?.Img.replace(/\\/g, '/')}`}
                        alt={movie?.name}
                    />
                </div>
                {/* รายละเอียด */}
                <div className="w-full">
                    <h2 className="font-bold text-xl text-black">{movie.name}</h2>
                    <div className="mb-4">
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-md mt-2 text-blue-700">
                                    {thaiDate} | {thaiTime}
                                </p>
                            </div>
                            <div>
                                <p className="font-black"> โรงภาพยนตร์: {cinema}</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-black">ที่นั่งที่เลือก</p>
                                    <p className="text-xl font-thin text-blue-700">{selectedSeats.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="font-black">ราคารวม</p>
                                    <p className="text-xl font-thin text-blue-700">{totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-span-2">
            <div className="bg-white p-11 rounded-lg shadow-md">
                <div className="flex justify-evenly">
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded btn btn-wide" onClick={handlePayment}>
                            ยอดชำระ {totalPrice} บาท
                        </button>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">
                            เวลาที่เหลือในการซื้อ: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
  );
};

export default Payment;
