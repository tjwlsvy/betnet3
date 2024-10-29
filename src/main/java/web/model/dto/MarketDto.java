package web.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MarketDto {
    private int mkid;  // 번호
    private String mktitle;  // 제목
    private String mkcontent;  // 내용
    // MultipartFile - HTML의 INPUT TYPE이 "file"일때 사용되는 인터페이스
    private List<MultipartFile> uploadfiles;   // 첨부파일(들)
    // DB에 저장/출력할 업로드된 파일명(들) 필드
    private List<String> filenames;
    private int mkstate;  // 게시글 상태: 거래완료, 미완료 등
    private int mkview;  // 조회수
    private String mkdate;  // 작성일
    // 작성자
    private int memberid;  // 회원코드
    private String username; // 아이디
    private int mkwriter; // 작성자의 회원코드
    // 댓글 DTO
    private List<MarketReplyDto> mkreplies; // 댓글 내용
    // mkstate 수정용
    private int changemkstate; // 기본값 0, 1일시 mkstate 수정 함수로
}
