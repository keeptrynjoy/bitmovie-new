import React, {useEffect, useState} from 'react';
import {Rating} from "@mui/lab";
import axios from "axios";
import {Flag, NotificationImportant, Report, ThumbUp} from "@material-ui/icons";
import Swal from "sweetalert2";
import {ThumbUpOffAlt} from "@mui/icons-material";

function MovieReview(props) {
    const review=props.review;
    const get=props.get;
    const [user_data,setUser_data]=useState([]);
    const [showAll,setshowAll]=useState(false);
    const [dto,setDto]=useState({
        user_pk: sessionStorage.user_pk,
        review_pk: review.review_pk
    })

    const getUserData=()=>{
        const url = `${localStorage.url}/user/information?user_pk=${review.user_pk}`;
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
        Swal.fire({
            icon:"question",
            text:"정말 신고 하시겠습니까?",
            showDenyButton: true,
            denyButtonText: "아니오",
            confirmButtonText: "네"
        }).then((result)=>{
            if(result.isConfirmed){
                axios.post(`${localStorage.url}/user/selectReportYorN`,dto)
                    .then((res)=>{
                        if(res.data){
                            Swal.fire({
                                icon:"warning",
                                text:"이미 신고한 댓글 입니다"
                            });
                            return;
                        }
                    })
                const reportUrl = `${localStorage.url}/user/insertReport`;
                axios.post(reportUrl,dto)
                    .then((res)=>{
                        Swal.fire({
                            icon:"success",
                            text:"신고가 접수 되었습니다"
                        })
                    })
            }else if(result.isDenied){
                Swal.fire({
                    icon:"warning",
                    text:"신고가 취소 되었습니다"
                })
            }
        })
    }

    const handleLike=(yorN)=>{
        if (sessionStorage.login_status==null) {
            Swal.fire({
                icon:"warning",
                text:"로그인후 이용해주세요"
            });
            return;
        }
        if(yorN){
            axios.post(`${localStorage.url}/user/deleteLikeRevw`,dto)
                .then((res)=>{
                    get();
                })
        }else{
            axios.post(`${localStorage.url}/user/insertLikeRevw`,dto)
                .then((res)=>{
                    get();
                })
        }
    }

    useEffect(()=>{
        getUserData();
    },[])

    return (
        <div className={"review-items"}>
            <div className={"review-user-div"}>
                <div className={"review-user-photo"}>
                    <img className={"revie-profile-photo"} alt={"오류!"}
                         src={`${localStorage.url}/image/${user_data.u_photo}`}/>
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
                            <div className={showAll?"":"review-text-content-text"}
                                onClick={()=>{
                                    setshowAll(!showAll);
                                }}>
                                {review.revw_text}
                            </div>
                        </div>
                        <div className={"review-like"}>
                            {
                                review.likeYorN?
                                    <ThumbUp color={"primary"} onClick={()=>handleLike(review.likeYorN)}/>
                                    :
                                    <ThumbUpOffAlt color={"primary"} onClick={()=>handleLike(review.likeYorN)}/>
                            }
                            {review.count_like}
                        </div>
                        <div className={"review-star"}>
                            <Rating
                                name="review-star"
                                value={Number(review.revw_star)}
                                readOnly
                            />
                        </div>
                        <div className={"review-report"}>
                            <NotificationImportant fontSize={"large"} onClick={reportReview}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieReview;