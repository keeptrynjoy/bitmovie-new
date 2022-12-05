import React, {useEffect, useState} from 'react';
import ChangeUserInfo from "./mypage_menu/ChangeUserInfo";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import PointHistory from "./mypage_menu/PointHistory";
import MovieLog from "./mypage_menu/MovieLog";
import BookingList from "./mypage_menu/BookingList";
import CouponHistory from "./mypage_menu/CouponHistory";
import UsableCoupon from "./mypage_menu/UsableCoupon";

//포인트 사용안내
const pointInfo=()=>{

    return (
        <div>
            <table className={"mypage-table"}>
                <thead>
                <tr>
                    <th style={{width:"100px"}}>구분</th>
                    <th style={{width:"300px"}}>내용</th>
                    <th style={{width:"200px"}}>비교</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>매표</td>
                    <td>영화 상영일 당일 예매 시 유료결제금액의 3% 적립</td>
                    <td>환불 후 재결제 시 재결제 시점의 적립율 적용</td>
                </tr>
                </tbody>
            </table>
            <div style={{marginTop:"50px"}}>
                <div>※참고하세요※</div>
                <div>‘영화 상영일 이전’이란?</div>
                <div>‘예매일자가 상영일자 이전’인 경우를 말합니다. 단, 24시 이후 상영하는 심야영화는 당일 영화로 구분합니다.</div>
                <div>예시) 4월 7일 24시 10분 영화(4월 8일 밤 12시 10분)의 경우,</div>
                <div>4월 6일 23시 59분까지 예매할 시 사전예매 적립율이 적용되며,</div>
                <div> 4월 7일 00시 01분(4월 6일 밤 12시 01분)에 예매할 경우 당일 예매 적립율 적용</div>
            </div>
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
                                        sessionStorage.removeItem("user_pk");
                                        sessionStorage.removeItem("u_passDateDiff");
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
    const setContents=props.setContents;
    const data=props.data;
    const navi=useNavigate();
    const user_pk = sessionStorage.user_pk;
    //데이터 담을 배열
    const [datas,setDatas]=useState([]);

    const makeUrl =(statement)=>{
        return `${localStorage.url}/mypage/${statement}?user_pk=${user_pk}`
    }

    const getDatas= async()=>{
        const point = await axios.get(makeUrl("pointdetail"));
        const booking = await axios.get(makeUrl("bookinglist"));
        const movie = await axios.get(makeUrl("movielog"));
        const coupon = await axios.get(makeUrl("coupondetail"));
        const usable_coupon = await axios.get(makeUrl("mycoupondetail"));
        setDatas({
            ...datas,
            movie_log:movie.data,
            point_list:point.data,
            booking_list:booking.data,
            coupon_list:coupon.data,
            usable_coupon:usable_coupon.data
        });
    }

    //페이지 로딩시 데이터 가져오기
    useEffect(()=>{
        getDatas().then(r=>{
            console.log(datas);
            setContents("booking");
        });
    }, []);

    const contentSelector =()=>{
        switch (contents) {
            case "booking":
                return <BookingList booking_list={datas.booking_list} getDatas={getDatas()}/>
            case "usableCoupon":
                return <UsableCoupon usable_coupon={datas.usable_coupon}/>
            case "couponHistory":
                return <CouponHistory coupon_list={datas.coupon_list}/>;
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