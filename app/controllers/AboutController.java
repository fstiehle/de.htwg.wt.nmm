package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

/**
 *
 */
public class AboutController extends Controller {

    public Result index() {
        return ok(about.render("about"));
    }

    public Result help() {
        return redirect(routes.AboutController.index());
    }
}
