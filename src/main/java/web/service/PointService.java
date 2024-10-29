package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import web.model.dao.PointDao;
import web.model.dto.MemberDto;
import web.model.dto.PointLogDto;
import web.model.dto.SearchDto;

import java.util.List;

@Service
public class PointService {
    @Autowired
    PointDao pointDao;
    @Autowired
    MemberService memberService;

    // 잔액 포인트 출력
    public PointLogDto getMyPoint(){
        // 테스트 이후 멤버 아이디는 서비스에서 세션에서 가지고 오기
        System.out.println("PointService.getMyPoint");
        // 1. 로그인 세션에서 값 호출
        MemberDto loginDto = memberService.loginCheck();
        if (loginDto == null) return null;
        // 2. 속성 호출
        int memberid = loginDto.getMemberid();
        PointLogDto result = pointDao.getMyPoint(memberid);
        System.out.println("result = " + result);
        return result;
    }   // getMyPoint() end

    // 포인트로그 포인트 충전 내역 저장
    public int insertPointLog(PointLogDto pointLogDto){
        System.out.println("PointService.insertPointLog");
        System.out.println("pointLogDto = " + pointLogDto);
        int result2 = 0;
        if (pointLogDto.getPassword() != null){
            PointLogDto result = pointDao.myPassword(pointLogDto);
            System.out.println("result = " + result);
            if(result == null){
                result2 = 0;
            }else{
                result2 = pointDao.insertPointLog(pointLogDto);
            }
            return result2;
        }
        result2 = pointDao.insertPointLog(pointLogDto);
        System.out.println("result2 = " + result2);
        return result2;
    }   // insertPointLog() end

    // 포인트내역 출력
    public List<PointLogDto> mypointlog(SearchDto searchDto){
        System.out.println("searchDto = " + searchDto);
        List<PointLogDto> pointLogDtos = pointDao.mypointlog(searchDto);
        pointLogDtos.forEach(dto ->{
            // 숫자로 나오는 코드 미리 정한 이름으로 변환해서 dto에 저장하기
            // db에서 받은 숫자 코드 매개변수로 넘겨주기
            String descriptionStr = descriptionString(dto.getDescription());
            dto.setDescriptionStr(descriptionStr);
        });
        System.out.println(pointLogDtos);
        return pointLogDtos;
    }   // mypointlog() end

    // 포인트 description 변환
    public String descriptionString(int description){
        String descriptionStr = "";
        if(description == 1){
            descriptionStr = "포인트충전";
        }
        if(description == 2){
            descriptionStr = "배당금지급";
        }
        if(description == 3){
            descriptionStr = "게임구매";
        }
        if(description == 4){
            descriptionStr = "포인트출금";
        }
        if(description == 9){
            descriptionStr = "버스예약완료";
        }
        if(description == 10){
            descriptionStr = "버스예약취소";
        }
        return descriptionStr;
    }

    // 로그인시 포인트 지급
    public boolean loginPoint(PointLogDto pointLogDto){
        System.out.println("PointService.loginPoint");
        System.out.println("pointLogDto = " + pointLogDto);
        return pointDao.loginPoint(pointLogDto);
    }

    // 버스예매
    public boolean busPurchase(PointLogDto pointLogDto){
        System.out.println("PointService.busPurchase");
        MemberDto loginDto = memberService.loginCheck();
        if (loginDto == null) return false;
        // 2. 속성 호출
        int memberid = loginDto.getMemberid();
        pointLogDto.setMemberid(memberid);
        System.out.println("memberid = " + memberid);
        return pointDao.busPurchase(pointLogDto);
    }

}
