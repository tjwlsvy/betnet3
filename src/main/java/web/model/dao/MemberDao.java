package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import web.model.dto.MemberDto;
import web.model.dto.PointLogDto;
import web.model.dto.SearchDto;
import web.model.dto.TeamsDto;

import java.util.List;

@Mapper
public interface MemberDao {
    //09.09 회원가입
    boolean signUp(MemberDto memberDto);

    //09.10 로그인
    MemberDto login(MemberDto memberDto);

    //09.11 id중복검사
    boolean idChecking(String userName);

    //09.12 전화번호 중복검사
    boolean phoneCheck(String contact);

    //09.12 팀정보 가져오기
    List<TeamsDto> teams();

    //09.12 이메일중복검사
    boolean emailCheck(String email);

    //09.12 로그체크
    MemberDto logCheck(int memberid);

    // 09.19 개인정보 수정
    boolean edit(MemberDto memberDto);

    // 09.23 개인 구매금액 포인트 통계
    List<PointLogDto> purchase(SearchDto searchDto);

    // 09.23 개인 배당금 통계
    List<PointLogDto> refund(SearchDto searchDto);


}
