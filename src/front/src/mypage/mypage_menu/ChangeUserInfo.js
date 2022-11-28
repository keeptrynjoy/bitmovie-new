import React, {useState} from 'react';
import {Button, ScopedCssBaseline, Alert} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

function ChangeUserInfo(props) {
    const [userdata,setUserdata] = useState(props.data);
    const [newpw2,setNewpw2] = useState(props.data.u_pass);
    const [boolpw2,setBoolpw2] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [oldPass, setOldPass] = useState(props.data.u_pass);

    const errorChk=()=> {
        const hppattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
        switch (chkPW()) {
            case "reg":
                return (<Alert severity={"error"}>
                    비밀번호는 8자 이상이고, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.
                </Alert>)
            case "4c":
                return (<Alert severity={"error"}>
                    같은 문자를 4번 이상 사용하실 수 없습니다.
                </Alert>)
            case "id":
                return (<Alert severity={"error"}>
                    비밀번호에 아이디가 포함되었습니다
                </Alert>)
            case "space":
                return (<Alert severity={"error"}>
                    비밀번호는 공백 없이 입력해주세요
                </Alert>)
            case "hangul":
                return (<Alert severity={"error"}>
                    비밀번호에 한글을 사용 할 수 없습니다
                </Alert>)
            case "no":
                return (<Alert severity={"error"}>
                    비밀번호를 입력하세요
                </Alert>)
            case "old":
                return (<Alert severity={"error"}>
                    이전 비밀번호랑 같습니다
                </Alert>)
        }
        if(userdata.u_nick===""){
            return (<Alert severity={"error"}>
                닉네임을 입력하세요
            </Alert>)
        }else if(userdata.u_name===""){
            return (<Alert severity={"error"}>
                이름을 입력하세요
            </Alert>)
        }else if(userdata.u_gender===""){
            return (<Alert severity={"error"}>
                성별을 입력하세요
            </Alert>)
        }else if(userdata.u_birth===""){
            return (<Alert severity={"error"}>
                생일을 입력하세요
            </Alert>)
        }else if(userdata.u_phone===""){
            return (<Alert severity={"error"}>
                전화번호를 입력하세요
            </Alert>)
        }else if(!boolpw2)
        {
            return (<Alert severity={"error"}>
                비밀번호가 서로 다릅니다
            </Alert>)
        }else if(!hppattern.test(userdata.u_phone))
        {
            return (<Alert severity={"error"}>
                전화번호는 -을 포함해 휴대전화 형식에 맞게 입력해주세요
            </Alert>)
        }else {
            return "ok"
        }
    }

    const chkPW=()=>{
        const pw = userdata.u_pass;
        const id = userdata.u_id;

        const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        const hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if(userdata.u_pass === ""){
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
        }else if(pw===oldPass){
            return "old";
        }else{
            return "ok";
        }
    }

    const changeData=(e)=>{
        let {name,value}=e.target;
        setUserdata({
                ...userdata, //기존의 inputs 객체 복사해서 넣음(펼침 연산자)
                [name]:value //name키에 입력값넣기
            }
        )
    }

    const chkPW2=()=>{
        if(userdata.u_pass===newpw2){
            setBoolpw2(true)
        }else {
            setBoolpw2(false)
        }
    }

    const onSubmitBtn=(e)=>{
        console.log(userdata);
        e.preventDefault();
        if(errorChk()==="ok")
        {
            let updateUrl = localStorage.url + "/user/update";

            axios.post(updateUrl, userdata)
                .then((res) => {
                    alert("수정 성공!");
                    window.location.reload();
                })
        }else {
            alert("입력 정보를 확인해 주세요");
        }
    }

    return (
        <div className={"changeUserInfo"}>
            <ScopedCssBaseline/>
            <div className={"mypage-contents-title"}>
                기본 정보
            </div>
            <form onSubmit={onSubmitBtn}>
                <table className={"user-basic-info-table"}>
                    <tbody>
                    <tr>
                        <th>아이디(이메일)</th>
                        <td>
                            <input required type={'text'} className='form-control' onChange={changeData}
                                   disabled value={userdata.u_id} name={"u_id"}/>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <div className={"input-group"} style={{width: "430px"}}>
                                <input required disabled={disabled} type={'new-password'} className='form-control' onChange={changeData}
                                       onKeyUp={chkPW2} value={userdata.u_pass} name={"u_pass"}/>
                                {
                                    chkPW()!=="ok"?
                                        <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"10px"}}/>
                                        :
                                        <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"10px"}}/>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td>
                            <div className={"input-group"} style={{width: "430px"}}>
                                <input required disabled={disabled} type={'new-password'} className='form-control' onChange={(e)=>setNewpw2(e.target.value)}
                                       onKeyUp={chkPW2} value={newpw2} name={"u_pass2"}/>
                                {
                                    !boolpw2?
                                        <CloseIcon style={{color:"red", float:"right", marginTop:"7px", marginLeft:"10px"}}/>
                                        :
                                        <CheckIcon style={{color:"green", float:"right", marginTop:"7px", marginLeft:"10px"}}/>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr style={{width:"400px"}}>
                        <th>이름</th>
                        <td>
                            <input required disabled={disabled} type={'text'} className='form-control' onChange={changeData}
                                   value={userdata.u_name} name={"u_name"}/>
                        </td>
                    </tr>
                    <tr>
                        <th>닉네임</th>
                        <td>
                            <input required disabled={disabled} type={'text'} className='form-control' onChange={changeData}
                                   value={userdata.u_nick} name={"u_nick"}/>
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="u_gender"
                                value={userdata.u_gender}
                                onChange={changeData}
                                style={{display:"block", marginLeft:"50px"}}
                            >
                                <FormControlLabel disabled={disabled} value="male" control={<Radio />} label="남자" />
                                <FormControlLabel disabled={disabled} value="female" control={<Radio />} label="여자" style={{marginLeft:"60px"}}/>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <th>생일</th>
                        <td>
                            <input required disabled={disabled} type={'date'} className='form-control' onChange={changeData}
                                   value={userdata.u_birth} name={"u_birth"}/>
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <input required disabled={disabled} type={'text'} className='form-control' onChange={changeData}
                                   value={userdata.u_phone} name={"u_phone"}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={"error-msg"}>
                    {
                        errorChk()==="ok"?
                            <Alert severity={"success"}>통과</Alert>
                            :
                            errorChk()
                    }
                </div>
                <div style={{textAlign:"center", marginTop:"50px"}}>
                    {
                        disabled?
                            <Button type={"button"} variant={"outlined"} color={"error"} onClick={()=>setDisabled(false)}>수정하기</Button>
                            :
                            ""

                    }
                    {
                        disabled?
                            ""
                            :
                            <Button type={"submit"} variant={"outlined"} color={"success"}>수정확인</Button>
                    }
                </div>
            </form>
        </div>
    );
}

export default ChangeUserInfo;