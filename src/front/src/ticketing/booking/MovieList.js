import React, {useState, useEffect} from 'react';
import './MovieList.css';
import age from './bookingIMG/15age.png';
import axios from "axios";

const MovieList = (props) => {

    const {input,setInput,changeData}=props;


    const [mvlist,setMvlist] = useState([]);

    const get=()=>{
        axios.get('http://localhost:8282/booking/screening_list')
            .then((response) =>{
                setMvlist(response.data);

            });
    }

    useEffect(()=>{

        get();

    },[]);


    return (


        <div>

            <div className={'mvcolor'}>
                {mvlist.map((list,i)=>(
                    <ul>
                        <li style={{listStyle:'none'}}>
                            <div>
                                <img src={age} style={{width:'30px', float:'left'}}/>
                            </div>
                    <button className={'mvbtn'} key={i} style={{fontSize:'15px'}} value={JSON.stringify(list)} name={'movie'} onClick={changeData} >
                        {list.m_name}
                    </button>
                        </li>
                    </ul>
                ))}
            </div>

        </div>
    );
};

export default MovieList;