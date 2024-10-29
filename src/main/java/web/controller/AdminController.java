package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.GameDto;
import web.model.dto.LogDto;
import web.model.dto.PointLogDto;
import web.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/cadmin")
public class AdminController {
    @Autowired AdminService adminService;

    @PutMapping("/update")
    public boolean cAdmin(String matchid){
        System.out.println(matchid);
        return adminService.cAdmin(matchid);
    }
    // 회원 접속 로그
    @GetMapping("/accessLog")
    public List<LogDto> accessLog(){
        System.out.println("AdminController.accessLog");
        return adminService.accessLog();
    }
    // 배당금 지급 내역
    @GetMapping("/dividend")
    public List<PointLogDto> dividend(){
        System.out.println("AdminController.dividend");
        return adminService.dividend();
    }
    // 포인트 구매 내역
    @GetMapping("/pointBuy")
    public List<PointLogDto> pointBuy(){
        return adminService.pointBuy();
    }
    // 포인트 출금 내역
    @GetMapping("/pointWithdrawal")
    public List<PointLogDto> pointWithdrawal(){
        return adminService.pointWithdrawal();
    }

    // 게임 구매 내역
    @GetMapping("/gameBuy")
    public List<GameDto> gameBuy(){
        return adminService.gameBuy();
    }



}
