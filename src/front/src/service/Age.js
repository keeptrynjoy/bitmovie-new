import React from 'react';
import age0 from "../image/age_0.png"
import age12 from "../image/age_12.png"
import age15 from "../image/age_15.png"
import age19 from "../image/age_19.png"
import noimage from "../image/noimg.png"

function Age(props) {
    const age = props.age;
    const size = props.size;

    return (
        <span>
            <img alt={age}
                 src={age==="0"?age0:age==="12"?age12:age==="15"?age15:age==="19"?age19:noimage}
                 style={{width:`${size}px`,height:`${size}px`}}
            />
        </span>
    );
}

export default Age;