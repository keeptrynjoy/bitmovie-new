import React from 'react';
import {Route, Routes} from "react-router-dom";
import MovieDetail from "../movie/detail/MovieDetail";
import MovieReview from "../movie/detail/MovieReview";
import MovieList from "../movie/list/MovieList";
import MovieTimeTable from "../movie/timetable/MovieTimeTable";

function MovieRouter(props) {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<MovieList/>}/>
                <Route path={"detail/:movie_num"} element={<MovieDetail/>}/>
                <Route path={"timetable/:table_num"} element={<MovieTimeTable/>}/>
                <Route path={"*"} element={
                    <div>
                        <h1>404떳다</h1>
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default MovieRouter;