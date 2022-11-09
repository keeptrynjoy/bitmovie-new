import React from 'react';
import "./Join.css"

function Join() {
    // function onClickCertification() {
    //     /* 1. 가맹점 식별하기 */
    //     const { IMP } = window;
    //     IMP.init('imp34153710');
    //
    //     /* 2. 본인인증 데이터 정의하기 */
    //     const data = {
    //         merchant_uid: `bitmovie_${new Date().getTime()}`,  // 주문번호
    //         company: 'bitmovie',                           // 회사명 또는 URL
    //         carrier: 'SKT',                              // 통신사
    //         name: '정지훈',                                // 이름
    //         phone: '01072729573',                        // 전화번호
    //     };
    //
    //     /* 4. 본인인증 창 호출하기 */
    //     IMP.certification(data, callback);
    // }
    //
    // /* 3. 콜백 함수 정의하기 */
    // function callback(response) {
    //     const {
    //         success,
    //         merchant_uid,
    //         error_msg,
    //     } = response;
    //
    //     if (success) {
    //         alert('본인인증 성공');
    //     } else {
    //         alert(`본인인증 실패: ${error_msg}`);
    //     }
    // }

    return (
        // <button onClick={onClickCertification}>본인인증 하기</button>
        <div className={"join-div"}>
            <div className={"title"}>
                회원 가입
            </div>
            <div className={"join-box"}>
                <ul className={"join-indicator"}>
                    <li>이메일 입력</li>
                    <li>회원정보 입력</li>
                    <li>가입 완료</li>
                </ul>
                <div className={"join-email"}>
                    <div className={"join-email-info"}>
                        이메일 주소로 가입
                    </div>
                    <div className={"join-email-input"}>
                        <label className={"label-email"} htmlFor={"email"}>
                            아이디(이메일)
                            <input type={"email"} name={"memberId"} placeholder={"이메일 주소를 입력해주세요"}/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join;