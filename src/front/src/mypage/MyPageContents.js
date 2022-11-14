import React from 'react';

const booking=()=>{
    return (
        <div>
            booking
        </div>
    )
}



function MyPageContents(props) {
    const contents=props.contents;

    const contentSelector =()=>{
        switch (contents) {
            case "booking":
                return booking();
        }
    }

    return (
        <div>
            {
                contentSelector()
            }
        </div>
    );
}

export default MyPageContents;