# BitMovie(영화 예매 웹 서비스)

## 프로젝트 소개
학습한 지식을 경험으로 만들기 위한 프로젝트입니다.<br/>
영화 예매 서비스를 제공하기 위한 기본적인 기능들을 구현했습니다.
<br/>
- 영화/인물 조회 및 검색
- 영화 리스트 출력 및 상세정보 조회
- 상영 영화 예매 및 결제 
- 영화 결제시 좌석 선택
<br/>

## 프로젝트 일정 및 규모
* 개발 기간 : 2022.11.01 ~ 12.08 (38일)
* 인원 : 5명
<br/>

## 기술 소개
### Front-End
<img src="https://camo.githubusercontent.com/5a7100155d1a7b75357a90e8810530b21c8723c59f2976d0dafc7950205336d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&amp;logo=html5&amp;logoColor=white" style="max-width: 100%;"> <img src="https://camo.githubusercontent.com/d1a61dccdba51c4d1ff3306fe00404de9162915d282bade8ef91b992f84ebd35/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6373732d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&amp;logo=css3&amp;logoColor=white" style="max-width: 100%;"> <img src="https://img.shields.io/badge/JAVASCRIPT | ES6-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=black"> <img src="https://img.shields.io/badge/REACT | 18.2-61DAFB?style=for-the-badge&amp;logo=react&amp;logoColor=black">
<br>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&amp;logo=react-router&amp;logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=black"> <img src="https://img.shields.io/badge/AXIOS-6236FF?style=for-the-badge&amp;logo=axios&amp;logoColor=white">
<img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white"><br/><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> 

### Back-End
<img src="https://img.shields.io/badge/JAVA | 11-0d8ac7?style=for-the-badge&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/SPRINGBOOT | 2.7-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/MYBATIS | 2.2-000000?style=for-the-badge&logo=&logoColor=white">
<br><img src="https://img.shields.io/badge/Jackson-0d8ac7?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/Lombok-DDB320?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=&logoColor=white"><img src="https://img.shields.io/badge/Apache Tomcat-F8DC75?style=for-the-badge&logo=Apache Tomcat&logoColor=white"> 

### Infra
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
### Tools
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/ERD Cloud-EEEEEE?style=for-the-badge&logo=ERDCloud&logoColor=white"> <img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=for-the-badge&logo=IntelliJ IDEA&logoColor=white"><br/><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"> <img src="https://img.shields.io/badge/MySQL Workbench-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

### 사용 API
* [TMDB](https://www.themoviedb.org/) - 영화/인물 데이터 수집
* [i'mport](https://api.iamport.kr/) - 결제 및 환불
* [coolsms](https://docs.coolsms.co.kr/api-reference/cash/getreceipt) - 핸드폰 인증 문자 발송
<br/>

## ERD
* Table 17개
* Colunm 100개
<img src = "https://github.com/bitcampteam4/bitmovie/blob/main/src/main/webapp/image/Bitmovie_ERD.png?raw=true" width="800px">
<br/>

## 팀원
|**이름**|**담당 포지션**|**담당 기능**                               |**Git URL**                     |
|------|-----------|--------------------------------------------|--------------------------------|
| 김태민 | Front-End | 결제, 예매                                    | https://github.com/commitonly  |
| 김성민 | Back-End  | 결제, 예매                                    | https://github.com/keeptrynjoy |
| 이준민 | Back-End  | 로그인, 회원가입, MyPage                         | https://github.com/Jxnmin      |
| 유희준 | Back-End  | 영화리스트, 상세페이지, 리뷰, 검색                    | https://github.com/J-LOOK-J    |
| 정지훈 | Front-End | 로그인, 회원가입, Mypage, 영화리스트, 상세페이지, 리뷰, 검색 | https://github.com/greetjeehun |


