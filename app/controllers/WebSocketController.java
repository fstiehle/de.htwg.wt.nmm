package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

import actors.SocketActor;

import akka.actor.*;
import play.libs.F.*;
import play.mvc.WebSocket;
import play.mvc.LegacyWebSocket;


public class WebSocketController extends Controller {

    public LegacyWebSocket<String> socket() {
        return WebSocket.withActor(SocketActor::props);
    }

}




