package controllers;

import de.htwg.se.nmm.Game;
import de.htwg.se.nmm.aview.tui.TextUI;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.tuiGame;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class _TuiGameController extends Controller {

    public Result set(String command) {
        return process("set", command);
    }

    public Result pick(String command) {
        return process("pick", command);
    }

    public Result move(String command) {
        return process("move", command);
    }

    private Result process(String command, String query) {
        TextUI tui = Game.getInstance().getTui();
        tui.processInputLine(String.format("%s(%s)", command, query).toLowerCase());
        return ok(tuiGame.render(
                command +
                        tui.printHTML()));
    }

}
