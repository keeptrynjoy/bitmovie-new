// import React, {useState} from 'react';
// import {useLocation} from "react-router-dom";
//
//
//
// const Payment = () => {
//     //
//     const location = useLocation();
//
//     console.log(location);
//
//
//     // const datas=location.state;
//     // console.log('알려줘',datas);
//     //
//     //
//     // const obj = JSON.parse(datas.movie);
//     // // console.log('??',obj);
//     // const obj2 = JSON.parse(datas.location);
//     // // console.log('??!!',obj2);
//     // const obj3 = JSON.parse(datas.time);
//     //
//     // console.log("됫냐?",datas);
//     //
//     // const result = location.state.input;
//     //
//
//
//     return (
//         <div style={{textAlign:'center', backgroundColor:'gray', width:'300px', height:'300px', margin:'auto', paddingTop:'50px'}}>
//            <div>
//                <h1>예매내역</h1>
//             영화 제목 : {location.state.obj.m_name} ({location.state.obj.m_enname})
//            <br/>
//            영화 관람가 : {location.state.obj.m_age_grd}세
//                <br/>
//             성인 : {location.state.adults}명,
//             학생 : {location.state.students}명
//             <br/>
//             예매된 좌석 : {location.state.selected_seat[0]},{location.state.selected_seat[1]},{location.state.selected_seat[2]}
//            <br/>
//            상영 지점 : {location.state.obj2.the_name}
//            <br/>료
//            상영 타임 : {location.state.obj2.theater_pk}번째 타임
//                <br/>
//                상영 시간 : {location.state.obj.m_runtime}분
//
//
//
//            </div>
//            {/* <h1>결제페이지</h1>*/}
//            {/* <br/>*/}
//            {/* <b>영화제목</b> : {obj.m_name}*/}
//            {/* <br/>*/}
//            {/*<b>날짜</b> : {datas.calender}*/}
//            {/* <br/>*/}
//            {/*<b>상영시간표</b> : {datas.time}*/}
//            {/* <br/>*/}
//            {/* <b>상영지점</b> : {obj2.the_name}*/}
//         </div>
//     );
// };
//
// export default Payment;


import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {json} from "react-router-dom";
import {useLocation} from "react-router-dom";

