import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "../home/Header";
import Home from "../home/Home";
import Footer from "../home/Footer";
import MyPage from "../mypage/MyPage";
import LoginRouter from "./LoginRouter";
import MovieRouter from "./MovieRouter";
import SearchResult from "../search/SearchResult";
import TicketingRouter from "./TicketingRouter";

function RouterMain(props) {
    return (
        <div>
            <Header/>
            <hr/>
            <br style={{clear:"both"}}/><br/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/mypage/:user_id"} element={<MyPage/>}/>
                <Route path={"/search/:search_word"} element={<SearchResult/>}/>
                <Route path={"/login/*"} element={<LoginRouter/>}/>
                <Route path={"/movie/*"} element={<MovieRouter/>}/>
                <Route path={"/ticketing/*"} element={<TicketingRouter/>}/>
                <Route path={"*"} element={
                    <div>
                        <h1>404떳다</h1>
                    </div>
                }/>
            </Routes>
            <hr/>
            <br style={{clear:"both"}}/><br/>
            <Footer/>
        </div>
    );
}

export default RouterMain;