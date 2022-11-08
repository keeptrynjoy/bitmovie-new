import React from 'react';

function Home(props) {
    localStorage.url=process.env.REACT_APP_URL;
    return (
        <div>
            <h1>메인페이지</h1>
        </div>
    );
}

export default Home;