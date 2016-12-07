package actors;

import akka.actor.*;

public class SocketActor extends UntypedActor {

    public static Props props(ActorRef out) {
        return Props.create(SocketActor.class, out);
    }

    private final ActorRef out;

    public SocketActor(ActorRef out) {
        this.out = out;
    }

    public void onReceive(Object message) throws Exception {
        if (message instanceof String) {
            out.tell("I received your message: " + message, self());
        }
    }
}