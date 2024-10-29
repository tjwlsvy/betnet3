package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.BusDao;
import web.model.dao.GameDao;
import web.model.dao.PointDao;
import web.model.dto.BusDto;
import web.model.dto.MemberDto;
import web.model.dto.PointLogDto;

import java.util.List;

@Service
public class BusService {
    @Autowired
    BusDao busDao;
    @Autowired
    PointDao pointDao;
    @Autowired
    GameDao gameDao;
    @Autowired MemberService memberService;

    public boolean busReservation(List<BusDto> busDtos){
        System.out.println("BusService.busReservation");
        MemberDto loginDto = memberService.loginCheck();
        if (loginDto == null) return false;
        // 2. 속성 호출
        int memberid = loginDto.getMemberid();
        System.out.println("memberid = " + memberid);
        int requiredPoint = 18000*busDtos.size();

        // 포인트 내역 확인하기
        PointLogDto pointLogDto = pointDao.getMyPoint(memberid);
        if (requiredPoint > pointLogDto.getSum()) {
            return false; // 포인트 부족 시 전체 예약 실패
        }

        for (BusDto busDto : busDtos) {
            busDto.setMemberId(memberid);
            System.out.println("memberid = " + memberid);
            // 좌석 예약을 위한 처리
            busDao.busPurchase(busDto);
            int pointlogid = gameDao.getPointId();
            busDto.setPointlogid(pointlogid);

            // 각각의 예약 수행
            if (!busDao.busReservation(busDto)) {
                return false; // 하나라도 실패하면 전체 실패
            }
        }
        return true; // 모든 예약이 성공적으로 완료됨
    }

    public boolean busCancel(BusDto busDto){
        System.out.println("BusService.busCancel");
        System.out.println("busDto = " + busDto);
        MemberDto loginDto = memberService.loginCheck();
        if (loginDto == null) return false;
        // 2. 속성 호출
        int memberid = loginDto.getMemberid();
        System.out.println("memberid = " + memberid);
        busDto.setMemberId(memberid);
        System.out.println("memberid = " + memberid);
        busDao.busPurchase(busDto);
        int pointlogid=gameDao.getPointId();
        busDto.setPointlogid(pointlogid);
        return busDao.busReservation(busDto);
    }


    public List<BusDto> busCheck(String gameCode){
        System.out.println("gameCode = " + gameCode);
        return busDao.busCheck(gameCode);
    }

    public List<BusDto> busLog(){
        MemberDto loginDto = memberService.loginCheck();
        if (loginDto == null) return null;
        // 2. 속성 호출
        int memberid = loginDto.getMemberid();
        System.out.println("memberid = " + memberid);
        return busDao.busLog(memberid);
    }

}