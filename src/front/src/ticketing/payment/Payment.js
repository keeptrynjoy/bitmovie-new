import React, {useState} from 'react';
import {useLocation} from "react-router-dom";



const Payment = () => {
    //
    const location = useLocation();

    const datas=location.state;
    console.log('알려줘',datas);


    const obj = JSON.parse(datas.movie);
    // console.log('??',obj);
    const obj2 = JSON.parse(datas.location);
    // // console.log('??!!',obj2);
    // const obj3 = JSON.parse(datas.time);
    //
    // console.log("됫냐?",datas);
    //
    // const result = location.state.input;
    //


    return (
        <div>
            <h1>결제페이지</h1>
            영화제목 : {obj.m_name}
            <br/>
           날짜 :  {datas.calender}
            <br/>
           상영시간표 : {datas.time}
            <br/>
            상영지점 : {obj2.the_name}
        </div>
    );
};

export default Payment;


// import React, {useEffect, useRef, useState} from 'react';
// import axios from "axios";
// import {json} from "react-router-dom";
//
//
// const Payment = (effect, deps) => {
//
//     const [userId, setUserId] = useState();
//     const userIdRef = useRef(userId);
//     const [userName, setUserName] = useState();
//     const userNameRef = useRef(userName);
//     const [userEmail, setUserEmail] = useState();
//     const userEmailRef = useRef(userEmail);
//     const [userPhone, setUserPhone] = useState();
//     const userPhoneRef = useRef(userPhone);
//     const [finalPrice, setFinalPrice] = useState();
//     const finalPriceRef = useRef(finalPrice)
//     const [usePoint, setUsePoint] = useState(0);
//     const usePointRef = useRef();
//     const [scrtime_pk,setScrTimePk] = useState();
//     const [book_seat_num,setBookSeatNum] = useState('A1');
//     const [book_the_name,setBookTheName] = useState();
//     const [book_issu_date,setIssuDate] = useState();
//     const [book_adult_cnt,setBookAdultCnt] = useState();
//     const [book_youth_cnt,setBookYouthCnt] = useState();
//
//     const {IMP} = window;
//     IMP.init('imp02023053');
//
//     // IMP.request_pay(param, callback) 결제창 호출
//     const requestPay = () => {
//
//             let date = new Date();
//
//             let now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//             console.log(now)
//             console.log(
//                 "페이버튼",
//                 userIdRef.current,
//                 userEmailRef.current,
//                 userNameRef.current,
//             );
//
//             IMP.request_pay(
//                 {
//                     pg: 'kakaopay',
//                     merchant_uid: `${now}_${userIdRef.current}`,
//                     name: '결제테스트',
//                     amount: finalPriceRef.current - usePoint,
//                     buyer_email: userEmailRef.current,
//                     buyer_name: userNameRef.current,
//                     buyer_tel: userPhoneRef.current,
//                     buyer_addr: "",
//                 },(rsp) => {
//                     // callback
//                     if (rsp.success) {
//
//                         const paymentData = {
//                             payment_pk: rsp.merchant_uid,
//                             user_pk: userIdRef.current,
//                             pay_type: rsp.pay_method,
//                             pay_price: rsp.paid_amount,
//                             pay_date: date,
//                             mycoupon_pk: 'N',
//                             pay_use_point: usePoint,
//                             pay_state: rsp.status,
//                             imp_uid: rsp.imp_uid
//                         }
//
//                         const bookingData = {
//                             payment_pk: rsp.merchant_uid,
//                             scrtime_pk,
//                             book_seat_num,
//                             book_the_name,
//                             book_issu_date: date,
//                             book_adult_cnt,
//                             book_youth_cnt
//                         }
//
//                         axios.post("http://localhost:8282/payment/complete",
//                             {"payment":paymentData, "booking": bookingData}
//                         , {
//                             headers: { "Content-Type": "application/json"}
//                         }).then(res => {
//                             alert(res.data);
//                         }).catch(error=>{
//                             alert(error.response.data);
//                         });
//
//                     } else {
//                         alert(rsp.error_msg);
//                     }
//                 }
//             );
//     }
//
//     const createSeatNum = ()=>{
//         const arr = [];
//         for(let i = 65; i <= 90; i++){
//             let seatNum="";
//             for(let j= 1; j<10; j++) {
//                 seatNum += String.fromCharCode(i);
//                 seatNum += j;
//                 arr.push(<option key={seatNum} value={seatNum}>{seatNum}</option>);
//                 seatNum="";
//             }
//         }
//         return arr;
//     }
//
//     return (
//         <>
//             <div>
//                 <h1>예매정보</h1>
//                 좌석번호&nbsp;
//                 <select value={book_seat_num} onChange={(e)=>{
//                     setBookSeatNum(e.target.value)
//                 }}>{createSeatNum()}</select><br/>
//                 상영시간표 고유키(int)
//                 <input type={'number'}  onChange={(e) => (
//                     setScrTimePk(e.target.value)
//                 )}/><br/>
//                 극장명(String)
//                 <input type={'text'}  onChange={(e) => (
//                     setBookTheName(e.target.value)
//                 )}/><br/>
//                 일반수(int)
//                 <input type={'number'} onChange={(e) => (
//                     setBookAdultCnt(e.target.value)
//                 )}/><br/>
//                 청소년수(int)
//                 <input type={'number'}onChange={(e) => (
//                     setBookYouthCnt(e.target.value)
//                 )}/><br/>
//             </div>
//
//             <br/>
//             <div>
//                 <h1>결제정보</h1>
//                 user_pk(int)
//                 <input type={'text'} ref={userIdRef} onChange={(e) => (
//                     userIdRef.current = e.target.value
//                 )}/><br/>
//                 포인트 사용(int)
//                 <input type={'number'} onChange={(e) => (
//                    setUsePoint(e.target.value)
//                 )}/><br/>
//                 결제금액(int)
//                 <input type={'number'} ref={finalPriceRef}onChange={(e) => (
//                     finalPriceRef.current = e.target.value
//                 )}/><br/>
//                 구매자 이름(String)
//                 <input type={'text'} ref={userNameRef}  onChange={(e) => (
//                     userNameRef.current = e.target.value
//                 )}/><br/>
//                 구매자 연락처
//                 <input type={'text'} ref={userPhoneRef}  onChange={(e) => (
//                     userPhoneRef.current = e.target.value
//
//                 )}/><br/>
//                 구매자 이메일
//                 <input type={'email'} ref={userEmailRef}  onChange={(e) => (
//                     userEmailRef.current = e.target.value
//                 )}/><br/>
//
//             </div>
//
//             <button onClick={requestPay}>결제하기</button>
//         </>
//     );
// }
// export default Payment;