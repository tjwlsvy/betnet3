package web.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import web.controller.BusSocketController;
import web.controller.ChatController;
import web.controller.CheerChatController;

@Configuration // 해당 클래스를 스프링 컨테이너 빈 등록
@EnableWebSocket // 웹소켓 빈 등록
public class WebSocketConfig implements WebSocketConfigurer {
    @Autowired
    private ChatController chatcontroller;
    @Autowired
    private CheerChatController cheerChatController;
    @Autowired
    private BusSocketController busSocketController;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler( chatcontroller , "/chat/conn" );
        registry.addHandler( cheerChatController, "/cheer/conn");
        registry.addHandler( busSocketController, "/bus/conn");
        //registry.addHandler( 컨트롤러객체 , "ws매핑주소정의" );
    }
}