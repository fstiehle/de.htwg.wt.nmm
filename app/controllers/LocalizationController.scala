package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.Silhouette
import play.api.i18n.{ I18nSupport, MessagesApi, Lang }
import play.api.mvc.Controller
import utils.auth.DefaultEnv

class LocalizationController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv])
  extends Controller with I18nSupport {

  def langDE = silhouette.UserAwareAction { implicit request =>
    val referrer = request.headers.get(REFERER).getOrElse("/")
    Redirect(referrer).withLang(Lang("de"))
  }

  def langEN = silhouette.UserAwareAction { implicit request =>
    val referrer = request.headers.get(REFERER).getOrElse("/")
    Redirect(referrer).withLang(Lang("en"))
  }
}