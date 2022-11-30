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











    const checkId=()=>{

        if (sessionStorage.user_pk!=null)
        goSeat();
        else
            alert("로그인 부탁드려요!")

    }



    const goSeat = ()=> {




        if (input.movie===''){
            Swal.fire({
                icon:"warning",
                text:"영화선택해"
            })

            return

        }
        if (input.location===''){
            Swal.fire({
                icon:"warning",
                text:"위치선택해"
            })
            return
        }
        if (input.calender===''){
            Swal.fire({
                icon:"warning",
                text:"상영일선택해"
            })
            return
        }
        if (input.time===''){
            Swal.fire({
                icon:"warning",
                text:"상영시간선택해"
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
        console.log(input,'뭘까');
    },[input]);

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
                    <div className={'selectmv'}>
                        <MovieList input={input} setInput={setInput} changeData={changeData}/>
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