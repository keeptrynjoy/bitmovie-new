package data.service.pay;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import data.domain.pay.Booking;
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
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Value("${imp_key}")
    private String impKey;

    @Value("${imp_secret}")
    private String impSecret;

    //JSON내부의 response를 파싱할 객체
    @ToString
    @Getter
    private class Response{
        public PaymentInfo getResponse() {
            return response;
        }

        private PaymentInfo response;
    }

    //JSON에서 금액을 가져오기위한 객체
    @ToString
    @Getter
    private class PaymentInfo{
        private int amount;
        private String status;
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

//        System.out.println(response);

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

        Gson gson = new Gson();

//        System.out.println(br.readLine());

        //json -> Object
        Response response = gson.fromJson(br.readLine(), Response.class);

        System.out.println(response);

        br.close();//버퍼 닫기
        conn.disconnect();//HttpURLConnection 연결 끊기.


        return response.getResponse().getAmount();
    }


    public void paymentCancel(String access_token, String imp_uid, int amount , String reason) throws IOException {

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

    public Payment selectPayByUserAndBookPK(int user, String booking_pk){

        Map <String,Object> map = new HashMap<>();
        map.put("user_pk",user);
        map.put("booking_pk",booking_pk);
        return paymentRepository.selectPayByUserAndBookPK(map);
    }

//    private final MovieRepository movieRepository;

//    private final ReviewRepository reviewRepository;

//    public void insertReviewMacro(){
//
//        List<Movie> movie_pk_list =  movieRepository.selectTotalMovie();
//
//        List<String> review_content = new ArrayList<>();
//        review_content.add("영화 진짜 재밌어요.");
//        review_content.add("2022년 최고의 영화입니다");
//        review_content.add("정신 나갈거 같아요.. 너무 잼나요");
//        review_content.add("난 별로던데 다들 댓글 알바 아님?");
//        review_content.add("근래에 봤던 영화중에 가장 재미있었어요");
//        review_content.add("감독님 사랑해요!");
//        review_content.add("칸 영화제 가즈아");
//        review_content.add("잘봤습니다!");
//        review_content.add("쏘쏘함");
//        review_content.add("아니 근데 너무 재밌는거 아니에용?");
//
//        for(Movie m : movie_pk_list){
//
//            DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//
//            LocalDateTime sdate = LocalDateTime.parse(m.getM_sdate()+" 00:00:00",format);
//
//            for(int i=0; i<=9; i++){
//                Review review = Review.reviewBuilder()
//                        .movie_pk(m.getMovie_pk())
//                        .user_pk(i+1)
//                        .revw_star((int)(Math.random()*4)+1)
//                        .revw_text(review_content.get(i))
//                        .revw_date(sdate.plusHours(i))
//                        .build();
//
////            System.out.println(review);
//
//                reviewRepository.insertReview(review);
//            }
//
//        }
//
//    }


}
