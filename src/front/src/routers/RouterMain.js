import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "../home/Header";
import Home from "../home/Home";
import Footer from "../home/Footer";
import MyPage from "../mypage/MyPage";
import LoginRouter from "./LoginRouter";
import MovieRouter from "./MovieRouter";
import SearchResult from "../search/SearchResult";
import TicketingRouter from "./TicketingRouter";
import SDial from "../home/SDial";

function RouterMain(props) {
    //자동 로그아웃
    //브라우저에서 움직임이 없을 때 세션 삭제
    const [timer, setTimer] = useState(1); //움직이지 않은 시간(분)
    //브라우저 로딩되면 실행
    useEffect(() => {
        //로그인 되어있을 때만 실행하는 조건
        if (sessionStorage.login_status != null) {
            //1분마다 timerIncrement 함수 실행
            setInterval(timerIncrement, 60000); //단위 1000분의 1초
            //마우스 움직임이 있으면 움직이지 않은 시간 초기화
            window.addEventListener("mousemove", function () {
                // console.log("mousemove");
                setTimer(1);
            });
            //키보드 움직임이 있으면 움직이지 않은 시간 초기화
            window.addEventListener("keypress", function () {
                // console.log("keypress");
                setTimer(1);
            });
        }
    });
    //움직이지 않은 시간 증가 || 로그아웃 시키는 함수
    const timerIncrement = () => {
        setTimer (timer + 1); //움직이지 않은 시간에 1을 더함
        if (timer > 19) { //움직이지 않은 시간이 20분이 넘으면
            //로그아웃 처리(세션 스토리지 삭제) 후 새로고침
            sessionStorage.removeItem("login_status");
            sessionStorage.removeItem("u_id");
            sessionStorage.removeItem("u_name");
            sessionStorage.removeItem("user_pk");
            sessionStorage.removeItem("u_passDateDiff");
            window.location.reload();
        }
    }
    //자동 로그아웃 끝

    return (
        <div>
            <Header/>
            <SDial/>
            <br style={{clear:"both"}}/><br/>
            <div className={"main-wrapper"}>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/mypage/:user_pk"} element={<MyPage/>}/>
                    <Route path={"/search/:search_word"} element={<SearchResult/>}/>
                    <Route path={"/login/*"} element={<LoginRouter/>}/>
                    <Route path={"/movie/*"} element={<MovieRouter/>}/>
                    <Route path={"/ticketing/*"} element={<TicketingRouter/>}/>
                    <Route path={"/*"} element={
                        <div>
                            <h1>404떳다</h1>
                        </div>
                    }/>
                </Routes>
            </div>
            <br style={{clear:"both"}}/><br/>
            <Footer/>
        </div>
    );
}

export default RouterMain;