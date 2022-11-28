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

            {
                table &&
                // table[1]!==null && table[?
                // input.length==5 && table.length==0?
                input.location != "" && input.movie != "" && table.length==0 ?
                    <div style={{width:'43%', fontSize:'20px' , margin:'auto', alignItems:'center', display:'flex', marginTop:'35%'}}>해당 날짜에 상영중인 영화가 존재하지 않습니다</div>

                    :

                    table.map((list,i)=>(
                        <ul key={i}>
                            <li style={{listStyle:'none'}}>
                                {/*<button key={i} name={'time'} value={(list.scrt_detail[i].scrt_stime,list.scrt_detail[i].scrt_etime)} onClick={changeData} style={{fontSize:'25px', backgroundColor:'white', border:'1px solid black'}}>*/}

                                <button className={'ttt'} key={i} name={'time'} value={JSON.stringify(list)} onClick={changeData} style={{fontSize:'20px', border:'1px solid black', height:'50%', justifyContent:'center'}}>
                                    <span style={{fontSize:'15px'}}>{list.scr_name} {list.scr_floor}</span><br/>
                                    {/*{list.scrt_detail[i].scrt_stime.substring(0,5)}~{list.scrt_detail[i].scrt_etime.substring(0,5)}*/}

                               {list.scrt_stime.substring(0,5)}~{list.scrt_etime.substring(0,5)}<br/>
                                    <span style={{color:'gray', fontSize:'15px', fontStyle:'italic'}}>{list.scr_tot_seat}석</span>

                                </button>
                            </li>
                        </ul>
                    ))
            }


            {/*{table.map((list,i)=>(*/}
            {/*    <div key={i}>*/}
            {/*        <button key={i} value={i+1} className={"time-table"} name={"time"} onClick={changeData}>상영시간표</button>*/}
            {/*    </div>*/}

            {/*    ))}*/}
        </div>
    );
};

export default TimeTable;