package actors

import akka.actor.{ Actor, ActorRef, Props }
import de.htwg.se.nmm.Game
import models.{ GameObserver, User }
import services.JsonWorker

/**
 * Created by funkemarkus on 16.12.16.
 */
object SocketActor {
  def props(out: ActorRef) = Props(new SocketActor(out))
}

class SocketActor(out: ActorRef) extends Actor {
  var gameController = Game.getInstance().getController
  new GameObserver(gameController, this)

  def receive = {
    case msg: String =>
      //out ! ("Hi, I received your message: " + msg)

      new JsonWorker().processJson(msg)
  }

  def sendMessage(data: String) = {
    //println(data)
    out ! data
  }
}
