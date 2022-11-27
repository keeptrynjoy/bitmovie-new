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
    const [coupon,setCoupon]=useState('');
    const [discount,setDiscount]=useState('');
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
    const [usePoint, setUsePoint] = useState('');
    const usePointRef = useRef();
    const [scrtime_pk,setScrTimePk] = useState();
    const [book_seat_num,setBookSeatNum] = useState('A1');
    const [book_the_name,setBookTheName] = useState();
    const [book_issu_date,setIssuDate] = useState();
    const [book_adult_cnt,setBookAdultCnt] = useState();
    const [book_youth_cnt,setBookYouthCnt] = useState();
    const [dbData,setDbdata]= useState('');
    const [sale,setSale]= useState('');
    const [useCoupon,setUseCoupon]=useState('');
    const [choiceCoupon,setChoiceCoupon]=useState('');
    const user_pk=sessionStorage.user_pk;
    const {IMP} = window;
    IMP.init('imp02023053');

//강제로 변환도 해보고 타입오브로 찎어서 스트링나오는거 둘다 보내도 안됨

    console.log(choiceCoupon,'pk보여줘');
    console.log(typeof choiceCoupon,'pk보여줘');
    const cpk=JSON.stringify(choiceCoupon);
    console.log(cpk,'?????');
    console.log(typeof cpk,'?????');

    // console.log('좌석보여줘',location.state.selected_seat);

    // let selector=JSON.stringify(location.state.selected_seat);

    let selector=location.state.selected_seat.join();


    // console.log('보자',location.state.obj3.scrtime_pk);

    const timePk= location.state.obj3.scrtime_pk;

    // console.log(timePk);



    // const fixpay=(final)=>{
    //       final=(location.state.finalPay-discount);
    // }

    // const final=(location.state.finalPay-discount-usePoint);


    // console.log(usePoint,'사용할예정포인트');

    // console.log('결제금액',final);

    // console.log('할인금액보여줘',discount);


    // console.log('사용된쿠폰금액',useCoupon);
    // console.log('사용된포인트긍맥',sale);
    const totalDiscount=(Number(useCoupon)+Number(sale));
    // const totalDiscount=(Number(choiceCoupon.c_amount)+Number(sale));
    // const totalDiscount=(Number(choiceCoupon.c_amount)+Number(sale));
