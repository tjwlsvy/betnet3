package web.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    //09.09 회원Dto
    private int memberid; //회원번호
    private String userName; //아이디
    private String password; //비번
    private String name;    //이름
    private String contact; //연락처
    private String email;   //이메일
    private String gender;  //성별
    private int age;        //나이
    private String joinDate;//가입일
    private int teamCode;   // 선호팀코드
    private String account; //계좌
    private String teamName; //선호팀이름
}
