import React, {useEffect, useState} from 'react';
import Glide from "@glidejs/glide"
import Rank from "./Rank";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import ReactPlayer from "react-player";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import MovieReview from "../movie/detail/MovieReview";
import {useNavigate} from "react-router-dom";

function Home(props) {
    localStorage.url=process.env.REACT_APP_URL;

    const [loading, setLoading] = useState(true);
    const [video_loading, setVideo_loading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selected_movie,setSelected_movie] = useState("");
    const [selected_movie_data,setSelected_movie_data] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [index,setIndex] = useState(0);
    const navi=useNavigate();

    // kobis 영화진흥원 key
    // const key ='3e56c5d518bc82f65d4d1d16806fdd37';
    // 더 무비 key
    const key = "7a447c04dbde1f8464230be65ef469eb";
    const today = new Date();
    const targetDT = today.getFullYear()+(today.getMonth()).toString().padStart(2,0)+(today.getDate().toString().padStart(2,0));
    const getMovies = async (type) => {
        // kobis 영화진흥원 박스 오피스 api
        // const json = await (
        //     await fetch(
        //         `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDT}`
        //     )
        // ).json();
        // setMovies(json.boxOfficeResult.dailyBoxOfficeList);
        // setLoading(false);

        //더 무비 api
        await axios.get(`https://api.themoviedb.org/3/movie/${type}/?api_key=${key}&language=ko&page=1&region=kr`)
            .then((res)=>{
                setMovies(res.data.results);
                setIndex(0);
                setSelected_movie(res.data.results[0].id);
            })
    };

    const getReviews =()=>{
        const getMovieUrl = `${localStorage.url}/main/selectRecentRevw?${sessionStorage.user_pk==null?"":"user_pk="+sessionStorage.user_pk}`;
        axios.get(getMovieUrl)
            .then((res)=>{
                console.log(res.data);
                setReviews(res.data);
            })
    }

    //페이지 로딩시 데이터 가져오기
    useEffect(() => {
        getMovies("popular").then(r=>{
            setLoading(false);
        });
        getReviews();
    }, []);

    const movieChart = () =>{
        setLoading(true);
        getMovies("popular").then(r=>{
            setLoading(false);
        });
    }

    const bitChart= () =>{
        setLoading(true);
        getMovies("upcoming").then(r=>{
            setLoading(false);
        });
    }

    let carousels = document.querySelectorAll('.glide');
    useEffect(() => {
        for(let i = 0 ; i < carousels.length; i++){
            let glide = new Glide(carousels[i], {
                type: 'carousel',
                startAt: 0,
                perView: 5,
            });
            glide.mount();
        }
    }, [carousels]);

    const selectMovie=async ()=>{
        const getMovieUrl = `${localStorage.url}/movie/selectMovieData?movie_pk=${selected_movie}`;
        await axios.get(getMovieUrl)
            .then((res)=>{
                setSelected_movie_data(res.data.data);
            })
    }

    useEffect(()=>{
        if(selected_movie===""){
            return;
        }
        setVideo_loading(true);
        selectMovie().then(r=>{
            setVideo_loading(false);
        });
    },[selected_movie]);

    //xUDhdCsLkjU

    return (
        <div style={{textAlign:'center'}}>
            <div className="main-slider" >
                <h1 style={{textAlign:'center', marginBottom:'30px'}}>영화 예고편</h1>
                {
                    video_loading ?
                        (<CircularProgress/>)
                        :
                        <ReactPlayer
                            url={process.env.PUBLIC_URL + `https://www.youtube.com/watch?v=${selected_movie_data.m_video}`}
                            width='100%'
                            height='400px'
                            playing={true}
                            muted={true}
                            controls={true}
                            onEnded={()=>{
                                setIndex(index+1);
                                setSelected_movie(movies[index].id);
                            }}
                        />
                }
            </div>
            <div>
                <button type={"button"} className={'bt1'} onClick={movieChart}>무비차트</button>&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type={"button"} className={'bt2'} onClick={bitChart}>상영예정작</button>
            </div>
            <br/>
            <div className={"wtf"}>
                <div className="Home">
                    {
                        loading ?
                            (<CircularProgress/>)
                            :
                            (
                                <div>
                                    <div className="frames glide__track" data-glide-el="track">
                                        <Swiper className="myswiper"
                                                modules={[Pagination, Autoplay]}
                                                pagination={{ clickable: true }}
                                                // navigation
                                                effect
                                                // fontsize={20}
                                                speed={800}
                                                loop={true}
                                                slidesPerView={5}
                                                autoplay={{delay: 5000,
                                                    disableOnInteraction:false}}
                                        >
                                            {movies && movies.map((movie,i) => (
                                                <SwiperSlide style={{width:'1000px'}} key={i}>
                                                    <Rank movie={movie} key={i} idx={i}
                                                          selected_movie={selected_movie} setSelected_movie={setSelected_movie}/>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
            <h1 style={{textAlign:'center'}}>영화 후기</h1>
            <div className={"recent-revw"}>
                <div className={"recent-revw-list"} style={{borderRadius:'0', border:'1px solid lightgray'}}>
                    {reviews.map((review,i) => (
                        <div key={i}>
                            <div className={"review-movie-title"}
                                 onClick={()=>{
                                     navi(`/movie/detail/${review.movie_pk}`);
                                 }}>
                                {review.m_name}
                            </div>
                            <MovieReview review={review} get={getReviews}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
