package web.model.dao;

import org.apache.ibatis.annotations.Mapper;
import web.model.dto.BusDto;

import java.util.List;

@Mapper
public interface BusDao {

    boolean busReservation(BusDto busDto);


    int busPurchase(BusDto busDto);

    List<BusDto> busCheck(String gameCode);

    List<BusDto> busLog(int memberId);

}

