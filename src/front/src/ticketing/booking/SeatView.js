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
    const [checkedArr, setCheckedArr] = useState([]);
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    console.log('state',location.state);

    const reset=()=>{
        window.location.reload();
    }
    const obj = JSON.parse(movieData.movie);
    const obj2 = JSON.parse(movieData.location);

    //성인

    console.log("현재개수" + totalp);
        const handleOnchangePerson = (e) => {

            const value = e.value;

            document.getElementById('result').innerText = e.target.value;
            setTotalp(parseInt(e.target.value) + parseInt(document.getElementById('student_select').value));

        }

        //청소년
        const handleOnchangePerson2 = (e) => {
            const value = e.value;

            document.getElementById('result2').innerText = e.target.value;
            setTotalp(parseInt(e.target.value) + parseInt(document.getElementById('adult_select').value));

        }




    //체크박스

    // const [checkedInputs, setCheckedInputs] = useState([]);
    //


 const [tg,setTg]= useState(null);


    console.log(selected_seat);

        const changeHandler = (e) => {


            // if (selected_seat.length >= totalp) {
            //     Swal.fire({
            //         icon: "warning",
            //         text: "안돼"
            //     })
            //     e.target.checked = false;
            //
            //
            //     // setSelected_seat(selected_seat.filter((a) => a !== e.target.value));
            //     // e.target.checked(false);
            // }
            // }else if (selected_seat.length)

            setTg(e.target);
            if (e.target.checked) {
                setSelected_seat([...selected_seat, e.target.value]);
            } else {
                // 체크 해제
                setSelected_seat(selected_seat.filter((a) => a !== e.target.value));
            }

        };

    useEffect(()=>{

        if (selected_seat.length > totalp && selected_seat.length!=0) {
            Swal.fire({
                icon: "warning",
                text: "안돼"
            })
                tg.checked=false;
            // selected_seat.slice((a) => a !== e.target.value);
                    console.log(1);
                    setSelected_seat([
                        ...selected_seat.slice(0,selected_seat.length-1)
                    ])
            // setSelected_seat(selected_seat.filter((a) => a !== e.target.value));
            // e.target.checked(false);
        }
    },[selected_seat]);










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
                        <p style={{fontSize:'25px'}}>{obj.m_name}</p>
                        <p><b style={{fontSize:'20px'}}>상영관</b> {obj2.the_name} 관</p>
                            <p><b style={{fontSize:'20px'}}>날짜</b> 2022.11.{movieData.calender}일 </p>
                            <p><b style={{fontSize:'20px'}}>시간</b> {obj.m_runtime}분</p>
                            <p><b style={{fontSize:'20px'}}>인원</b> 성인 :  <span id={'result'}></span>&nbsp;청소년 : <span id={'result2'}></span></p>
                            <p><b style={{fontSize:'20px'}}>좌석</b> <span id={checkedArr}></span> </p>
                            <p id="selected-seats"></p>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={'seatboxes'}>
                        {rowSeats.map((list, i) => (
                            <li className={'row'} key={i} >
                                {seats.map((list,j) => (
                                // {seats.map((list, j) => (
                                    <input type={"checkbox"}
                                    className={'seat'}
                                    key={j}
                                    // value={i + 1 + '' + (j + 1)}
                                    value={alphabet[i].toUpperCase()+(j+1).toString()}
                                    // onChange={(
                                    //
                                    // )=>{
                                    //     changeHandler(e.currentTarget.checked, checkings)
                                    // }}
                                    //  checked={selected_seat.includes(this.value)}
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
                <button id="reset-btn2" onClick={() => navi('/ticketing/payment')}>
                    예매 완료하기
                </button>
            </div>
        </div>
    );
}