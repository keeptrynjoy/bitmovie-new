import React, {useState} from 'react';
import {Button} from "@mui/material";
import axios from "axios";

function JoinEmail(props) {
    const email = props.email;
    const setEmail = props.setEmail; //Join component 에서 넘어오는 함수
    const changeSelected = props.changeSelected; //Join component 에서 넘어오는 함수

    const [checkMsg, setCheckMsg] = useState(''); //아이디 가능 여부 메시지

    //아이디 중복 체크 버튼 함수
    const idCheckButton = () => {
        if(email===""){
            alert("[e-mail]을 입력해주세요");
            return;
        }
        let url = localStorage.url + "/user/idcheck?u_id=" + email;
        axios.get(url)
            .then(res => {
                if (res.data===0 ){
                    changeSelected("info");
                } else {
                    setCheckMsg("가입불가");
                }
            });
    }

    //엔터 누르면 버튼 이벤트 작동
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            idCheckButton();
        }
    }

    return (
        <div className={"join-email"}>
            <div className={"join-email-input"}>
                <label className={"label-email"} htmlFor={"email"}>
                    아이디(e-mail)
                    <input type={"email"} name={"memberId"} placeholder={"e-mail 주소를 입력해주세요"}
                           value={email} onKeyPress={onKeyPress} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <span>{checkMsg}</span>
            </div>
            <Button variant="outlined" color={"success"} onClick={()=>{
                idCheckButton();
            }}>가입 하기</Button>
            <hr/>
        </div>
    );
}

export default JoinEmail;