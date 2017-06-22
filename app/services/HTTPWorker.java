package services;

import actors.SocketActor;
import com.fasterxml.jackson.databind.JsonNode;
import javax.inject.*;

import play.Application;
import play.api.Play;
import play.mvc.*;
import play.libs.ws.*;
import java.util.concurrent.CompletionStage;

import java.util.concurrent.CompletionStage;

/**
 * Created by fabianstiehle on 22.06.17.
 */
public class HTTPWorker extends Controller {

    WSClient ws;
    SocketActor actor;
    private final String url = "http://localhost:8080/";

    public HTTPWorker(SocketActor actor) {
        ws = Play.current().injector().instanceOf(WSClient.class);
        this.actor = actor;
    }

    public void changePlayerName(JsonNode json) {
        this.ws.url(url + "changePlayerName").post(json).thenApply(WSResponse::asJson).whenComplete((msg, error) -> {
            this.actor.sendMessage(msg.toString());
        });
    }

    public void resetGame() {
        this.ws.url(url + "resetGame").get().thenApply(WSResponse::asJson).whenComplete((msg, error) -> {
            this.actor.sendMessage(msg.toString());
        });
    }

    public void processCommand(JsonNode json) {
        this.ws.url(url + "processCommand").post(json).thenApply(WSResponse::asJson).whenComplete((msg, error) -> {
            this.actor.sendMessage(msg.toString());
        });
    }

    public void refreshGame() {
        this.ws.url(url + "game").get().thenApply(WSResponse::asJson).whenComplete((msg, error) -> {
            this.actor.sendMessage(msg.toString());
        });
    }
}
