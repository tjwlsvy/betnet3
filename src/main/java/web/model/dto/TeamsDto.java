package web.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TeamsDto {
    //09.09 팀Dto
    private int teamCode;
    private String teamName;
}
