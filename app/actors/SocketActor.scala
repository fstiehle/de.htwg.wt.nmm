package actors

import java.lang.IllegalArgumentException

import akka.actor.{ Actor, ActorRef, Props }
import de.htwg.se.nmm.Game
import models.{ GameObserver, User }
import play.api.libs.json.Json
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
      try {
        new JsonWorker().processJson(msg)
      } catch {
        case ex: Exception => {
          val message = Json.obj("code" -> "400", "message" -> "Bad Request (see logs for more details)")
          ex.printStackTrace()
          out ! message.toString()
        }
      }
  }

  def sendMessage(data: String) = {
    //println(data)
    out ! data
  }
}
