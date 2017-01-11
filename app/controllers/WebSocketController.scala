package controllers

import javax.inject.Inject

import actors.SocketActor
import akka.actor.ActorSystem
import akka.stream.Materializer
import com.mohiva.play.silhouette.api.{ HandlerResult, Silhouette }
import play.api.libs.streams._
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class WebSocketController @Inject() (
  implicit
  system: ActorSystem,
  materializer: Materializer,
  silhouette: Silhouette[DefaultEnv]) extends Controller {

  def secureSocket = WebSocket.acceptOrResult[String, String] { request =>
    implicit val req = Request(request, AnyContentAsEmpty)
    silhouette.SecuredRequestHandler { securedRequest =>
      Future.successful(HandlerResult(Ok, Some(securedRequest.identity)))
    }.map {
      case HandlerResult(r, Some(user)) => Right(ActorFlow.actorRef(out => SocketActor.props(out)))
      case HandlerResult(r, None) => Left(Unauthorized)
    }
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef(out => SocketActor.props(out))
  }
}