import React, {useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

function FindAccount(props) {
    //아이디 별표로 나온다고 문구 띄우기
    const [findIdInput,setFindIdInput]=useState("");
    const [findPwInputId,setFindPwInputId]=useState("");
    const [findPwInputHp,setFindPwInputHp]=useState("");
    const [boolhp,setBoolhp]=useState(false);
    //입력할 데이터폼
    const [input,setInput] = useState({
        checkSMS:"",
        randomNum:"0"
    })

    const findIdSubmit=(e)=>{
        e.preventDefault();
        const findIdUrl = localStorage.url + "/user/findid?u_phone=" + findIdInput;
        axios.get(findIdUrl)
            .then((res)=>{
                Swal.fire({
                    icon:"info",
                    text:`아이디 : ${res.data}`
                })
            })
    }

    const findPwSubmit=(e)=>{
        e.preventDefault();
        if(boolhp) {
            const findPwUrl = localStorage.url + "/user/findpass";
            axios.post(findPwUrl,{u_id:findPwInputId,u_phone:findPwInputHp})
                .then((res) => {
                    Swal.fire({
                        icon: "info",
                        text: `비밀번호 : ${res.data}`
                    })
                })
        }else{
            Swal.fire({
                icon:"warning",
                text:"본인인증을 진행해 주세요"
            })
        }
    }

    const changeData=(e)=>{
        let {name,value}=e.target;
        setInput({
                ...input, //기존의 inputs 객체 복사해서 넣음(펼침 연산자)
                [name]:value //name키에 입력값넣기
            }
        )
    }

    const sendSMS = () => {
        const hppattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
        if(!hppattern.test(findPwInputHp))
        {
            Swal.fire({
                icon:"warning",
                text:"전화번호는 \"-\" 을 포함해 휴대전화 형식에 맞게 입력해주세요"
            })
            return;
        }

        let url = localStorage.url + "/user/sendSMS?u_phone=" + findPwInputHp;
        axios.get(url)
            .then(res => {
                console.log("ph: "+res.data);
                input.randomNum = res.data;
                Swal.fire({
                    icon:"success",
                    text:"인증 번호 발송 완료!"
                })
            })
    }

    const checkSMS = () => {
        if (parseInt(input.randomNum) === parseInt(input.checkSMS)) {
            setBoolhp(true);
            Swal.fire({
                icon:"success",
                text:"휴대폰 인증이 정상적으로 완료되었습니다."
            })
        } else {
            Swal.fire({
                icon:"error",
                text:"인증번호가 올바르지 않습니다."
            })
        }
    }

    return (
        <div className={"find-div"}>
            <div className={"find-box"}>
                <div className={"find-id-box"}>
                    <form onSubmit={findIdSubmit}>
                        <h1>아이디 찾기</h1>
                        <input style={{marginTop:"10px"}} className={'form-control'} type={"text"} name={"find-id-hp"} placeholder={"전화번호를 입력하세요"} onChange={(e)=>setFindIdInput(e.target.value)}/>
                        <br/>
                        <Button style={{marginTop:"10px"}} color={"inherit"} variant={"contained"} type={"submit"}>아이디찾기</Button>
                    </form>
                </div>
                <form onSubmit={findPwSubmit}>
                    <h1>비번 찾기</h1>
                    <input style={{marginTop:"10px"}} className={'form-control'} type={"text"} name={"find-pw-id"}
                           placeholder={"아이디를 입력하세요"}
                           onChange={(e)=>setFindPwInputId(e.target.value)}/>
                    <br/>
                    <div style={{marginTop:"10px", display:"flex", height:"38px"}}>
                        <input style={{width:"230px"}} className={'form-control'} type={"text"} name={"find-pw-hp"} placeholder={"전화번호를 입력하세요"}
                               onChange={(e)=>setFindPwInputHp(e.target.value)}/>
                        <Button variant={"outlined"} color={"success"}
                                sx={{marginLeft:"30px"}}
                                onClick={() => {
                                    sendSMS();
                                }}>
                            전송
                        </Button>
                    </div>
                    <div style={{marginTop:"10px", display:"flex", height:"38px"}}>
                    <input type={'text'} className={'form-control'} placeholder={"인증번호를 입력하세요"}
                           name={"checkSMS"} value={input.checkSMS} onChange={changeData} style={{width:"230px"}}/>
                    <Button variant={"outlined"} color={"success"}
                            sx={{marginLeft:"30px"}}
                            onClick={() => {
                                checkSMS();
                            }}>
                        확인
                    </Button>
                    {
                        !boolhp?
                            <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                            :
                            <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                    }
                    </div>
                    <br/>
                    <Button style={{marginTop:"10px"}}  color={"inherit"} variant={"contained"} type={"submit"}>비밀번호찾기</Button>
                </form>
            </div>
        </div>
    );
}

export default FindAccount;