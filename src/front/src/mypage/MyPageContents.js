import React from 'react';
import ChangeUserInfo from "./ChangeUserInfo";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

//영수증
const booking=()=>{
    return (
        <div>
            booking
        </div>
    )
}

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

//포인트 사용 내역
const pointHistory=()=>{
    return (
        <div>
            pointHistory
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

//무비로그
const movieLog=()=>{
    return (
        <div>
            movieLog
        </div>
    )
}

function MyPageContents(props) {
    const contents=props.contents;
    const navi=useNavigate();
    const data=props.data;

    const contentSelector =()=>{
        switch (contents) {
            case "booking":
                return booking()
            case "usableCoupon":
                return usableCoupon()
            case "couponHistory":
                return couponHistory()
            case "pointInfo":
                return pointInfo()
            case "pointHistory":
                return pointHistory()
            case "userInfo":
                return <ChangeUserInfo data={data}/>
            case "withDrawal":
                return WithDrawal(navi)
            case "movieLog":
                return movieLog()
        }
    }

    return (
        <div>
            {
                contentSelector()
            }
        </div>
    );
}

export default MyPageContents;