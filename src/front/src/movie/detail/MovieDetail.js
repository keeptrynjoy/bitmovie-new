import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "./Detail.css";
import ReactPlayer from "react-player";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import moment from 'moment';
import 'moment/locale/ko';
import MovieReview from "./MovieReview";
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, Tooltip, tooltipClasses,
} from "@mui/material";
import {Rating, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Swal from "sweetalert2";
import Age from "../../service/Age";
import {ArrowRight} from "@material-ui/icons";
import { styled } from '@mui/material/styles';
import noperimg from "../../image/noperimage.png"
import Charts from "./Charts";

function MovieDetail(props) {
    const p = useParams();
    const navi=useNavigate();
    const [movie_pk,setMovie_pk]=useState(p.movie_num);
    const [movie_data,setMovie_data]=useState([]);
    const [movie_photo,setMovie_photo]=useState([]);
    const [movie_review,setMovie_review]=useState([]);
    const [cast_data,setCast_data]=useState([]);
    const [review_open, setReview_Open] = useState(false);
    const [review_star,setReview_star]=useState(0);
    const [review_text,setReview_text]=useState("");
    const [dateArray,setDateArray] = useState([]);
    const [selected_date,setSelected_date] = useState(moment().format("YYYY-MM-DD"));
    const [menu,setMenu]=useState("info");
    const [timetable,setTimetable]=useState([]);
    const [chartLoading, setChartLoading]=useState(true);

    const [chartData,setChartData]=useState({});

    const user_pk = sessionStorage.user_pk;
    const days = ["일","월","화","수","목","금","토"]

    //끝나는 날짜기준
    // const getDaysArray=(end)=>{
    //     setDateArray([]);
    //     let arr=new Array();
    //     for(let dt=new Date(); dt<= new Date(end); dt.setDate(dt.getDate()+1))
    //     {
    //         // console.log(dt.toISOString().split("T")[0]);
    //         const date = dt.toISOString().split("T")[0];
    //         const day = dt.getDay();
    //         arr.push(date + "/" + day);
    //     }
    //     setDateArray(arr);
    // }

    //시작 날짜
    const getDaysArray=()=>{
        const ON_SCRREN_DAYS = 16;

        setDateArray([]);
        let arr=[];
        for(let i=0; i<ON_SCRREN_DAYS; i++)
        {
            const Ndate =new Date();
            Ndate.setDate(Ndate.getDate()+i);
            const date = Ndate.toISOString().split("T")[0];
            const day = Ndate.getDay();
            arr.push(date + "/" + day);
        }
        setDateArray(arr);
    }

    var chartOptions = {
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value*100 / sum).toFixed(2)+"%";
                    return percentage;
                },
                color: '#fff',
            }
        }
    };

    const genderData = {
        labels: ['남자', '여자'],
        datasets: [
            {
                label: '성별',
                data: [chartData.male,chartData.female],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const ageData = {
        labels: ['10대', '20대', '30대', '40대', '50대', '기타'],
        datasets: [
            {
                label: '나이별',
                data: [chartData.age10, chartData.age20, chartData.age30, chartData.age40, chartData.age50, chartData.age],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const getData =()=>{
        const getMovieUrl = `${localStorage.url}/movie/selectMovieData?movie_pk=${movie_pk}`;
        axios.get(getMovieUrl)
            .then((res)=>{
                setMovie_data(res.data.data);
                setMovie_photo(res.data.data.m_photo.split(","));
                setMovie_review(res.data.revw);
                setCast_data(res.data.cast);
                setChartData(res.data.chart);
                setChartLoading(false);
                getDaysArray();
                console.log(res.data);
            })
    }

    //레이지로딩시 최초 1회 실행
    useEffect(() => {
        getData();
    }, []);

    //날짜가 변할때마다 상영시간표 가져오기
    useEffect(()=>{
        if (movie_data===[])
            return
        axios.get(`${localStorage.url}/movie/timeByMovieDetail?movie_pk=${parseInt(movie_pk)}&date=${selected_date}`)
            .then((res)=>{
                setTimetable(res.data);
                console.log(res.data);
            })
    },[selected_date])

    //리뷰 작성 함수
    const checkMovieLog=()=>{
        const movieLogUrl = `${localStorage.url}/mypage/movielog?user_pk=${user_pk}`;
        axios.get(movieLogUrl)
            .then((res)=>{
                console.log(res.data);
                for(let i=0;i<res.data.length;i++)
                {
                    if(parseInt(res.data[i].movie_pk)===parseInt(movie_pk)){
                        return true;
                    }
                }
                return false;
            })
    }
    const handleOpen = () => {
        if (user_pk==null){
            Swal.fire({
                icon:"error",
                text:"로그인 후 사용 가능합니다"
            })
            return;
        }
        const movieLogUrl = `${localStorage.url}/mypage/movielog?user_pk=${user_pk}`;
        axios.get(movieLogUrl)
            .then((res)=>{
                console.log(res.data);
                for(let i=0;i<res.data.length;i++)
                {
                    if(parseInt(res.data[i].movie_pk)===parseInt(movie_pk)){
                        setReview_Open(true);
                        return;
                    }
                }
                Swal.fire({
                    icon:"error",
                    text:"영화 시청 후 리뷰 작성이 가능합니다"
                })
            })
    }
    const handleClose = () => setReview_Open(false);
    const handleReviewText = (e) => {
        setReview_text(e.target.value);
    };
    const submitReview = (e) =>{
        const insertReviewUrl = `${localStorage.url}/user/insertReview?movie_pk=${parseInt(movie_pk)}&user_pk=${sessionStorage.user_pk}&revw_star=${review_star}&revw_text=${review_text}`;
        axios.get(insertReviewUrl)
            .then((res)=>{
                setReview_text("");
                setReview_star(0);
                Swal.fire({
                    icon:"success",
                    text:"리뷰 작성 성공"
                }).then((r)=>{
                    setReview_Open(false);
                })
            })
        setReview_Open(false);
        getData();
    }

    //영화 좌석 툴팁
    const getPlot=(type)=>{
        let arr=[];
        const rows=["A","B","C","D","E","F","G","H","I","J","K"];
        const columns=["1","2","3","4","5","6","7","8","9","10","11","12"];

        if(type==="A"){
            for(let i=0; i<8; i++)
            {
                let rowarr=[]
                for(let j=0; j<12; j++)
                {
                    if(j===2||j===9){
                        rowarr.push("S");
                    }else{
                        rowarr.push(rows[i]+columns[j]);
                    }
                }
                arr.push(rowarr);
            }
            console.log(arr);
            return arr;
        }
    }

    const getCastType=(i)=>{
        switch (i) {
            case "Writing":
                return "각본"
            case "Visual Effects":
                return "CG"
            case "Sound":
                return "음향 감독"
            case "Production":
                return "제작"
            case "Directing":
                return "감독"
            case "Editing":
                return "편집"
            case "Crew":
                return "제작진"
            case "Camera":
                return "촬영"
            case "Art":
                return "미술"
            default:
                return "배우"
        }
    }

    const handleMenu = (
        event: React.MouseEvent<HTMLElement>,
        newMenu: string | null,
    ) => {
        // console.log(timetable);
        setMenu(newMenu);
    };

    const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }}
            // arrow
                 placement={"top"}/>
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
            width:"150px",
            height:"160px",
            border:"1px solid black"
        },
        // [`& .${tooltipClasses.arrow}`]: {
        //     color: theme.palette.common.white,
        // }
    }));

    return (
        <div>
            <div className={'detail-div'}>
                <div className={"detail-upper-div"}>
                    <div className={"poster-and-btn"}>
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
                        <button type={"button"} className={"bookingBtn"} onClick={()=>navi("/ticketing")}>예매하기</button>
                    </div>
                    <div className={"detail-content-div"}>
                        <div className={"detail-contents"}>
                            <div className={"detail-contents-title"}>
                                <b>{movie_data.m_name}</b>
                                ({moment(movie_data.m_sdate).format("YYYY")})
                            </div>
                            <b>기본 : </b> <Age age={movie_data.m_age_grd} size={20}/> | {movie_data.m_country} | {movie_data.m_runtime===0?"미정":`${movie_data.m_runtime}분`}<br/>
                            <b>장르 : </b> {movie_data.m_type}<br/>
                            <b>개봉일 : </b> {movie_data.m_sdate}<br/>
                            <b>줄거리 : </b>
                            <div className={"detail-contents-summary"}>{movie_data.m_info}</div>
                            <br/>
                        </div>
                    </div>
                </div>
                <div className={"tab-menu-container"}>
                    <ToggleButtonGroup
                        value={menu}
                        exclusive
                        sx={{height:"50px",marginTop:"40px"}}
                        onChange={handleMenu}
                        color={"primary"}
                        size={"large"}
                    >
                        <ToggleButton value="info">
                            주요 정보
                        </ToggleButton>
                        <ToggleButton value="review">
                            평점 / 리뷰
                        </ToggleButton>
                        <ToggleButton value="timetable">
                            상영 시간표
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className={"menu-contents-div"}>
                    {
                        menu === "review"?
                            <div className={"dtreview"}>
                                <h1>영화리뷰</h1>
                                <Button variant={"contained"} color={"secondary"} onClick={handleOpen} sx={{marginTop:"50px"}}>영화 리뷰 등록</Button>
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
                                <div className={"review-ul-div"}>
                                    <ul className={"review-ul"}>
                                        {
                                            movie_review && movie_review.map((review,i)=>(
                                                <li key={i}>
                                                    <MovieReview review={review} get={getData}/>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            :
                            menu === "timetable"?
                                <div className={"timetable-div"}>
                                    <div className={"select-date-div"}>
                                        <ul className={"date-item-wrap"}>
                                            <Swiper className="myswiper"
                                                    modules={[Pagination]}
                                                    pagination={{ clickable: true }}
                                                    effect
                                                    speed={800}
                                                    loop={false}
                                                    slidesPerView={8}
                                            >
                                                {
                                                    dateArray && dateArray.map((item,i)=>(
                                                        <SwiperSlide key={i}>
                                                            <li className={"date-item"} value={i}
                                                                onClick={()=>setSelected_date(item.split("/")[0])}
                                                                style={{boxShadow:`${selected_date===item.split("/")[0]?"5px 5px 5px gray":"none"}`}}>
                                                                <span>{item.substring(5,7)}월</span>
                                                                <em>{days[parseInt(item.split("/")[1])]}</em>
                                                                <strong>{item.substring(8,10)}</strong>
                                                            </li>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                        </ul>
                                    </div>
                                    <div className={"screens"}>
                                        {
                                            timetable.length===0?
                                                <div className={"theaters"} style={{fontSize:"30px"}}>
                                                    현재 선택하신 날짜에 상영하는 영화가 없습니다.
                                                </div>
                                                :
                                                timetable.map((theater,i)=>(
                                                    <div className={"theaters"} key={i}>
                                                        <div className={"theaters-wrap"}>
                                                            <div className={"theaters-title"}>
                                                                <div className={"theaters-title-text"}>
                                                                    {theater.the_name}
                                                                </div>
                                                            </div>
                                                            <div className={"theaters-contents"}>
                                                                {
                                                                    theater.screen.map((screen,j)=>(
                                                                        <div className={"theaters-contents-a"} key={j}>
                                                                            <div className={"a-upper"}>
                                                                                <ArrowRight/> {screen.scr_name} {screen.scr_floor} | 총 {screen.scr_tot_seat}석
                                                                            </div>
                                                                            <div className={"a-under"}>
                                                                                {screen.time.map((time,k)=>(
                                                                                    <LightTooltip key={k}
                                                                                                  title={
                                                                                                      <React.Fragment>
                                                                                                          <div className={"mini-theater"}>
                                                                                                              <div className={"mini-theater-upper"}>
                                                                                                                  <div style={{fontSize:"1.5em",marginTop:"3px"}}>
                                                                                                                      {theater.the_name}
                                                                                                                  </div>
                                                                                                                  <div>
                                                                                                                      {screen.scr_name} {screen.scr_floor} (총 {screen.scr_tot_seat}석)
                                                                                                                  </div>
                                                                                                              </div>
                                                                                                              <div className={"mini-theater-map"}>
                                                                                                                  <div className={"mini-container"}>
                                                                                                                      <div className={"mini-screen"}>SCREEN</div>
                                                                                                                      <div className={"mini-seats"} onClick={()=>{
                                                                                                                          console.log(time.seat);
                                                                                                                      }
                                                                                                                      }>
                                                                                                                          {
                                                                                                                              getPlot("A").map((row,r)=>(
                                                                                                                                  <React.Fragment key={r}>
                                                                                                                                      {
                                                                                                                                          row.map((col,c)=>(
                                                                                                                                              <div key={c} className={"mini-seat"}
                                                                                                                                                   onClick={()=>{
                                                                                                                                                       console.log(col);
                                                                                                                                                   }}
                                                                                                                                                   style={{
                                                                                                                                                       top:`${parseInt(r)*6}px`,
                                                                                                                                                       left:`${parseInt(c)*6}px`,
                                                                                                                                                       border:`${parseInt(c)===2 || parseInt(c)===9?"":"1px solid gray"}`,
                                                                                                                                                       backgroundColor:`${String(time.seat).includes(col)?"gray":"white"}`
                                                                                                                                                   }}>
                                                                                                                                                  <span></span>
                                                                                                                                              </div>
                                                                                                                                          ))
                                                                                                                                      }
                                                                                                                                  </React.Fragment>
                                                                                                                              ))
                                                                                                                          }
                                                                                                                      </div>
                                                                                                                  </div>
                                                                                                              </div>
                                                                                                              <div className={"mini-theater-under"}>
                                                                                                                  {time.scrt_stime.substring(0,5)} ~ {time.scrt_etime.substring(0,5)}
                                                                                                              </div>
                                                                                                          </div>
                                                                                                      </React.Fragment>
                                                                                                  }>
                                                                                        <div className={"time"} >
                                                                                            <div className={"time-upper"}>
                                                                                                {time.scrt_stime.substring(0,5)}
                                                                                            </div>
                                                                                            <div className={"time-under"}>
                                                                                                <div>
                                                                                                    {parseInt(screen.scr_tot_seat)-parseInt(time.booked)}석
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </LightTooltip>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className={"charts"}>
                                        {chartLoading?
                                            <CircularProgress/>
                                            :
                                            <div>
                                                <Charts chartData={chartData} option={chartOptions} ageData={ageData} genderData={genderData}/>
                                            </div>
                                        }
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
                                    <div className={"cast-div"}>
                                        <h1>출연/제작진</h1>
                                        <Swiper className="castswiper"
                                                modules={[Navigation, Pagination, Autoplay]}
                                                pagination={{ clickable: true }}
                                                navigation
                                                effect
                                                speed={800}
                                                loop={false}
                                                slidesPerView={4}
                                        >
                                            {cast_data.map((item, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <div className={"cast-card"}>
                                                        <img alt={""} src={item.per_photo===""?noperimg:`https://image.tmdb.org/t/p/w500/${item.per_photo}`}
                                                             className={"cast-img"}/>
                                                        <div className={"cast-info"}>
                                                            <div className={"person-name"}>
                                                                {item.per_name}
                                                            </div>
                                                            <div className={"cast-type"}>
                                                                {getCastType(item.cast_type)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;