package web.model.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class CheerChatDto {
    private String type;
    private String roomId;
    private double latitude;   // 위도
    private double longitude;   // 경도
    private int memberid;
    private String date;
    private String roomTitle;
    private String matchId;
}
