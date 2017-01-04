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

    private UUID requestUserID = null;

    /**
     * SecureProcessJson
     * Checks the userID from the current request with the userID from the current player from NMM
     *
     * @param jsonStr
     * @param userID
     * @throws IllegalArgumentException
     */
    public void secureProcessJson(String jsonStr, UUID userID) throws IllegalArgumentException {
        this.requestUserID = userID;
        processJson(jsonStr);
    }

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
            case "refreshGame":
                refreshGame(json);
                break;
            default:
                throw new IllegalArgumentException("Illegal parameter [type] found");
        }
    }

    private void refreshGame(JsonNode json) throws IllegalArgumentException {
        IGameController gameController = Game.getInstance().getController();
        gameController.update();
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
        IGameController gameController = Game.getInstance().getController();
        gameController.initNewGame();
        gameController.update();
    }


    private void processCommand(JsonNode json) throws IllegalArgumentException {
        IGameController gameController = Game.getInstance().getController();

        // ######## security
        // ATTENTION: if statement are legacy --> for unsecured requests without silhouette (eg. angular2)
        if (requestUserID != null) {
            IPlayer currentUser = gameController.getCurrentIPlayer();
            if (currentUser.getUserID() != requestUserID) {
                // TODO: Handle Error and return Error Message
                //throw new IllegalAccessException("User of current request have no access to process current command");
                return;
            }
        }
        // ########

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
