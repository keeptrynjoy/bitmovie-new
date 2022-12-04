import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {json, useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Swal from "sweetalert2";
import './Payment.css';
import Age from "../../service/Age";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Payment = (effect, deps) => {



    const navi=useNavigate();
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
    const [choiceCoupon,setChoiceCoupon]=useState('N');
    const user_pk=sessionStorage.user_pk;
    const {IMP} = window;
    IMP.init('imp02023053');
    const mv = location.state.movieData.movie;

    console.log('이게뭐에요?',location.state.movieData.calender)
    // console.log(choiceCoupon,'pk보여줘');
    // console.log(typeof choiceCoupon,'pk보여줘');
    const cpk=choiceCoupon;
    // console.log(cpk,'?????');
    // console.log(typeof cpk,'?????');

    // console.log('좌석보여줘',location.state.selected_seat);

    // let selector=JSON.stringify(location.state.selected_seat);

    let selector=location.state.selected_seat.join();


    // console.log('보자',location.state.obj3.scrtime_pk);

    const timePk= location.state.obj3.scrtime_pk;
    const cal= JSON.parse(location.state.movieData.time)
    // console.log(cal,'?')
    // console.log(cal.scrt_stime)
    // console.log(timePk);

    const poster =location.state.obj.m_photo;

    console.log(poster)



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
                name: '결제',
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
                        mycoupon_pk: cpk,
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

                        Swal.fire({
                            icon: "success",
                            text: (res.data)
                        });
                        navi(`/mypage/${user_pk}`);

                    }).catch(error=>{
                        Swal.fire({
                            icon: "warning",
                            text: (error.response.data)
                        });


                    });



                } else {
                    Swal.fire({
                        icon: "warning",
                        text: (rsp.error_msg)
                    });
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
        axios.get('http://localhost:8282/user/information?user_pk='+user_pk)
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


    const goback=()=> {

        Swal.fire({
            title: '결제취소',
            text: "결제를 취소하시겠습니까?",
            icon: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '취소완료',
                    '결제가 취소되었습니다',
                    'success'
                )
                navi("/ticketing")
            }
        })



    }


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
            <div className={'payment'}>

            </div>

            <div className={'boxx'}>
                <div style={{width:'0',height:'20px'}}>

                    <input style={{display:'none'}} type={'text'} onChange={(e)=>(setBookSeatNum(e.target.value))}
                           disabled defaultValue={location.state.selected_seat}></input>

                    <br/>

                    <input style={{display:'none'}} type={'number'}  onChange={(e) => (
                        setScrTimePk(e.target.value)
                    )}
                           disabled defaultValue={timePk}
                    />
                    {/*<input type={'text'}  onChange={(e) => (*/}
                    {/*    setBookTheName(e.target.value)*/}
                    {/*)}*/}
                    {/*       disabled defaultValue={location.state.obj2.the_name}*/}
                    {/*/>*/}

                    <br/>

                    {/*<input type={'number'} onChange={(e) => (*/}
                    {/*    setBookAdultCnt(e.target.value)*/}
                    {/*)}defaultValue={location.state.adults} disabled*/}
                    {/*/>*/}
                    <br/>

                    {/*<input type={'number'}onChange={(e) => (*/}
                    {/*    setBookYouthCnt(e.target.value)*/}
                    {/*)}*/}
                    {/*       defaultValue={location.state.students} disabled*/}
                    {/*/>*/}
                    {/*<br/>*/}
                </div>

                <br/>
                <div className={'pbox'}>

                    <Age age={JSON.parse(mv).m_age_grd} size={20}/>  <b style={{color:'white'}}>{JSON.parse(mv).m_name}</b><br/>
                    {location.state.obj2.the_name} {location.state.obj3.scr_floor} {location.state.obj3.scr_name}<br/>
                    {location.state.movieData.calender}
                    &nbsp;<AccessTimeIcon style={{width:'7%', paddingBottom:'1%'}}/>{JSON.parse(location.state.movieData.time).scrt_time} {cal.scrt_stime.substring(0,5)}~{cal.scrt_etime.substring(0,5)}<br/>
                    성인{location.state.adults} 학생{location.state.students}<br/>



                    <input style={{display:'none'}} type={'text'} ref={userIdRef} onChange={(e) => (
                        userIdRef.current = e.target.value
                    )}
                           defaultValue={user_pk} disabled
                    />

                    <input className={'usepoint'} type={'number'} name={'point'} placeholder={"1000포인트부터 사용가능"} step={100}
                           disabled={dbData.u_point<1000} min={1000}
                           onBlur={(e)=>{
                               if (Number(e.target.value)>0 && Number(e.target.value)<1000)
                               {
                                   Swal.fire({
                                       icon:"warning",
                                       text:"1000포인트부터 사용가능합니다"
                                   })
                                   e.target.value='';
                                   setUsePoint(0);
                                   setSale(0);

                               }
                           }}
                           onChange={(e) => (

                               // compare =Number(e.target.value);


                               e.target.value<0?
                                   Swal.fire({
                                       icon:"warning",
                                       text:(e.target.value="0보다 작은 수는 입력할 수 없습니다")
                                   })

                                   :


                                   e.target.value.length<4?
                                       <></>
                                       :

                                       e.target.value>dbData.u_point?


                                           (
                                               Swal.fire({
                                                   icon:"warning",
                                                   text:(e.target.value='잔여포인트를 초과했습니다')
                                               }),

                                                   setUsePoint(e.target.value)
                                           )

                                           :


                                           Number(e.target.value)<1000 ?

                                               (
                                                   Swal.fire({
                                                       icon:"warning",
                                                       text:(e.target.value='1000 포인트부터 사용가능합니다')
                                                   }),
                                                       setUsePoint(e.target.value)

                                               )



                                               :

                                               setUsePoint(e.target.value),
                                   setSale(e.target.value)

                           )}
                    />

                    <br/>

                    보유포인트({dbData.u_point}p)
                    <br/>
                    {/*<select type={'number'} onChange={(e)=>(*/}
                    {/*     setDiscount(e.target.value),*/}
                    {/*         setUseCoupon(e.target.value),*/}
                    {/*        setChoiceCoupon(coupon[e.target.value])*/}
                    {/*)}*/}



                    {/*>*/}
                    <div className={'selectbox'}>

                    <select className={'select'} onChange={(e)=> {

                        const target =



                            coupon?.find((couponItem) => couponItem.coupon_pk === e.target.value)
                        if (target!=null){
                            setDiscount(target.c_amount)
                            setUseCoupon(target.c_amount)
                            setChoiceCoupon(target.coupon_pk)

                        }else{
                            setDiscount(0)
                            setUseCoupon(0)
                            setChoiceCoupon('N')
                        }



                    }
                    }

                    >
                        <option className={'cp'} value={"N"}>쿠폰선택</option>

                        {coupon &&
                            coupon.map((list,i)=>(

                                <option key={i} value={list.coupon_pk} >

                                    {list.c_class}
                                </option>


                            ))
                        }



                    </select>

                    </div>


                    {/*<input type={"text"} value={totalDiscount} readOnly />할인적용*/}
                    할인적용 {totalDiscount}
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


                    {/*<input type={'number'} ref={finalPriceRef}onChange={(e) => (*/}
                    {/*    finalPriceRef.current = e.target.value*/}
                    {/*)}*/}
                    {/*       value={final} disabled*/}
                    {/*/>*/}
                    최종금액    <span style={{color:'tomato'}}>{final}</span>
                    <br/>

                    <input style={{display:'none'}} type={'text'} ref={userNameRef}  onChange={(e) => (
                        userNameRef.current = e.target.value
                    )} defaultValue={sessionStorage.u_name} disabled /><br/>
                    <input  style={{display:'none', margin:'0', width:'0'}} type={'text'} ref={userPhoneRef}  onChange={(e) => (
                        userPhoneRef.current = e.target.value
                    )}
                           defaultValue={dbData.u_phone} disabled
                    /><br/>
                    <input  style={{display:'none', margin:'0', width:'0'}} type={'email'} ref={userEmailRef}  onChange={(e) => (
                        userEmailRef.current = e.target.value
                    )}
                           defaultValue={sessionStorage.u_id} disabled
                    /><br/>

                </div>
                <img src={`https://image.tmdb.org/t/p/w500${poster}`} className={'payposter'}/>
            </div>


            {/*<div className={'btns'}>*/}
                <button className={'btn1'} onClick={goback}> 취소하기</button>
                <button className={'btn2'} onClick={requestPay}>결제하기</button>
            {/*</div>*/}

        </>
    );
}
export default Payment;
