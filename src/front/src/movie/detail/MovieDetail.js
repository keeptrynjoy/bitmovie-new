import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "./Detail.css";
import ReactPlayer from "react-player";
import axios from "axios";

function MovieDetail(props) {
    const p = useParams();
    const [movie_pk,setMovie_pk]=useState(p.movie_num);
    const [movie_data,setMovie_data]=useState([]);
    const getMovieUrl = localStorage.url + "/movie/selectMovieData?movie_pk=" + movie_pk;

    const getData =()=>{
        axios.get(getMovieUrl)
            .then((res)=>{
                setMovie_data(res.data);
            })
    }

    //레이지로딩시 최초 1회 실행
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
           <div className={'dtall'}>
               <div className={"dtposter"}></div>
               <div className={"dtcontent"}>
                   <div className={"dtname"}>
                       영화제목 :  {movie_data.m_name}<br/>
                       예매율 : 000<br/>
                       평점 : 000<br/>
                       감독/출연진 소개 : 000<br/>
                       영화 간단 줄거리 : 000<br/>
                   </div>
                   <button type={"button"} className={"dtbt"}>예매하기</button>
               </div>
               <div className={"prevideo"}>영화예고편 자리</div>
               <div className={"story"}>
                   <ReactPlayer
                       url={process.env.PUBLIC_URL + 'https://www.https://www.youtube.com/watch?v=ijUsSpRVhBU'}
                       width='100%'
                       height='400px'
                       playing={true}
                       muted={true}
                       controls={true}
                       loop={true}

                   /></div>
               <div className={"dtreview"}>평점 작성자리</div>
           </div>

        </div>
    );
}

export default MovieDetail;