import React from 'react';
import "./Footer.css"
import logo from "../image/bitmovielogo.png";

function Footer(props) {
    return (
        <div className={"footer-div"}>
            <img className={"logoimg"} alt={"로고"} src={logo} style={{ marginTop:'1.2%',  marginRight:'1%', marginBottom:'10px', width:'6%', marginLeft:'30%' }}/>
            <p style={{paddingTop:'40px', marginLeft:'37%', fontSize:'15px', position:'absolute'}}>
                회사소개 | IR제휴 | 광고 | 부대사업 | 문의 | 이용약관 | 개인정보취급방침 | 고객센터 | 배정/편성기준
                | 사이트맵<br/> 사업자명:  (주)비트무비 | 사업자등록번호: 10-82-404 | 통신판매업신고번호: 8282-서울
                강남-40404<br/>대표이사: 404 | 서울특별시 강남역 12번 출구 | 개인정보책임자: 대표 404 | 고객센터: 404-3000
            </p>
        </div>
    );
}

export default Footer;