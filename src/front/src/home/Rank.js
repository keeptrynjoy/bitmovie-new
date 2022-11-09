import React, {useState} from 'react';
import { Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import poster from "../image/lala.jpg";


function Rank(props) {
    const [movie, setMovie] = useState(props.movie);
    return (
        <div className="container">

                <div className="boxoffice" >

                    <p className={'topnum'}>{movie.rank}위</p>
                    <p> {movie.movieNm} ({movie.openDt.substr(0, 4)}) </p>
                    <p> 금일 관객수: {movie.audiCnt}명 </p>
                    <p className="ranknum"> 누적 관객수: {movie.audiAcc}명 </p>

                </div>




         </div>
    );
}


export default Rank;
