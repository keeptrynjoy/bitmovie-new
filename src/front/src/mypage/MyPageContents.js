import React from 'react';
import ChangeUserInfo from "../login/ChangeUserInfo";

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
const withDrawal=()=>{
    return (
        <div>
            withDrawal
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
                return <ChangeUserInfo data={props.data}/>
            case "withDrawal":
                return withDrawal()
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