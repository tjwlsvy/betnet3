package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.MarketDto;
import web.model.dto.MarketPageDto;
import web.model.dto.MarketReplyDto;

import java.util.List;

@Mapper
public interface MarketDao {

    // 1. 글 불러오기
    List<MarketDto> mkReadAll(MarketPageDto dto);

    // 1-1. 게시판 페이지화) 총 게시글 수 검색
    int getTotalBoardSize(MarketPageDto tempDto);

    // 2. 글 작성하기 + 파일첨부 (생성된 레코드의 mkid 반환)
    void mkWrite(MarketDto marketDto);

    // 2-1. 첨부파일 목록을 테이블로
    int mkWriteFiles(MarketDto marketDto);

    // 3. 글 상세 페이지
    MarketDto mkRead(int mkId);

    // 3-1. 상세글보기에서 댓글 불러오기
    List<MarketReplyDto> mkReadReply(int mkId);

    // 3-2. 상세글보기 이미지 파일명 목록
    List<String> getFilenames(int mkId);

    // 4. 상세 페이지 들어갈 때 조회수 증가
    void mkView(int mkId);

    // 5. 글 수정/삭제 권한 확인
    int mkCheck(MarketDto dto);

    // 6. 글 수정하기 (거래완료 제외)
    int mkEdit(MarketDto marketDto);

    // 6-1. 글 거래상태 변경 (진행중 -> 거래완료)
    int updateMkState(MarketDto marketDto);

    // 7. 글 삭제하기 (거래완료 제외)
    int mkDelete(MarketDto marketDto);

    // 8. 게시물 댓글 작성
    boolean mkWriteReply(MarketReplyDto marketReplyDto);

}
