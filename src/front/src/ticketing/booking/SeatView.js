import {json, useLocation, useNavigate} from "react-router-dom";

import './SelectSeat.css';
export default function SeatView({people, seats, rowSeats, onClickPeople,input ,setInput,changeData }) {

    const navi=useNavigate();
    const location = useLocation();
    const movieData= location.state.input;
    console.log('state',location.state);

    const reset=()=>{
        movieData('');
    }
    const obj = JSON.parse(movieData.movie);


    return (
        <div className={'seatchoose'}>
            <h1>좌석선택</h1>
            <br/>
            <section>
                <label>성인</label>&nbsp;
                <select>
                    <option disabled>0명</option>
                    <option value="a1">1명</option>
                    <option value="a2">2명</option>
                    <option value="a3">3명</option>
                    <option value="a4">4명</option>
                    <option value="a5">5명</option>
                    <option value="a6">6명</option>
                </select>
                &nbsp;
                <label>청소년</label>&nbsp;
                <select>
                    <option disabled>0명</option>
                    <option value="s1">1명</option>
                    <option value="s2">2명</option>
                    <option value="s3">3명</option>
                    <option value="s4">4명</option>
                    <option value="s5">5명</option>
                    <option value="s6">6명</option>
                </select>
            </section>
            <br/>

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
                        <b  style={{fontSize:'20px'}}>{obj.m_name}</b>
                            <br />
                            <p>상영관 {movieData.location}관</p>
                            <p>날짜 2022.11.{movieData.calender}일 </p>
                            <p>시간 {obj.m_runtime}분</p>
                            <p>인원</p>
                            <p>좌석</p>

                            <p id="selected-seats"></p>
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
                                        onClick={changeData}
                                    />
                                ))}
                            </button>
                        ))}
                    </div>
                </article>
            </main>


            <div id={'btns'}>
                <button id="reset-btn" onClick={reset}>예매 다시하기</button>
                <button id="reset-btn2" onClick={() => navi('/ticketing/payment')}>
                    예매 완료하기
                </button>
            </div>
        </div>
    );
}