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

        // convert params to String
        String man = json.findPath("man").textValue();
        String name = json.findPath("name").textValue();
        if(man == null) {
            return badRequest("Bad parameter [man]");
        }
        if(name == null) {
            return badRequest("Bad parameter [name]");
        }

        switch (man) {
            case "WHITE":
                gameController.getPlayer(IPlayer.Man.WHITE).setName(name);
                break;
            case "BLACK":
                gameController.getPlayer(IPlayer.Man.BLACK).setName(name);
                break;
            default:
                return badRequest("Bad parameter [man]");
        }

        Result jsonResult = ok(gameController.getJson()).as("application/json");
        return jsonResult;
    }

    @BodyParser.Of(BodyParser.Json.class)
    public Result process() {
        JsonNode json = request().body().asJson();

        String command = null;
        JsonNode queryNode = null;
        List<String> queryList = null;

        // convert command to String
        command = json.findPath("command").textValue();
        if(command == null) {
            return badRequest("Bad parameter [command]");
        }

        // convert query to ArrayList
        try {
            queryNode = json.findPath("query");
            queryList = new ObjectMapper().convertValue(queryNode, ArrayList.class);
        } catch (Exception e) {
            return badRequest("Bad parameter [query]");
        }

        switch (command) {
            case "set":
                IPuck p = gameController.getInjector().getInstance(IPuck.class);
                p.setPlayer(gameController.getCurrentIPlayer());
                gameController.setPuck(queryList.get(0), p);
                break;
            case "pick":
                gameController.pickPuck(queryList.get(0));
                break;
            case "move":
                gameController.movePuck(queryList.get(0), queryList.get(1));
                break;
            default:
                return badRequest("Bad parameter [command]");
        }
        gameController.update();



        Result jsonResult = ok(gameController.getJson()).as("application/json");
        return jsonResult;
    }
}
