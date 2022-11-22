import {json, useLocation, useNavigate} from "react-router-dom";

import './SelectSeat.css';
import {useCallback, useEffect, useState} from "react";
import Swal from "sweetalert2";
export default function SeatView({people, seats, rowSeats, onClickPeople,input ,setInput,changeData }) {

    const navi=useNavigate();
    const location = useLocation();
    const movieData= location.state.input;
    const [totalp, setTotalp] =useState(0);
    const [selected_seat, setSelected_seat]=useState([]);
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    console.log('state확인용',location.state);

    const reset=()=>{
        window.location.reload();
    }
    const gone =()=> {
        navi('/ticketing/payment',{
            state:{
                input:input
            },
        });
    }


    // navi("/ticketing/selectseat", {
    //     state: {
    //         input: input
    //     },
    //
    // });



const obj = JSON.parse(movieData.movie);
const obj2 = JSON.parse(movieData.location);




    console.log("현재개수" + totalp);
        const handleOnchangePerson = (e) => {

            const value = e.value;

            document.getElementById('result').innerText = e.target.value;
            setTotalp(parseInt(e.target.value) + parseInt(document.getElementById('student_select').value));

        }


        const handleOnchangePerson2 = (e) => {
            const value = e.value;

            document.getElementById('result2').innerText = e.target.value;
            setTotalp(parseInt(e.target.value) + parseInt(document.getElementById('adult_select').value));

        }




 const [tg,setTg]= useState(null);
    console.log("체크용"+[...selected_seat]);

    console.log(selected_seat);

        const changeHandler = (e) => {



            setTg(e.target);
            if (e.target.checked) {
                setSelected_seat([...selected_seat, e.target.value]);
            } else {
                // 체크 해제
                setSelected_seat(selected_seat.filter((a) => a !== e.target.value));
            }

        };

    useEffect(()=>{


        if (selected_seat.length > totalp) {
            Swal.fire({
                icon: "warning",
                text: "인원 확인 부탁드립니다"
            })
                tg.checked=false;
                    console.log(1);
                    setSelected_seat([
                        ...selected_seat.slice(0,selected_seat.length-1)
                    ])
        }
    },[selected_seat]);

    return (
        <div className={'seatchoose'}>
            <h1>인원 및 좌석선택</h1>
            <section>
                <label>성인</label>&nbsp;
                <select name={'adult'} id={"adult_select"} defaultValue={0} onChange={handleOnchangePerson}>
                    <option value="0">0명</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명</option>
                    <option value="6">6명</option>
                </select>
                &nbsp;
                <label>청소년</label>&nbsp;
                <select name={'child'} id={"student_select"} defaultValue={0} onChange={handleOnchangePerson2}>
                    <option value="0">0명</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명</option>
                    <option value="6">6명</option>
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
            <main className={'allboxes'}>
                <article id="info-container">
                    <img alt={obj.m_name} src={`https://image.tmdb.org/t/p/w500${obj.m_photo}`} className={'seatposter'}/>
                    <div className={'seattx'}>
                        <p style={{fontSize:'20px'}}><b>상영 영화</b> {obj.m_name} (<span style={{fontStyle:'italic'}}>{obj.m_enname} </span> )</p>
                        <p><b style={{fontSize:'20px'}}>상영 지점</b> {obj2.the_name}</p>
                            <p><b style={{fontSize:'20px'}}>예매 날짜</b> {movieData.calender}</p>
                            <p><b style={{fontSize:'20px'}}>러닝 타임</b> {obj.m_runtime}분</p>
                            <p><b style={{fontSize:'20px'}}>상영 시간</b> {movieData.time}타임</p>
                            <p><b style={{fontSize:'20px'}}>선택 인원</b> 성인 :  <span id={'result'}></span>&nbsp;청소년 : <span id={'result2'}></span></p>
                            <p><b style={{fontSize:'20px'}}>선택 좌석</b> <span id={'result3'}>{[...selected_seat.join(",")]}</span> </p>
                            <p id="selected-seats"></p>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={'seatboxes'}>
                        {rowSeats.map((list, i) => (
                            <li className={'row'} key={i} >
                                {seats.map((list,j) => (
                                    <input type={"checkbox"}
                                    className={'seat'}
                                    key={j}
                                    value={alphabet[i].toUpperCase()+(j+1).toString()}
                                           name={'seat'} id={"seat_select"}
                                           onChange = {changeHandler}
                                    />

                                ))}
                            </li>
                        ))}
                    </div>
                </article>
            </main>


            <div id={'btns'}>
                <button id="reset-btn" onClick={reset}>예매 다시하기</button>
                <button id="reset-btn2" onClick={gone}>예매 완료하기</button>
            </div>
        </div>
    );
}