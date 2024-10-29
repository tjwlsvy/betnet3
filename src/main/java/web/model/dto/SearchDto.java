package web.model.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class SearchDto {
    private int description;
    private String startDate;
    private String endDate;
    private int memberid;
    private int startPoint;
    private int endPoint;
    private int gamestate;
}
