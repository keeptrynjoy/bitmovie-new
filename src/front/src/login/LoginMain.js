import React from 'react';

function LoginMain(props) {
    return (
        <div>
            <h1>로그인</h1>
            <button type={"button"} onClick={()=>{
                sessionStorage.login_status="ok"
                window.location.reload();//새로고침
            }}>로그인하기</button>
        </div>
    );
}

export default LoginMain;