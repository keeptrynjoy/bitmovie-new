import React, {useState} from 'react';
import "./Ticketing.css";
import {useNavigate} from "react-router-dom";
import dateFns from "url";
import Calender from "./Calender";
import MovieList from "./MovieList";

function Ticketing(props) {
    const navi = useNavigate();

    const [mloc,setMloc] = useState(Array.from({length:5}));
    const index = () => {
        return <div>{dateFns.format(new Date(), "yyyy-MM-dd")}</div>;
    };
    return (

        <div className={'whole'}>

            <div className={'tktable'}>
                <div className={'tkbt'}>
                    <button className={'tkmenu'}>상영시간표</button>
                    <button className={'tkmenu2'}>초기화</button>
                </div>
                <div className={'together'}>
                <div className={'selectmv'}>
                    <MovieList/>
                </div>
                <div className={"movielocation"}>
                    {mloc.map((list,i)=>(
                        <div key={i} style={{fontSize:'15px'}}>DB에서 받을 극장리스트</div>
                    ))}
                </div>
                <div className={'selectday'}><Calender/></div>

                <div className={'selecttime'}></div>
                </div>
                <button type={"button"} className={'selectseat'} onClick={() => navi("/ticketing/selectseat")} >좌석선택</button>

            </div>




        </div>
    );
}

export default Ticketing;