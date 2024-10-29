package web.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MarketReplyDto {
    private int mkreplyid;  // 댓글 고유코드
    private int mkreplywriter;  // 댓글 작성자 memberid
    private String username; // 댓글 작성자 아이디
    private int mkid;  // 댓글이 있는 게시글 번호
    private String mkreplydate;  // 댓글 작성날짜
    private String mkreplycontent;  // 댓글 내용
}
