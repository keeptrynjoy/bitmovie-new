import React, {useState} from 'react';
import JoinEmail from "./JoinEmail";
import "./Join.css"
import JoinInfo from "./JoinInfo";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Join() {
    // 본인인증 하려다 만 쓰레기코드 11/9
    // function onClickCertification() {
    //     /* 1. 가맹점 식별하기 */
    //     const { IMP } = window;
    //     IMP.init('imp34153710');
    //
    //     /* 2. 본인인증 데이터 정의하기 */
    //     const data = {
    //         merchant_uid: `bitmovie_${new Date().getTime()}`,  // 주문번호
    //         company: 'bitmovie',                           // 회사명 또는 URL
    //         carrier: 'SKT',                              // 통신사
    //         name: '정지훈',                                // 이름
    //         phone: '01072729573',                        // 전화번호
    //     };
    //
    //     /* 4. 본인인증 창 호출하기 */
    //     IMP.certification(data, callback);
    // }
    //
    // /* 3. 콜백 함수 정의하기 */
    // function callback(response) {
    //     const {
    //         success,
    //         merchant_uid,
    //         error_msg,
    //     } = response;
    //
    //     if (success) {
    //         alert('본인인증 성공');
    //     } else {
    //         alert(`본인인증 실패: ${error_msg}`);
    //     }
    // }
    const [selected,setSelected]=useState("email");
    const [email, setEmail]=useState("");
    const navi=useNavigate();

    return (
        // <button onClick={onClickCertification}>본인인증 하기</button>
        <div className={"join-div"}>
            <div className={"title"}>
                회원가입
            </div>
            <div className={"join-box"}>
                <ul className={"join-indicator"}>
                    <li className={selected==="email"? "selected" : ""}>이메일 입력</li>
                    <li className={selected==="info"? "selected" : ""}>회원정보 입력</li>
                    <li className={selected==="done"? "selected" : ""}>가입 완료</li>
                </ul>
                {
                    selected==="email"?
                        <JoinEmail changeSelected={setSelected} email={email} setEmail={setEmail}/>
                        :
                        selected==="info"?
                            <JoinInfo changeSelected={setSelected} email={email}/>
                            :
                            <div>
                                <div className={"done-message"}>
                                    BitMovie 가입을 진심으로 축하 드립니다!!
                                </div>
                                <div style={{marginTop:"35px"}}>
                                    <Button type={"button"} variant={"outlined"} color={"success"} onClick={()=>navi("/login")}>로그인</Button>
                                    <Button type={"button"} variant={"outlined"} color={"secondary"} style={{marginLeft:"50px"}} onClick={()=>navi("/")}>홈페이지</Button>
                                </div>
                            </div>
                }
            </div>
        </div>
    );
}

export default Join;