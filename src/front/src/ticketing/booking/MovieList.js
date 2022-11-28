import React, {useState, useEffect} from 'react';
import './MovieList.css'
import axios from "axios";
import Age from "../../service/Age";
import {CircularProgress} from "@mui/material";







const MovieList = (props) => {

    const {input,setInput,changeData}=props;
    const [mvlist,setMvlist] = useState([]);
    const [loading,setLoading]=useState(true);


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


    useEffect(()=>{

        get();

    },[]);




    return (


        <div>

            <div className={'mvcolor'}>
               <button className={'mvbtn1'} onClick={get} style={{marginLeft:'10%', backgroundColor:'white', fontSize:'15px',marginBottom:'0px',marginTop:'5%'}}>이름순</button>
                <button className={'mvbtn1'} onClick={get2} style={{marginLeft:'20px', backgroundColor:'white', fontSize:'15px',marginBottom:'0px'}}><p style={{marginBottom:'0', fontSize:'15px'}}>예매율순</p></button>
                <button className={'mvbtn1'} onClick={get3} style={{marginLeft:'20px', backgroundColor:'white', fontSize:'15px',marginBottom:'0px'}}>평점순</button>
                <hr/>
                {
                    loading ?
                        <div style={{display:"flex",justifyContent:"center",alignItems:'center', height:'400px'}}>
                            <CircularProgress/>
                        </div>
                        :


                            mvlist.map((list, i) => (
                                <ul key={i} style={{paddingLeft: '15px', marginBottom: '5px'}}>
                                    <li style={{listStyle: 'none', width: '400px', wordBreak: 'break-all'}}>

                                        {/*<img src={age} style={{width:'30px', float:'left'}}/>*/}

                                        <button className={'mvbtn'} key={i} style={{fontSize: '15px'}}
                                                onClick={changeData} value={JSON.stringify(list)} name={'movie'}>
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