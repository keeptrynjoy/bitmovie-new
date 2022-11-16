import React, {useEffect, useState} from 'react';
import ChangeUserInfo from "./mypage_menu/ChangeUserInfo";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import PointHistory from "./mypage_menu/PointHistory";
import MovieLog from "./mypage_menu/MovieLog";
import BookingList from "./mypage_menu/BookingList";

//사용가능쿠폰
const usableCoupon=()=>{
    return (
        <div>
            usableCoupon
        </div>
    )
}

//쿠폰내역
const couponHistory=()=>{
    return (
        <div>
            couponHistory
        </div>
    )
}

//포인트 사용안내
const pointInfo=()=>{
    return (
        <div>
            pointInfo
        </div>
    )
}

//회원 탈퇴
const WithDrawal=(navi)=>{
    const withdrawalUrl = localStorage.url + "/user/delete?u_id=" + sessionStorage.u_id;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    return (
        <div style={{margin:"auto",textAlign:"center", width:"700px", height:"500px"}}>
            <button style={{fontSize:"70px"}} className={"btn btn-danger"}
                    type={"button"} variant={"outlined"} color={"error"}
                    onClick={()=>{
                        swalWithBootstrapButtons.fire({
                            title: '탈퇴하시겠습니까?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: '확인',
                            cancelButtonText: '취소',
                            reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios.get(withdrawalUrl)
                                    .then((res) => {
                                        sessionStorage.removeItem("login_status");
                                        sessionStorage.removeItem("u_name");
                                        sessionStorage.removeItem("u_id");
                                        sessionStorage.removeItem("u_pk");
                                        sessionStorage.removeItem("pwUdtDate");
                                        navi("/");
                                        window.location.reload();
                                    })
                                swalWithBootstrapButtons.fire(
                                    '탈퇴성공!',
                                )
                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                swalWithBootstrapButtons.fire(
                                    '탈퇴취소',
                                )
                            }
                        })
                    }}>
                BITMOVIE 탈퇴
            </button>
        </div>
    )
}

function MyPageContents(props) {
    const contents=props.contents;
    const data=props.data;
    const navi=useNavigate();
    const user_pk = sessionStorage.u_pk;
    //데이터 담을 배열
    const [datas,setDatas]=useState([]);

    const makeUrl =(statement)=>{
        return `${localStorage.url}/mypage/${statement}?user_pk=${user_pk}`
    }

    const getDatas= async()=>{
        const point = await axios.get(makeUrl("pointdetail"));
        const booking = await axios.get(makeUrl("bookinglist"))
        const movie = await axios.get(makeUrl("movielog"))
        setDatas({
            ...datas,
            movie_log:movie.data,
            point_list:point.data,
            booking_list:booking.data
        });
    }

    //페이지 로딩시 데이터 가져오기
    useEffect(()=>{
        getDatas().then(r=>{});
    }, []);

    const contentSelector =()=>{
        switch (contents) {
            case "booking":
                return <BookingList booking_list={datas.booking_list}/>
            case "usableCoupon":
                return usableCoupon()
            case "couponHistory":
                return couponHistory()
            case "pointInfo":
                return pointInfo()
            case "pointHistory":
                return <PointHistory point_list={datas.point_list}/>;
            case "userInfo":
                return <ChangeUserInfo data={data}/>
            case "withDrawal":
                return WithDrawal(navi)
            case "movieLog":
                return <MovieLog movie_log={datas.movie_log}/>
            default:
                return ""
        }
    }

    return (
        <div className={"mypage-contents-div"}>
            {contentSelector()}
        </div>
    );
}

export default MyPageContents;