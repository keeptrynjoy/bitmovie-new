import {useNavigate} from "react-router-dom";

import './SelectSeat.css';
export default function SeatView({ MOVIES, people, seats, rowSeats, onClickPeople }) {

    const navi=useNavigate();

    return (
        <div className={'seatchoose'}>
            <h1>좌석선택</h1>
            <section className="movie-container">
                <label>Pick a movie</label>
                <select id="movie">
                    {MOVIES?.map(({ label, value }, index) => (
                        <option key={`${label}-${index}`} value={value}>
                            {label}
                        </option>
                    ))}
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
                    <div className={'seatposter'}></div>
                    <div className={'seattx'}>
                        <h2>선택된 영화</h2>
                        <section className="info-section">
                            <h3>영화 정보</h3>
                            <p id="selected-movie"></p>
                        </section>
                        <section className="info-section">
                            <h3>좌석 정보</h3>
                            <br />
                            <p>영화관</p>
                            <p>층수</p>
                            <p>상영시간 </p>
                            <p id="selected-seats"></p>
                        </section>
                    </div>
                    <div className={'moveall'}>
                        <article className="seat-section2">
                            <div className="seat3">성인</div>
                            {people?.ADULT?.array?.map(({ id, selected }) => (
                                <button
                                    key={`adult-${id}`}
                                    style={{ backgroundColor: selected ? 'red' : null }}
                                    className="seat2"
                                    onClick={() => onClickPeople(id, 'ADULT')}
                                >
                                    {id + 1}
                                </button>
                            ))}
                        </article>
                        <article className="seat-section3">
                            <div className="seat3">청소년</div>
                            {people?.CHILD?.array?.map(({ id, selected }) => (
                                <button
                                    key={`child-${id}`}
                                    style={{ backgroundColor: selected ? 'red' : null }}
                                    className="seat2"
                                    onClick={() => onClickPeople(id, 'CHILD')}
                                >
                                    {id + 1}
                                </button>
                            ))}
                        </article>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={'seatboxes'}>
                        {rowSeats.map((list, i) => (
                            <button className={'row'} key={i}>
                                {seats.map((list, j) => (
                                    <button
                                        style={{ backgroundColor: !list?.selected ? null : 'red' }}
                                        className={'seat'}
                                        key={j}
                                        value={i + 1 + '' + (j + 1)}
                                    />
                                ))}
                            </button>
                        ))}
                    </div>
                </article>
            </main>

            <p className="text">
                선택된 좌석 수 : <span id="count">0</span> 최종 예매 금액 : <span id="total">0</span>
            </p>
            <div id={'btns'}>
                <button id="reset-btn">예매 다시하기</button>
                <button id="reset-btn2" onClick={() => navi('/ticketing/payment')}>
                    예매 완료하기
                </button>
            </div>
        </div>
    );
}