package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.MemberDto;
import web.model.dto.PointLogDto;
import web.model.dto.SearchDto;
import web.model.dto.TeamsDto;
import web.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired private MemberService memberService;

    //09.09 회원가입
    @PostMapping("/signup")
    public boolean signUp(MemberDto memberDto){
        System.out.println("MemberController.signUp");
        System.out.println("memberDto = " + memberDto);
        return memberService.signUp(memberDto);}

    //09.10 로그인
    @PostMapping("/login")
    public MemberDto login(MemberDto memberDto){
        System.out.println("MemberController.login");
        System.out.println("memberDto = " + memberDto);
        return memberService.login(memberDto);
    }
    //09.10 로그인체크
    @GetMapping("/logincheck")
    public MemberDto loginCheck(){
        return memberService.loginCheck();
    }

    //09.11 id 중복검사
    @GetMapping("/idchecking")
    public boolean idChecking(String userName){
        return memberService.idChecking(userName);
    }

    //09.12 전화번호 중복검사
    @GetMapping("/phonecheck")
    public boolean phoneCheck(String contact){
        System.out.println("MemberController.phoneCheck");
        System.out.println("contact = " + contact);
        return memberService.phoneCheck(contact);
    }

    //09.12 팀정보 가져오기
    @GetMapping("/teams")
    public List<TeamsDto> teams(){
        return memberService.teams();
    }

    //09.12 이메일 중복검사
    @GetMapping("/emailcheck")
    public boolean emailCheck(String email){
        return memberService.emailCheck(email);
    }

    //09.12 로그아웃
    @GetMapping("/logout")
    public void logout(){
        memberService.logout();
    }

    //09.13 로그인상태에서 모든정보 가져오기
    @GetMapping("/logcheck")
    public MemberDto logCheck(){
       return memberService.logCheck();
    }

    // 09.19 개인정보 수정
    @PutMapping("/edit")
    public boolean edit(MemberDto memberDto){
        System.out.println("memberDto = " + memberDto);
        return memberService.edit(memberDto);
    }

    // 09.23 개인 구매금액 포인트 통계
    @GetMapping("/purchase")
    public List<PointLogDto> purchase(SearchDto searchDto){
        System.out.println("searchDto = " + searchDto);
        return memberService.purchase(searchDto);
    }

    // 09.23 개인 배당금 통계
    @GetMapping("/refund")
    public List<PointLogDto> refund(SearchDto searchDto){
        System.out.println("searchDto = " + searchDto);
        return memberService.refund(searchDto);
    }
}
