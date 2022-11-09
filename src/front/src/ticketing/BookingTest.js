import React, {useState} from 'react';
import axios from "axios";

function BookingTest(props) {
    const [movie,setMovie] = useState('');

    const onClickMovie=(e)=>{
        let url = process.env.REACT_APP_URL;
        setMovie(e.target.value);
        console.log(movie);
        axios.get(url+"/screentime/test?movie="+movie)
            .then(res=>{
                alert(res.data);
            })
    }

    return (
        <div>
            <button value={1} onClick={onClickMovie}>블랙팬서</button>
        </div>
    );
}

export default BookingTest;