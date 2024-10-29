package web.model.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor@AllArgsConstructor
@Getter@Setter@ToString@Builder
public class BoardPageDto {
    private int page; // 1. 현재 페이지 번호
    private int totalBoardSize; // 2. 전체 게시물수
    private int totalPage; // 3. 전체 페이지수
    private List<BoardDto> data; // 4. 조회된 게시물 정보 목록/리스트
    private int startBtn; // 5. 페이지별 시작버튼 번호
    private int endBtn; // 6. 페이지별 끝버튼 번호
    private int teamcode; // 7. 현재 카테고리 번호
    private String searchkeyword; // 검색 조회시 사용되는 필드값
    // teamcode로 카테고리 나눔


}
