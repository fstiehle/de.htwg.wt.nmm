package controllers

import javax.inject.Inject

import actors.SocketActor
import akka.actor.ActorSystem
import akka.stream.Materializer
import play.api.libs.streams._
import play.api.mvc._

class WebSocketController @Inject() (implicit system: ActorSystem, materializer: Materializer) {

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef(out => SocketActor.props(out))
  }
}