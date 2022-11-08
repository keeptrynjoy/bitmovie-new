import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";


function LoginMain(props) {
    const [u_id, setU_id] = useState('');
    const [u_pass, setU_pass] = useState('');
    const navi = useNavigate();

    const onLoginEvent = (e) => {
        e.preventDefault();

        let url = localStorage.url + "/login/check";
        console.log("url: "+url);

        axios.post(url, {u_id, u_pass})
            .then(res => {

                console.log(res.data.yesOrNo);
                console.log(res.data.u_id);

                if (res.data.yesOrNo === 1) {
                    sessionStorage.login_status = 'ok';
                    sessionStorage.u_id = u_id;
                    sessionStorage.u_name = res.data.u_name;
                    navi("/");
                    window.location.reload();
                } else {
                    alert("아이디 또는 비밀번호가 맞지 않습니다");
                    setU_id('');
                    setU_pass('');
                }
            })
    }

    return (
        <div>
            <div className="login-box">
                <form onSubmit={onLoginEvent}>
                    <table className="table table-bordered">
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
                        <tr>
                            <td colSpan={2} className="table-info" align="center">
                                <button type="submit" className="btn btn-default"
                                        style={{width: '150px'}}>회원로그인
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default LoginMain;