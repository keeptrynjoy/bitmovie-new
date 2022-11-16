import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "./Detail.css";
import ReactPlayer from "react-player";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import moment from 'moment';
import 'moment/locale/ko';

function MovieDetail(props) {
    const p = useParams();
    const [movie_pk,setMovie_pk]=useState(p.movie_num);
    const [movie_data,setMovie_data]=useState([]);
    const [movie_photo,setMovie_photo]=useState([]);

    const getMovieUrl = localStorage.url + "/movie/selectMovieData?movie_pk=" + movie_pk;

    const getData =()=>{
        axios.get(getMovieUrl)
            .then((res)=>{
                setMovie_data(res.data);
                setMovie_photo(res.data.m_photo.split(","));
            })
    }

    //레이지로딩시 최초 1회 실행
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className={'detail-div'}>
                {
                    <div className="frames glide__track" data-glide-el="track" style={{width:"500px",alignContent:"center"}}>
                        <Swiper className="myswiper"
                                modules={[Navigation, Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                navigation
                                effect
                                speed={800}
                                loop={false}
                                slidesPerView={1}
                        >
                            {movie_photo.map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    <img alt={""} src={`https://image.tmdb.org/t/p/w500/${item}`}
                                         className={"dtposter"}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                }
                <div className={"detail-content-div"}>
                    <div className={"detail-contents"}>
                        <div className={"detail-contents-title"}>
                            <b>{movie_data.m_name}</b>
                            ({moment(movie_data.m_sdate).format("YYYY")})
                        </div>
                        <b>기본 : </b> 12 | 제작국가 | {movie_data.m_runtime}분<br/>
                        <b>장르 : </b> {movie_data.m_type}<br/>
                        <b>개봉일 : </b> {movie_data.m_sdate}<br/>
                        <b>줄거리 : </b>
                        <div className={"detail-contents-summary"}>{movie_data.m_info}</div>
                        <br/>
                    </div>
                    <button type={"button"} className={"bookingBtn"}>예매하기</button>
                </div>
                <div className={"prevideo"}>영화예고편 자리</div>
                <div className={"story"}>
                    <ReactPlayer
                        url={process.env.PUBLIC_URL + 'https://www.youtube.com/watch?v=ijUsSpRVhBU'}
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