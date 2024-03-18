import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8000/api/movie/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
      }); 
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [id]); 

  return (
    <div>
      <button className="btn btn-outline btn-wide ml-20 hover:drop-shadow-xl" onClick={()=>document.getElementById('my_modal_2').showModal()}>รายละเอียดภาพยนตร์</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    { movie ? ( 
   <>
   <div className="grid grid-cols-3">
    
     <div className="col-span-1">
       <img
         src={movie?.Img ? `http://localhost:8000/uploads/${movie.Img.replace(/\\/g, "/")}` : null}
         alt={movie.name}
         className=" object-cover object-top hover:bg-opacity-50 transform hover:scale-110 border-gray-600 border border-opacity-50 rounded-xl shadow-lg transition-all duration-150 "
       />
     </div>
     <div className="col-span-2 flex flex-col justify-center">
     <h3 className="font-bold text-lg">รายละเอียดภาพยนตร์</h3>
       <p className="py-1">ชื่อภาพยนตร์: {movie.name}</p>
       <p className="py-1">หมวดหมู่: {movie.genre} | เรทผู้ชม:{movie.viewer_rate}</p>
       <p className="py-1">ผู้กำกับ: {movie.director}</p>
       <p className="py-1 ">นักแสดง: {movie.actors}</p>
       <p className="py-1 font-bold">รายละเอียด</p>{movie.detail}
     </div>
   </div>
 </>
    ):(
              <p>No product found.</p>
            )}

  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </div>
  )
}

export default MovieDetails
