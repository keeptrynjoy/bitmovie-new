import React, {useState} from 'react';
import './Location.css';
const Location = () => {
    const [mloc,setMloc] = useState(Array.from({length:5}));

    return (
        <div>
            {mloc.map((list,i)=>(
                <button key={i} value={i+1} style={{fontSize:'15px'}} className={'lcbtn'}>DB에서 받을 극장리스트</button>
            ))}
        </div>
    );
};

export default Location;