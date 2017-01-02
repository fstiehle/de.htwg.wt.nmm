package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api._
import de.htwg.se.nmm.Game
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.mvc.Controller
import utils.auth.DefaultEnv

import scala.concurrent.Future

/**
 * The `Change Password` controller.
 *
 * @param messagesApi            The Play messages API.
 * @param silhouette             The Silhouette stack.
 */
class GameController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  val gameController = Game.getInstance.getController

  def index = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(views.html.game(request.identity)))
  }

  def reset = silhouette.SecuredAction { implicit request =>
    gameController.initNewGame()
    gameController.update()
    Redirect(routes.GameController.index())
  }
}