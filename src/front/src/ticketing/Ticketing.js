import React from 'react';
import "./Ticketing.css";

function Ticketing(props) {
    return (
        <div>
            <div className={'tkbt'}>
            <button className={'tkmenu'}>상영시간표</button>
            <button className={'tkmenu2'}>예매 다시하기</button>
            </div>
            <div className={'tktable'}>
                <div className={'selectmv'}>


                </div>
                <div className={'selectday'}>날짜</div>
                <div className={'selecttime'}>시간</div>

                <button type={"button"} className={'selectseat'}>좌석선택</button>

            </div>

        </div>
    );
}

export default Ticketing;