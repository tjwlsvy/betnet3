package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.model.dto.SurveyDto;
import web.service.SurveyService;

@RestController
@RequestMapping("/survey")
public class SurveyController {
    @Autowired SurveyService surveyService;

    @GetMapping("/save")
    public int save(SurveyDto surveyDto){
        System.out.println("surveyDto = " + surveyDto);
        return surveyService.save(surveyDto);

    }




}
