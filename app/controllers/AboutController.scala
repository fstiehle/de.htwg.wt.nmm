package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.Silhouette
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.mvc.{ Action, Controller }
import utils.auth.DefaultEnv

class AboutController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  def index = silhouette.UserAwareAction { implicit request =>
    Ok(views.html.about(request.identity))
  }

  def help = silhouette.UserAwareAction { implicit request =>
    Redirect(routes.AboutController.index())
  }

  def technologies = silhouette.UserAwareAction { implicit request =>
    Ok(views.html.technologies(request.identity))
  }
}