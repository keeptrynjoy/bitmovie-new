import React, {useState} from 'react';

const MovieList = () => {

    const [mvlist,setMvlist] = useState(Array.from({ length: 80 }));



    return (


        <div>
            {mvlist.map((list,i) => (
                <div key={i}>DB에서 넘어올 영화리스트</div>
            ))}
        </div>
    );
};

export default MovieList;