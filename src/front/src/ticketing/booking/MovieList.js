import React, {useState} from 'react';
import './MovieList.css'

const MovieList = () => {

    const [mvlist,setMvlist] = useState(Array.from({ length: 80 }));

    const [mvnum,setMvnum] = useState({
        movieNum: "",
    })

    const handleOnClick = (e) => {
        setMvnum({
        ...mvnum,
        [e.target.name]:e.target.value
        })
        console.log(mvnum);
    }

    return (


        <div>
            {mvlist.map((list,i) => (
                <ul>
                    <li style={{listStyle:'none'}} >
                <button key={i} className={'mvbtn'} value={i+1} name={'mvnum'}onClick={handleOnClick}>DB에서 넘어올 영화리스트</button>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default MovieList;