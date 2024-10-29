package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.model.dto.BusDto;
import web.service.BusService;

import java.util.List;

@RestController
@RequestMapping("/bus")
public class BusController {
    @Autowired BusService busService;

    @PostMapping("/Reservation")
    public boolean busReservation(@RequestBody List<BusDto> busDtos){
        System.out.println("BusController.busReservation");

        return busService.busReservation(busDtos);
    }
    @PostMapping("/cancel")
    public boolean busCancel(BusDto busDto){
        System.out.println("BusController.busCancel");
        System.out.println("busDto = " + busDto);
        return busService.busCancel(busDto);
    }

    @GetMapping("/check")
    public List<BusDto> busCheck(String gameCode){
        System.out.println("gameCode = " + gameCode);
        return busService.busCheck(gameCode);
    }

    @GetMapping("/log")
    public List<BusDto> busLog(){
        return busService.busLog();
    }


}
