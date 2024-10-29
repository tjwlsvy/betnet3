package web.model.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class PointLogDto {
    private int pointlogid;     // 포인트로그 pk
    private int memberid;       // 회원아이디번호 fk
    private String logDate;     // 로그 증감 날짜
    private int pointChange;
    private int description;    //  1이면 포인트충전 , 2이면 배당금지급 , 3이면 게임구매 , 4이면 포인트출금
    private String descriptionStr;  // description 문자처리
    private int sum;
    private String username;
    private String password; //비번
}
