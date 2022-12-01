import React, {useEffect, useState} from 'react';
import "./Ticketing.css";
import {useNavigate} from "react-router-dom";
import dateFns from "url";
import Calender from "./Calender";
import MovieList from "./MovieList";
import Location from "./Location";
import TimeTable from "../timetable/TimeTable";
import Swal from "sweetalert2";
import moment from "moment";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from "axios";
import {CircularProgress} from "@mui/material";

function Ticketing(props) {

    const [st,setSt]=useState(false);
    const refresh=()=>{
        window.location.reload();
    }


    const navi = useNavigate();
    const today= moment().format("yyyy-MM-DD");
    const [input,setInput]=useState({
        movie:"",
        calender:today,
        location:"",
        time: ""
    });




    const changeData=(e)=>{
        let {name,value}=e.target;
        setInput({
                ...input, //기존의 inputs 객체 복사해서 넣음(펼침 연산자)
                [name]:value //name키에 입력값넣기
            }
        )
        setSt(!st);

    }


    // const data = input.location;
    //
    // console.log(data,'shit');











    const checkId=()=> {

        if (sessionStorage.user_pk != null){
            if(JSON.parse(input.movie).m_age_grd>=18){
                Swal.fire({
                    icon: "warning",
                    text: "18세 이상 관람 영화입니다 입장 전 신분증 확인을 할 수 있으니 이용에 차질 없으시길 바랍니다"
                })

            }
            goSeat();
        }

        else
            Swal.fire({
                icon: "warning",
                text: "로그인이 필요합니다"
            })

    }





    const goSeat = ()=> {




        if (input.movie===''){
            Swal.fire({
                icon:"warning",
                text:"영화를 선택해주세요"
            })

            return

        }
        if (input.location===''){
            Swal.fire({
                icon:"warning",
                text:"상영관을 선택해주세요"
            })
            return
        }
        if (input.calender===''){
            Swal.fire({
                icon:"warning",
                text:"예매 날짜를 선택해주세요"
            })
            return
        }
        if (input.time===''){
            Swal.fire({
                icon:"warning",
                text:"상영시간을 선택해주세요"
            })
            return
        }
        //
        // if (input.length===3)
        // {

        // if (sessionStorage.u_id !==)

            navi("/ticketing/selectseat", {
                state: {
                    input: input
                },

            });

        // }else{
        //         Swal.fire({
        //             icon:"warning",
        //             text:"잘 선택해"
        //         })
        // }


    }

    useEffect(()=>{
        get();
    },[])


    useEffect(()=>{
        console.log(input,'뭘까');

    },[input]);
    const [mvlist,setMvlist] = useState([]);
    const [loading,setLoading]=useState(true);
    const [color, setColor] = useState("");

    const get=()=>{
        setLoading(true);
        axios.get('http://localhost:8282/booking/screening_list?BorA=after')
            .then((response) =>{
                setMvlist(response.data);
                setLoading(false);
            });
    }

    const get2=()=>{
        setLoading(true);
        axios.get('http://localhost:8282/booking/screening_list?order_stand=reserve_rate&BorA=after')
            .then((response) =>{
                setMvlist(response.data);
                setLoading(false);

            });
    }

    const get3=()=>{
        setLoading(true);
        axios.get('http://localhost:8282/booking/screening_list?order_stand=revw_avgstar&BorA=after')
            .then((response) =>{
                setMvlist(response.data);
                setLoading(false);

            });
    }

    console.log(typeof input.location,'타입');

    const index = () => {
        return <div>{dateFns.format(new Date(), "yyyy-MM-dd")}</div>;
    };
    return (
        <div className={'whole'}>

            <div className={'tktable'}>

                <div className={'tkbt'}>
                    {/*<button className={'tkmenu'} onClick={()=> navi("/ticketing/timetable")}>상영시간표</button>*/}
                    <button className={'tkmenu2'} onClick={()=>refresh()}>예매 다시하기</button>
                </div>
                <div className={'together'}>
                    <div className={'newMv'}>
                        <button className={'mvbtn1'} onClick={get} style={{marginLeft:'13%', backgroundColor:'white', fontSize:'15px',marginBottom:'0px',marginTop:'5%'}}>이름순</button>
                        <button className={'mvbtn1'} onClick={get2} style={{marginLeft:'20px', backgroundColor:'white', fontSize:'15px',marginBottom:'0px'}}><p style={{marginBottom:'0', fontSize:'15px'}}>예매율순</p></button>
                        <button className={'mvbtn1'} onClick={get3} style={{marginLeft:'20px', backgroundColor:'white', fontSize:'15px',marginBottom:'0px'}}>평점순</button>

                    <div className={'selectmv'}>
                        {
                            loading ?
                                <div style={{display:"flex",justifyContent:"center",alignItems:'center', height:'400px'}}>
                                    <CircularProgress color={"inherit"}/>
                                </div>
                                :
                        <MovieList input={input} setInput={setInput} get={get} get2={get2} get3={get3} mvlist={mvlist} setMvlist={setMvlist} changeData={changeData}/>
                            }
                    </div>
                    </div>
                    <div className={"movielocation"}>
                        <Location input={input} setInput={setInput} changeData={changeData} />
                    </div>
                    <div className={'selectday'}><Calender input={input} setInput={setInput} changeData={changeData} /></div>

                    <div className={'selecttime'}><TimeTable input={input} setInput={setInput} changeData={changeData} st={st}/></div>
                </div>
                {/*<button type={"button"} className={'selectseat'} onClick={() => navi("/ticketing/selectseat",{input, setInput})} input={input} setInput={setInput} changeData={changeData} >좌석선택</button>*/}

                <div className={'step'}>

                    <div className={'moviestep'}><b>선택 영화</b> <DoubleArrowIcon style={{marginBottom:'4px'}}/> <span style={{color:'gray'}}>{input.movie && JSON.parse(input.movie).m_name}</span></div>
                    <div className={'locationstep'}><b>선택 상영관</b> <DoubleArrowIcon style={{marginBottom:'4px'}}/> <span style={{color:'gray'}}>{input.location && JSON.parse(input.location).the_name}</span></div>
                    <div className={'daystep'}><b>선택 날짜</b> <DoubleArrowIcon style={{marginBottom:'4px'}}/> <span style={{color:'gray'}}> {input.calender && input.calender}</span></div>
                    <div className={'timestep'}><b>선택 시간대</b> <DoubleArrowIcon style={{marginBottom:'4px'}}/> <span style={{color:'gray'}}>{input.time && JSON.parse(input.time).scrt_stime.substring(0,5)}&nbsp;
                        {input.time && JSON.parse(input.time).scr_name}{input.time && JSON.parse(input.time).scr_floor}</span></div>

                </div>

                <button type={"button"} className={'selectseat'} onClick={checkId} >좌석선택</button>
            </div>




        </div>
    );
}

export default Ticketing;