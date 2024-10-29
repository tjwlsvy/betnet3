package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.MarketDto;
import web.model.dto.MarketPageDto;
import web.model.dto.MarketReplyDto;
import web.service.MarketService;

@RestController
@RequestMapping("/market")
public class MarketController {

    @Autowired
    private MarketService marketService;

    // 1. 글 불러오기 (+ 검색어, 거래상태)
    @GetMapping("/readall")
    public MarketPageDto mkReadAll(MarketPageDto dto){
        return marketService.mkReadAll(dto);
    }

    // 2. 글 작성하기 + 파일첨부
    @PostMapping("/write")
    public boolean mkWrite(MarketDto marketDto){
        return marketService.mkWrite(marketDto);
    }

    // 3. 글 상세 페이지
    @GetMapping("/read")
    public MarketDto mkRead(@RequestParam("mkid") int mkId){
        return marketService.mkRead(mkId);
    }

    // 5. 글 수정/삭제 권한 확인
    @GetMapping("/check")
    public boolean mkCheck(@RequestParam("mkid") int mkId){
        return marketService.mkCheck(mkId);
    }

    // 6. 글 수정하기 (JS에서 권한 확인 후, 거래완료 제외)
    @PutMapping("/edit")
    public boolean mkEdit(MarketDto marketDto){
        return marketService.mkEdit(marketDto);
    }

    // 7. 글 삭제하기 (JS에서 권한 확인 후, 거래완료 제외)
    @DeleteMapping("/delete")
    public boolean mkDelete(@RequestParam("mkid") int mkId){
        return marketService.mkDelete(mkId);
    }

    // 8. 게시물 댓글 작성
    @PostMapping("/replywrite")
    public boolean mkWriteReply(MarketReplyDto marketReplyDto){
        return marketService.mkWriteReply(marketReplyDto);
    }

    // TODO: 댓글 수정 및 삭제 기능 (버튼 추가: 상세글 보기 JS 참고)
}
