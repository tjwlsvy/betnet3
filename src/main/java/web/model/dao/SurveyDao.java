package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.SurveyDto;

@Mapper
public interface SurveyDao {

    int save(SurveyDto surveyDto);

}
