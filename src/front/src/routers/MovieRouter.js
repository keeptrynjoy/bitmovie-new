import React from 'react';
import {Route, Routes} from "react-router-dom";
import MovieDetail from "../movie/detail/MovieDetail";
import MovieList from "../movie/list/MovieList";

function MovieRouter(props) {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<MovieList/>}/>
                <Route path={"detail/:movie_num"} element={<MovieDetail/>}/>
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