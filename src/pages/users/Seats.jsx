import React, { useState, useEffect } from 'react';
import axios from 'axios';
import chairIcon from './chair.png';
import checkmarkIcon from './checkmark.png';
import screen from '../../assets/screen.png';
import bookedIcon from '../../assets/aaa.png'
import { IoIosRemove } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import {toast}  from 'react-toastify'
const Seats = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [movieId, setMovieId] = useState('');
  const [movieDate, setMovieDate] = useState('');
  const [time, setTime] = useState('');
  const { id } = useParams();
  const [cinema, setCinema] = useState('');
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/seats/showtime/${id}`);
        setSeats(response.data);
        setCinema(response.data[0].showtimeId)
        setMovieId(response.data[0].movieId)
        setMovieDate(response.data[0].movieDate)
        setTime(response.data[0].time)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    fetchSeats();
  }, [id]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/movie/${movieId}`);
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [movieId]);



  const handleSeatClick = (seatNumber, status) => {
    if (status !== 'BOOKED') {
      if (!selectedSeats.includes(seatNumber)) {
        setSelectedSeats([...selectedSeats, seatNumber]);
        const selectedSeat = seats.find(seat => seat.seatNumber === seatNumber);
        setTotalPrice(prevPrice => prevPrice + selectedSeat.price);
      } else {
        const updatedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        setSelectedSeats(updatedSeats);
        const deselectedSeat = seats.find(seat => seat.seatNumber === seatNumber);
        setTotalPrice(prevPrice => prevPrice - deselectedSeat.price);
      }
    }
  };

  const groupSeatsByRow = () => {
    const groupedSeats = {};
    if (!Array.isArray(seats)) {
      console.error('Seats is not an array');
      return groupedSeats; // Return empty object if seats is not an array
    }
    seats.forEach(seat => {
      const rowId = seat.seatNumber.charAt(0);
      if (!groupedSeats[rowId]) {
        groupedSeats[rowId] = [];
      }
      groupedSeats[rowId].push(seat);
    });
    return groupedSeats;
  };



  const handleNext = async () => {
    if (selectedSeats.length > 0) {

    navigate(`/payment`,{state:{ selectedSeats, seats,totalPrice, cinema, movie, movieDate, time, id}})
    toast.success('เลือกที่นั่งสำเร็จ');
  } else {
    toast.warn('กรุณาเลือกที่นั่งก่อน', {
      position: "top-center",
      });
  }
  };
  
  return (
    <div className="container mx-auto min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  p-6">
        <div className=" col-span-2 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex justify-center">
              <table className="min-w-[272px]">
                <thead>
                  <tr>
                    <th></th>
                    <th className="relative">
                      <div className="text-center">
                        <img src={screen} alt="Screen" className="mx-auto mb-4" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span>จอภาพยนตร์</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {Object.entries(groupSeatsByRow()).map(([rowId, seatsInRow]) => (
  <tr key={rowId}>
    <td className="text-gray-400">{rowId}</td>
    <td>
      <div className="flex m-1">
        {seatsInRow.map(seat => (
          <div
            key={seat.seatNumber}
            className="relative mx-1"
            onClick={() => {
              if (seat.status !== 'BOOKED') {
                handleSeatClick(seat.seatNumber);
              }
            }}
          >
            <img
              src={chairIcon}
              alt="Chair"
              style={{ width: '40px', height: '40px' }}
              className={`cursor-pointer ${
                selectedSeats.includes(seat.seatNumber) ? 'opacity-50' : ''
              }`}
            />
            {selectedSeats.includes(seat.seatNumber) && (
              <img
                src={checkmarkIcon}
                alt="Checkmark"
                className="absolute top-0 left-0 w-8 h-8"
              />
            )}
            {seat.status === 'BOOKED' && (
              <img
                src={bookedIcon}
                alt="Booked"
                className="absolute bottom-0 right-0 w-20 h-10"
              />
            )}
          </div>
        ))}
      </div>
    </td>
    <td className="text-gray-400">{rowId}</td>
  </tr>
))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex flex-col-reverse  justify-between p-4 bg-gray-200 w-64 mt-8">
          <div className="flex flex-col bg-white p-[10px] text-center rounded-lg">
            <div>
              <h2 className="text-lg font-bold">ที่นั่งที่เลือก</h2>
            </div>
            <ul className="flex flex-wrap justify-center items-center">
              {selectedSeats.length === 0 ? (
                <li><IoIosRemove /></li>
              ) : (
                selectedSeats.map((seatNumber, index) => (
                  <li key={index} className="mr-2 mb-2">
                    {seatNumber}
                    {index !== selectedSeats.length - 1 && ','}
                  </li>
                ))
              )}
            </ul>
            <div>
              <h2 className="text-lg font-bold">ราคารวม</h2>
              <p>{totalPrice} บาท</p>
            </div>
            
            <button onClick={handleNext} className="mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"  >ดำเนินการต่อ</button>
          
          </div>
          <div className="flex flex-col bg-white p-[10px] text-center rounded-lg">
            <div>
              <h2 className="text-lg font-bold">โรงภาพยนตร์  {cinema}</h2>
            </div>
            <div>
            <h2 className="text-balance font-sans">{movie.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
