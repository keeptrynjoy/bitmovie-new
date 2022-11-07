import React from 'react';
import {useParams} from "react-router-dom";

function MovieReview(props) {
    const p = useParams();
    return (
        <div>
            <h1>영화리뷰</h1>
            <h2>{p.review_num}번째 영화리뷰입니다</h2>
        </div>
    );
}

export default MovieReview;