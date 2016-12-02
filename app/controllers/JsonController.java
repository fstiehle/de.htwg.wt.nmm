package controllers;


import de.htwg.se.nmm.Game;
import de.htwg.se.nmm.controller.IGameController;
import de.htwg.se.nmm.aview.tui.TextUI;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.BodyParser;
import play.libs.Json;
import play.libs.Json.*;
import views.html.tuiGame;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;


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
    public Result process() {
        JsonNode json = request().body().asJson();

        String command = json.findPath("command").textValue();
        String query = json.findPath("query").textValue();
        if(command == null) {
            return badRequest("Missing parameter [command]");
        } else if (query == null) {
            return badRequest("Missing parameter [query]");
        }

        // TODO: Parse Json to valid values

        TextUI tui = Game.getInstance().getTui();
        tui.processInputLine(String.format("%s(%s)", command, query).toLowerCase());

        Result jsonResult = ok(gameController.getJson()).as("application/json");
        return jsonResult;
    }
}
