import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const Payment = (effect, deps) => {

    const [userId, setUserId] = useState();
    const userIdRef = useRef(userId);
    const [userName, setUserName] = useState();
    const userNameRef = useRef(userName);
    const [userEmail, setUserEmail] = useState();
    const userEmailRef = useRef(userEmail);
    const [userPhone, setUserPhone] = useState();
    const userPhoneRef = useRef(userPhone);
    const [finalPrice, setFinalPrice] = useState();
    const finalPriceRef = useRef(finalPrice)
    const [usePoint, setUsePoint] = useState(0);
    const usePointRef = useRef();
    const [scrtime_pk,setScrTimePk] = useState();
    const [book_seat_num,setBookSeatNum] = useState();
    const [book_the_name,setBookTheName] = useState();
    const [book_issu_date,setIssuDate] = useState();
    const [book_adult_cnt,setBookAdultCnt] = useState();
    const [book_youth_cnt,setBookYouthCnt] = useState();


    const {IMP} = window;
    IMP.init('imp02023053');

    // IMP.request_pay(param, callback) 결제창 호출
    const requestPay = () =>{
        console.log(
            "페이버튼",
            userIdRef.current,
            userEmailRef.current,
            userNameRef.current,
        );
        let date = new Date();

        IMP.request_pay(
            {
                pg: 'html5_inicis.INIpayTest',
                merchant_uid: `${userIdRef.current}_${date.getFullYear()}.${date.getDay()}.${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`,
                name: '결제테스트',
                amount: finalPriceRef.current,
                buyer_email: userEmailRef.current,
                buyer_name: userNameRef.current,
                buyer_tel: userPhoneRef.current,
                buyer_addr: "",
            }, (rsp) => {
                // callback
                if (rsp.success) {
                    console.log(rsp);
                    axios.all([axios.post("/payment/insert_data", {
                        payment_pk: rsp.merchant_uid,
                        user_pk: 1,
                        pay_type: rsp.pay_method,
                        pay_price: rsp.paid_amount,
                        pay_date: rsp.paid_at,
                        mycoupon_pk: 'N',
                        pay_use_point: usePointRef.current,
                        pay_state: rsp.status}),
                    axios.post("http://localhost:8282/booking/insert_data",{
                        payment_pk: rsp.merchant_uid,
                        scrtime_pk,
                        book_seat_num,
                        book_the_name,
                        book_issu_date,
                        book_adult_cnt,
                        book_youth_cnt
                    })]
                   ).then(res => {
                        alert(res.data);
                        }
                    );
                } else {
                    alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                }
            }
        );
    }

    const createSeatNum = ()=>{
        const arr = [];
        for(let i = 97; i <= 122; i++){
            let seatNum="";
            for(let j= 1; j<10; j++) {
                seatNum += String.fromCharCode(i);
                seatNum += j;
                arr.push(<option key={seatNum} value={seatNum}>{seatNum}</option>);
                seatNum="";
            }
        }
        return arr;
    }


    return (
        <>
            <div>
                <h1>예매정보</h1>
                좌석번호&nbsp;
                <select>{createSeatNum()}</select><br/>
                상영시간표 고유키 {/*defaultValue={'강남'} */}
                <input type={'number'}  onChange={(e) => (
                    setScrTimePk(e.target.value)
                )}/><br/>
                극장명{/*defaultValue={'강남'} */}
                <input type={'text'}  onChange={(e) => (
                    setBookTheName(e.target.value)
                )}/><br/>
                예매일시
                <input type={'datetime-local'} onChange={(e) => (
                    setBookTheName(e.target.value)
                )}/><br/>
                일반수{/*defaultValue={2} */}
                <input type={'number'} onChange={(e) => (
                    setBookAdultCnt(e.target.value)
                )}/><br/>
                청소년수 {/*defaultValue={0} */}
                <input type={'number'}onChange={(e) => (
                    setBookYouthCnt(e.target.value)
                )}/><br/>

            </div>

            <br/>
            <div>
                <h1>결제정보</h1>
                유저아이디 {/*defaultValue={'admin'} */}
                <input type={'text'} ref={userIdRef}onChange={(e) => (
                    userIdRef.current = e.target.value
                )}/><br/>
                결제금액 {/*defaultValue={100} */}
                <input type={'number'} ref={finalPriceRef}onChange={(e) => (
                    finalPriceRef.current = e.target.value
                )}/><br/>
                구매자 이름{/*defaultValue={'테스트'}*/}
                <input type={'text'} ref={userNameRef}  onChange={(e) => (
                    userNameRef.current = e.target.value
                )}/><br/>
                구매자 연락처{/*defaultValue={'010-404-8282'}*/}
                <input type={'text'} ref={userPhoneRef}  onChange={(e) => (
                    userPhoneRef.current = e.target.value
                )}/><br/>
                구매자 이메일{/*defaultValue={'404love@bitmovie.com'}*/}
                <input type={'email'} ref={userEmailRef}  onChange={(e) => (
                    userEmailRef.current = e.target.value
                )}/><br/>
            </div>

            <button onClick={requestPay}>결제하기</button>
        </>
    );
}
export default Payment;