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

    const handleOnchangePerson=(e)=>{

        const value= e.value;

        document.getElementById('result').innerText=e.target.value;

    }

    const handleOnchangePerson2=(e)=>{

        const value= e.value;

        document.getElementById('result2').innerText= ","+ e.target.value;

    }


    return (
        <div className={'seatchoose'}>
            <h1>인원 및 좌석선택</h1>
            <br/>
            <section>
                <label>성인</label>&nbsp;
                <select name={'adult'} onChange={handleOnchangePerson}>
                    <option disabled>0명</option>
                    <option value="성인1명">1명</option>
                    <option value="성인2명">2명</option>
                    <option value="성인3명">3명</option>
                    <option value="성인4명">4명</option>
                    <option value="성인5명">5명</option>
                    <option value="성인6명">6명</option>
                </select>
                &nbsp;
                <label>청소년</label>&nbsp;
                <select name={'child'} onChange={handleOnchangePerson2}>
                    <option disabled>0명</option>
                    <option value="청소년1명">1명</option>
                    <option value="청소년2명">2명</option>
                    <option value="청소년3명">3명</option>
                    <option value="청소년4명">4명</option>
                    <option value="청소년5명">5명</option>
                    <option value="청소년6명">6명</option>
                </select>
            </section>
            <br/>

            <ul className="showcase">
                <li>
                    <div className="seat okay"></div>
                    <small>선택가능</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>선택불가</small>
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
                        <p style={{fontSize:'30px'}}>{obj.m_name}</p>
                        <p><b style={{fontSize:'20px'}}>상영관</b> {movieData.location}관</p>
                            <p><b style={{fontSize:'20px'}}>날짜</b> 2022.11.{movieData.calender}일 </p>
                            <p><b style={{fontSize:'20px'}}>시간</b> {obj.m_runtime}분</p>
                            <p><b style={{fontSize:'20px'}}>인원</b> <span id={'result'}></span><span id={'result2'}></span></p>
                            <p><b style={{fontSize:'20px'}}>좌석</b></p>

                            <p id="selected-seats"></p>
                    </div>
                    {/*<div className={'moveall'}>*/}
                        {/*<article className="seat-section2">*/}
                        {/*    <div className="seat3">성인</div>*/}
                        {/*    {people?.ADULT?.array?.map(({ id, selected }) => (*/}
                        {/*       <button*/}
                        {/*            key={`adult-${id}`}*/}
                        {/*            style={{ backgroundColor: selected ? 'red' : null }}*/}
                        {/*            className="seat2"*/}
                        {/*            onClick={() => onClickPeople(id, 'ADULT')}*/}
                        {/*        >*/}
                        {/*            {id + 1}*/}
                        {/*        </button>*/}
                        {/*    ))}*/}
                        {/*</article>*/}
                        {/*<article className="seat-section3">*/}
                        {/*    <div className="seat3">청소년</div>*/}
                        {/*    {people?.CHILD?.array?.map(({ id, selected }) => (*/}
                        {/*        <button*/}
                        {/*            key={`child-${id}`}*/}
                        {/*            style={{ backgroundColor: selected ? 'red' : null }}*/}
                        {/*            className="seat2"*/}
                        {/*            onClick={() => onClickPeople(id, 'CHILD')}*/}
                        {/*        >*/}
                        {/*            {id + 1}*/}
                        {/*        </button>*/}
                        {/*    ))}*/}
                        {/*</article>*/}
                    {/*</div>*/}
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