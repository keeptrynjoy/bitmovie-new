import React, {useState} from 'react';
import './TimeTable.css';

const TimeTable = (props) => {

    const [table,setTable]= useState(Array.from({ length: 5 }))
    const {input, setInput, changeData}=props;

    return (
        <div>
            {table.map((list,i)=>(
                <div key={i}>
                    <button key={i} value={i+1} className={"time-table"} name={"time"} onClick={changeData}  >상영시간표</button>
                </div>

                ))}
        </div>
    );
};

export default TimeTable;