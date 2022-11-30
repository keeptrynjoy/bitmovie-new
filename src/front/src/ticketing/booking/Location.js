import React, {useEffect, useState} from 'react';
import './Location.css';
import axios from "axios";
const Location = (props) => {
    const [mloc,setMloc] = useState([]);
    const {input,setInput,changeData}=props;
    const [color, setColor] = useState("");
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

    const onChangeTitleBg = (list) => {

        setColor(list);

        if (list === color)
            setColor("");



    };

    return (
        <div>
            <p style={{ paddingTop:'10px',fontSize:'20px', textAlign:'center'}}>극장</p>
            <hr style={{color:'black'}}/>
            {mloc.map((list,i)=>(
                <ul key={i} style={{padding:'0' , textAlign:'center'}}>
                    <li style={{listStyle:'none', width:'100px', clear:'both', textAlign:'center', marginLeft:'13%'}}>
                <button key={i} value={JSON.stringify(list)} style={{fontSize:'15px',textAlign:'center',width:'100px', margin:'0,auto'}} className={color === list ? "select-clicked" : "select-default"} name={'location'} onClick={(e)=>{

                    onChangeTitleBg(list)
                    changeData(e)}
                }>{list.the_name}</button>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Location;