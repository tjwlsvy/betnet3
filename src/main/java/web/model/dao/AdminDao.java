package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.GameDto;
import web.model.dto.LogDto;
import web.model.dto.PointLogDto;

import java.util.List;

@Mapper
public interface AdminDao {

    boolean cAdmin(String matchid);

    // 회원 접속 로그
    List<LogDto> accessLog();

    // 배당금 지급 내역
    List<PointLogDto> dividend();

    // 포인트 구매 내역
    List<PointLogDto> pointBuy();

    // 포인트 출금 내역
    List<PointLogDto> pointWithdrawal();

    // 게임 구매 내역
    public List<GameDto> gameBuy();


}
