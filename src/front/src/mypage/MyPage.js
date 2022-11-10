import React from 'react';
import "./Mypage.css"
import {useParams} from "react-router-dom";
import photo from "../image/16.png"
import EditIcon from '@mui/icons-material/Edit';

function MyPage(props) {
    const p=useParams();
    return (
        <div className={"mypage-div"}>
            <div className={"upper-info-div"}>
                <div className={"photo-div"}>
                    <img alt={"프로필 사진"} src={photo} className={"profile-photo"}/>
                    <div className={"photo-fix-icon"}>
                        <EditIcon sx={{ fontSize: 50 }}></EditIcon>
                    </div>
                </div>
                <div className={"info-div"}>

                </div>
            </div>
        </div>
    );
}

export default MyPage;