import React from 'react';
import {Button} from "@mui/material";

function JoinEmail(props) {
    const email=props.email;
    const setEmail=props.setEmail;
    const changeSelected=props.changeSelected;

    return (
        <div className={"join-email"}>
            <div className={"join-email-input"}>
                <label className={"label-email"} htmlFor={"email"}>
                    아이디(이메일)
                    <input type={"email"} name={"memberId"} placeholder={"이메일 주소를 입력해주세요"}
                           value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>
            </div>
            <Button variant="outlined" color={"success"} onClick={()=>{
                changeSelected("info");
            }}>가입 하기</Button>
            <hr/>
        </div>
    );
}

export default JoinEmail;