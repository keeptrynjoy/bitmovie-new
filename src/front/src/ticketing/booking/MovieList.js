import React, {useState} from 'react';
import './MovieList.css';
import age from './bookingIMG/15age.png';

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

    }

    console.log(mvnum);

    const imgUrl = './ex'


    return (


        <div>
            {mvlist.map((list,i) => (
                <ul>
                    <li style={{listStyle:'none'}} >
                        <div>
                            <img src={age} style={{width:'30px', float:'left'}}/>
                        </div>
                <button key={i} className={'mvbtn'} value={i+1} name={'mvnum'}onClick={handleOnClick}>DB에서 넘어올 영화리스트</button>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default MovieList;