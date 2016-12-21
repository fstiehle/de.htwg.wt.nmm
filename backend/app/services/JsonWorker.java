package services;

import java.util.*;
import de.htwg.se.nmm.Game;
import de.htwg.se.nmm.controller.IGameController;
import de.htwg.se.nmm.model.IPuck;
import de.htwg.se.nmm.model.IPlayer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import play.libs.Json;

public class JsonWorker {

    /**
     * ProcessJson
     *
     * @param jsonStr
     * @throws IllegalArgumentException
     */
    public void processJson(String jsonStr) throws IllegalArgumentException {
        JsonNode json = Json.parse(jsonStr);
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

    private void changePlayerName(JsonNode json) throws IllegalArgumentException {
        IGameController gameController = Game.getInstance().getController();

        // convert params to String
        String man = json.findPath("command").textValue();
        String name = json.findPath("query").textValue();
        if(man == null) {
            throw new IllegalArgumentException("Bad parameter [command]");
        }
        if(name == null) {
            throw new IllegalArgumentException("Bad parameter [query]");
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
        gameController.update();
    }


    private void resetGame(JsonNode json) throws IllegalArgumentException {
        throw new IllegalArgumentException("Not implemented yet");
    }


    private void processCommand(JsonNode json) throws IllegalArgumentException {
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
