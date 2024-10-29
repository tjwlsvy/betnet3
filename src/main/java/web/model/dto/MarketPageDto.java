package web.model.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MarketPageDto {
    // 검색, 카테고리별 페이징처리
    private int page;  // 현재 페이지
    private int pagesize;  // 현재 지정된 페이지 크기
    private int totalboardsize; // 전체 게시물 수
    private int totalpage; // 전체 페이지수
    private List<MarketDto> data; // 조회된 게시물 정보 목록
    private int startbtn; // 페이지별 시작버튼 번호
    private int endbtn; // 페이지별 끝버튼 번호
    // 검색 필드
    private int mkstate;  // 거래상태 기준으로 검색할 경우
    private String searchkeyword; // 검색 조회시 사용되는 필드값
    // data 조회시 사용
    private int startrow;  // SQL LIMIT 첫번째 start row
}
