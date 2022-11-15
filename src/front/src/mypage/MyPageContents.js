import React from 'react';

const booking=()=>{
    return (
        <div>
            booking
        </div>
    )
}

const usableCoupon=()=>{
    return (
        <div>
            usableCoupon
        </div>
    )
}

const couponHistory=()=>{
    return (
        <div>
            couponHistory
        </div>
    )
}

const pointInfo=()=>{
    return (
        <div>
            pointInfo
        </div>
    )
}

const pointHistory=()=>{
    return (
        <div>
            pointHistory
        </div>
    )
}

const userInfo=()=>{
    return (
        <div>
            userInfo
        </div>
    )
}

const withDrawal=()=>{
    return (
        <div>
            withDrawal
        </div>
    )
}

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
                return userInfo()
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