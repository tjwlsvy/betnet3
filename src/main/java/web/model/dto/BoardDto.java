package web.model.dto;

import lombok.*;

@NoArgsConstructor@AllArgsConstructor
@Getter @Setter @ToString @Builder
public class BoardDto {

    private int postid; // bno
    private int memberid; // no
    private int teamcode; // 카테고리 // 팀코드 별로 카테고리 나눔
    private String content;
    private String title;
    private String createdat;
    private int views;
    private int likes;

    // 팀코드 이름 변환 변수 생성
    private String teamname;
    // 회원 아이디 출력
    private String userName; //아이디
}
