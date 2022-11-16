package data.service.pay;

import com.google.gson.Gson;
import data.domain.pay.Payment;
import data.repository.pay.PaymentRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.apache.catalina.connector.Response;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.*;
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
        private PaymentInfo response;
    }

    //JSON에서 금액을 가져오기위한 클래스
    @ToString
    @Getter
    private class PaymentInfo{
        private int amount;
    }


    public int selectPaymentData(Payment payment) {
        return paymentRepository.selectPaymentData(payment);
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
        Gson gson = new Gson();

        //json -> Object
        Response response = gson.fromJson(br.readLine(), Response.class);

        br.close();//버퍼 닫기
        conn.disconnect();//HttpURLConnection 연결 끊기.

        return response.getResponse().getAmount();
    }

}