const Payment = (effect, deps) => {


    const location = useLocation();
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
    const [book_seat_num,setBookSeatNum] = useState('A1');
    const [book_the_name,setBookTheName] = useState();
    const [book_issu_date,setIssuDate] = useState();
    const [book_adult_cnt,setBookAdultCnt] = useState();
    const [book_youth_cnt,setBookYouthCnt] = useState();
    const [dbData,setDbdata]= useState('');
    const user_pk=sessionStorage.user_pk;
    const {IMP} = window;
    IMP.init('imp02023053');


    // IMP.request_pay(param, callback) 결제창 호출
    const requestPay = () => {

            let date = new Date();

            let now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            console.log(now)
            console.log(
                "페이버튼",
                dbData.u_id,
                dbData.u_name,

                // userIdRef.current,
                // userEmailRef.current,
                // userNameRef.current,
            );

            IMP.request_pay(
                {
                    pg: 'kakaopay',
                    // merchant_uid: `${now}_${userIdRef.current}`,
                    merchant_uid: `${now}_${userId}`,
                    name: '결제테스트',
                    // amount: finalPriceRef.current - usePoint,
                    amount: location.state.finalPay,
                    // buyer_email: userEmailRef.current,
                    buyer_email: sessionStorage.u_id,
                    // buyer_name: userNameRef.current,
                    buyer_name: sessionStorage.u_name,
                    // buyer_tel: userPhoneRef.current,
                    buyer_tel: dbData.u_phone,
                    buyer_addr: "",
                },(rsp) => {
                    // callback
                    if (rsp.success) {

                        const paymentData = {
                            payment_pk: rsp.merchant_uid,
                            user_pk: userIdRef.current,
                            pay_type: rsp.pay_method,
                            pay_price: rsp.paid_amount,
                            pay_date: date,
                            mycoupon_pk: 'N',
                            pay_use_point: usePoint,
                            pay_state: rsp.status,
                            imp_uid: rsp.imp_uid
                        }

                        const bookingData = {
                            payment_pk: rsp.merchant_uid,
                            scrtime_pk,
                            book_seat_num,
                            book_the_name,
                            book_issu_date: date,
                            book_adult_cnt,
                            book_youth_cnt
                        }

                        axios.post("http://localhost:8282/payment/complete",
                            {"payment":paymentData, "booking": bookingData}
                        , {
                            headers: { "Content-Type": "application/json"}
                        }).then(res => {
                            alert(res.data);
                        }).catch(error=>{
                            alert(error.response.data);
                        });

                    } else {
                        alert(rsp.error_msg);
                    }
                }
            );
    }

    const createSeatNum = ()=>{
        const arr = [];
        for(let i = 65; i <= 90; i++){
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


    //db에서 유저정보 받아오자
    const comeDb=()=>{
        let user_pk=sessionStorage.user_pk;
    axios.get('http://localhost:8282/mypage/information?user_pk='+user_pk)
            .then((res)=> {
                    // alert('굿잡베이베')
                    setDbdata(res.data);
                }

            );
    }


    useEffect(()=>{
        comeDb();
    },[])






    // console.log(dbData);
    // console.log(location.state);


    return (
        <>
            <div style={{width:'500px', height:'600px', border:'1px solid gray', margin:'0 auto', justifyContent:'center', display:'flex'}}>
            <div>
                <h1>예매정보</h1>
                좌석번호&nbsp;
                <input type={'text'} onChange={(e)=>(setBookSeatNum(e.target.value))}
                       defaultValue={location.state.selected_seat}></input>

                <br/>
                상영시간표 고유키(int)
                <input type={'number'}  onChange={(e) => (
                    setScrTimePk(e.target.value)
                )}
                defaultValue={location.state.movieData.time}
                /><br/>
                극장명(String)
                <input type={'text'}  onChange={(e) => (
                    setBookTheName(e.target.value)
                )}
                       defaultValue={location.state.obj2.the_name}
                />
                <br/>
                성인(₩10,000)
                <input type={'number'} onChange={(e) => (
                    setBookAdultCnt(e.target.value)
                )}defaultValue={location.state.adults}
                />
                <br/>
                청소년(₩8,000)
                <input type={'number'}onChange={(e) => (
                    setBookYouthCnt(e.target.value)
                )}
                       defaultValue={location.state.students}
                />
                <br/>
            </div>

            <br/>
            <div>
                <h1>결제정보</h1>
                user_pk(int)
                <input type={'text'} ref={userIdRef} onChange={(e) => (
                    userIdRef.current = e.target.value
                )}
                       defaultValue={user_pk}
                />
                <br/>
                포인트 사용(int)
                <input type={'number'} onChange={(e) => (
                   setUsePoint(e.target.value)
                )}
                defaultValue={dbData.u_point}
                /><br/>
                결제금액(int)
                <input type={'number'} ref={finalPriceRef}onChange={(e) => (
                    finalPriceRef.current = e.target.value
                )}
                defaultValue={location.state.finalPay}
                /><br/>
                구매자 이름(String)
                <input type={'text'} ref={userNameRef}  onChange={(e) => (
                    userNameRef.current = e.target.value
                )} defaultValue={sessionStorage.u_name}/><br/>
                구매자 연락처
                <input type={'text'} ref={userPhoneRef}  onChange={(e) => (
                    userPhoneRef.current = e.target.value
                )}
                       defaultValue={dbData.u_phone}
                /><br/>
                구매자 이메일
                <input type={'email'} ref={userEmailRef}  onChange={(e) => (
                    userEmailRef.current = e.target.value
                )}
                defaultValue={sessionStorage.u_id}
                /><br/>

            </div>
                <div style={{alignItems:'center', display:'flex', justifyContent:'center',marginTop:'30px'}}>
                <button onClick={requestPay} style={{backgroundColor:'white', border:'1px solid gray'}}>결제하기</button>
                </div>
            </div>
        </>
    );
}
export default Payment;