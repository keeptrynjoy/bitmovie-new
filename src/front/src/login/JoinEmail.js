import React, {useState} from 'react';
import {Button} from "@mui/material";
import axios from "axios";

function JoinEmail(props) {
    const email = props.email;
    const setEmail = props.setEmail; //Join component 에서 넘어오는 함수
    const changeSelected = props.changeSelected; //Join component 에서 넘어오는 함수
    const [validEmail,setValidEmail] = useState(false);
    const [checkMsg, setCheckMsg] = useState(''); //아이디 가능 여부 메시지

    //이메일 유효성 검사
    const validEmailCheck=(e)=>{
        //이메일 정규식
        const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!pattern.test(email)){
            setValidEmail(false);
        }else {
            setValidEmail(true);
        }
    }

    //아이디 중복 체크 버튼 함수
    const idCheckButton = () => {
        if(email===""){
            alert("[e-mail]을 입력해주세요");
            return;
        }
        if(!validEmail){
            alert("유효한 e-mail주소가 아닙니다");
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
        if (e.key === 'Enter') {
            idCheckButton();
        }
    }

    return (
        <div className={"join-email"}>
            <div className={"join-email-input"}>
                <label className={"label-email"} htmlFor={"email"}>
                    아이디(e-mail)
                    <input type={"email"} name={"memberId"} placeholder={"e-mail 주소를 입력해주세요"}
                           value={email} onKeyUp={validEmailCheck} onKeyPress={onKeyPress} onChange={(e) => setEmail(e.target.value)}/>
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