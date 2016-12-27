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
class _TuiGameController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  var tui = Game.getInstance().getTui

  def set(command: String) = silhouette.SecuredAction { implicit request =>
    process("set", command)
    Ok(views.html.tuiGame(tui.printHTML(), request.identity))
  }

  def pick(command: String) = silhouette.SecuredAction { implicit request =>
    process("pick", command)
    Ok(views.html.tuiGame(tui.printHTML(), request.identity))
  }

  def move(command1: String, command2: String) = silhouette.SecuredAction { implicit request =>
    process("move", String.format("%s,%s", command1, command2))
    Ok(views.html.tuiGame(tui.printHTML(), request.identity))
  }

  def get() = silhouette.SecuredAction { implicit request =>
    Ok(views.html.tuiGame(tui.printHTML(), request.identity))
  }

  private def process(command: String, query: String) = {
    tui.processInputLine(String.format("%s(%s)", command, query).toLowerCase())
  }
}