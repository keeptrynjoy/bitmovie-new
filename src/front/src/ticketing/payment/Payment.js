import React from 'react';

    /* 아임포트 결제 모듈을 불러오기*/
    function Payment() {

        function onClickPayment() {
            const {IMP} = window;
            IMP.init('imp02023053'); // 결제 데이터 정의
            const data = {
                pg: 'INIBillTst', // PG사 (필수항목)
                pay_method: 'card', // 결제수단 (필수항목)
                merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
                name: '결제 테스트', // 주문명 (필수항목)
                amount: '1000', // 금액 (필수항목)
                custom_data: {name: '부가정보', desc: '세부 부가정보'},
                buyer_name: '홍길동', // 구매자 이름
                buyer_tel: '010-4028-9186', // 구매자 전화번호 (필수항목)
                buyer_email: 'sungmin4218@gmail.com', // 구매자 이메일
            };
            IMP.request_pay(data, callback);
        }

        function callback(response) {

        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
            if (success) {
                alert('결제 성공');
            } else {
                alert(`결제 실패 : ${error_msg}`);
            }
        }

        return(
            <>
                <button onClick={onClickPayment}>결제하기</button>
            </>
        )
    }
export default Payment;