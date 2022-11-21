import {json, useLocation, useNavigate} from "react-router-dom";

import './SelectSeat.css';
import {useCallback, useState} from "react";
export default function SeatView({people, seats, rowSeats, onClickPeople,input ,setInput,changeData }) {

    const navi=useNavigate();
    const location = useLocation();
    const movieData= location.state.input;
    const [checkedArr, setCheckedArr] = useState([]);
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

        document.getElementById('result2').innerText=  e.target.value;

    }




    //체크박스

    // const [checkedInputs, setCheckedInputs] = useState([]);
    //
    // const changeHandler = (checked, checkings) => {
    //     if (checked) {
    //         setCheckedInputs([...checkedInputs, checkings]);
    //     } else {
    //         // 체크 해제
    //         setCheckedInputs(checkedInputs.filter((el) => el !== checkings));
    //     }
    // };
    //











    // const CheckBox = () => {
    //     const [checkedList, setCheckedLists] = useState([]);


    // 개별 체크 클릭 시 발생하는 함수
//     const onCheckedElement = useCallback(
//         (checked, list) => {
//             if (checked) {
//                 setCheckedLists([...checkedList, list]);
//             }else {
//                 setCheckedLists(checkedList.filter((el) => el !== list));
//             }
//         },
//         [checkedList]
//     );
// };


        // const value=e.value;
        //
        // document.getElementsByClassName('result3').innerText=  e.target.value;
        //



    //
    //     console.log(e.target.value);
    //     if (e.target.value!==0) {
    //         document.getElementById('result3').innerText = e.target.value;
    //     }
    //
    // }
    //














    return (
        <div className={'seatchoose'}>
            <h1>인원 및 좌석선택</h1>
            <br/>
            <section>
                <label>성인</label>&nbsp;
                <select name={'adult'} onChange={handleOnchangePerson}>
                    <option value={0} selected>0명</option>
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
                    <option value={0} selected>0명</option>
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
                            <p><b style={{fontSize:'20px'}}>인원</b> <span id={'result'}></span>&nbsp;<span id={'result2'}></span></p>
                            <p><b style={{fontSize:'20px'}}>좌석</b> <span id={checkedArr}></span> </p>

                            <p id="selected-seats"></p>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={'seatboxes'}>
                        {rowSeats.map((list, i) => (
                            <li className={'row'} key={i} >
                                {seats.map((list,i) => (
                                // {seats.map((list, j) => (
                                    <input type={"checkbox"}
                                        className={'seat'}
                                        key={i}
                                        // value={i + 1 + '' + (j + 1)}
                                        value={i+1}
                                           // onChange={(
                                           //
                                           // )=>{
                                           //     changeHandler(e.currentTarget.checked, checkings)
                                           // }}
                                           // checked={checkedInputs.includes(checkings) ? true : false}

                                />
                                ))}
                            </li>
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