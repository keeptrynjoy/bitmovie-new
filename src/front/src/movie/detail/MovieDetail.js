import React from 'react';
import {useParams} from "react-router-dom";

function MovieDetail(props) {
    const p = useParams();
    return (
        <div>
            <h1>상세페이지</h1>
            <h2>{p.movie_num}번</h2>
        </div>
    );
}

export default MovieDetail;