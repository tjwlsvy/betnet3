package web.model.dto;
import lombok.*;

@NoArgsConstructor@AllArgsConstructor
@Getter @Setter @ToString @Builder
public class LogDto {

    private int accessid;           // 접속로그
    private int memberid;           // 멤버id
    private String memberdatetime;  // 날짜
    private String username;        // 이름
}
