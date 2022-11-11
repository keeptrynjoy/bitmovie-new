import React, {useState} from 'react';
import "./Ticketing.css";
import {useNavigate} from "react-router-dom";
import dateFns from "url";
import Calender from "./Calender";

function Ticketing(props) {
    const navi = useNavigate();

    const [mvlist,setMvlist] = useState(Array.from({ length: 80 }));
    const index = () => {
        return <div>{dateFns.format(new Date(), "yyyy-MM-dd")}</div>;
    };
    return (
        <div>
            <div className={'tkbt'}>
            <button className={'tkmenu'}>상영시간표</button>
            <button className={'tkmenu2'}>예매 다시하기</button>
            </div>
            <div className={'tktable'}>
                <div className={'selectmv'}>
                    {mvlist.map((list,i) => (
                        <div key={i}>DB에서 넘어올 영화리스트</div>
                    ))}
                </div>
                <div className={'selectday'}><Calender/></div>

                <div className={'selecttime'}></div>

                <button type={"button"} className={'selectseat'} onClick={() => navi("/ticketing/selectseat")} >좌석선택</button>

            </div>

        </div>
    );
}

export default Ticketing;