import React, {useEffect, useRef, useState} from 'react';
import Glide from "@glidejs/glide"
import Rank from "./Rank";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";


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
        setMovies(json.boxOfficeResult.dailyBoxOfficeList);;
        setLoading(false);
        console.log(json.boxOfficeResult.dailyBoxOfficeList);
    };
    var carousels = document.querySelectorAll('.glide');
    useEffect(() => {
        getMovies();
    }, []);
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
            <h1 style={{textAlign:'center'}}> 무비차트</h1>
            <br/>
            <div className="Home">
                {loading ? (
                    <p>loading...</p>) : (
                    <div>
                        <div className="frames glide__track" data-glide-el="track">
                            <Swiper className="myswiper"
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    navigation
                                    effect
                                    speed={800}
                                    loop={true}
                                    slidesPerView={1}
                            >
                                {movies.map((movie) => (
                                    <SwiperSlide style={{width:'1000px'}}>
                                    <Rank movie={movie}/>
                                    </SwiperSlide>
                                ))}

                            </Swiper>
                        </div>


                    </div>
                )}
            </div>
        </div>
    )

}
export default Home;
