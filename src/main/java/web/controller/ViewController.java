package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    // 메인페이지
    @GetMapping("/")    // http://localhost:8080/ // 페이지 요청은 HTTP의 GET방식을 주로 사용한다.
    public String index(){
        return "/index.html";   // templates 폴더내 반환할 경로와 파일명
    }

    // 관리자 페이지
    @GetMapping("/admin")
    public String admin(){ return "/admin.html"; }

    // 포인트내역 페이지
    @GetMapping("/point")    // http://localhost:8080/ // 페이지 요청은 HTTP의 GET방식을 주로 사용한다.
    public String memberPoint(){
        return "/point/point.html";   // templates 폴더내 반환할 경로와 파일명
    }



    //==========================게시판(board)시작==================================

    // 게시판 페이지
    @GetMapping("/board") // http 페이지 주소
    public String board(){return "/board/board.html";  }

    @GetMapping("/board/write") // http 페이지 주소
    public String boardWrite(){return "/board/write.html";  }

    @GetMapping("/board/view") // http 페이지 주소
    public String boardView(){return "/board/view.html";  }

    @GetMapping("/board/update") // http 페이지 주소
    public String boardUpdate(){return "/board/update.html";  }


    //==========================게시판(board)끝==================================

    //===============멤버
    // 로그인 페이지
    @GetMapping("/member/login")
    public String login(){return "/member/login.html";}

    // 회원가입 페이지
    @GetMapping("/member/signup")
    public String signup(){return "/member/signup.html";}

    // 마이페이지
    @GetMapping("/member/mypage")
    public String myPage(){return "/member/mypage.html";}

    // 회원수정 페이지
    @GetMapping("/member/edit")
    public String edit(){return "/member/edit.html";}

    // 구매현황분석 페이지
    @GetMapping("/member/stat")
    public String stat(){return "/member/stat.html";}

    // 예상연봉 페이지
    @GetMapping("/member/salary")
    public String salary(){return "/member/salary.html";}

    //===============멤버
    // 설문 페이지
    @GetMapping("/poll")
    public String seve(){
        return "/survey/survey.html";
    }

    // 게임구매내역페이지
    @GetMapping("/game")
    public String gameList(){
        return "/game/gameList.html";
    }

    // 게임구매상세페이지
    @GetMapping("/game/view")
    public String gameDetailList(){
        return "/game/gameDetailList.html";
    }

    // 기사페이지
    @GetMapping("/article")
    public String article(){
        return "/article/article.html";
    }

    // [1] 채팅 관련 템플릿 매핑
    @GetMapping("/chat")
    public String chat(){ return "/index.html";
    }

    // ========== 연도별 팀 기록 ===============
    // 연도별 타자 팀기록
    @GetMapping("/history/hitter")
    public String historyHitter(){
        return "/history/hitter.html";
    }

    // 연도별 투수 팀기록
    @GetMapping("/history/pitcher")
    public String historyPitcher(){
        return "/history/pitcher.html";
    }

    // 연도별 주루 팀기록
    @GetMapping("/history/runner")
    public String historyRunner(){
        return "/history/runner.html";
    }

    // 연도별 팀 순위 기록
    @GetMapping("/history/rank")
    public String historyRank(){
        return "/history/rank.html";
    }

    // 연도별 KBReport 기록
    @GetMapping("/history/kbreport")
    public String historyKBReport(){
        return "/history/kbreport.html";
    }
    // ========== 로그 ===============
    // 멤버 접속 기록 로그
    @GetMapping("admin/mAccessLog")
    public String accessLog(){return "/admin/mAccessLog.html";}

    // === 굿즈거래 ===
    // 메인 게시판
    @GetMapping("/market")
    public String market(){
        return "/market/market.html";
    }

    // 상세글보기
    @GetMapping("/marketview")
    public String marketView(){
        return "/market/marketview.html";
    }

    // 글작성
    @GetMapping("/marketadd")
    public String marketAdd(){ return "/market/marketadd.html";}

    // 응원채팅 페이지
    @GetMapping("/cheerchat")
    public String cheerchat(){ return "/cheerchat/cheerchat.html";}

    // 버스
    @GetMapping("/bus")
    public String reservation(){return "/bus/bus.html";}

    @GetMapping("/bus/list")
    public String busList(){return "/bus/check.html";}

    // 제미니
    @GetMapping("/gemini")
    public String gemini(){return "/gemini/gemini.html";}

    // 챗봇볼피티
    @GetMapping("/chatballpt")
    public String chatballpt(){ return "/chatballpt/chatballpt.html";}
}

