import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const products = [
    { 
      name: 'Product 1',
      image: 'https://lh3.googleusercontent.com/YU3mzQcuux8EWQfQVI33J0LKVKhf10DDAdezLWA5FLM0ubpl8gLPxc9yItnMbh48RRREKsL8xD3uGwZac_u7VQ-VLif9DJnfrQ=w888'
    },
    { 
      name: 'Product 2',
      image: 'https://lh3.googleusercontent.com/Aeg-ruiiDatYPtuZZK1uFP8CIlIdCLhmDN7NSVA0GMTmBqDuawjy1FpENBeDiBKrtQOm6ZxrVk39RdtE7FLySzH-6vhvpkow=s0'
    },
    { 
      name: 'Product 3',
      image: 'https://digitalmore.co/wp-content/uploads/2022/03/SF-Cinema_1_tn-800x404.jpg'
    },
  ];

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const startAutoplay = () => {
    setAutoplayInterval(setInterval(() => {
      nextSlide();
    }, 15000)); // เปลี่ยนจาก 10000 เป็น 15000 เพื่อปรับเวลาสไลด์
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  const handleMouseEnter = () => {
    stopAutoplay();
  };

  const handleMouseLeave = () => {
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, []); 

  return (
    <div className="relative mt-4 " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="overflow-hidden relative">
        <div className="flex justify-center w-full">
          {products.map((product, index) => (
            <div
              key={index}
              className={`${
                index === currentIndex ? 'block' : 'hidden'
              } w-full transition-all duration-500 ease-in-out`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover  w-full h-80 sm:h-[400px]  bg-contain bg-center bg-no-repeat"
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full focus:outline-none ${index === currentIndex ? 'bg-indigo-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button
  onClick={prevSlide}
  className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-12 h-12 text-white bg-black bg-opacity-50 hover:bg-opacity-75 focus:outline-none rounded-full"
  style={{ top: '50%', transform: 'translateY(-50%)' }}
>
  <FaChevronLeft className="w-6 h-6" />
</button>
<button
  onClick={nextSlide}
  className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-12 h-12 text-white bg-black bg-opacity-50 hover:bg-opacity-75 focus:outline-none rounded-full"
  style={{ top: '50%', transform: 'translateY(-50%)' }}
>
  <FaChevronRight className="w-6 h-6" />
</button>
      </div>
    </div>
  );
};

export default Carousel;