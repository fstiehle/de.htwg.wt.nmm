package controllers;

import de.htwg.se.nmm.aview.tui.TextUI;
import play.mvc.*;
import views.html.*;
import de.htwg.se.nmm.Game;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class GameController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        return ok(index.render("Hallo!"));
    }

    public Result game(String command) {
        TextUI tui = Game.getInstance().getTui();
        tui.processInputLine(command);
        return ok(game.render(
                command +
                tui.printHTML()));
    }

    public Result x3dom() {
        return ok(board.render());
    }

}
