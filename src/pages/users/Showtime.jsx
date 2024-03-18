import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Seats from './Seats'
function Showtime() {
  const [showtimes, setShowtimes] = useState([]);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        let token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8000/showtimes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShowtimes(res.data.showtimeTimes); // แก้ไขตรงนี้เพื่อให้ใช้ข้อมูล showtimeTime แทน showtime
        setMovie(res.data.movie); // แก้ไขตรงนี้เพื่อให้ใช้ข้อมูล movie ตรงๆ
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };
    fetchShowtime();
  }, [id]); 
console.log(showtimes)
  const handleBooking = (timeSlot) => {
    navigate(`/select-seat/${timeSlot}`);
  };

  return (
    <div className="container mx-auto mt-10 min-h-screen  ">
  <div className="flex justify-center items-center mb-8">
  {movie ? (
    <div className="bg-white sm:px-20 rounded-lg shadow-lg flex flex-col sm:flex-row sm:max-w-[900px] ">
      <img className="object-cover object-top hover:bg-opacity-50 transform hover:scale-110 border-gray-600 border border-opacity-50 rounded-xl shadow-lg transition-all duration-150 sm:w-1/3" src={`http://localhost:8000/uploads/${movie?.Img.replace(/\\/g, "/")}`} alt={movie?.name} />
      <div className="p-4 sm:w-2/3">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{movie.name}</h2>
          <p className="text-gray-700 mb-2">หมวดหมู่: {movie.genre}</p>
          <p className="text-gray-700 mb-2">เรทผู้ชม: {movie.viewer_rate}</p>
          <p className="text-gray-700 mb-2">ระยะเวลา: {movie.time} นาที</p>
        </div>
        <MovieDetails movie={movie} />
      </div>
    </div>
  ) : (
    <p className="text-center text-red-500">No movie found.</p>
  )}
</div>




      <div className="flex flex-col lg:flex-row">
  <div className="w-full mb-4 lg:mb-0 ">
    <div className="card bg-white rounded-box p-10  flex flex-col lg:flex-row items-center">
      <h3 className="font-semibold text-lg text-primary-500 mb-2 lg:mb-0 lg:mr-4">โรงภาพยนตร์ {id}</h3>
      <div className="divider divider-horizontal"></div>
      <div className="flex flex-wrap justify-center lg:justify-end">
        {showtimes && showtimes.length > 0 ? (
          showtimes.map((timeSlot, index) => (
            <button key={index} onClick={() => handleBooking(timeSlot.id)} className="btn btn-outline btn-primary btn-md mr-2 ">
              {new Date(timeSlot.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500">No showtimes available.</p>
        )}
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Showtime;
