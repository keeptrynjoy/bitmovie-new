import React, {useEffect, useState} from 'react';
import './Location.css';
import axios from "axios";
const Location = (props) => {
    const [mloc,setMloc] = useState([]);
    const {input,setInput,changeData}=props;

    const get=()=>{
        axios.get('http://localhost:8282/theater/')
            .then((response) =>{
                setMloc(response.data);
                console.log(response.data);

            });
    }

    useEffect(()=>{

        get();

    },[]);


    return (
        <div>
            <p style={{paddingLeft:'20px', paddingTop:'10px',fontSize:'20px', textAlign:'left'}}>극장</p>
            {mloc.map((list,i)=>(
                <ul key={i} style={{paddingLeft:'21px'}}>
                    <li style={{listStyle:'none', width:'100px', paddingLeft:'0'}}>
                <button key={i} value={JSON.stringify(list)} style={{fontSize:'15px',textAlign:'left',width:'100px'}} className={'lcbtn'} name={'location'} onClick={changeData}>{list.the_name}</button>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Location;