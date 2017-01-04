package actors

import akka.actor.{Actor, ActorRef, Props}
import de.htwg.se.nmm.Game
import models.{GameObserver, User}
import services.JsonWorker

/**
 * Created by funkemarkus on 16.12.16.
 */
object SocketActor {
  def props(out: ActorRef, user: User = null) = Props(new SocketActor(out, user))
}

class SocketActor(out: ActorRef, user: User) extends Actor {
  var gameController = Game.getInstance().getController
  new GameObserver(gameController, this)

  def receive = {
    case msg: String =>
      // Debug
      //out ! ("Hi, I received your message: " + msg)
      if (user != null) {
        println("secure actor with userID = " + user.userID)
        new JsonWorker().secureProcessJson(msg, user.userID)
      } else {
        println("unsecured actor")
        new JsonWorker().processJson(msg)
      }
  }

  def sendMessage(data: String) = {
    //println(data)
    out ! data
  }
}
