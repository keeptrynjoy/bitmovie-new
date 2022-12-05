import React, {useEffect, useRef, useState, useCallback} from 'react';
import "./Mypage.css"
import {useNavigate, useParams} from "react-router-dom";
import photo from "../image/16.png"
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import {ScopedCssBaseline} from "@mui/material";
import MyPageContents from "./MyPageContents";
import Swal from "sweetalert2";
import {ChevronRight} from "@material-ui/icons";

function MyPage(props) {
    const p = useParams();
    const user_pk = p.user_pk;
    const [contents,setContents]=useState("");
    //유저정보
    const [data,setData] = useState("");
    const [eCoupon, setECoupon] = useState("");
    const [expCoupon, setExpCoupon] = useState("");
    const navi=useNavigate();

    const infoUrl = localStorage.url + "/user/information?user_pk=" + user_pk;

    const getData =()=>{
        axios.get(infoUrl)
            .then((res)=>{
                setData(res.data);
                console.log(res.data);
            });
    }
    //페이지 로딩시 데이터 가져오기
    useEffect(() => {
        if (sessionStorage.login_status==null) {
            Swal.fire({
                icon:"warning",
                text:"로그인후 이용해주세요"
            }).then((r)=>{
                navi("/");
            });
        }
        getData();
        enableCoupon();
        eexpCoupon();
    }, []);

    //프로필 사진 업로드
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const formData = new FormData();
        formData.append('photoFile', e.target.files[0]);
        formData.append("user_pk",user_pk);
        const photoUrl = localStorage.url + "/mypage/uploadphoto";
        axios.post(photoUrl,formData)
            .then((res) => {
                Swal.fire({
                    icon:"success",
                    text:"프로필 사진 변경 성공!"
                })
                document.location.reload();
            })
        // console.log(e.target.files[0].name);
    }, []);

    const triggerCLick=()=>{
        document.getElementById("profile-photo").click();
    }

    // const onUploadImageButtonClick = useCallback(() => {
    //     if (!inputRef.current) {
    //         return;
    //     }
    //     inputRef.current.click();
    // }, []);

    //사용 가능 쿠폰 개수 조회
    const eCouponUrl =localStorage.url + "/mypage/mycouponcount"
    const enableCoupon = () => {
        axios.get(eCouponUrl, {params:{user_pk:user_pk}})
            .then(res => {
                setECoupon(res.data)
            })
    }

    //사용 가능 쿠폰 개수 조회
    const expCouponUrl =localStorage.url + "/mypage/expcoupon"
    const eexpCoupon = () => {
        axios.get(expCouponUrl, {params:{user_pk:user_pk}})
            .then(res => {
                setExpCoupon(res.data)
            })
    }

    return (
        <div className={"mypage-div"}>
            <div className={"upper-info-div"}>

                <div className={"mypage-info-wrap"}>
                    <div className={"person-info"}>
                        <div className={"photo-div"}>
                            <img alt={"프로필 사진"} src={`${localStorage.url}/image/${data.u_photo}`} className={"profile-photo"}/>
                            <input type={"file"} hidden={true} id={"profile-photo"} onChange={onUploadImage}/>
                            <div className={"photo-fix-icon"} onClick={triggerCLick}>
                                <EditIcon/>
                            </div>
                        </div>
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
                                    <span className={"benefit-li-count"}>{eCoupon} 개</span>
                                </li>
                                <li>
                                    <strong>만료 예정 쿠폰</strong>
                                    <span className={"benefit-li-count"}>{expCoupon} 개</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-my-point">
                            <h3>MY POINT</h3>
                            <ul>
                                <li>
                                    <strong>사용 가능 포인트</strong>
                                    <span className={"benefit-li-count"}>{data.u_point} P</span>
                                </li>
                                {/*<li>*/}
                                {/*    <strong>포인트 뭐넣지</strong>*/}
                                {/*    <span className={"benefit-li-count"}>0 개</span>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"lower-info-div"}>
                <div className={"sidebar-menu"}>
                    <ScopedCssBaseline/>
                    <div className={"sidebar-menu-title"}>
                        BITMOVIE
                    </div>
                    <ul>
                        <li>
                            <b className={"sidebar-menu-subtitle"}>나의 예매내역</b>
                            <ul>
                                <li className={"menu-items"} onClick={()=>setContents("booking")}>
                                    예매 내역
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b className={"sidebar-menu-subtitle"}>쿠폰 관리</b>
                            <ul>
                                <li className={"menu-items"} onClick={()=>setContents("usableCoupon")}>사용 가능 쿠폰</li>
                                <li className={"menu-items"} onClick={()=>setContents("couponHistory")}>쿠폰 내역</li>
                            </ul>
                        </li>
                        <li>
                            <b className={"sidebar-menu-subtitle"}>BIT 포인트</b>
                            <ul>
                                <li className={"menu-items"} onClick={()=>setContents("pointInfo")}>포인트 사용 안내</li>
                                <li className={"menu-items"} onClick={()=>setContents("pointHistory")}>포인트 사용 내역</li>
                            </ul>
                        </li>
                        <li>
                            <b className={"sidebar-menu-subtitle"}>회원 정보 변경</b>
                            <ul>
                                <li className={"menu-items"} onClick={()=>setContents("userInfo")}>개인정보 변경</li>
                                <li className={"menu-items"} onClick={()=>setContents("withDrawal")}>회원 탈퇴</li>
                            </ul>
                        </li>
                        <li>
                            <b className={"sidebar-menu-subtitle menu-items"} onClick={()=>setContents("movieLog")}>무비 로그
                                <ChevronRight fontSize={"large"} style={{marginBottom:6}}/>
                            </b>

                        </li>
                    </ul>
                </div>
                <div className={"mypage-contents"}>
                    <MyPageContents contents={contents} setContents={setContents} data={data}/>
                </div>
            </div>
        </div>
    );
}

export default MyPage;