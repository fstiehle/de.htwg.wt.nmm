package services;

import actors.SocketActor;
import com.fasterxml.jackson.databind.JsonNode;

import play.api.Play;
import play.mvc.*;
import play.libs.ws.*;

/**
 * Created by fabianstiehle on 22.06.17.
 */
public class HttpWorker extends Controller {

    WSClient ws;
    SocketActor actor;
    private static final String url = "http://localhost:8080/";

    public HttpWorker(SocketActor actor) {
        ws = Play.current().injector().instanceOf(WSClient.class);
        this.actor = actor;
    }

    public void setPlayerName(JsonNode json) {
        this.ws.url(url + "setPlayerName").post(json).thenApply(WSResponse::asJson).whenComplete(
            (msg, error) -> this.actor.sendMessage(msg.toString()));
    }

    public void resetGame() {
        this.ws.url(url + "resetGame").get().thenApply(WSResponse::asJson).whenComplete(
            (msg, error) -> this.actor.sendMessage(msg.toString()));
    }

    public void processCommand(JsonNode json) {
        this.ws.url(url + "processCommand").post(json).thenApply(WSResponse::asJson).whenComplete(
            (msg, error) -> this.actor.sendMessage(msg.toString()));
    }

    public void refreshGame() {
        this.ws.url(url + "game").get().thenApply(WSResponse::asJson).whenComplete(
            (msg, error) -> this.actor.sendMessage(msg.toString()));
    }

    public void loadGame(JsonNode json) {
    }

    public void saveGame(JsonNode json) {
    }

    public static void setPlayerUID(JsonNode json) {
        System.out.println(json);
        Play.current().injector().instanceOf(WSClient.class)
            .url(url + "getPlayerWithoutUID").post(json).thenApply(WSResponse::asJson).whenComplete(
            (msg, error) -> {
                System.out.println(msg.toString());

            });
    }
}
