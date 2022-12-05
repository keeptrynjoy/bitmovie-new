import React, {useEffect, useState} from 'react';
import "./MovieList.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import {Button, ButtonGroup, CircularProgress, Divider, Pagination, ScopedCssBaseline, Switch} from "@mui/material";
import {ChevronRight, Favorite, FavoriteBorderOutlined} from "@material-ui/icons";
import usePagination from "../../service/UsePagination";
import Age from "../../service/Age";
import Swal from "sweetalert2";
import Likes from "./Likes";

function MovieList(props) {
    const navi = useNavigate();

    const [loading,setLoading] = useState(true);
    const [mlist, setMlist] = useState([]);
    const [MWishList,setMWishList] = useState([]);
    const [likes,setLikes] = useState([]);
    //페이징
    let [page, setPage] = useState(1);
    const PER_PAGE = 20;
    const count = Math.ceil(mlist.length / PER_PAGE);
    const _DATA = usePagination(mlist, PER_PAGE);

    //정렬순서 변수
    const [order,setOrder] = useState("m_name");
    //개봉,상영예정 변수
    const [in_theater,setIn_theater] = useState("");

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const makeListUrl =(order_stand,BorA)=>{
        let str = `${localStorage.url}/movie/selectMovieList?`;
        if(order_stand===""&&BorA===""){
            return str
        }else if(order_stand==null||BorA==null){
            return str
        }
        else{
            str += `&order_stand=${order_stand}&BorA=${BorA}`;
        }
        return str
    }

    //영화 위시리스트
    const getMwishList=()=>{
        axios.get(`${localStorage.url}/movie/selectMWishList?${sessionStorage.user_pk==null?"":"user_pk="+sessionStorage.user_pk}`)
            .then((res)=>{
                setMWishList(res.data);
            })
    }

    const toggleBorA=()=>{
        if(in_theater===""){
            setIn_theater("after");
        }else {
            setIn_theater("");
        }
        goToPageOne();
    }

    const goToPageOne=()=>{
        setPage(1);
        _DATA.jump(1);
    }

    // const handleMWish=(e)=>{
    //     if (sessionStorage.login_status==null) {
    //         Swal.fire({
    //             icon:"warning",
    //             text:"로그인후 이용해주세요"
    //         });
    //         return;
    //     }
    //     console.log("pk",e.target.value);
    //     if(MWishList.includes(Number(e.target.value))){
    //         axios.post(`${localStorage.url}/user/deleteMWish`,{movie_pk:e.target.value,user_pk:sessionStorage.user_pk})
    //             .then((res)=>{
    //                 alert("삭제")
    //                 // getData();
    //                 getMwishList();
    //             })
    //     }else{
    //         axios.post(`${localStorage.url}/user/insertMWish`,{movie_pk:e.target.value,user_pk:sessionStorage.user_pk})
    //             .then((res)=>{
    //                 alert("좋아요")
    //                 // getData();
    //                 getMwishList();
    //             })
    //     }
    // }

    //시작 데이터 가져오기
    const getData =()=>{
        setLoading(true);
        axios.get(makeListUrl())
            .then((res)=>{
                setMlist(res.data);
                setLoading(false);
            });
    }


    // //특정값 가져오기
    // const getRankData=async (order_stand,BorA)=>{
    //     await axios.get(makeListUrl(order_stand,BorA))
    //         .then((res)=>{
    //             setMlist(res.data);
    //         });
    // }

    //특정값 가져오기
    const getRankData=(order_stand,BorA)=>{
        setLoading(true);
        axios.get(makeListUrl(order_stand,BorA))
            .then((res)=>{
                setMlist(res.data);
                setLoading(false);
            });
    }

    //페이지 로딩시 데이터 가져오기
    useEffect(() => {
        getData();
        getMwishList();
    }, []);

    //정렬순서, 개봉작 바뀔 때마다 리스트 가져오기
    useEffect(()=>{
        getRankData(order,in_theater);
        console.log(mlist);
    },[order,in_theater]);

    return (
        <div className={"movie-list-div"}>
            <div style={{textAlign:"center"}}>
                <h1>영화리스트</h1>
            </div>
            <div className={"wtf"}>
                <div className={"coming-soon"}>
                    <div className={"movie-chart"}
                         style={{width:"120px"}}
                         onClick={()=>{
                             setIn_theater("");
                             goToPageOne();
                         }}>
                        {/*<span style={{width:"30px",height:"30px", display:"block"}}>*/}
                        {/*    {*/}
                        {/*        in_theater!=="before"?<ChevronRight/>:""*/}
                        {/*    }*/}
                        {/*</span>*/}
                        무비차트
                    </div>
                    <div className={"coming-soon-btn"}
                         style={{width:"120px"}}
                         onClick={(e)=>{
                             setIn_theater("before");
                             goToPageOne();
                         }}>
                        {/*<span style={{width:"30px",height:"30px"}}>*/}
                        {/*{*/}
                        {/*    in_theater==="before"?<ChevronRight/>:""*/}
                        {/*}*/}
                        {/*</span>*/}
                        상영 예정작
                    </div>
                </div>
            </div>
            <hr style={{width:"85%", margin:"auto", height:"3px", backgroundColor:"black"}}/>
            {
                in_theater!=="before"?
                    <div className={"sorting"} >
                        <span className={"toggle-BorA"}>
                                    <span>
                                    <Switch checked={in_theater === "after"} onChange={toggleBorA}/>
                                    개봉작만
                                    </span>
                        </span>
                        <span className={"btn-group"}>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                  <Button className={"nameBtn"} onClick={()=>setOrder("m_name")}>이름순</Button>
                                  <Button className={'reserveBtn'} onClick={()=>setOrder("reserve_rate")}>예매율순</Button>
                                  <Button className={'starBtn'} onClick={()=>setOrder("revw_avgstar")}>평점순</Button>
                            </ButtonGroup>
                        </span>
                    </div>
                    :
                    <div className={"sorting"}>
                    </div>
            }
            <div className={"movie-card-list-div"}>
                {
                    loading?
                        <div style={{display:"flex",justifyContent:"center",width:"100%",marginTop:"300px"}}>
                            <CircularProgress/>
                        </div>
                        :
                        <div>
                            <div className={'mplist'}>
                                {mlist && _DATA.currentData().map((item,i) => (
                                    <div className={"movie-list-items"} key={i}>
                                        <MovieCard movie_data={item}/>
                                        <div className={"movie-card-text"}>
                                            <div className={"tit-area"}>
                                                <ScopedCssBaseline/>
                                                <span className={"movie-grade"}><Age age={item.m_age_grd} size={20}/></span>
                                                <span className={"tit"}>{item.m_name}</span>
                                            </div>
                                            <div className={"rate-date"}>
                                                <span className={"rate"}>예매율 : {item.reserve_rate}%</span>
                                                <span className={"date"}>개봉일 : {item.m_sdate}</span>
                                            </div>
                                            <div className={"btn-div"}>
                                                <span className={"like-btn"}>
                                                    <Likes pk={item.movie_pk} MWishList={MWishList} getMwishList={getMwishList}/>
                                                </span>
                                                <span className={"book-btn"}>
                                                    <Button variant={"contained"} sx={{width:"120px", marginLeft:"10px"}}
                                                            onClick={() => navi("/ticketing")}>예매</Button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={"table-pagination"}>
                                <Pagination
                                    count={count}
                                    size="large"
                                    page={page}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default MovieList;