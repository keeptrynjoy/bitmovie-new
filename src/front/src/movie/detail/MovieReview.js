import React, {useEffect, useState} from 'react';
import {Rating} from "@mui/lab";
import axios from "axios";
import {Flag, Report} from "@material-ui/icons";
import Swal from "sweetalert2";

function MovieReview(props) {
    const review=props.review;
    const [user_data,setUser_data]=useState([]);

    const getUserData=()=>{
        const url = `${localStorage.url}/mypage/information?user_pk=${review.user_pk}`;
        axios.get(url)
            .then((res)=>{
                setUser_data(res.data);
            })
    }

    const reportReview=()=>{
        if (sessionStorage.login_status==null) {
            Swal.fire({
                icon:"warning",
                text:"로그인후 이용해주세요"
            });
            return;
        }

        const reportUrl = `${localStorage.url}/user/insertReport`;
        axios.get(reportUrl,{params:{user_pk: sessionStorage.user_pk, review_pk:review.review_pk}})
            .then((res)=>{
                Swal.fire({
                    icon:"success",
                    text:"신고가 접수 되었습니다"
                })
            })
    }

    useEffect(()=>{
        getUserData();
    },[])

    return (
        <div className={"review-items"}>
            <div className={"review-user-div"}>
                <div className={"review-user-photo"}>
                    {user_data.u_photo}
                </div>
                <div className={"review-user-name"}>
                    {user_data.u_nick}
                </div>
            </div>
            <div className={"review-text-box"}>
                <div className={"review-text-wrap"}>
                    {/*<div className={"guanlam"}>*/}
                    {/*    관람평*/}
                    {/*</div>*/}
                    <div className={"neoyong"}>
                        <div className={"review-text-content"}>
                            {review.revw_text}
                        </div>
                        <div className={"review-star"}>
                            <Rating
                                name="review-star"
                                value={Number(review.revw_star)}
                                readOnly
                            />
                        </div>
                        <div className={"review-report"}>
                            <Flag fontSize={"large"} onClick={reportReview}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieReview;