import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "./app/app.html",
    styleUrls: ['./app/app.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log("Application component initialized ...");
    }
}