import React, {useEffect, useState} from 'react';
import "./MovieList.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MovieCard from "../MovieCard";
import {Button, Divider, ScopedCssBaseline} from "@mui/material";
import {FavoriteBorderOutlined} from "@material-ui/icons";

function MovieList(props) {
    const navi = useNavigate();

    const [mlist, setMlist] = useState([]);

    const ListUrl = localStorage.url + "/movie/selectMovieList?";

    const getData =()=>{
        axios.get(ListUrl)
            .then((res)=>{
                setMlist(res.data);
                console.log(res.data);
            });
    }
    //페이지 로딩시 데이터 가져오기
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className={'mlistall'} >
                <button type={'button'} className={'reserveBtn'}>예매율</button>
                <button type={'button'} className={'starBtn'}>평점순</button>
            </div>
            <h1 style={{textAlign:'center', marginTop:'100px', marginBottom:'50px'}}>영화리스트</h1>
            <div className={'mplist'}>
                {mlist.map((item,i) => (
                    <div className={"movie-list-items"} key={i}>
                        <MovieCard movie_data={item}/>
                        <div className={"movie-card-text"}>
                            <div className={"tit-area"}>
                                <ScopedCssBaseline/>
                                <span className={"movie-grade"}>12</span>
                                <span className={"tit"}>{item.m_name}</span>
                            </div>
                            <div className={"rate-date"}>
                                <span className={"rate"}>예매율 : {item.reserve_rate}%</span>
                                <span className={"date"}>개봉일 : {item.m_edate}</span>
                            </div>
                            <div className={"btn-div"}>
                                <span className={"like-btn"}>
                                    <Button variant="outlined" startIcon={<FavoriteBorderOutlined />}>
                                    좋아요
                                </Button>
                                </span>
                                <span className={"book-btn"}>
                                <Button
                                    variant={"contained"}
                                    sx={{
                                        width:"120px",
                                        marginLeft:"10px"
                                    }}
                                    onClick={() => navi("/ticketing")}>예매</Button>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;