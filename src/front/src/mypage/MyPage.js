import React, {useEffect, useState} from 'react';
import "./Mypage.css"
import {useParams} from "react-router-dom";
import photo from "../image/16.png"
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

function MyPage(props) {
    const p = useParams();
    const user_pk = p.u_pk;
    const [data,setData] = useState("");
    const infoUrl = localStorage.url + "/user/information?user_pk=" + user_pk;

    const getData =()=>{
        axios.get(infoUrl)
            .then((res)=>{
                setData(res.data);
            })
    }
    //페이지 로딩시 데이터 가져오기
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={"mypage-div"}>
            <div className={"upper-info-div"}>
                <div className={"photo-div"}>
                    <img alt={"프로필 사진"} src={photo} className={"profile-photo"}/>
                    <div className={"photo-fix-icon"}>
                        <EditIcon sx={{ fontSize: 50 }}></EditIcon>
                    </div>
                </div>
                <div className={"mypage-info-wrap"}>
                    <div className={"person-info"}>
                        <strong className={"person-info-name"}>{data.u_name}님</strong>
                        <em className={"person-info-id"}>{data.u_id}</em>
                        <span className={"person-info-nickname"}>
                            닉네임 : {data.u_nick}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;