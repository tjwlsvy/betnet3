package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import web.model.dao.AdminDao;
import web.model.dto.GameDto;
import web.model.dto.LogDto;
import web.model.dto.PointLogDto;

import java.util.List;

@Service
public class AdminService {
    @Autowired AdminDao adminDao;

    public boolean cAdmin(String matchid){
        return adminDao.cAdmin(matchid);
    }
    // 회원 접속 로그
    public List<LogDto> accessLog(){
        System.out.println("AdminService.accessLog");
        return adminDao.accessLog();
    }
    // 배당금 지급 내역
    public List<PointLogDto> dividend(){
        System.out.println("AdminService.dividend");
        return adminDao.dividend();
    }
    // 포인트 구매 내역
    public List<PointLogDto> pointBuy(){
        return adminDao.pointBuy();
    }
    // 포인트 출금 내역
    public List<PointLogDto> pointWithdrawal(){
        return adminDao.pointWithdrawal();
    }
    // 게임 구매 내역
    public List<GameDto> gameBuy(){
        return adminDao.gameBuy();
    }
}
