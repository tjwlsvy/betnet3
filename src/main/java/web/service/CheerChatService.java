package web.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import web.model.dto.CheerChatDto;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.nio.file.Path;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

@Service
public class CheerChatService {
    @Autowired
    MemberService memberService;

    // 오늘 날짜 포매팅
    LocalDate today = LocalDate.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd"); // 원하는 형식으로 포맷
    String formattedDate = today.format(formatter);

    // 여기에서 csv 파일 처리 예정
    @Async
    public boolean saveChatRoom(JsonNode jsonNode){
        System.out.println("CheerChatService.saveChatRoom");
        System.out.println("jsonNode = " + jsonNode);

        CheerChatDto cheerChatDto = new CheerChatDto();
        // 위치 데이터 체크
        JsonNode positionNode = jsonNode.get("position");
        if (positionNode != null && positionNode.has("Ma") && positionNode.has("La")) {
            double latitude = positionNode.get("Ma").asDouble();    // 위도
            double longitude = positionNode.get("La").asDouble();   // 경도
            String roomId = jsonNode.get("message").asText();
            int memberid = jsonNode.get("memberid").asInt();
            String date = jsonNode.get("date").asText();
            String roomTitle = jsonNode.get("roomTitle").asText();
            String matchId = jsonNode.get("matchId").asText();

            cheerChatDto.setRoomId(roomId);
            cheerChatDto.setLatitude(latitude);
            cheerChatDto.setLongitude(longitude);
            cheerChatDto.setMemberid(memberid);
            cheerChatDto.setDate(date);
            cheerChatDto.setRoomTitle(roomTitle);
            cheerChatDto.setMatchId(matchId);

        } else{
            System.out.println("위치정보가 누락되었습니다.");
        }

        String csvFilePath = "C:\\Users\\tj-bu-703-008\\Desktop\\betnet\\src\\main\\resources\\static\\csv\\chat_rooms_" + formattedDate + ".csv";
        // String csvFilePath = "/Users/yangjaeyeon/Desktop/betnet/src/main/resources/static/csv/chat_rooms_" + formattedDate + ".csv";

        Path path = Path.of(csvFilePath);

        // CSV 파일 헤더와 기록할 내용
        List<String> headers = List.of("matchId","memberid" ,"roomId", "roomTitle" , "latitude", "longitude" , "date");
        List<Object> record = List.of(cheerChatDto.getMatchId(),cheerChatDto.getMemberid(),cheerChatDto.getRoomId(), cheerChatDto.getRoomTitle() , cheerChatDto.getLatitude(), cheerChatDto.getLongitude(),cheerChatDto.getDate());

        try {
            // 파일 존재 여부 체크 및 헤더 추가
            if (!Files.exists(path)) {
                Files.createFile(path); // 파일 생성
                try (CSVPrinter csvPrinter = new CSVPrinter(Files.newBufferedWriter(path, StandardOpenOption.WRITE),
                        CSVFormat.DEFAULT.withHeader(headers.toArray(new String[0])))) {
                    csvPrinter.printRecord(record);
                }
            } else {
                // 파일이 이미 존재하면 데이터만 추가
                try (CSVPrinter csvPrinter = new CSVPrinter(Files.newBufferedWriter(path, StandardOpenOption.APPEND),
                        CSVFormat.DEFAULT)) {
                    csvPrinter.printRecord(record);
                }
            }
            System.out.println("채팅방 정보가 CSV 파일에 저장되었습니다.");
            return true;
        } catch (IOException e) {
            System.out.println("CSV 파일 저장 중 오류 발생: " + e.getMessage());
        }
        return false;
    }   // saveChatRoom() end

    public List<CheerChatDto> readCSV(JsonNode jsonNode){
        List<CheerChatDto> list = new ArrayList<>();
        String matchId = jsonNode.get("matchId").asText();
        System.out.println("matchId = " + matchId);

        try {
            File file = new File("C:/Users/tj-bu-703-008/Desktop/betnet/src/main/resources/static/csv/chat_rooms_" + formattedDate + ".csv");
            // File file = new File("/Users/yangjaeyeon/Desktop/betnet/src/main/resources/static/csv/chat_rooms_" + formattedDate + ".csv");

            BufferedReader br = new BufferedReader(new FileReader(file));

            // 첫 번째 행을 읽고 버리기 (헤더)
            String header = br.readLine();

            String line;
            while ((line = br.readLine()) != null) {
                String[] lineArr = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);

                // 각 열에 맞는 데이터 타입으로 변환
                if (lineArr.length >= 7) {
                    String currentMatchId = lineArr[0].trim();
                    int memberid = Integer.parseInt(lineArr[1].trim());
                    String roomid = lineArr[2].trim();
                    String roomTitle = lineArr[3].trim();
                    Double latitude = Double.parseDouble(lineArr[4].trim());
                    Double longitude = Double.parseDouble(lineArr[5].trim());
                    String date = lineArr[6].trim();

                    // matchId와 비교
                    if (currentMatchId.equals(matchId)) {
                        CheerChatDto cheerChatDto = new CheerChatDto();
                        cheerChatDto.setMatchId(currentMatchId);
                        cheerChatDto.setMemberid(memberid);
                        cheerChatDto.setRoomId(roomid);
                        cheerChatDto.setRoomTitle(roomTitle);
                        cheerChatDto.setLatitude(latitude);
                        cheerChatDto.setLongitude(longitude);
                        cheerChatDto.setDate(date);

                        list.add(cheerChatDto); // DTO 리스트에 추가
                    }
                }
            }
            br.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }   // readCSV() end

}   // CheerChatService end
