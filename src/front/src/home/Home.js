import React, {useEffect, useRef, useState} from 'react';
import Glide from "@glidejs/glide"
import Rank from "./Rank";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";

function Home(props) {





    localStorage.url=process.env.REACT_APP_URL;
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const key ='3e56c5d518bc82f65d4d1d16806fdd37';
    const today = new Date();
    const targetDT = today.getFullYear()+(today.getMonth()).toString().padStart(2,0)+(today.getDate().toString().padStart(2,0));
    const getMovies = async () => {
        const json = await (
            await fetch(
                `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDT}`
            )
        ).json();
        setMovies(json.boxOfficeResult.dailyBoxOfficeList);
        setLoading(false);
        console.log(json.boxOfficeResult.dailyBoxOfficeList);
    };
    var carousels = document.querySelectorAll('.glide');
    useEffect(() => {
        getMovies();
    }, []);
    const movieChart = async()=>{
        setLoading(true);
        const json = await (
            await fetch(
                `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDT}`
            )
        ).json();
        setMovies(json.boxOfficeResult.dailyBoxOfficeList);
        setLoading(false);
    }
    const bitChart=()=>{
        setLoading(true);
        setMovies([]);
        // setLoading(false);
    }
    useEffect(() => {
        console.log(carousels.length);
        for(var i = 0 ; i < carousels.length; i++){
            var glide = new Glide(carousels[i], {
                type: 'carousel',
                startAt: 0,
                perView: 5,
            });
            glide.mount();
        }
    }, [carousels]);

    return (

        <div style={{textAlign:'center'}}>

            <div className="main-slider">
                <h1 style={{textAlign:'center', marginBottom:'30px'}}>영화 예고편</h1>
                <ReactPlayer
                    url={process.env.PUBLIC_URL + 'https://www.youtube.com/watch?v=xUDhdCsLkjU'}
                    width='100%'
                    height='400px'
                    playing={true}
                    muted={true}
                    controls={true}
                    loop={true}

                />

            </div>
            <div>
                <button type={"button"} className={'bt1'} onClick={movieChart}>무비차트</button>&nbsp;
                <button type={"button"} className={'bt2'} onClick={bitChart}>예매순위</button>
            </div>
            <br/>
            <div className="Home">
                {
                    loading ?
                        (<p>loading...</p>)
                        :
                        (
                            <div>
                                <div className="frames glide__track" data-glide-el="track">
                                    <Swiper className="myswiper"
                                            modules={[Navigation, Pagination, Autoplay]}
                                            pagination={{ clickable: true }}
                                            navigation
                                            effect
                                            speed={800}
                                            loop={true}
                                            slidesPerView={3}
                                            autoplay={{delay: 2000,
                                            disableOnInteraction:false}}
                                    >
                                        {movies.map((movie) => (
                                            <SwiperSlide style={{width:'1000px'}} key={movie}>
                                                <Rank movie={movie}/>
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>
                                </div>
                            </div>
                        )
                }
            </div>

            <div className="main-slider2">
                <h1 style={{textAlign:'center'}}>영화 평점</h1>
            </div>
        </div>
    )

}
export default Home;
