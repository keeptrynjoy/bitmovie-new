import React, {useState} from 'react';
import { Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'


function Rank(props) {
    const [movie, setMovie] = useState(props.movie);
    return (
        <div className="container">

                <div className="boxoffice">
                    <h2> {movie.rank} </h2>
                    <p> {movie.movieNm} ({movie.openDt.substr(0, 4)}) </p>
                    <p> 금일 관객수: {movie.audiCnt}명 </p>
                    <p> 누적 관객수: {movie.audiAcc}명 </p>
                </div>




         </div>
    );
}


export default Rank;
