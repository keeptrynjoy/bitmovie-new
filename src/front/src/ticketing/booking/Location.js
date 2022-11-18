import React, {useState} from 'react';
import './Location.css';
const Location = () => {
    const [mloc,setMloc] = useState(Array.from({length:5}));

    return (
        <div>
            {mloc.map((list,i)=>(
                <ul>
                    <li style={{listStyle:'none'}}>
                <button key={i} value={i+1} style={{fontSize:'15px'}} className={'lcbtn'}>DB에서 받을 극장리스트</button>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Location;