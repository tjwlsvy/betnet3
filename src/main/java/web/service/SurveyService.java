package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.model.dao.SurveyDao;
import web.model.dto.SurveyDto;

@Service
public class SurveyService {

    @Autowired private SurveyDao surveyDao;

    public int save(SurveyDto surveyDto){

        return surveyDao.save(surveyDto);
    }


}
