import React, {useState} from 'react';
import "./MovieList.css"
import {useNavigate} from "react-router-dom";

function MovieList(props) {
    const navi = useNavigate();


    const [mlist, setMlist] = useState([
        {
            movie_num:1,
            text:"조커"
        },
        {

            movie_num:2,
            text:"어벤져스"
        },
        {
            movie_num:3,
            text:"토르"
        },
        {
            movie_num:4,
            text:"헐크"
        },
        {
            movie_num:5,
            text:"아이언맨"
        },
        {
            movie_num:6,
            text:"타노스"
        },
        {
            movie_num:7,
            text:"그루트"
        },
        {
            movie_num:8,
            text:"스파이더맨"
        }
    ]);






    return (
        <div>
            <div className={'mlistall'} >
                <button type={'button'} className={'mlist1'}>예매율</button>
                <button type={'button'} className={'mlist2'}>평점순</button>
            </div>
            <h1 style={{textAlign:'center', marginTop:'100px', marginBottom:'50px'}}>영화리스트</h1>
            <div className={'mplist'}>
                {mlist.map((list) => (
                    <div className={'onebt'}>
                        <div className={'mp1'} onClick={() => navi(`/movie/detail/${list.movie_num}`)}>{list.text}</div>
                        <button className={'snbt'} type={'button'}>예매하기</button>
                    </div>
                ))}


            </div>

        </div>
    );
}

export default MovieList;