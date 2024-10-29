package web.model.dto;

import lombok.*;

@NoArgsConstructor@AllArgsConstructor
@Getter@Setter@ToString@Builder
public class ReplyDto {
    private int commentid;
    private int memberid;
    private int postid;
    private int commentindex;
    private String createdat;
    private String content;
    // 회원 아이디 출력
    private String userName; //아이디
}
