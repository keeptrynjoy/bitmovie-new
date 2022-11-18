import React, {useState} from 'react';
import './MovieList.css'

const MovieList = () => {

    const [mvlist,setMvlist] = useState(Array.from({ length: 80 }));



    return (


        <div>
            {mvlist.map((list,i) => (
                <button key={i} className={'mvbtn'} value={i+1}>DB에서 넘어올 영화리스트</button>
            ))}
        </div>
    );
};

export default MovieList;