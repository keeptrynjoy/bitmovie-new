import React, {useState} from 'react';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import {useNavigate} from "react-router-dom";


function Rank(props) {
    const [movie, setMovie] = useState(props.movie);
    const [IsOn,setIsOn] = useState(false);
    const navi = useNavigate();
    return (
        <div className="container"
             onMouseEnter={()=>setIsOn(true)}
             onMouseLeave={()=>setIsOn(false)}
             onClick={()=>{
                 navi(`/movie/detail/${movie.id}`)
             }}>
                {/*kobis*/}
                {/*<div className="boxoffice" >*/}
                {/*    <p className={'topnum'}>{movie.rank}위</p>*/}
                {/*    <p> {movie.movieNm} ({movie.openDt.substr(0, 4)}) </p>*/}
                {/*    <p> 금일 관객수: {movie.audiCnt}명 </p>*/}
                {/*    <p className="ranknum"> 누적 관객수: {movie.audiAcc}명 </p>*/}
                {/*</div>*/}
            <img className={`movie-poster`} alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
            <div className={"rank-num"}>
                {props.idx+1}
            </div>
            <div className={`boxoffice-text ${IsOn? "on":"close"}`}>
                <div className={"boxoffice-text-content"}><span className={"mvtitle"}> {movie.title} </span></div>
                <div className={"boxoffice-text-content"}>{movie.release_date}</div>
                <div className={"boxoffice-text-content"}> 관람평 : <span className={"boxoffice-text-content-rate"}>{movie.vote_average}점</span></div>
            </div>
         </div>
    );
}


export default Rank;
