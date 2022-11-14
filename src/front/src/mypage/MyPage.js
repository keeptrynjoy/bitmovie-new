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
                        {/*<em className={"person-info-id"}>{data.u_id}</em>*/}
                        <span className={"person-info-nickname"}>
                            닉네임 : {data.u_nick}
                        </span>
                    </div>
                    <div className={"benefit-info"}>
                        <div className="col-my-coupon">
                            <h3>MY COUPON</h3>
                            <ul>
                                <li>
                                    <strong>사용 가능 쿠폰</strong>
                                    <span className={"benefit-li-count"}>0개</span>
                                </li>
                                <li>
                                    <strong>만료 예정 쿠폰</strong>
                                    <span className={"benefit-li-count"}>0개</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-my-point">
                            <h3>MY POINT</h3>
                            <ul>
                                <li>
                                    <strong>사용 가능 포인트</strong>
                                    <span className={"benefit-li-count"}>0개</span>
                                </li>
                                <li>
                                    <strong>포인트 사용내역</strong>
                                    <span className={"benefit-li-count"}>0개</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"lower-info-div"}>
                <div className={"sidebar-menu"}>
                    <div className={"sidebar-menu-title"}>
                        MY BITMOVIE
                    </div>
                <ul>
                    <li>
                        <b>나의 예매내역</b>
                        <ul>
                            <li>
                                영수증 출력
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>쿠폰 관리</b>
                        <ul>
                            <li>할인쿠폰</li>
                        </ul>
                    </li>
                    <li>
                        포인트 관리
                    </li>
                    <li>
                        무비로그
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
}

export default MyPage;