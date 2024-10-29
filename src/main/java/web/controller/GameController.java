package web.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import web.model.dao.GameDao;
import web.model.dto.GameDto;
import web.model.dto.MatchScheduleDto;
import web.model.dto.SearchDto;
import web.service.GameService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {
    @Autowired
    GameService gameService;


    // 게임 구매
    @PostMapping("/purchase")
    public int gamePeurchase(@RequestBody GameDto gameDto){
        System.out.println("GameController.gamePeurchase");
        System.out.println("gameDto = " + gameDto);
        return gameService.gamePeurchase(gameDto);
    }   // end method gamePurchase

    // 게임 리스트 출력
    @GetMapping("/getlist")
    public List<GameDto> getlist(SearchDto searchDto){
        return gameService.getlist(searchDto);
    }   // getlist() end

    // 게임 상세 출력
    @GetMapping("/detail")
    public List<GameDto> getDetail(GameDto gameDto){
        return gameService.getDetail(gameDto);
    }   // getDetail() end

    // 게임구매시 내가 구매한 이력이 있는 경기인지 판단
    @GetMapping("/ispurchased")
    public boolean isPurchased(GameDto gameDto){
        System.out.println("GameController.isPurchased");
        System.out.println("gameDto = " + gameDto);
        return gameService.isPurchased(gameDto);
    }   // isPurchased() end

    // 배당금 지급 컨트롤러
    @PostConstruct
    public void init() {
        work(); // 서버 시작 시 실행할 작업
    }

    @GetMapping("/work")
    @Scheduled(cron = "0 0 12 * * ?") // 매일 낮 12시에 실행
    public void work() {
        StringBuilder result = new StringBuilder();
        String urlStr = "http://localhost:5000/monthlyschedule";
        boolean oodsResult = false;
        try {
            // URL 객체 생성
            URL url = new URL(urlStr);
            // URL로부터 HTTP 연결을 생성
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            // InputStreamReader와 BufferedReader를 사용하여 응답 스트림 읽기
            try (BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8))) {
                String returnLine;
                // 응답의 각 줄을 읽어오는 반복문    // null일때까지 반복
                while ((returnLine = br.readLine()) != null) {
                    // 읽어온 각 줄을 result에 저장
                    result.append(returnLine);
                }
            }
            // url 연결 끊기
            urlConnection.disconnect();
            // JSON 문자열을 matchScheduleDto 리스트로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            // objectMapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);  // list deserialization 기능 활성화 // 기본적으로 배열이 필요한 위치에 단일 값이 제공될 경우 이를 허용하도록 설정
            // match dto 에는 리스트가 필요한 dto가 없으므로 사용 x
            List<MatchScheduleDto> scheduleList = objectMapper.readValue(result.toString(), new TypeReference<List<MatchScheduleDto>>() {});

            // 콘솔에 출력   // 확인 용
            // System.out.println("GameController.work");
            // System.out.println(scheduleList);

            gameService.payout(scheduleList);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}   // class GameController
