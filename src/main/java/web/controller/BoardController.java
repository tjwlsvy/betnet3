package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.BoardDto;
import web.model.dto.BoardPageDto;
import web.model.dto.ReplyDto;
import web.service.BoardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired private BoardService boardService;

    @PostMapping("/write")
    public boolean bWrite(BoardDto boardDto) {
        System.out.println("BoardController.bWrite");
        return boardService.bWrite(boardDto);
    }


//    @GetMapping("/readAll")
//    public List<BoardDto> bRead(BoardPageDto boardPageDto){
//        System.out.println("BoardController.bRead");
//        System.out.println("boardPageDto = " + boardPageDto);
//        return boardService.bRead(boardPageDto);
//    }

    // 수정 전 코드
    @GetMapping("/readAll")
    public List<BoardDto> bRead( @RequestParam("teamcode") int teamcode){
        System.out.println("BoardController.bRead");
        System.out.println("teamcode = " + teamcode);
        return boardService.bRead(teamcode);
    }



    //게시판 개별조회
    @GetMapping("/find/bno")
    public BoardDto bFindBno( int bno ){
        return boardService.bFindBno(bno);
    }


    // 게시판 수정
    @PutMapping("/update")
    public boolean bUpdate(BoardDto boardDto){
        return boardService.bUpdate(boardDto);
    }


    // 게시판 삭제
    @DeleteMapping("/delete")
    public boolean bDelete(BoardDto boardDto){
        System.out.println("BoardController.bDelete");
        System.out.println("boardDto = " + boardDto);
        return boardService.bDelete(boardDto);
    }

    //댓글 등록하기
    ////////////////////////아니 게시판 등록은 body 사용안했는데
    ///////////////얘는 왜 필요하거야
    /////////////////////ajax에서 JSON처리 해서 그런가
    ///////body 안쓰니까 값을 못가져오더니 쓰니까 바로 가져오네

    @PostMapping("/reply/write")
    public boolean reWrite(@RequestBody ReplyDto replyDto){
        System.out.println("BoardController.reWrite");
        System.out.println("replyDto = " + replyDto);
        return boardService.reWrite(replyDto);
    }


    //댓글 출력
    @GetMapping("/reply/read")
    public List<ReplyDto> rpRead(int bno){
        System.out.println("BoardController.RpRead");
        System.out.println("bno = " + bno);
        return boardService.rpRead(bno);
    }


    @PutMapping("/reply/update")
    public boolean rpUpdate(@RequestBody ReplyDto replyDto){
        System.out.println("BoardController.rpUpdate");
        System.out.println("replyDto = " + replyDto);
        return boardService.rpUpdate(replyDto);
    }




    // 댓글 삭제하기
    @DeleteMapping("/reply/delete")
    public boolean rpDelete(ReplyDto replyDto){
        System.out.println("BoardController.rpDelete");
        System.out.println("replyDto = " + replyDto);
        return boardService.rpDelete(replyDto);
    }






}
