import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "./Detail.css";
import ReactPlayer from "react-player";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import moment from 'moment';
import 'moment/locale/ko';
import MovieReview from "./MovieReview";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, ScopedCssBaseline,
} from "@mui/material";
import {Rating} from "@mui/lab";
import Swal from "sweetalert2";

function MovieDetail(props) {
    const p = useParams();
    const [movie_pk,setMovie_pk]=useState(p.movie_num);
    const [movie_data,setMovie_data]=useState([]);
    const [movie_photo,setMovie_photo]=useState([]);
    const [movie_review,setMovie_review]=useState([]);
    const [review_open, setReview_Open] = useState(false);
    const [review_star,setReview_star]=useState(0);
    const [review_text,setReview_text]=useState("");

    const u_pk = sessionStorage.u_pk;

    const getData =()=>{
        const getMovieUrl = localStorage.url + "/movie/selectMovieData?movie_pk=" + movie_pk;
        axios.get(getMovieUrl)
            .then((res)=>{
                setMovie_data(res.data.data);
                setMovie_photo(res.data.data.m_photo.split(","));
                setMovie_review(res.data.revw);
                console.log(res.data);
            })
    }

    //레이지로딩시 최초 1회 실행
    useEffect(() => {
        getData();
    }, []);

    //리뷰 작성 함수
    const checkMovieLog=()=>{
        const movieLogUrl = `${localStorage.url}/mypage/movielog?user_pk=${u_pk}`;
        axios.get(movieLogUrl)
            .then((res)=>{
                for(let i=0;i<res.data.length;i++)
                {
                    if(res.data[i].movie_pk.equals(movie_pk)){
                        return true;
                    }
                }
            })
        return false;
    }
    const handleOpen = () => {
        if (u_pk==null){
            Swal.fire({
                icon:"error",
                text:"로그인 후 사용 가능합니다"
            })
            return;
        }
        if (!checkMovieLog()){
            Swal.fire({
                icon:"error",
                text:"영화 시청 후 리뷰 작성이 가능합니다"
            })
            return;
        }
        setReview_Open(true);
    }
    const handleClose = () => setReview_Open(false);
    const handleReviewText = (e) => {
        setReview_text(e.target.value);
    };
    const submitReview = (e) =>{
        const insertReviewUrl = `${localStorage.url}/user/insertReview?movie_pk=${movie_pk}&user_pk=${sessionStorage.u_pk}&revw_star=${review_star}&revw_text=${review_text}`;
        axios.get(insertReviewUrl)
            .then((res)=>{
                setReview_text("");
                setReview_star(0);
                Swal.fire({
                    icon:"success",
                    text:"리뷰 작성 성공"
                })
            })
        document.window.reload();
    }

    return (
        <div>
            <div className={'detail-div'}>
                <div className={"detail-upper-div"}>
                    <div className={"poster-and-btn"}>
                        {
                            <div className="frames glide__track" data-glide-el="track" style={{width:"350px",height:"500px",alignContent:"center"}}>
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
                        <button type={"button"} className={"bookingBtn"}>예매하기</button>
                    </div>
                    <div className={"detail-content-div"}>
                        <div className={"detail-contents"}>
                            <div className={"detail-contents-title"}>
                                <b>{movie_data.m_name}</b>
                                ({moment(movie_data.m_sdate).format("YYYY")})
                            </div>
                            <b>기본 : </b> 12 | 제작국가 | {movie_data.m_runtime===0?"미정":`${movie_data.m_runtime}분`}<br/>
                            <b>장르 : </b> {movie_data.m_type}<br/>
                            <b>개봉일 : </b> {movie_data.m_sdate}<br/>
                            <b>줄거리 : </b>
                            <div className={"detail-contents-summary"}>{movie_data.m_info}</div>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className={"story"}>
                    <ReactPlayer
                        url={process.env.PUBLIC_URL + `https://www.youtube.com/watch?v=${movie_data.m_video}`}
                        width='100%'
                        height='400px'
                        playing={true}
                        muted={true}
                        controls={true}
                        loop={true}
                    />
                </div>
                <div className={"dtreview"}>
                    <h1>영화리뷰</h1>
                    <Button variant={"contained"} color={"secondary"} onClick={handleOpen}>영화 평점 등록</Button>
                    <Dialog open={review_open} onClose={handleClose} maxWidth={"1000px"}>
                        <DialogTitle>평점 작성</DialogTitle>
                        <DialogContent>
                            <div className={"review-header"}>
                                <span style={{fontSize:"1.5em"}}>{movie_data.m_name}</span>
                                <span style={{marginLeft:"150px",marginTop:"7px"}}>
                                    <Rating
                                        name="review-star"
                                        value={review_star}
                                        onChange={(event, newValue) => {
                                            setReview_star(newValue);
                                        }}
                                    />
                                </span>
                            </div>
                            <FormControl>
                                <textarea
                                    className={"review-textarea"}
                                    placeholder={"이 영화를 평가해주세요"}
                                    onChange={(e)=>{
                                        handleReviewText(e);
                                    }}
                                    value={review_text}
                                />
                                {/*<TextField*/}
                                {/*    sx={{width:"500px"}}*/}
                                {/*    placeholder={"이 영화를 평가해주세요"}*/}
                                {/*    autoFocus*/}
                                {/*    margin="dense"*/}
                                {/*    id="review"*/}
                                {/*    type="text"*/}
                                {/*    variant="standard"*/}
                                {/*/>*/}
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>취소</Button>
                            <Button onClick={()=>{
                                submitReview();
                                handleClose();
                            }
                            }>리뷰 작성</Button>
                        </DialogActions>
                    </Dialog>
                    <ul className={"review-ul"}>
                        {
                            movie_review && movie_review.map((review,i)=>(
                                <li key={i}>
                                    <MovieReview review={review}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;