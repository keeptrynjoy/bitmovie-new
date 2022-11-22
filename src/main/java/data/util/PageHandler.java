package data.util;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class PageHandler {

    int totalCnt;   // 총 데이터 갯수
    int currentPage;       // 현재 페이지 번호
    int totalPage;  // 전체 페이지 수
    int perPage;    // 블럭당 보여질 데이터 갯수
    int perBlock;   // 블럭당 보여질 페이지 수
    int beginPage;  // 각 블럭에 보여질 시작 페이지
    int endPage;    // 각 블럭에 보여질 마지막 페이지
    int beginDataNum;   // 해당 페이지에 출력될 데이터의 시작 번호
    boolean preview;    // 이전으로 가기
    boolean nextview;   // 다음으로 가기

    public PageHandler(){
        this(1, 1, 1, 1);
    }

    public PageHandler(int totalCnt, int currentPage, int perPage, int perBlock){
        this.totalCnt = totalCnt;
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.perBlock = perBlock;

        totalPage = totalCnt/perPage + (totalCnt%perPage==0?0:1);   //총 페이지 수 구하기 나머지가 1이라도 있으면 1페이지추가

        // 각 블럭의 시작,끝 페이지 구하기
        beginPage = (currentPage - 1) / perBlock * perBlock + 1;
        endPage = Math.min((beginPage + perBlock - 1), totalPage);

        // 페이지에 출력할 데이터의 시작 번호 구하기
        beginDataNum = totalCnt - (currentPage - 1) * perPage;

        // 이전으로 가기 , 다음으로 가기 활성/비활성 정하기
        preview = beginPage != 1;
        nextview = endPage != totalPage;
    }

    public void print(){
        System.out.println(preview ? "[이전]" : "");
        for (int i = beginPage; i <= endPage; i++) {
            System.out.print(i + "");
        }
        System.out.println(nextview ? "[다음]" : "");
    }
}
