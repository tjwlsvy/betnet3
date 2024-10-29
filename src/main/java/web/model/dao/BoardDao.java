package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;
import web.model.dto.ReplyDto;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardDao {

    // 게시물 등록 함수
    boolean bWrite(BoardDto boardDto);

    // 게시물 전체출력 함수
    List<BoardDto> bRead();

    //게시물 개별 조회 함수
    BoardDto bFindBno(int bno);

    // 게시물 카테고리 조회 함수
    List<BoardDto> caRead(int teamcode);

    // 게시물 수정 함수
    boolean bUpdate(BoardDto boardDto );

    // 게시물 삭제 함수
    boolean bDelete(BoardDto boardDto);

    //댓글 조회 함수
    List<ReplyDto> rpRead(int bno);

    //댓글 등록 함수
    boolean reWrite(ReplyDto replyDto);

    // 댓글 수정 함수
    boolean rpUpdate(ReplyDto replyDto );

    //댓글 삭제 함수
    boolean rpDelete(ReplyDto replyDto );

    // 게시판 조회수 증가 함수
    boolean bViewIncrease(int bno);
}
