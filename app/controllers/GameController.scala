package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api._
import de.htwg.se.nmm.Game
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.mvc.Controller
import utils.auth.DefaultEnv

/**
 * The `Main Game Controller` controller.
 *
 * @param messagesApi            The Play messages API.
 * @param silhouette             The Silhouette stack.
 */
class GameController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  val gameController = Game.getInstance.getController

  def index = silhouette.SecuredAction { implicit request =>
    val player = gameController.getPlayerWithoutUserID(request.identity.userID)
    if (player != null) {
      player.setName(request.identity.fullName.getOrElse(player.getMan.toString()))
      player.setUserID(request.identity.userID)
      gameController.update()
    }

    Ok(views.html.game(request.identity))
  }

  def reset = silhouette.SecuredAction { implicit request =>
    gameController.initNewGame()
    gameController.update()
    Redirect(routes.ApplicationController.index())
  }
}