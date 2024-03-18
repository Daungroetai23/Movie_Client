import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';

const BookingSuccess = () => {
  const location = useLocation();
  const { bookingDetails } = location.state;

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
    <div className="grid gap-4 sm:w-[800px] mt-4">
        <div className="col-span-2">
            <div className="bg-white pl-10 pr-5 p-4 rounded-lg shadow-md flex">
                {/* รูป */}
                <div className="mr-8 relative">
                    <img className="w-full h-auto" src={`http://localhost:8000/uploads/${bookingDetails.movieImg.replace(/\\/g, "/")}`} alt={bookingDetails?.movieImg} />
                </div>
                {/* รายละเอียด */}
                <div>
                    <h2 className="text-lg">รหัสการจอง: {bookingDetails.bookingCode}</h2>
                    <h2 className="font-bold text-xl text-black">{bookingDetails.movieName}</h2>
                    <div className="mb-4">
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-md mt-2 text-blue-700">
                                    {bookingDetails.dateTime}
                                </p>
                            </div>
                            <div>
                                <p className="font-black"> โรงภาพยนตร์: {bookingDetails.cinema}</p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-black">ที่นั่งที่เลือก</p>
                                    <p className="text-xl font-thin text-blue-700">{bookingDetails.selectedSeats}</p>
                                    <div className="mt-4">
                                        <QRCode value={bookingDetails.bookingCode} size={100} />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-black">ราคารวม</p>
                                    <p className="text-xl font-thin text-blue-700">{bookingDetails.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  );
};

export default BookingSuccess;
