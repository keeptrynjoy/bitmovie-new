import React, {useState} from 'react';
import "./SelectSeat.css";

function SelectSeat(props) {

    const [seats, setSeats] = useState(Array.from({ length: 8 }));
    const [rowseats, setRowseats] = useState(Array.from({length:10}));



    function reloading(){
        window.location.reload();
    }



    return (
        <div className={"seatchoose"}>
            <h1>좌석선택</h1>
            <section className="movie-container">
                <label>Pick a movie</label>
                <select id="movie">
                    <option value="10">어벤져스</option>
                    <option value="12">조커</option>
                    <option value="8">토르</option>
                    <option value="15">기생충</option>
                </select>
            </section>


            <ul className="showcase">
                <li>
                    <div className="seat okay"></div>
                    <small>예매가능</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>선택된좌석</small>
                </li>
                <li>
                    <div className="seat occupied"></div>
                    <small>예매완료</small>
                </li>
            </ul>
            <main>
                <article id="info-container">
                    <div className={"seatposter"}></div>
                    <div className={"seattx"}>
                    <h2>선택된 영화</h2>
                    <section className="info-section">
                        <h3>영화 정보</h3>
                        <p id="selected-movie"></p>
                    </section>
                    <section className="info-section">
                        <h3>좌석 정보</h3>
                        <br/>
                        <p>영화관</p>
                        <p>층수</p>
                        <p>상영시간 </p>
                        <p id="selected-seats"></p>
                    </section>
                    </div>
                    <div className={"moveall"}>
                    <article className="seat-section2">
                        <div className="seat3">성인</div>
                        <div className="seat2">0</div>
                        <div className="seat2">1</div>
                        <div className="seat2">2</div>
                        <div className="seat2">3</div>
                        <div className="seat2">4</div>
                        <div className="seat2">5</div>
                        <div className="seat2">6</div>
                        <div className="seat2">7</div>
                        <div className="seat2">8</div>
                    </article>
                    <article className="seat-section3">
                        <div className="seat3">청소년</div>
                        <div className="seat2">0</div>
                        <div className="seat2">1</div>
                        <div className="seat2">2</div>
                        <div className="seat2">3</div>
                        <div className="seat2">4</div>
                        <div className="seat2">5</div>
                        <div className="seat2">6</div>
                        <div className="seat2">7</div>
                        <div className="seat2">8</div>
                    </article>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={"seatboxes"}>
                    {
                        rowseats.map((list,i)=>(

                            <div className={"row"} key={i}>
                                {seats.map((list,i) => (
                                    <div className={"seat"} key={i}></div>
                                ))}
                            </div>)
                        )
                    }
                    </div>

                </article>
            </main>

            <p className="text">
                선택된 좌석 수 : <span id="count">0</span> 최종 예매 금액 : <span id="total">0</span>
            </p>
            <div id={"btns"}>
            <button id="reset-btn" onClick={reloading} >예매 다시하기</button>
            <button id="reset-btn2">예매 완료하기</button>
            </div>

        </div>
    );
}

export default SelectSeat;