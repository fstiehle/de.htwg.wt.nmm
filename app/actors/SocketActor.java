package actors;

import de.htwg.se.nmm.Game;
import de.htwg.se.nmm.controller.IGameController;

import akka.actor.*;
import services.JsonWorker;
import models.GameObserver;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class SocketActor extends UntypedActor {

    public static Props props(ActorRef out) {
        return Props.create(SocketActor.class, out);
    }

    private final ActorRef out;

    public SocketActor(ActorRef out) {
        IGameController gameController = Game.getInstance().getController();
        new GameObserver(gameController, this);
        this.out = out;
    }

    public void onReceive(Object data) throws Exception {
        if (data instanceof String) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode json = mapper.readTree((String) data);

                JsonWorker.processJson(json);
            } catch (IllegalArgumentException e) {
                // TODO: return bad request with socket
                System.out.println(e);
            }

        }
    }

    public void sendMessage(String data) {
        out.tell(data, self());
    }
}