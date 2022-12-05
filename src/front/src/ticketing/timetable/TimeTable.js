import React, {useEffect, useState} from 'react';
import './TimeTable.css';
import axios from "axios";
import calender from "../booking/Calender";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowRight} from "@material-ui/icons";
// import {styled} from "@mui/material/styles";
// import {Tooltip, tooltipClasses} from "@mui/material";
// import {TooltipProps} from "@mui/material";



// const [bookedSeat,setBookedSeat]=useState("");
// const movieData= location.state.input;


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
    // const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    //     <Tooltip {...props} classes={{ popper: className }}
    //         // arrow
    //              placement={"top"}/>
    // ))(({ theme }) => ({
    //     [`& .${tooltipClasses.tooltip}`]: {
    //         backgroundColor: theme.palette.common.white,
    //         color: 'rgba(0, 0, 0, 0.87)',
    //         boxShadow: theme.shadows[1],
    //         fontSize: 11,
    //         width:"150px",
    //         height:"160px",
    //         border:"1px solid black"
    //     },
    //
    // }));


    //
    //
    // const obj = JSON.parse(movieData.movie);
    // const obj2 = JSON.parse(movieData.location);
    // const obj3 = JSON.parse(movieData.time);



    // useEffect(()=>{
    //
    //     take();
    //
    //
    // },[])
    //
    // const take=()=> {
    //     //     axios.get(`http://localhost:8282/booking/reserved_seat?screentime=${obj3.scrtime_pk}`)
    //     axios.get(`http://localhost:8282/booking/reserved_seat?screentime=${obj3.scrtime_pk}`)
    //         .then((res) => {
    //             setBookedSeat(res.data);
    //             // console.log('?',res.data);
    //         }).catch((error) => {
    //         console.log('예매된 좌석이 없습니다')
    //     });
    // }


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
                input.location != "" && input.movie != "" && table.length == 0 ?
                    <div style={{
                        width: '43%',
                        fontSize: '20px',
                        margin: 'auto',
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: '35%'
                    }}>해당 날짜에 상영중인 영화가 존재하지 않습니다</div>

                    :

                    table.map((list, i) => (
                        <ul key={i}>
                            <li style={{listStyle: 'none'}}>
                                {/*<button key={i} name={'time'} value={(list.scrt_detail[i].scrt_stime,list.scrt_detail[i].scrt_etime)} onClick={changeData} style={{fontSize:'25px', backgroundColor:'white', border:'1px solid black'}}>*/}

                                <button className={'ttt'} key={i} name={'time'} value={JSON.stringify(list)}
                                        onClick={changeData} style={{
                                    fontSize: '15px',
                                    border: '1px solid lightgray',
                                    height: '50%',
                                    width:'30%',
                                    justifyContent: 'center',
                                    float:'left',
                                    margin:'5px',
                                    marginTop:'6%'
                                }}>
                                    {/*<span disabled*/}
                                    {/*      style={{fontSize: '15px', color:'gray'}}>*/}
                                        {list.scr_floor} {list.scr_name}<br/>
                                    {/*</span><br/>*/}
                                    {/*{list.scrt_detail[i].scrt_stime.substring(0,5)}~{list.scrt_detail[i].scrt_etime.substring(0,5)}*/}

                                   {/*<span style={{fontSize:'15px',color:'black'}}>*/}
                                       {list.scrt_stime.substring(0, 5)}<br/>
                                   {/*</span> <br/>*/}
                                    {/*{list.scrt_stime.substring(0,5)}~{list.scrt_etime.substring(0,5)}<br/>*/}
                                    {/*<span disabled style={{*/}

                                        {/*// fontSize: '15px',*/}
                                        {/*// fontStyle: 'italic'*/}
                                    {/*// }}><span  disabled style={{color:'darkgreen'}}>*/}
                                        {list.booked}/{list.scr_tot_seat}
                                    {/*</span>*/}
                                    {/*    /*/}

                                    {/*석</span>*/}


                                </button>
                            </li>
                        </ul>
                    ))
            }

            {/*<div className={"screens"}>*/}
            {/*    <LightTooltip key={k}*/}
            {/*                  title={*/}
            {/*                      <React.Fragment>*/}
            {/*                          <div className={"mini-theater"}>*/}
            {/*                              <div className={"mini-theater-upper"}>*/}
            {/*                                  <div style={{fontSize:"1.5em",marginTop:"3px"}}>*/}
            {/*                                      {list.scr_name}*/}
            {/*                                  </div>*/}
            {/*                                  <div>*/}
            {/*                                  </div>*/}
            {/*                              </div>*/}
            {/*                              <div className={"mini-theater-map"}>*/}
            {/*                                  <div className={"mini-container"}>*/}
            {/*                                      <div className={"mini-screen"}>SCREEN</div>*/}
            {/*                                      <div className={"mini-seats"} onClick={()=>{*/}
            {/*                                      }*/}
            {/*                                      }>*/}
            {/*                                          {*/}
            {/*                                              getPlot("A").map((row,r)=>(*/}
            {/*                                                  <React.Fragment key={r}>*/}
            {/*                                                      {*/}
            {/*                                                          row.map((list,c)=>(*/}
            {/*                                                              <div key={c} className={"mini-seat"}*/}
            {/*                                                                   onClick={()=>{*/}
            {/*                                                                   }}*/}
            {/*                                                                   style={{*/}
            {/*                                                                       top:`${parseInt(r)*6}px`,*/}
            {/*                                                                       left:`${parseInt(c)*6}px`,*/}
            {/*                                                                       border:`${parseInt(c)===2 || parseInt(c)===9?"":"1px solid gray"}`,*/}
            {/*                                                                       backgroundColor:`${String(bookedSeat).includes(list)?"gray":"white"}`*/}
            {/*                                                                   }}>*/}
            {/*                                                                  <span></span>*/}
            {/*                                                              </div>*/}
            {/*                                                          ))*/}
            {/*                                                      }*/}
            {/*                                                  </React.Fragment>*/}
            {/*                                              ))*/}
            {/*                                          }*/}
            {/*                                      </div>*/}
            {/*                                  </div>*/}
            {/*                              </div>*/}
            {/*                              <div className={"mini-theater-under"}>*/}
            {/*                                  {list.scrt_stime.substring(0,5)} ~ {list.scrt_etime.substring(0,5)}*/}
            {/*                              </div>*/}
            {/*                          </div>*/}
            {/*                      </React.Fragment>*/}
            {/*                  }>*/}
            {/*        <div className={"time"} >*/}
            {/*            <div className={"time-upper"}>*/}
            {/*                {list.scrt_stime.substring(0,5)}*/}
            {/*            </div>*/}
            {/*            <div className={"time-under"}>*/}
            {/*                <div>*/}
            {/*                    {parseInt(screen.list.scr_tot_seat)-parseInt(bookedSeat)}석*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </LightTooltip>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*// }*/}

            {/*{table.map((list,i)=>(*/}
            {/*    <div key={i}>*/}
            {/*        <button key={i} value={i+1} className={"time-table"} name={"time"} onClick={changeData}>상영시간표</button>*/}
            {/*    </div>*/}

            {/*    ))}*/}
        </div>
    );
};

export default TimeTable;