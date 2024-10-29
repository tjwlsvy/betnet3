package web.model.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class MatchScheduleDto {
// [{'경기코드': '20240901-두산-1400', '연도': '2024', '월': '09', '일': '01', '시작시간': '14:00', '어웨이팀명': '롯데',
// '홈팀명': '두산', '어웨이점수': '4', '홈점수': '3', '비고': None, '어웨이예측순위': '5.877', '홈예측순위': '4.525',
// '어웨이배당률': '1.56', '홈배당률': '1.44', '어웨이승률': '0.44', '홈승률': '0.56'}

    private String 월;
    private String 일;
    private String 시작시간;
    private String 어웨이팀명;
    private String 홈팀명;
    private int 어웨이점수;
    private int 홈점수;
    private String 비고;
    private String 경기코드;
    private double 어웨이예측순위;
    private double 홈예측순위;
    private double 어웨이배당률;
    private double 홈배당률;
    private double 어웨이승률;
    private double 홈승률;
    private int 결과; // 홈팀 기준    // 1 : 승 0 : 패
    private String 연도;
}
