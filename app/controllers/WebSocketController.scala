package controllers

import javax.inject.Inject

import actors.SocketActor
import akka.actor.{ ActorRef, ActorSystem }
import akka.stream.Materializer
import akka.util.ByteString
import com.google.gson.JsonParser
import com.mohiva.play.silhouette.api.{ HandlerResult, Silhouette }
import play.api.i18n.Lang
import play.api.libs.json.JsValue
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

  var actorRef: ActorRef = null

  /**
   * Secure socket connection, not currently in use
   */
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
    ActorFlow.actorRef(out => {
      actorRef = out
      SocketActor.props(out)
    })
  }

  /**
   * Forward outside data to websocket
   */
  def forward = Action.async { implicit request =>
    println("processAction " + request)
    silhouette.UnsecuredRequestHandler { _ =>
      Future.successful(HandlerResult(Ok, Some("OK")))
    }.map {
      case HandlerResult(r, Some(data)) => {
        print(actorRef.path)
        if (system != null) {
          system.actorSelection("/user/StreamSupervisor*/*") ! request.body.asRaw.get.asBytes().get.decodeString(ByteString.UTF_8)
        }
        Ok(data)
      }
      case HandlerResult(r, None) => Forbidden
    }
  }
}