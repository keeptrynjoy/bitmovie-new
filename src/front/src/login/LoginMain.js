
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Login.css"
import {Button} from "@mui/material";
import Swal from "sweetalert2";


function LoginMain(props) {
    const [u_id, setU_id] = useState('');
    const [u_pass, setU_pass] = useState('');
    const navi = useNavigate();
    //로그인 버튼 누르면 호출되는 함수
    const onLoginEvent =(e)=> {
        e.preventDefault();

        let url = localStorage.url + "/login/check";
        axios.post(url, {u_id, u_pass})
            .then(res => {
                if (res.data.loginOk === 1) {
                    sessionStorage.login_status = 'ok';
                    sessionStorage.u_id = u_id;
                    sessionStorage.u_name = res.data.u_name;
                    sessionStorage.u_passDateDiff = res.data.u_passDateDiff;
                    sessionStorage.user_pk = res.data.user_pk;

                    if(res.data.u_passDateDiff>30)
                    {
                        // Swal.fire({
                        //     title: '비밀번호를 변경 한지 30일이 지났습니다.',
                        //     text: "보안을 위해 변경해주세요",
                        //     icon: 'warning',
                        //     showCancelButton: true,
                        //     confirmButtonColor: '#3085d6',
                        //     cancelButtonColor: '#d33',
                        //     confirmButtonText: '네',
                        //     cancelButtonText:'다음에 변경 할게요'
                        // }).then((result) => {
                        //     if (result.isConfirmed) {
                        //         navi("/login/find");
                        //     }else{
                        //         const upurl = localStorage.url + "/login/updatepassdate?u_id=" + u_id;
                        //         axios.get(upurl)
                        //             .then((res)=>{
                        //                 Swal.fire({
                        //                     icon: "info",
                        //                     text: "한달 뒤에 다시 물어볼께영"
                        //                 });
                        //             });
                        //     }
                        // })
                        if(window.confirm("비밀번호를 변경 한지 30일이 지났습니다. 변경 하시겠습니까? (취소하면 30일 연장됩니다.)"))
                        {
                            navi("/login/find");
                            return;
                        }else{
                            const upurl = localStorage.url + "/login/updatepassdate?u_id=" + u_id;
                            axios.get(upurl)
                                .then((res)=>{
                                    Swal.fire({
                                        icon: "info",
                                        text: "한달 뒤에 다시 물어볼께영"
                                    }).then((res)=>{
                                        navi("/")
                                    });
                                });
                            return;
                        }
                    }
                    Swal.fire({
                        icon:"success",
                        text:"로그인 성공!"
                    }).then((res)=>{
                        navi("/");
                        window.location.reload();
                    })
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: "아이디 또는 비밀번호가 맞지 않습니다"
                    });
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
                                <input type="text" className="form-control" autoComplete={"username"}
                                       placeholder="아이디" required autoFocus
                                       value={u_id} onChange={(e) => setU_id(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width: '100px', backgroundColor: '#ddd'}}>비밀번호</th>
                            <td>
                                <input type="password" className="form-control" autoComplete={"current-password"}
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