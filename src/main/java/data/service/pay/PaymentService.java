package data.service.pay;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import data.domain.pay.Payment;
import data.repository.pay.PaymentRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Value("${imp_key}")
    private String impKey;

    @Value("${imp_secret}")
    private String impSecret;

    //JSON을 파싱할 클래스
    @ToString
    @Getter
    private class Response{
        public PaymentInfo getResponse() {
            return response;
        }

        private PaymentInfo response;
    }

    //JSON에서 금액을 가져오기위한 클래스
    @ToString
    @Getter
    private class PaymentInfo{
        public int getAmount() {
            return amount;
        }

        private int amount;

    }


    public Payment selectPaymentData(String payment_pk) {
        return paymentRepository.selectPaymentData(payment_pk);
    }

    public void insertPaymentData(Payment payment) {
        paymentRepository.insertPaymentData(payment);

    }

    public String getToken() throws IOException {

        HttpsURLConnection conn = null;

        URL url = new URL("https://api.iamport.kr/users/getToken");

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        JSONObject json = new JSONObject();

        json.put("imp_key", impKey);
        json.put("imp_secret", impSecret);

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        Gson gson = new Gson();

        String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();

        System.out.println(response);

        String token = gson.fromJson(response, Map.class).get("access_token").toString();

        br.close();
        conn.disconnect();

        return token;
    }

    public int paymentInfo(String imp_uid, String access_token) throws IOException {
        HttpsURLConnection conn = null;

        //아임포트 결제정보 API 호출(결제번호)
        URL url = new URL("https://api.iamport.kr/payments/" + imp_uid);

        conn = (HttpsURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Authorization", access_token);
        conn.setDoOutput(true);

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

        //Gson은 Java에서 Json을 파싱하고, 생성하기 위해 사용되는 구글에서 개발한 오픈소스
        //참고 : https://hianna.tistory.com/629
//        Gson gson = new GsonBuilder().setPrettyPrinting().create();

//        System.out.println("결제 내역 JSON : "+ br.readLine());
//        결제 내역 JSON : {"code":0,"message":null,"response":{"amount":9000,"apply_num":"","bank_code":null,"bank_name":null,"buyer_addr":"","buyer_email":"sunmin4218@gmail.com","buyer_name":"\ud14c\uc2a4\ud2b8","buyer_postcode":null,"buyer_tel":"010-0000-0000","cancel_amount":0,"cancel_history":[],"cancel_reason":null,"cancel_receipt_urls":[],"cancelled_at":0,"card_code":null,"card_name":null,"card_number":null,"card_quota":0,"card_type":null,"cash_receipt_issued":false,"channel":"pc","currency":"KRW","custom_data":null,"customer_uid":null,"customer_uid_usage":null,"emb_pg_provider":null,"escrow":false,"fail_reason":null,"failed_at":0,"imp_uid":"imp_747436343689","merchant_uid":"2022-11-16T10:17:16_1","name":"\uacb0\uc81c\ud14c\uc2a4\ud2b8","paid_at":1668561453,"pay_method":"point","pg_id":"TC0ONETIME","pg_provider":"kakaopay","pg_tid":"T3743a1c204d1c578263","receipt_url":"https:\/\/mockup-pg-web.kakao.com\/v1\/confirmation\/p\/T3743a1c204d1c578263\/5af320980bba882bbf907c831a5333db9c5e06f8d989f756af6d2f321ab77e63","started_at":1668561436,"status":"paid","user_agent":"Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/107.0.0.0 Safari\/537.36","vbank_code":null,"vbank_date":0,"vbank_holder":null,"vbank_issued_at":0,"vbank_name":null,"vbank_num":null}}

//        System.out.println("결제 내역 Object : "+ gson.fromJson(br.readLine(), Response.class));
//        결제 내역 Object : PaymentService.Response(response=PaymentService.PaymentInfo(amount=9000))

        Gson gson = new Gson();

        //json -> Object
        Response response = gson.fromJson(br.readLine(), Response.class);

        br.close();//버퍼 닫기
        conn.disconnect();//HttpURLConnection 연결 끊기.


        return response.getResponse().getAmount();
    }

    public void paymentCancle(String access_token, String imp_uid, int amount ,String reason) throws IOException {

        //HttpURLConnection 인스턴스 객체 생성
        HttpsURLConnection conn = null;

        //URL 검증 및 객체 생성
        URL url = new URL("https://api.iamport.kr/payments/cancel");

        //URL 연결(웹페이지 URL 연결)
        conn = (HttpsURLConnection) url.openConnection();

        //요청방식 선택
        conn.setRequestMethod("POST");

        // 타입설정(application/json) 형식으로 전송 (Request Body 전달시 application/json로 서버에 전달.)
        conn.setRequestProperty("Content-type","application/json");

        // 서버 Response Data를 JSON 형식의 타입으로 요청.
        conn.setRequestProperty("Accept","application/json");

        // 권한을 access_token 으로 부여
        conn.setRequestProperty("Authorization",access_token);

        // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.
        conn.setDoOutput(true);

        JsonObject json = new JsonObject();

        json.addProperty("reason", reason);
        json.addProperty("imp_uid", imp_uid);
        json.addProperty("amount", amount);
        json.addProperty("checksum", amount);


        // stream 참고 : https://csw7432.tistory.com/entry/Java-Input-Output-Stream
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));

        bw.write(json.toString());

        //flush는 쉽게 말해서 stream에 남아 있는 데이터를 강제로 내보내는 역할
        // 참고 : https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=klh1514&logNo=120190269672
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));

        br.close();
        conn.disconnect();

    }
}
