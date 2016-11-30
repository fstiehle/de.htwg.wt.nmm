package controllers;


import de.htwg.se.nmm.Game;
import de.htwg.se.nmm.controller.IGameController;
import de.htwg.se.nmm.aview.tui.TextUI;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.tuiGame;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class JsonController extends Controller {

    public Result index(String command) {
        IGameController gameController = Game.getInstance().getController();

        TextUI tui = Game.getInstance().getTui();
        tui.processInputLine(command);

        return ok(gameController.getJson());
    }

}
