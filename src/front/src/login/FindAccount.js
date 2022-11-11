import React, {useState} from 'react';
import axios from "axios";

function FindAccount(props) {
    //아이디 별표로 나온다고 문구 띄우기
    const [findIdInput,setFindIdInput]=useState("");

    const findIdSubmit=(e)=>{
        e.preventDefault();
        const findIdUrl = localStorage.url + "/user/findid?u_phone=" + findIdInput;
        axios.get(findIdUrl)
            .then((res)=>{
                alert(res.data);
            })
    }

    const findPwsubmit=(e)=>{
        e.preventDefault();

    }


    return (
        <div>
            <form onSubmit={findIdSubmit}>
                <h1>아이디 찾기</h1>
                <input type={"text"} name={"find-id-hp"} placeholder={"전화번호를 입력하세요"} onChange={(e)=>setFindIdInput(e.target.value)}/>
                <br/>
                <button type={"submit"}>아이디찾기</button>
            </form>
            <form onSubmit={findPwsubmit}>
                <h1>비번 찾기</h1>
                <input type={"text"} name={"find-pw-id"} placeholder={"아이디를 입력하세요"}/>
                <br/>
                <input type={"text"} name={"find-pw-hp"} placeholder={"전화번호를 입력하세요"}/>
                <br/>
                <button type={"submit"}>비밀번호찾기</button>
            </form>
        </div>
    );
}

export default FindAccount;