package services;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;

public class JsonWorker {

    /**
     * ProcessJson
     *
     * @param jsonStr
     * @throws IllegalArgumentException
     */
    public void processJson(HttpWorker httpWorker, String jsonStr) throws IllegalArgumentException {

        JsonNode json = Json.parse(jsonStr);
        String type = json.findPath("type").textValue();
        if(type == null) {
            throw new IllegalArgumentException("Parameter [type] not found");
        }

        switch (type) {
            case "setPlayerName":
                httpWorker.setPlayerName(json);
                break;
            case "loadGame":
                httpWorker.loadGame(json);
                break;
            case "saveGame":
                httpWorker.saveGame(json);
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

    public void setPlayerUID(String uid, String fullName) {
        HttpWorker.setPlayerUID(Json.toJson(new String[] {uid, fullName}));
    }
}
