import React, {useState} from 'react';
import {Button, Alert} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Swal from "sweetalert2";

function JoinInfo(props) {
    const changeSelected=props.changeSelected;
    const email=props.email;
    const [passwordtwo,setPasswordtwo]=useState("");
    const [boolpw2,setBoolpw2]=useState(false);

    //입력할 데이터폼
    const [input,setInput] = useState({
        u_id: props.email,
        u_pass:"",
        u_name: "",
        u_nick:"",
        u_phone:"",
        u_birth:"",
        u_gender:""
    })

    //onSubmit전에 null값 체크
    const onSubmitBtn=(e)=>{
        e.preventDefault();

        if(input.u_nick===""){
            Swal.fire({
                icon:"warning",
                text:"닉네임을 입력하세요"
            })
            return;
        }

        if(input.u_name===""){
            Swal.fire({
                icon:"warning",
                text:"이름을 입력하세요"
            })
            return;
        }

        if(input.u_pass===""){
            Swal.fire({
                icon:"warning",
                text:"비밀번호를 입력하세요"
            })
            return;
        }

        if(input.u_gender===""){
            Swal.fire({
                icon:"warning",
                text:"성별을 입력하세요"
            })
            return;
        }

        if(input.u_birth===""){
            Swal.fire({
                icon:"warning",
                text:"생일을 입력하세요"
            })
            return;
        }

        if(input.u_phone===""){
            Swal.fire({
                icon:"warning",
                text:"전화번호를 입력하세요"
            })
            return;
        }

        if(chkPW()!=="ok"){
            Swal.fire({
                icon:"warning",
                text:"비밀번호 형식이 맞지 않습니다"
            })
            return;
        };

        if(!boolpw2)
        {
            Swal.fire({
                icon:"warning",
                text:"비밀번호가 서로 다릅니다"
            })
            return;
        }

        const hppattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
        if(!hppattern.test(input.u_phone))
        {
            Swal.fire({
                icon:"warning",
                text:"전화번호는 -을 포함해 휴대전화 형식에 맞게 입력해주세요"
            })
            return;
        }
        
        let url = localStorage.url + "/user/insert";
        axios.post(url, input)
            .then(res => {
                Swal.fire({
                    icon:"success",
                    text:"가입성공"
                })
                changeSelected("done");
            })
    }

    const chkPW=()=>{
        const pw = input.u_pass;
        const id = input.u_id;

        const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        const hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if(input.u_pass === ""){
            return "no";
        }else if(false === reg.test(pw)) {
            // alert("비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.");
            return "reg"
        }else if(/(\w)\1\1\1/.test(pw)){
            // alert("같은 문자를 4번 이상 사용하실 수 없습니다.");
            return "4c";
        }else if(pw.search(id) > -1){
            // alert("비밀번호에 아이디가 포함되었습니다.");
            return "id";
        }else if(pw.search(/\s/) !== -1){
            // alert("비밀번호는 공백 없이 입력해주세요.");
            return "space";
        }else if(hangulcheck.test(pw)){
            // alert("비밀번호에 한글을 사용 할 수 없습니다.");
            return "hangul"
        }else {
            return "ok";
        }
    }

    const chkPW2=()=>{
        if(input.u_pass===passwordtwo){
            setBoolpw2(true)
        }else {
            setBoolpw2(false)
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

    return (
        <div className={"join-info"}>
            {
                chkPW()==="ok"?
                    <Alert className={"pass-error-msg"} severity={"success"}>
                        통과
                    </Alert>
                    :
                    <Alert className={"pass-error-msg"} severity={"error"}>
                        {
                            chkPW()==="reg"?
                                "비밀번호는 8자 이상이고, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다."
                                :
                                chkPW()==="4c"?
                                    "같은 문자를 4번 이상 사용하실 수 없습니다."
                                    :
                                    chkPW()==="id"?
                                        "비밀번호에 아이디가 포함되었습니다."
                                        :chkPW()==="space"?
                                            "비밀번호는 공백 없이 입력해주세요."
                                            :
                                            chkPW()==="hangul"?
                                                "비밀번호에 한글을 사용 할 수 없습니다."
                                                :
                                                chkPW()==="no"?
                                                    "비밀번호를 입력하세요"
                                                    :
                                                    ""
                        }
                    </Alert>
            }
            <form onSubmit={onSubmitBtn}>
                <table className='table table-bordered join-table' style={{width:'500px'}}>
                    <tbody>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>아이디(이메일)</th>
                        <td>
                            <input type={'text'} className='form-control' disabled value={email}
                                   name={"u_id"} style={{marginLeft:"20px",width:'300px'}}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>비밀번호</th>
                        <td>
                            <div className={"input-group"} style={{marginLeft:"20px",width:'330px'}} >
                                <input type={'password'} className={'form-control'}
                                       name={"u_pass"} value={input.u_pass} onChange={changeData} onKeyUp={chkPW2}/>
                                {
                                    chkPW()!=="ok"?
                                        <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                        :
                                        <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>비밀번호 확인</th>
                        <td>
                            <div className={"input-group"} style={{marginLeft:"20px",width:'330px'}} >
                                <input type={'password'} className={'form-control'}
                                       name={"passwordtwo"} value={passwordtwo} onChange={(e)=>setPasswordtwo(e.target.value)} onKeyUp={chkPW2}/>
                                {
                                    !boolpw2?
                                        <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                        :
                                        <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"7px"}}/>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr style={{width:"400px"}}>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>이름</th>
                        <td>
                            <input type={'text'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"u_name"} value={input.u_name} onChange={changeData}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>닉네임</th>
                        <td>
                            <input type={'text'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"u_nick"} value={input.u_nick} onChange={changeData}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>성별</th>
                        <td>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="u_gender"
                                value={input.u_gender}
                                onChange={changeData}
                                style={{display:"block"}}
                            >
                                <FormControlLabel value="male" control={<Radio/>} label="남자" />
                                <FormControlLabel value="female" control={<Radio/>} label="여자" />
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>생일</th>
                        <td>
                            <input type={'date'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"u_birth"} value={input.u_birth} onChange={changeData}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'130px',backgroundColor:'#ddd'}}>전화번호</th>
                        <td>
                            <input type={'text'} className={'form-control'} style={{marginLeft:"20px",width:'300px'}}
                                   name={"u_phone"} value={input.u_phone} onChange={changeData}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <Button type={"button"} variant={"outlined"} color={"error"}
                        onClick={()=>{
                            changeSelected("email")
                        }}>이전</Button>
                <Button type={"submit"} variant={"outlined"} color={"success"}
                        style={{marginLeft:"50px"}}>회원가입</Button>
            </form>
        </div>
    );
}

export default JoinInfo;