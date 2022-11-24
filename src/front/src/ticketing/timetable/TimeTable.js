import React, {useEffect, useState} from 'react';
import './TimeTable.css';
import axios from "axios";
import calender from "../booking/Calender";
import {useLocation, useNavigate} from "react-router-dom";







const TimeTable = (props) => {

    const {st}=props;
    // const navi=useNavigate();
    // const location = useLocation();
    const [table,setTable]= useState([])
    const {input, setInput, changeData}=props;
    // const movieData= location.state.input;

    // const obj = JSON.parse(movieData.movie);
    // console.log(obj);
    // console.log('?',input.calender);



    const day=input.calender;
    const mv=JSON.stringify(input.movie);
    const location= JSON.stringify(input.location);

    // console.log('showMV',mv.substring(14,21));

    // console.log('showmeloc',location.substring(17,18));

    const loc=location.substring(17,18);
    const mvpk=mv.substring(15,21);
    console.log('상영지역',loc);
    console.log('영화pk',mvpk);
    console.log('달력',day);


    useEffect(()=>{
        console.log('확인해보자');
        get();
    },[st])

    const get=()=>{
        if (mvpk.length ===0 || loc.length ===0 || day.length ===0)
        {
            console.log('값이 없어서 실행못함');
            return;
        }

        axios.get(`http://localhost:8282/screentime/screen_times?movie=${mvpk}&theater=${loc}&date=${day}`)
            .then((response) =>{
                setTable(response.data);

            });
    }




    console.log('정보가져옴',table);

    return (
        <div>
            <button onClick={get}>저장해보자</button>
            {/*{table.map((list,i)=>(*/}
            {/*    <div key={i}>*/}
            {/*        <button key={i} value={i+1} className={"time-table"} name={"time"} onClick={changeData}>상영시간표</button>*/}
            {/*    </div>*/}

            {/*    ))}*/}
        </div>
    );
};

export default TimeTable;