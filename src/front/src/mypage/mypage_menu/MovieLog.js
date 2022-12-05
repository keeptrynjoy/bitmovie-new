import React, {useState} from 'react';
import moment from "moment/moment";
import usePagination from "../../service/UsePagination";
import {Pagination} from "@mui/material";
import {useNavigate} from "react-router-dom";

function MovieLog(props) {
    const list = props.movie_log;
    const navi = useNavigate();
    let [page, setPage] = useState(1);
    const PER_PAGE = 3;


    console.log(list);
    const count = Math.ceil(list.length / PER_PAGE);
    const _DATA = usePagination(list, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div className={"movie-log"}>
            <div className={"mypage-contents-title"}>
                무비로그
            </div>
            <ul className={"movie-log-list"}>
                {
                    list && _DATA.currentData().map((item,i)=>(
                            <li key={i}>
                                <div className={"article-movie-info"}>
                                    <div className={"box-image"}>
                                        <span className={"thumb-image"}>
                                            <img alt={""} src={`https://image.tmdb.org/t/p/w500${item.poster.split(",")[0]}`}
                                                style={{cursor:"pointer"}} onClick={()=>{
                                                    navi(`/movie/detail/${item.movie_pk}`);
                                            }}/>
                                        </span>
                                    </div>
                                    <div className={"box-contents"}>
                                        <div className={"movie-title"}>
                                            <div className={"movie-title-kr"}>{item.title}</div>
                                            <div className={"movie-title-en"}><p>{item.engtitle}</p></div>
                                        </div>
                                        <div className={"movie-date"}>
                                            {moment(item.date).format("YYYY-MM-DD")} {item.begin.substring(0, item.begin.length - 3)} ~ {item.endtime.substring(0, item.endtime.length - 3)}
                                        </div>
                                        <div className={"movie-theater"}>
                                            {item.theater} {item.screen} / 성인: {item.adult}명, 청소년: {item.youth}명
                                        </div>
                                        {/*<div className={"movie-comment"}>*/}
                                        {/*    이 영화를 평가 해주세요~*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </li>
                        )
                    )
                }
            </ul>
            <div className={"table-pagination"}>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default MovieLog;