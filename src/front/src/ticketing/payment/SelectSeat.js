import React, {useState} from 'react';
import "./SelectSeat.css";
import {useNavigate} from "react-router-dom";

function SelectSeat(props) {

    const [seats, setSeats] = useState(Array.from({ length: 8 }));
    const [rowseats, setRowseats] = useState(Array.from({length:10}));
//좌석선택
//
//     const infoContainer = document.querySelector('#info-container');
//     const infoSelectedMovie = document.querySelector('#selected-movie');
//     const infoSelectedSeats = document.querySelector('#selected-seats');
//     const seatContainer = document.querySelector('.seat-section');
//     const chair = document.querySelectorAll(".row .seat");
// //.row .seat : showcase에 있는 seat는 빼고 실제 좌석만 포함
//     const count = document.getElementById("count");
//     const total = document.getElementById("total");
//     const movieSelect = document.getElementById("movie");
//     let resetBtn = document.querySelector('#reset-btn');
//
//     writeSeatNumber();
//     populateUI();
//
//     let ticketPrice = +movieSelect.value; //+붙임으로써 number로 만들 수 있다.
//
// //Save selected movie index and price
//     const setMovieData = (movieIndex, moviePrice) => {
//         localStorage.setItem("selectedMovieIndex", movieIndex);
//         localStorage.setItem("selectedMoviePrice", moviePrice);
//     };
//
// //update total and count
//     const updateSelectedCount = () => {
//         const currentSelectedSeats = document.querySelectorAll(".row .seat.selected"); //현재 선택된 좌석이 nodeList 형태로 반환
//         const seatsIndex = [...currentSelectedSeats].map((seat) => [...seats].indexOf(seat)); //convert node List to normal array
//
//         localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //현재 페이지에서 선택된 좌석인덱스를 로컬스토리지에 저장
//
//         const selectedSeatsCount = currentSelectedSeats.length;
//
//         count.innerText = selectedSeatsCount;
//         total.innerText = ticketPrice * selectedSeatsCount;
//
//         populateUI(); //선택한 값 즉시 info-container에 반영
//     };
//
// //write seat's number
//     function writeSeatNumber() {
//         seats.forEach((e,i) => {
//             (i < 10) ? e.innerText = `0${i}` : e.innerText = i;
//         })
//     }
//
// // Get data(selected seats & movie info) from localstorage and populate UI
//     function populateUI() { //로드되자마자 함수실행을 위해 함수선언문으로 작성
//         const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //ls에 저장된 이미 선택된 좌석리스트
//
//         if (selectedSeats !== null && selectedSeats.length > 0) {
//             seats.forEach((seat, i) => {
//                 if (selectedSeats.indexOf(i) > -1) {//존재한다면,
//                     seat.classList.add("selected");
//                 }
//             });
//             infoSeatsText = selectedSeats; //object to text
//             infoSelectedSeats.innerText = infoSeatsText;
//         }
//         else { //없는 경우, info컨테이너 글씨 표시
//             infoSelectedSeats.innerText = '선택한 좌석이 없습니다.';
//         }
//
//         const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
//         if(selectedMovieIndex !== null) {
//             movieSelect.selectedIndex = selectedMovieIndex;
//             infoSelectedMovie.innerText = movieSelect[selectedMovieIndex].innerText;
//         }
//         else {
//             infoSelectedMovie.innerText = '선택한 영화가 없습니다.';
//         }
//     }
//
// //Movie select event
//     movieSelect.addEventListener("change", (e) => {
//         ticketPrice = +e.target.value;
//         // e.target.selectedIndex : <select>안의 <option>의 인덱스
//         setMovieData(e.target.selectedIndex, ticketPrice);
//         updateSelectedCount(); //영화정보에 변화가 생겼으므로
//     });
//
// // Seat click event
//     seatContainer.addEventListener("click", (e) => {
//         if (
//             e.target.classList.contains("seat") &&
//             !e.target.classList.contains("occupied")
//         ) {
//             e.target.classList.toggle("selected");
//
//             updateSelectedCount(); //seat의 정보에 변화가 생겼으므로 count에 변화주는 새로운 함수 실행
//         }
//     });
//
// //Reset button click event
//
//     resetBtn.addEventListener("click", () => {
//         //Alert for confirmaaion
//         const result = window.confirm('현재까지 선택한 예약정보를 리셋하시겠습니까?');
//         if(result){
//             // ls.clear()
//             alert('현재까지 선택한 예약정보가 사라집니다.');
//             localStorage.clear();
//             window.location.reload();
//         }
//     });
//
// //Initial count and total set
//     updateSelectedCount();
//
//     //다시선택 클릭 테스트용
//     //
//     //     function reloading(){
//     //     window.location.reload();
//     // }

    const navi = useNavigate();


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
                            <button className="seat2">0</button>
                            <button className="seat2">1</button>
                            <button className="seat2">2</button>
                            <button className="seat2">3</button>
                            <button className="seat2">4</button>
                            <button className="seat2">5</button>
                            <button className="seat2">6</button>
                            <button className="seat2">7</button>
                            <button className="seat2">8</button>
                        </article>
                        <article className="seat-section3">
                            <div className="seat3">청소년</div>
                            <button className="seat2">0</button>
                            <button className="seat2">1</button>
                            <button className="seat2">2</button>
                            <button className="seat2">3</button>
                            <button className="seat2">4</button>
                            <button className="seat2">5</button>
                            <button className="seat2">6</button>
                            <button className="seat2">7</button>
                            <button className="seat2">8</button>
                        </article>
                    </div>
                </article>

                <article className="seat-section">
                    <div className="screen"></div>
                    <div className={"seatboxes"}>
                        {
                            rowseats.map((list,i)=>(

                                <button className={"row"} key={i}>
                                    {seats.map((list,j) => (
                                        // <div className={"seat"+(i,j == seatActive ? " active" : "")} onClick={toggleActive} key={j} value={(i+1)+""+(j+1)} ></div>
                                        <button className={"seat"} key={j} value={(i+1)+""+(j+1)} ></button>
                                    ))}
                                </button>)
                            )
                        }
                    </div>

                </article>
            </main>

            <p className="text">
                선택된 좌석 수 : <span id="count">0</span> 최종 예매 금액 : <span id="total">0</span>
            </p>
            <div id={"btns"}>
                {/*<button id="reset-btn" onClick={reloading} >예매 다시하기</button>*/}
                <button id="reset-btn">예매 다시하기</button>
                <button id="reset-btn2" onClick={() => navi("/ticketing/payment")}>예매 완료하기</button>
            </div>

        </div>
    );
}

export default SelectSeat;