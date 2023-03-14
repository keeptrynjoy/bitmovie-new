import React, {useState, useEffect} from 'react';
import './MovieList.css'
import axios from "axios";
import Age from "../../service/Age";
import {CircularProgress} from "@mui/material";







const MovieList = (props) => {

    const {input,setInput,changeData,get2,get3,mvlist,setMvlist}=props;
    // const [mvlist,setMvlist] = useState([]);
    const [loading,setLoading]=useState(true);
    const [color, setColor] = useState("");

    const get=()=>{
        setLoading(true);
        axios.get(`${localStorage.url}/booking/screening_list?BorA=after`)
            .then((response) =>{
                setMvlist(response.data);
                setLoading(false);
            });
    }

    //
    // const get2=()=>{
    //     setLoading(true);
    //     axios.get('http://localhost:8080/booking/screening_list?order_stand=reserve_rate&BorA=after')
    //         .then((response) =>{
    //             setMvlist(response.data);
    //             setLoading(false);
    //
    //         });
    // }
    //
    // const get3=()=>{
    //     setLoading(true);
    //     axios.get('http://localhost:8080/booking/screening_list?order_stand=revw_avgstar&BorA=after')
    //         .then((response) =>{
    //             setMvlist(response.data);
    //             setLoading(false);
    //
    //         });
    // }


    useEffect(()=>{

        get();


    },[]);


    const onChangeTitleBg = (list) => {

        setColor(list);
        if (list === color)

            setColor("");



    };





    return (


        <div>

            <div className={'mvcolor'}>
                {/*<button className={'mvbtn1'} onClick={get} style={{marginLeft:'10%', backgroundColor:'white', fontSize:'15px',marginBottom:'0px',marginTop:'5%'}}>이름순</button>*/}
                {/*<button className={'mvbtn1'} onClick={get2} style={{marginLeft:'20px', backgroundColor:'white', fontSize:'15px',marginBottom:'0px'}}><p style={{marginBottom:'0', fontSize:'15px'}}>예매율순</p></button>*/}
                {/*<button className={'mvbtn1'} onClick={get3} style={{marginLeft:'20px', backgroundColor:'white', fontSize:'15px',marginBottom:'0px'}}>평점순</button>*/}
                {
                    loading ?
                        <div style={{display:"flex",justifyContent:"center",alignItems:'center', height:'400px'}}>
                            <CircularProgress color={"inherit"}/>
                        </div>
                        :
                        mvlist.map((list, i) => (
                    <ul key={i} style={{paddingLeft: '15px', marginBottom: '5px'}}>
                    <li style={{listStyle: 'none', width: '400px', wordBreak: 'break-all'}}>

                {/*<img src={age} style={{width:'30px', float:'left'}}/>*/}

                    <button className={
                        color === list ? "select-clicked" : "select-default"
                } key={i} style={{fontSize: '15px'}}
                    onClick={(e)=>{

                    onChangeTitleBg(list)
                    changeData(e)}

                }

                    value={JSON.stringify(list)} name={'movie'}>
                    <Age age={list.m_age_grd} size={20}/>&nbsp;
                    <div style={{width: '200px'}} className={'txt'}>&nbsp;{list.m_name}</div>
                    </button>

                    </li>
                    </ul>
                    ))
                }
            </div>

        </div>
    );
};

export default MovieList;