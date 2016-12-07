package services;

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

public class JsonWorker {

    /**
     * ProcessJson
     *
     * @param json
     * @throws IllegalArgumentException
     */
    public static void processJson(JsonNode json) throws IllegalArgumentException {
        System.out.println(json);
        String type = json.findPath("type").textValue();
        if(type == null) {
            throw new IllegalArgumentException("Parameter [type] not found");
        }

        switch (type) {
            case "setPlayerName":
                changePlayerName(json);
                break;
            case "resetGame":
                resetGame(json);
                break;
            case "processCommand":
                processCommand(json);
                break;
            default:
                throw new IllegalArgumentException("Illegal parameter [type] found");
        }
    }

    private static void changePlayerName(JsonNode json) throws IllegalArgumentException {
        IGameController gameController = Game.getInstance().getController();

        // convert params to String
        String man = json.findPath("man").textValue();
        String name = json.findPath("name").textValue();
        if(man == null) {
            throw new IllegalArgumentException("Bad parameter [man]");
        }
        if(name == null) {
            throw new IllegalArgumentException("Bad parameter [name]");
        }

        switch (man) {
            case "WHITE":
                gameController.getPlayer(IPlayer.Man.WHITE).setName(name);
                break;
            case "BLACK":
                gameController.getPlayer(IPlayer.Man.BLACK).setName(name);
                break;
            default:
                throw new IllegalArgumentException("Bad parameter [man]");
        }
    }


    private static void resetGame(JsonNode json) throws IllegalArgumentException {
        throw new IllegalArgumentException("Not implemented yet");
    }


    private static void processCommand(JsonNode json) throws IllegalArgumentException {
        IGameController gameController = Game.getInstance().getController();

        String command = null;
        JsonNode queryNode = null;
        List<String> queryList = null;

        // convert command to String
        command = json.findPath("command").textValue();
        if(command == null) {
            throw new IllegalArgumentException("Bad parameter [command]");
        }

        // convert query to ArrayList
        try {
            queryNode = json.findPath("query");
            queryList = new ObjectMapper().convertValue(queryNode, ArrayList.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Bad parameter [query]");
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
                throw new IllegalArgumentException("Bad parameter [command]");
        }
        gameController.update();
    }
}
