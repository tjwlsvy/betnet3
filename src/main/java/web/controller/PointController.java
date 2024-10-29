package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.MemberDto;
import web.model.dto.PointLogDto;
import web.model.dto.SearchDto;
import web.service.PointService;

import java.util.List;

@RestController
@RequestMapping("/point")
public class PointController {
    @Autowired
    PointService pointService;

    // 잔액 포인트 출력
    @GetMapping("/mypoint")
    public PointLogDto getMyPoint(){
        // 테스트 이후 멤버 아이디는 서비스에서 세션에서 가지고 오기
        System.out.println("PointController.getMyPoint");
        return pointService.getMyPoint();
    }   // getMyPoint() end

    // 포인트로그 포인트 내역 저장
    @PostMapping("/insertpointlog")
    public int insertPointLog(PointLogDto pointLogDto){
        return pointService.insertPointLog(pointLogDto);
    }   // insertPointLog() end

    // 포인트내역 출력
    @GetMapping("/mypointlog")
    public List<PointLogDto> mypointlog(SearchDto searchDto){
        return pointService.mypointlog(searchDto);
    }   // mypointlog() end


    // 로그인시 포인트 지급
    @PostMapping("/login")
    public boolean loginPoint(PointLogDto pointLogDto){
        System.out.println("PointController.loginPoint");
        System.out.println("pointLogDto = " + pointLogDto);
        return pointService.loginPoint(pointLogDto);
    }   // loginPoint end

    @PostMapping("/bus/purchase")
    public boolean busPurchase(PointLogDto pointLogDto){
        System.out.println("PointController.busPurchase");
        System.out.println("pointService = " + pointService);
        return pointService.busPurchase(pointLogDto);
    }

}
