package models;

import actors.SocketActor;

import akka.actor.*;
import play.mvc.WebSocket;
import play.mvc.WebSocket.Out;
import play.mvc.LegacyWebSocket;

import de.htwg.se.nmm.controller.IGameController;
import de.htwg.se.nmm.util.observer.IObserver;

public class GameObserver implements IObserver {

    private SocketActor actor;
    private IGameController gameController;


    public GameObserver(IGameController controller, SocketActor actor) {
        controller.addObserver(this);
        this.gameController = controller;
        this.actor = actor;
    }

    @Override
    public void update() {
        actor.sendMessage(gameController.getJson());
        System.out.println("WUI was updated");
    }
}
