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
    public void processJson(HTTPWorker httpWorker, String jsonStr) throws IllegalArgumentException {

        System.out.println("Process");

        JsonNode json = Json.parse(jsonStr);
        String type = json.findPath("type").textValue();
        if(type == null) {
            throw new IllegalArgumentException("Parameter [type] not found");
        }

        switch (type) {
            case "setPlayerName":
                httpWorker.changePlayerName(json);
                break;
            case "resetGame":
                httpWorker.resetGame();
                break;
            case "processCommand":
                httpWorker.processCommand(json);
                break;
            case "refreshGame":
                httpWorker.refreshGame();
                break;
            default:
                throw new IllegalArgumentException("Illegal parameter [type] found");
        }
    }

}
