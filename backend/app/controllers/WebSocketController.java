package controllers;

import play.mvc.Controller;
import actors.SocketActor;
import play.mvc.WebSocket;
import play.mvc.LegacyWebSocket;


public class WebSocketController extends Controller {

    public LegacyWebSocket<String> socket() {
        return WebSocket.withActor(SocketActor::props);
    }

}




