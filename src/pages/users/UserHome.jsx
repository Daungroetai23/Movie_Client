import React, { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs'; // เพิ่ม import สำหรับ icon search
import useAuth from '../../hooks/useAuth';

function UserHome() {
    const { user } = useAuth();
    const [movie, setMovie] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/movie`);
                setMovie(res.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, []);

    // ฟังก์ชันค้นหาชื่อหนัง
    const searchMovie = (event) => {
        setSearchTerm(event.target.value);
    };

    // กรองรายการหนังตามชื่อที่ค้นหา
    const filteredMovies = movie.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container mx-auto">
            <div>
                <Carousel />
            </div>
            <div className="my-4 relative w-96">
    <input
        type="text"
        placeholder="ค้นหาชื่อหนัง"
        value={searchTerm}
        onChange={searchMovie}
        className="px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full" // ใช้ w-full เพื่อทำให้ input ขยายตามขนาดของพื้นที่ที่เหลือ
    />
    <BsSearch className="absolute top-0 left-0 m-3 text-gray-500 pointer-events-none" /> {/* ตำแหน่งภายใน input ด้วยการใช้ absolute */}
</div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4">
                {filteredMovies.map((item) => (
                    <div className="" key={item.id}>
                        <div className="bg-white rounded-lg shadow-md flex justify-center">
                            <Link to={`/Showtime/${item.id}`}>
                                <img
                                    src={
                                        item?.Img
                                            ? `http://localhost:8000/uploads/${item.Img.replace(/\\/g, '/')}`
                                            : null
                                    }
                                    alt={item.name}
                                    className="object-cover object-top hover:bg-opacity-50 transform hover:scale-110 border-gray-600 border border-opacity-50 rounded-xl shadow-lg transition-all duration-150"
                                />
                                <div className="text-center mt-6">
                                    <h1 className="text-gray-900 text-xl font-bold mb-6">{item.name}</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserHome;
