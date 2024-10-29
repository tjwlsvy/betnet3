package web.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class SurveyDto {

    private int question1; // 가장 좋아하는 KBO 팀
    private int question2; // 경기 중 가장 흥미로운 요소
    private int question3; // 새로운 팀 추천 시 중요 요소
    private int question4; // 추천받고 싶은 팀의 특정 특징
    private int question5; // 경기 관람 경험을 위해 중요한 요소
    private int question6; // 새 시즌 트렌드나 변화로 기대하는 것
    private int question7; // 선수의 개인 성과
    private int question8; // 팬층이나 팬 문화
    private int question9; // 경기 스타일
    private int question10; // 팬 문화

}
