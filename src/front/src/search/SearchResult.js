import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./Search.css"
import Age from "../service/Age";
import usePagination from "../service/UsePagination";
import {Pagination} from "@mui/material";
import nodata from "../image/nodata.png"

function SearchResult(props) {
    const p=useParams();
    const navi=useNavigate();
    const [sResult,setSResult]=useState([]);
    const [movie_list,setMovie_list]=useState([]);
    const [people_list,setpeople_list]=useState([]);

    //영화 페이징
    let [mpage, setMpage] = useState(1);
    const MPER_PAGE = 8;
    const Mcount = Math.ceil(movie_list.length / MPER_PAGE);
    const _MDATA = usePagination(movie_list, MPER_PAGE);
    const MhandleChange = (e, p) => {
        setMpage(p);
        _MDATA.jump(p);
    };

    //인물 페이징
    let [ppage, setPpage] = useState(1);
    const PPER_PAGE = 4;
    const Pcount = Math.ceil(people_list.length / PPER_PAGE);
    const _PDATA = usePagination(people_list, PPER_PAGE);
    const PhandleChange = (e, p) => {
        setPpage(p);
        _PDATA.jump(p);
    };

    const search=(search_word)=>{
        axios.get(`${localStorage.url}/main/search?search=${search_word}`)
            .then((res)=>{
                setSResult(res.data);
                setpeople_list(res.data.people_list);
                setMovie_list(res.data.movie_list);
                console.log(res.data);
            })
    }

    useEffect(() => {
        search(p.search_word);
    }, []);

    return (
        <div className={"search-div"}>
            {sResult &&
                (
                    (movie_list.length===0&&people_list.length===0)?
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <img alt={"nodata"} src={nodata}/>
                        </div>
                        :
                        <div>
                            {movie_list &&
                                <div className={"movie-result"}>
                                    <h1>영화 검색 결과 {movie_list.length}건</h1>
                                    <div className={"results"}>
                                        {_MDATA.currentData().map((movie,i)=>(
                                            <div key={i} className={"result-card"}
                                                 onClick={()=>{navi(`/movie/detail/${movie.movie_pk}`)}}>
                                                <img className={"result-poster"} alt={movie.m_name}
                                                     src={`https://image.tmdb.org/t/p/w500${movie.m_photo.split(",")[0]}`}/>
                                                <div className={"result-text"}>
                                                    <Age age={movie.m_age_grd} size={30}/><span className={"result-text-mname"}>{movie.m_name}</span>
                                                    <span>개봉일 : {movie.m_sdate}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <div className={"table-pagination"}>
                                <Pagination
                                    count={Mcount}
                                    size="large"
                                    page={mpage}
                                    onChange={MhandleChange}
                                />
                            </div>
                            <hr style={{width:"90%"}}/>
                            {people_list &&
                                <div className={"people-result"}>
                                    <h1>인물 검색 결과 {people_list.length}건</h1>
                                    <div className={"results"}>
                                        {_PDATA.currentData().map((people,i)=>(
                                            <div key={i} className={"result-card"}>
                                                <img className={"result-poster"} alt={people.per_name}
                                                     src={`https://image.tmdb.org/t/p/w500${people.per_photo.split(",")[0]}`}/>
                                                <div className={"result-text-pername"}>
                                                    {people.per_name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <div className={"table-pagination"}>
                                <Pagination
                                    count={Pcount}
                                    size="large"
                                    page={ppage}
                                    onChange={PhandleChange}
                                />
                            </div>
                        </div>
                )
            }
        </div>
    );
}

export default SearchResult;