// console.log(useCoupon,'?');


    const final=(location.state.finalPay-totalDiscount);
    // console.log(final,'보자');
    // console.log(totalDiscount,'???');


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
                merchant_uid: `${now}_${user_pk}`,
                name: '제발결제제발',
                // amount: finalPriceRef.current - usePoint,
                amount: final,
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
                        user_pk: user_pk,
                        pay_type: rsp.pay_method,
                        pay_price: rsp.paid_amount,
                        pay_date: date,
                        coupon_pk: cpk,
                        pay_use_point: usePoint,
                        pay_state: rsp.status,
                        imp_uid: rsp.imp_uid
                    }

                    const bookingData = {
                        payment_pk: rsp.merchant_uid,
                        // scrtime_pk,
                        scrtime_pk : timePk,
                        book_seat_num : selector,
                        book_the_name : location.state.obj2.the_name,
                        book_issu_date: date,
                        book_adult_cnt : location.state.adults,
                        book_youth_cnt : location.state.students
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

    // const createSeatNum = ()=>{
    //     const arr = [];
    //     for(let i = 65; i <= 90; i++){
    //         let seatNum="";
    //         for(let j= 1; j<10; j++) {
    //             seatNum += String.fromCharCode(i);
    //             seatNum += j;
    //             arr.push(<option key={seatNum} value={seatNum}>{seatNum}</option>);
    //             seatNum="";
    //         }
    //     }
    //     return arr;
    // }

    // console.log(choiceCoupon);

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
        take();
    },[])



    // const done=(e)=>{
    //
    //
    //     setChoiceCoupon(coupon[e.target.value])
    //     // setUsePoint(coupon[e.target.value]);
    //     // setDiscount(coupon[e.target.value]);
    // }

    // console.log(usePoint,'usePoint값');
    // console.log('db정보',dbData);
    // console.log("쿠폰이다",coupon[0].c_amount);
    // console.log('???',coupon);
    // const some = JSON.parse(choiceCoupon);

    // const some= Object.values(choiceCoupon);
    // console.log(JSON.parse(choiceCoupon),'보여주세요');
    // console.log(choiceCoupon[0], ' 초이스 쿠폰 ');
    //
    //
    // console.log(choiceCoupon.coupon_pk);
    // console.log(choiceCoupon.c_amount);
    //
    // console.log(choiceCoupon.c_amount);
    // console.log(choiceCoupon.coupon_pk);

    // console.log(choiceCoupon.c_amount);
    //밑에서 가져온것들

    // setDiscount(e.target.value),
    // setUseCoupon(e.target.value),
    // setChoiceCoupon(coupon[e.target.value])






    // const saveAmount=(choiceCoupon.c_amount);
    // console.log(saveAmount,'!!');

    // console.log(coupon.coupon_pk,'보자');
    // console.log(typeof choiceCoupon);
    // console.log(some);
    //쿠폰 정보 담기

    // const saveCoupon=(e)=>(
    //
    //
    //
    //
    //
    // )





    // 쿠폰 받아오기
    const take=()=> {
        axios.get(`http://localhost:8282/payment/coupon?user_pk=${user_pk}`)
            .then((res) => {
                setCoupon(res.data);
                // console.log('쿠폰',res.data);
            }).catch((error) => {
            console.log('쿠폰이 존재하지 않아요')
        });
    }

    // console.log('사용할 포인트',usePoint);
    //
    // console.log(dbData);
    // console.log(location.state);
    //
    // console.log('쿠폰',coupon);

    return (
        <>
            <div style={{width:'500px', height:'600px', border:'1px solid gray', margin:'0 auto', justifyContent:'center', display:'flex'}}>
                <div>
                    <h1>예매정보</h1>
                    좌석번호&nbsp;
                    <input type={'text'} onChange={(e)=>(setBookSeatNum(e.target.value))}
                           disabled      defaultValue={location.state.selected_seat}></input>

                    <br/>
                    상영시간표 고유키(int)
                    <input type={'number'}  onChange={(e) => (
                        setScrTimePk(e.target.value)
                    )}
                           disabled defaultValue={timePk}
                    /><br/>
                    극장명(String)
                    <input type={'text'}  onChange={(e) => (
                        setBookTheName(e.target.value)
                    )}
                           disabled defaultValue={location.state.obj2.the_name}
                    />
                    <br/>
                    성인(₩10,000)
                    <input type={'number'} onChange={(e) => (
                        setBookAdultCnt(e.target.value)
                    )}defaultValue={location.state.adults} disabled
                    />
                    <br/>
                    청소년(₩8,000)
                    <input type={'number'}onChange={(e) => (
                        setBookYouthCnt(e.target.value)
                    )}
                           defaultValue={location.state.students} disabled
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
                           defaultValue={user_pk} disabled
                    />
                    <br/>
                    <input type={'number'} name={'point'} placeholder={"사용할 포인트 입력"} step={100} min={0} onChange={(e) => (


                        e.target.value<0?
                            alert(e.target.value="0보다 작은 수는 입력할 수 없습니다")

                            :


                            e.target.value.length<4?
                                <></>
                                :

                                e.target.value>dbData.u_point?



                                    (
                                        alert(e.target.value='잔여포인트를 초과했습니다'),

                                            setUsePoint(e.target.value)
                                    )

                                    :


                                    // e.target.value<1000 ?
                                    //
                                    // (
                                    // alert(e.target.value='1000 포인트부터 사용가능합니다'),
                                    // setUsePoint(e.target.value)
                                    //
                                    // )



                                    // :

                                    setUsePoint(e.target.value),
                            setSale(e.target.value)

                    )}
                    />
                    <br/>
                    남은 포인트({dbData.u_point})
                    <br/><br/>
                    보유한 쿠폰<br/>
                    {/*<select type={'number'} onChange={(e)=>(*/}
                    {/*     setDiscount(e.target.value),*/}
                    {/*         setUseCoupon(e.target.value),*/}
                    {/*        setChoiceCoupon(coupon[e.target.value])*/}
                    {/*)}*/}



                    {/*>*/}
                    <select onChange={(e)=> {

                        const target =



                            coupon?.find((couponItem) => couponItem.coupon_pk === e.target.value)
                        if (target!=null){
                            setDiscount(target.c_amount)
                            setUseCoupon(target.c_amount)
                            setChoiceCoupon(target.coupon_pk)

                        }else{
                            setDiscount(0)
                            setUseCoupon(0)
                            setChoiceCoupon('')
                        }



                    }
                    }

                    >
                        <option value={0}>선택없음</option>

                        {coupon &&
                            coupon.map((list,i)=>(

                                <option key={i} value={list.coupon_pk} >

                                    {list.c_class}
                                </option>


                            ))
                        }



                    </select>

                    <input type={"text"} value={totalDiscount} readOnly  />할인된 금액
                    <br/>
                    {/*<select  type={'number'}>*/}
                    {/*<option>*/}
                    {/*    쿠폰선택*/}
                    {/*</option>*/}
                    {/*    <option>*/}
                    {/*        /!*defaultValue={coupon[0].c_amount}*!/*/}
                    {/*    </option>*/}
                    {/*    <option>*/}
                    {/*        /!*defaultValue={coupon[0].c_amount}*!/*/}
                    {/*    </option>*/}
                    {/*</select>*/}
                    {/*    <br/><br/>*/}

                    결제금액(int)
                    <input type={'number'} ref={finalPriceRef}onChange={(e) => (
                        finalPriceRef.current = e.target.value
                    )}
                           value={final} disabled
                    /><br/>
                    구매자 이름(String)
                    <input type={'text'} ref={userNameRef}  onChange={(e) => (
                        userNameRef.current = e.target.value
                    )} defaultValue={sessionStorage.u_name} disabled /><br/>
                    구매자 연락처
                    <input type={'text'} ref={userPhoneRef}  onChange={(e) => (
                        userPhoneRef.current = e.target.value
                    )}
                           defaultValue={dbData.u_phone} disabled
                    /><br/>
                    구매자 이메일
                    <input type={'email'} ref={userEmailRef}  onChange={(e) => (
                        userEmailRef.current = e.target.value
                    )}
                           defaultValue={sessionStorage.u_id} disabled
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