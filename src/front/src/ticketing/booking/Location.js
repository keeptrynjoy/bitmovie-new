import React, {useState} from 'react';
import './Location.css';
const Location = (props) => {
    const [mloc,setMloc] = useState(Array.from({length:5}));
    const {input,setInput,changeData}=props;

    return (
        <div>
            {mloc.map((list,i)=>(
                <ul key={i}>
                    <li style={{listStyle:'none'}}>
                <button key={i} value={i} style={{fontSize:'15px'}} className={'lcbtn'} name={'location'} onClick={changeData}>DB에서 받을 극장리스트</button>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Location;