package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.PutMapping;
import web.model.dto.GameDto;
import web.model.dto.SearchDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface GameDao {

    // 포인트로그등록
    int insertPointLog(GameDto gameDto);

    // 포인트 로그 출력
    int getPointId();

    // 게임구매 등록
    int insertGameList(GameDto gameDto);

    // 리스트아이디 가져오기
    int getListtId();

    // 게임구매하기
    int gamePurchase(GameDto gameDto);

    // 게임 리스트 출력
    List<GameDto> getlist(SearchDto searchDto);    // getlist() end

    // 게임 상세 출력
    List<GameDto> getDetail(GameDto gameDto);// getDetail() end

    // 게임구매시 내가 구매한 이력이 있는 경기인지 판단
    List<GameDto> isPurchased(GameDto gameDto);// isPurchased() end

    // 경기코드에 맞는 게임 구매 내역 가져오기
    List<GameDto> purchased(String matchid);

    // 구매목록에서 한번에 가지고 와서 correct 비교 후 구매목록 상태 수정
    // 어제 날짜 구매목록 가지고 오기
    List<GameDto> yesterdayPurchased(String dateString);

    // 최소된 경기 matchstate update
    int updateMatchstate(String matchid);

    // 결과 correct 필드 업데이트
    int updateCorrect(String matchid , int value , int detailid);

    // 적중 결과 update
    // int updateCorrectResult(int listid , int value);

    // gamestater가 4인 애들 가지고 오기 어제 날짜의
    List<GameDto> selectedCorrectList(int listid);

    // 배당률 저장
    int updateOods(int detailid , double odds);
    // 배당금지급
    int insertPointOods(int memberid , int pointChange);

}   // end class GameDao
