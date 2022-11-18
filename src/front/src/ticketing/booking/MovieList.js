import React, {useState, useEffect} from 'react';
import './MovieList.css';
import age from './bookingIMG/15age.png';
import axios from "axios";

const MovieList = () => {

    // const [mvlist,setMvlist] = useState(Array.from({ length: 80 }));
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




    // const [mvnum,setMvnum] = useState({
    //     movieNum: "",
    // })

    // const handleOnClick = (e) => {
    //     setMvnum({
    //     ...mvnum,
    //     [e.target.name]:e.target.value
    //     })
    //
    // }
    //
    // console.log(mvnum);









    return (


        <div>
            {/*{mvlist.map((list,i) => (*/}
            {/*    <ul>*/}
            {/*        <li style={{listStyle:'none'}} >*/}
            {/*            <div>*/}
            {/*                <img src={age} style={{width:'30px', float:'left'}}/>*/}
            {/*            </div>*/}
            {/*    <button key={i} className={'mvbtn'} value={i+1} name={'mvnum'}onClick={handleOnClick}>DB에서 넘어올 영화리스트</button>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*))}*/}
            <div>
                {mvlist.map((list,i)=>(
                    <ul>
                        <li style={{listStyle:'none'}}>
                            <div>
                                <img src={age} style={{width:'30px', float:'left'}}/>
                            </div>
                    <button className={'mvbtn'} key={i} style={{fontSize:'15px'}} value={i+1}>
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