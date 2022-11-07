import React from 'react';
import {Route, Routes} from "react-router-dom";
import FindAccount from "../login/FindAccount";
import LoginMain from "../login/LoginMain";

function LoginRouter(props) {
    return (
        <div>
            <Routes>
                <Route path={"find"} element={<FindAccount/>}/>
                <Route path={"main"} element={<LoginMain/>}/>
                <Route path={"*"} element={
                    <div>
                        <h1>404떳다</h1>
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default LoginRouter;