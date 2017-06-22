package controllers

import javax.inject.Inject

import services.JsonWorker
import com.mohiva.play.silhouette.api._
import de.htwg.se.nmm.Game
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.json._
import play.api.mvc.{ Action, Controller }
import utils.auth.DefaultEnv
import scala.concurrent.ExecutionContext.Implicits.global

import scala.concurrent.Future

/**
 * The `Change Password` controller.
 *
 * @param messagesApi            The Play messages API.
 * @param silhouette             The Silhouette stack.
 */
class JsonController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  var gameController = Game.getInstance().getController

  def get = Action.async { implicit request =>
    silhouette.SecuredRequestHandler { securedRequest =>
      Future.successful(HandlerResult(Ok, Some(securedRequest.identity)))
    }.map {
      case HandlerResult(r, Some(user)) => Ok(gameController.getJson()) as "application/json"
      case HandlerResult(r, None) => Unauthorized
    }
  }

}