import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Login.css"
import {Button} from "@mui/material";


function LoginMain(props) {
    const [u_id, setU_id] = useState('');
    const [u_pass, setU_pass] = useState('');
    const navi = useNavigate();
    //로그인 버튼 누르면 호출되는 함수
    const onLoginEvent = (e) => {
        e.preventDefault();

        let url = localStorage.url + "/login/check";
        console.log("url: "+url);

        axios.post(url, {u_id, u_pass})
            .then(res => {
                if (res.data.yesOrNo === 1) {
                    sessionStorage.login_status = 'ok';
                    sessionStorage.u_id = u_id;
                    sessionStorage.u_name = res.data.u_name;
                    sessionStorage.u_pk = res.data.u_pk;
                    sessionStorage.pwUdtDate = res.data.pwUdtDate;

                    // if(res.data.pwUdtDate>90)
                    // {
                    //     if(window.confirm("비밀번호를 변경 한지 90일이 지났습니다. 변경 하시겠습니까?"))
                    //     {
                    //         navi("/login/find");
                    //     }else{
                    //         axios.post(localStorage.url + "/user/updatepassdate", {u_pk:res.data.u_pk})
                    //             .then()
                            navi("/");
                            window.location.reload();
                    //     }
                    // }
                } else {
                    alert("아이디 또는 비밀번호가 맞지 않습니다");
                    setU_id('');
                    setU_pass('');
                }
            })
    }

    return (
        <div className="login-div">
            <div className={"login-title"}>
                로그인
            </div>
            <div className={"login-box"}>
                <form onSubmit={onLoginEvent}>
                    <table className="table table-bordered login-table">
                        <tbody>
                        <tr>
                            <th style={{width: '100px', backgroundColor: '#ddd'}}>아이디</th>
                            <td>
                                <input type="text" className="form-control"
                                       placeholder="아이디" required autoFocus
                                       value={u_id} onChange={(e) => setU_id(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width: '100px', backgroundColor: '#ddd'}}>비밀번호</th>
                            <td>
                                <input type="password" className="form-control"
                                       required placeholder="비밀번호"
                                       value={u_pass} onChange={(e) => setU_pass(e.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Button type={"submit"} variant={"outlined"} color={"success"} style={{marginLeft:"20px"}}>로그인</Button>
                    <Button type={"button"} variant={"outlined"} color={"primary"} style={{marginLeft:"20px"}} onClick={()=>navi("/login/find")}>아이디/비밀번호 찾기</Button>
                    <Button type={"button"} variant={"outlined"} color={"secondary"} style={{marginLeft:"20px"}} onClick={()=>navi("/login/join")}>회원가입</Button>
                </form>
            </div>
        </div>
    );
}

export default LoginMain;