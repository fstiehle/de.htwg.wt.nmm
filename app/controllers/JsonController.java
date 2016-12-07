package controllers;

import java.util.*;
import de.htwg.se.nmm.Game;
import de.htwg.se.nmm.controller.IGameController;
import de.htwg.se.nmm.model.IJunction;
import de.htwg.se.nmm.model.IPuck;
import de.htwg.se.nmm.model.IPlayer;
import de.htwg.se.nmm.aview.tui.TextUI;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.BodyParser;
import play.libs.Json;
import play.libs.Json.*;
import views.html.tuiGame;

import services.JsonWorker;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class JsonController extends Controller {

    IGameController gameController = Game.getInstance().getController();

    public Result get() {
        Result jsonResult = ok(gameController.getJson()).as("application/json");
        return jsonResult;
    }

    @BodyParser.Of(BodyParser.Json.class)
    public Result changePlayerName() {
        JsonNode json = request().body().asJson();

        JsonWorker.processJson(json);

        Result jsonResult = ok(gameController.getJson()).as("application/json");
        return jsonResult;
    }

    @BodyParser.Of(BodyParser.Json.class)
    public Result process() {
        JsonNode json = request().body().asJson();

        JsonWorker.processJson(json);

        Result jsonResult = ok(gameController.getJson()).as("application/json");
        return jsonResult;
    }
}
