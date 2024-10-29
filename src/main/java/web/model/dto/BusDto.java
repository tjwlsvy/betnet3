package web.model.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class BusDto {
    private int resNo;
    private String gameCode;
    private int pointlogid;
    private int reStatus; //예매완료:-1, 예매취소:1
    private int sumStatus;
    private int seat;
    private int memberId;
    private int description;
    private int pointChange;
    private String logDate;
}
