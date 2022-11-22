import React from 'react';
import moment from "moment/moment";

function MovieLog(props) {
    const list = props.movie_log;
    return (
        <div className={"movie-log"}>
            <div className={"mypage-contents-title"}>
                무비로그
            </div>
            <ul className={"movie-log-list"}>
                {
                    list && list.map((item,i)=>(
                            <li key={i}>
                                <div className={"article-movie-info"}>
                                    <div className={"box-image"}>
                                        <span className={"thumb-image"}>
                                            <img alt={""} src={`https://image.tmdb.org/t/p/w500${item.poster.split(",")[0]}`}/>
                                        </span>
                                    </div>
                                    <div className={"box-contents"}>
                                        <div className={"movie-title"}>
                                            <div className={"movie-title-kr"}>{item.title}</div>
                                            <p>{item.engtitle}</p>
                                        </div>
                                        <div className={"movie-date"}>
                                            {moment(item.date).format("YYYY-MM-DD")} {item.begin.substring(0, item.begin.length - 3)} ~ {item.endtime.substring(0, item.endtime.length - 3)}
                                        </div>
                                        <div className={"movie-theater"}>
                                            {item.theater} {item.screen} / 성인: {item.adult}명, 청소년: {item.youth}명
                                        </div>
                                        <div className={"movie-comment"}>
                                            이 영화를 평가 해주세요~
                                        </div>
                                    </div>
                                </div>

                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}

export default MovieLog;