webpackJsonp([0,3],{

/***/ 1000:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(435);


/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Junction
 * Holds the mojs shape
 */
var Junction = (function () {
    /**
     * @param Angular component to which shape will be attached
     * @param board element to base positioning on
     */
    function Junction(id, board) {
        this.Mojs = __webpack_require__(399);
        /**
         * Use a mute for the rescale process
         */
        this.MUTE = 30;
        this.SHAPE = "circle";
        this.STROKE = 4;
        this.POINTS = 0;
        this.id = id;
        this.board = board;
    }
    /**
     * Depiction to a 0 - 7 coordinate system
     * 100 / 7 (Seven board parts)
     * Aligned from left 0 and top 0:
     * @var left distance in percentage from left
     * @var right distance in percentage from top
     */
    Junction.prototype.calculateOffset = function (coordinate) {
        return (100 / 7) * coordinate;
    };
    /**
     * Creates a new mojs shape
     */
    Junction.prototype.generateMojs = function () {
        this.mojs = new this.Mojs.Shape({
            parent: "#" + this.id,
            shape: this.SHAPE,
            points: this.POINTS,
            strokeWidth: this.STROKE,
            radius: this.calculateScale(),
            isShowStart: true,
            left: 0
        });
    };
    /**
     * Calculates scale
     */
    Junction.prototype.calculateScale = function () {
        return document.getElementById(this.board).offsetWidth / this.MUTE;
    };
    /**
     * Rescales the mojs object
     */
    Junction.prototype.rescale = function () {
        this.mojs.tune({
            radius: this.calculateScale()
        })
            .replay();
    };
    return Junction;
}());
/* harmony default export */ exports["a"] = Junction;
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/Junction.js.map

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PlayService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SOCKET_URL = "ws://localhost:9000/socket";
var PlayService = (function () {
    /**
     * First to call for service will initialize the Websocket
     */
    function PlayService() {
        var _this = this;
        this.socket = new WebSocket(SOCKET_URL);
        this.subject = __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].create(function (observer) {
            // bind socket events to observer events
            _this.socket.onmessage = observer.next.bind(observer);
            _this.socket.onerror = observer.error.bind(observer);
            _this.socket.onclose = observer.complete.bind(observer);
            _this.socket.onopen = function () {
                console.log('Socket Status: open');
                _this.send("refreshGame");
            };
        });
    }
    PlayService.prototype.getObservable = function () {
        return this.subject;
    };
    /**
     * @param type
     *   "processCommand": Communicate with game logic
     *   "setPlayerName": Change the player name
     *   "refreshGame": Refresh and get current state
     *   "resetGame": NotImplementedYet
     * @param command
     *   when "processCommand": "set" | "pick" | "move"
     *   when "setPlayerName": "WHITE" | "BLACK"
     * @param query
     *   when "processCommand": Array of PuckIDs ["a1"]
     *   when "setPlayerName": "theNewPlayerName"
     */
    PlayService.prototype.send = function (type, command, query) {
        if (command === void 0) { command = " "; }
        if (query === void 0) { query = []; }
        if (this.socket.readyState !== WebSocket.OPEN) {
            console.log("Websocket not open");
            return;
        }
        var data = { type: type, command: command, query: query };
        this.socket.send(JSON.stringify(data));
        console.log('Socket Status: data sent');
    };
    PlayService.BOARD_ID = "board";
    PlayService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], PlayService);
    return PlayService;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/play.service.js.map

/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rxjs_operators__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__rxjs_operators__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(titleService) {
        this.titleService = titleService;
    }
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(732),
            styles: [__webpack_require__(723)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* Title */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/app.component.js.map

/***/ },

/***/ 360:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MouseQueueService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MouseQueueService = (function () {
    function MouseQueueService() {
        this.mouseQueue = new Array();
    }
    /**
     * Return [] if mouseQueue not full (length === 2)
     */
    MouseQueueService.prototype.addClick = function (puck) {
        this.mouseQueue.push(puck);
        if (this.mouseQueue.length >= 2) {
            return this.reset();
        }
        return this.mouseQueue;
    };
    MouseQueueService.prototype.getLength = function () {
        return this.mouseQueue.length;
    };
    /**
     * Reset and return old mouse Queue
     */
    MouseQueueService.prototype.reset = function () {
        var oldMouseQueue = this.mouseQueue;
        this.mouseQueue = new Array();
        return oldMouseQueue;
    };
    MouseQueueService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], MouseQueueService);
    return MouseQueueService;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/mouse-queue.service.js.map

/***/ },

/***/ 434:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 434;


/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(556);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/main.js.map

/***/ },

/***/ 553:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-about',
            template: __webpack_require__(731),
            styles: [__webpack_require__(722)]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/about.component.js.map

/***/ },

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__header_header_component__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__about_about_component__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__play_play_component__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__play_junction_junction_component__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__play_connector_connector_component__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__play_puck_puck_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__play_status_status_component__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__play_instructions_instructions_component__ = __webpack_require__(559);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_7__about_about_component__["a" /* AboutComponent */],
                __WEBPACK_IMPORTED_MODULE_8__play_play_component__["a" /* PlayComponent */],
                __WEBPACK_IMPORTED_MODULE_11__play_puck_puck_component__["a" /* PuckComponent */],
                __WEBPACK_IMPORTED_MODULE_10__play_connector_connector_component__["a" /* ConnectorComponent */],
                __WEBPACK_IMPORTED_MODULE_9__play_junction_junction_component__["a" /* JunctionComponent */],
                __WEBPACK_IMPORTED_MODULE_12__play_status_status_component__["a" /* StatusComponent */],
                __WEBPACK_IMPORTED_MODULE_13__play_instructions_instructions_component__["a" /* InstructionsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot([
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_8__play_play_component__["a" /* PlayComponent */]
                    },
                    {
                        path: 'about',
                        component: __WEBPACK_IMPORTED_MODULE_7__about_about_component__["a" /* AboutComponent */]
                    }
                ])
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/app.module.js.map

/***/ },

/***/ 555:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__(733),
            styles: [__webpack_require__(724)]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/header.component.js.map

/***/ },

/***/ 556:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(554);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/index.js.map

/***/ },

/***/ 557:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__junction_Junction__ = __webpack_require__(241);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Connector between Junctions
 */
var Connector = (function (_super) {
    __extends(Connector, _super);
    /**
     * @param x coordinate
     * @param y coordinate
     * @param length
     * @param rotation
     * @param parent HTML container
     */
    function Connector(id, board, length, rotation) {
        _super.call(this, id, board);
        this.Mojs = __webpack_require__(399);
        /**
         * Uses as a mute for the rescale process
         */
        this.MUTE = 100;
        this.MUTE_RADIUS = 6;
        this.SHAPE = "rect";
        this.STROKE = 0;
        this.POINTS = 0;
        this.length = length;
        this.rotation = rotation;
    }
    /**
     * @Override
     * Creates a new mojs from class variables
     */
    Connector.prototype.generateMojs = function () {
        this.mojs = new this.Mojs.Shape({
            parent: "#" + this.id,
            shape: this.SHAPE,
            points: this.POINTS,
            strokelength: this.STROKE,
            radius: this.radius(),
            angle: this.rotation,
            radiusY: this.calculateScale(),
            isShowStart: true,
            left: 0
        });
        this.mojs.el.style.position = "relative";
    };
    ;
    Connector.prototype.radius = function () {
        return this.length * document.getElementById(this.board).offsetWidth / this.MUTE_RADIUS;
    };
    /**
     * @Override
     * Rescales the mojs object
     */
    Connector.prototype.rescale = function () {
        this.mojs.tune({
            radius: this.radius(),
            radiusY: this.calculateScale()
        })
            .replay();
    };
    return Connector;
}(__WEBPACK_IMPORTED_MODULE_0__junction_Junction__["a" /* default */]));
/* harmony default export */ exports["a"] = Connector;
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/Connector.js.map

/***/ },

/***/ 558:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Connector__ = __webpack_require__(557);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ConnectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConnectorComponent = (function () {
    function ConnectorComponent() {
    }
    ConnectorComponent.prototype.ngOnInit = function () {
        this.connector = new __WEBPACK_IMPORTED_MODULE_1__Connector__["a" /* default */](this.id, this.board, this.length, this.rotation);
        this.left = this.connector.calculateOffset(this.x) + "%";
        this.top = this.connector.calculateOffset(this.y) + "%";
    };
    ConnectorComponent.prototype.ngAfterViewInit = function () {
        this.connector.generateMojs();
    };
    ConnectorComponent.prototype.onResize = function () {
        this.connector.rescale();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], ConnectorComponent.prototype, "x", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], ConnectorComponent.prototype, "y", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], ConnectorComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], ConnectorComponent.prototype, "length", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], ConnectorComponent.prototype, "rotation", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], ConnectorComponent.prototype, "board", void 0);
    ConnectorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-connector',
            template: '<ng-content></ng-content>',
            styles: [__webpack_require__(725)],
            host: { '[id]': 'id', '[style.left]': 'left', '[style.top]': 'top' }
        }), 
        __metadata('design:paramtypes', [])
    ], ConnectorComponent);
    return ConnectorComponent;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/connector.component.js.map

/***/ },

/***/ 559:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InstructionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InstructionsComponent = (function () {
    function InstructionsComponent() {
    }
    InstructionsComponent.prototype.ngOnInit = function () { };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], InstructionsComponent.prototype, "message", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], InstructionsComponent.prototype, "currentPlayer", void 0);
    InstructionsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-instructions',
            template: __webpack_require__(734),
            styles: [__webpack_require__(726)]
        }), 
        __metadata('design:paramtypes', [])
    ], InstructionsComponent);
    return InstructionsComponent;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/instructions.component.js.map

/***/ },

/***/ 560:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__play_service__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse_queue_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Junction__ = __webpack_require__(241);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return JunctionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JunctionComponent = (function () {
    function JunctionComponent(playerService, mouseQueue) {
        this.isSelected = false;
        this.playService = playerService;
        this.mouseQueue = mouseQueue;
    }
    JunctionComponent.prototype.ngOnInit = function () {
        this.junction = new __WEBPACK_IMPORTED_MODULE_3__Junction__["a" /* default */](this.id, this.board);
        this.left = this.junction.calculateOffset(this.x) + "%";
        this.top = this.junction.calculateOffset(this.y) + "%";
    };
    JunctionComponent.prototype.ngAfterViewInit = function () {
        this.junction.generateMojs();
    };
    JunctionComponent.prototype.ngOnChanges = function () {
        this.isSelected = false;
    };
    JunctionComponent.prototype.onResize = function () {
        this.junction.rescale();
    };
    /**
     * Handles clickEvent
     * @param player Player who clicked
     * @param playerState @player's current state
     */
    JunctionComponent.prototype.onClick = function (player, playerState) {
        if (!(player && playerState)) {
            console.log("Still loading...");
            return;
        }
        else if (playerState === "SET") {
            this.playService.send("processCommand", "set", [this.id]);
        }
        if (playerState === "PICK") {
            this.playService.send("processCommand", "pick", [this.id]);
        }
        else if (playerState === "MOVE" || playerState === "HOP") {
            this.movePuck(player);
        }
    };
    /**
     * @param player Player who clicked
     */
    JunctionComponent.prototype.movePuck = function (player) {
        var mouseQueue;
        if (this.mouseQueue.getLength() == 0 && this.state.man != player) {
            return; // don't procced if not player's puck or no puck at all
        }
        this.isSelected = true;
        mouseQueue = this.mouseQueue.addClick(this.id);
        console.log(mouseQueue);
        if (mouseQueue.length == 2) {
            this.playService.send("processCommand", "move", mouseQueue);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], JunctionComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], JunctionComponent.prototype, "board", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], JunctionComponent.prototype, "state", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], JunctionComponent.prototype, "x", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], JunctionComponent.prototype, "y", void 0);
    JunctionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-junction',
            template: __webpack_require__(735),
            styles: [__webpack_require__(727)],
            host: { '[id]': 'id', '[style.left]': 'left', '[style.top]': 'top' },
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__play_service__["a" /* PlayService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__play_service__["a" /* PlayService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__mouse_queue_service__["a" /* MouseQueueService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__mouse_queue_service__["a" /* MouseQueueService */]) === 'function' && _b) || Object])
    ], JunctionComponent);
    return JunctionComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/junction.component.js.map

/***/ },

/***/ 561:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__play_service__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse_queue_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PlayComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlayComponent = (function () {
    function PlayComponent(playService) {
        var _this = this;
        this.playService = playService;
        this.boardState = {};
        /**
         * Require Initial Board Components from JSON
         */
        this.boardDefinition = __webpack_require__(720);
        this.BOARD_ID = __WEBPACK_IMPORTED_MODULE_0__play_service__["a" /* PlayService */].BOARD_ID;
        /**
         * Default values until state arrives from server
         */
        this.state = {
            white: { name: "Loading..." },
            black: { name: "Loading..." },
            currentPlayer: { man: undefined, currentState: undefined },
            board: undefined
        };
        /**
         * Subscribe to playService observerable
         */
        playService.getObservable().subscribe(function (message) {
            _this.state = JSON.parse(message.data);
            _this.boardState = _this.state.board;
            console.log(_this.state);
            console.log("state updated");
        });
    }
    PlayComponent.prototype.ngOnInit = function () {
        setTimeout(function () {
            document.getElementById("status").scrollIntoView({ behavior: "smooth" });
        }, 300);
    };
    PlayComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["G" /* Component */])({
            selector: 'app-play',
            template: __webpack_require__(736),
            styles: [__webpack_require__(728)],
            providers: [__WEBPACK_IMPORTED_MODULE_0__play_service__["a" /* PlayService */], __WEBPACK_IMPORTED_MODULE_1__mouse_queue_service__["a" /* MouseQueueService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__play_service__["a" /* PlayService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__play_service__["a" /* PlayService */]) === 'function' && _a) || Object])
    ], PlayComponent);
    return PlayComponent;
    var _a;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/play.component.js.map

/***/ },

/***/ 562:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__junction_Junction__ = __webpack_require__(241);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Puck thats placed on a Junction
 * @param id
 * @param parent HTML container
 */
var Puck = (function (_super) {
    __extends(Puck, _super);
    function Puck(id, parent) {
        _super.call(this, id, parent);
        /**
         * Override Junction constants
         * Uses as a mute for the rescale process
         */
        this.MUTE = 25;
        this.SHAPE = "polygon";
        this.STROKE = 3;
        this.POINTS = 6;
    }
    /**
     * Activates puck visually for
     * player @man
     * @param man player of puck
     */
    Puck.prototype.activate = function (man) {
        //$(this.mojs.el).attr("class", CLASS_NAME_ACTIVATED + " " + man.toLowerCase());
        //this.mojs.play();
    };
    /**
     * Deactivates and hide the puck on the board
     */
    Puck.prototype.deactivate = function () {
        //$(this.mojs.el).attr("class", CLASS_NAME);
    };
    /**
     * Puck Event Handler
     * !!@this is here the clicked element!!
     */
    Puck.prototype.onClick = function (player, playerState) {
        /**
        var data = Game.State.data,
            playerState = data.currentPlayer.currentState === "HOP" ? "MOVE": data.currentPlayer.currentState;
    
        // prevent player from selection opponents puck
        if (playerState !== "PICK" && !$(this).hasClass(data.currentPlayer.man.toLowerCase())) {
            return;
        }
        if (playerState === "MOVE" && Game.mouseQueue.length === 0) {
            Game.mouseQueue.push(this);
            $(this).addClass("selected");
            return;
        }
        //Game.State.requestCommand(playerState.toLowerCase(), [this.dataset.id]);
        Game.Socket.send("processCommand", playerState.toLowerCase(), [this.dataset.id]);
          */
    };
    return Puck;
}(__WEBPACK_IMPORTED_MODULE_0__junction_Junction__["a" /* default */]));
/* harmony default export */ exports["a"] = Puck;
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/Puck.js.map

/***/ },

/***/ 563:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Puck__ = __webpack_require__(562);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PuckComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PuckComponent = (function () {
    function PuckComponent() {
        this.isSelected = false;
        this.isHidden = true;
    }
    PuckComponent.prototype.ngOnInit = function () {
        this.puck = new __WEBPACK_IMPORTED_MODULE_1__Puck__["a" /* default */](this.id, this.board);
        this.left = this.puck.calculateOffset(this.x) + "%";
        this.top = this.puck.calculateOffset(this.y) + "%";
    };
    PuckComponent.prototype.ngAfterViewInit = function () {
        this.isHidden = this.player ? false : true;
        this.puck.generateMojs();
    };
    PuckComponent.prototype.ngOnChanges = function () {
        if (!this.puck) {
            return;
        }
        if (this.isSelected) {
            this.puck.mojs.tune({
                angle: { 0: -180 },
                scale: { 1: 1 },
                duration: 500
            })
                .replay();
        }
        if (!this.isSelected && this.player) {
            this.puck.mojs.tune({
                scale: { 0: 1 },
                angle: { 0: -180 },
                duration: 250
            })
                .replay();
        }
        if (!this.player) {
            this.puck.mojs.tune({
                scale: { 1: 0 },
                angle: { 0: -180 },
                duration: 500,
            })
                .replay();
        }
    };
    PuckComponent.prototype.onResize = function () {
        this.puck.rescale();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], PuckComponent.prototype, "x", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Number)
    ], PuckComponent.prototype, "y", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], PuckComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], PuckComponent.prototype, "board", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', String)
    ], PuckComponent.prototype, "player", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], PuckComponent.prototype, "isSelected", void 0);
    PuckComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-puck',
            template: '<ng-content></ng-content>',
            styles: [__webpack_require__(729)],
            host: { '[id]': 'id', '[class]': 'player', '[class.selected]': "isSelected",
                '[class.hidden]': "isHidden" }
        }), 
        __metadata('design:paramtypes', [])
    ], PuckComponent);
    return PuckComponent;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/puck.component.js.map

/***/ },

/***/ 564:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__play_service__ = __webpack_require__(242);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StatusComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StatusComponent = (function () {
    function StatusComponent(fb, play) {
        /**
         * Progress calculated based on Pucks left
         */
        this.whiteProgress = 50;
        this.blackProgress = 50;
        this.play = play;
        this.playerWhiteForm = fb.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].minLength(2)])],
        });
        this.playerBlackForm = fb.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].minLength(2)])]
        });
    }
    StatusComponent.prototype.ngOnInit = function () { };
    StatusComponent.prototype.ngOnChanges = function () {
        this.calculateProgress();
    };
    StatusComponent.prototype.calculateProgress = function () {
        if (!this.black || !this.white) {
            return;
        }
        this.whiteProgress = ((this.black.numPucksTakenAway - this.white.numPucksTakenAway) * 10) + 50;
        this.blackProgress = 100 - this.whiteProgress;
    };
    /**
     * On form submit
     * sends setPlayerName request
     * @param man white or black Player
     */
    StatusComponent.prototype.onSubmit = function (e, form, man) {
        e.preventDefault();
        if (!form.valid) {
            // TODO: Handle illegal input
            console.log("not vaild");
            return;
        }
        this.play.send("setPlayerName", man.toUpperCase(), form.value.name);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], StatusComponent.prototype, "white", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], StatusComponent.prototype, "black", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], StatusComponent.prototype, "currentPlayer", void 0);
    StatusComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-status',
            template: __webpack_require__(737),
            styles: [__webpack_require__(730)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__play_service__["a" /* PlayService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__play_service__["a" /* PlayService */]) === 'function' && _b) || Object])
    ], StatusComponent);
    return StatusComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/status.component.js.map

/***/ },

/***/ 565:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable







//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/rxjs-operators.js.map

/***/ },

/***/ 566:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/environment.js.map

/***/ },

/***/ 567:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/funkemarkus/Entwicklung/HTWG/Webtechnologien/de.htwg.wt.nmm/ui/angular2/src/polyfills.js.map

/***/ },

/***/ 720:
/***/ function(module, exports) {

module.exports = {
	"MODEL_JUNCTION": [
		{
			"id": "a1",
			"translation": {
				"x": 0,
				"y": 0
			}
		},
		{
			"id": "d1",
			"translation": {
				"x": 3.5,
				"y": 0
			}
		},
		{
			"id": "g1",
			"translation": {
				"x": 7,
				"y": 0
			}
		},
		{
			"id": "b2",
			"translation": {
				"x": 1.16,
				"y": 1.16
			}
		},
		{
			"id": "d2",
			"translation": {
				"x": 3.5,
				"y": 1.16
			}
		},
		{
			"id": "f2",
			"translation": {
				"x": 5.84,
				"y": 1.16
			}
		},
		{
			"id": "c3",
			"translation": {
				"x": 2.33,
				"y": 2.33
			}
		},
		{
			"id": "d3",
			"translation": {
				"x": 3.5,
				"y": 2.33
			}
		},
		{
			"id": "e3",
			"translation": {
				"x": 4.66,
				"y": 2.33
			}
		},
		{
			"id": "a4",
			"translation": {
				"x": 0,
				"y": 3.5
			}
		},
		{
			"id": "b4",
			"translation": {
				"x": 1.16,
				"y": 3.5
			}
		},
		{
			"id": "c4",
			"translation": {
				"x": 2.33,
				"y": 3.5
			}
		},
		{
			"id": "e4",
			"translation": {
				"x": 4.66,
				"y": 3.5
			}
		},
		{
			"id": "f4",
			"translation": {
				"x": 5.84,
				"y": 3.5
			}
		},
		{
			"id": "g4",
			"translation": {
				"x": 7,
				"y": 3.5
			}
		},
		{
			"id": "c5",
			"translation": {
				"x": 2.33,
				"y": 4.66
			}
		},
		{
			"id": "d5",
			"translation": {
				"x": 3.5,
				"y": 4.66
			}
		},
		{
			"id": "e5",
			"translation": {
				"x": 4.66,
				"y": 4.66
			}
		},
		{
			"id": "b6",
			"translation": {
				"x": 1.16,
				"y": 5.84
			}
		},
		{
			"id": "d6",
			"translation": {
				"x": 3.5,
				"y": 5.84
			}
		},
		{
			"id": "f6",
			"translation": {
				"x": 5.84,
				"y": 5.84
			}
		},
		{
			"id": "a7",
			"translation": {
				"x": 0,
				"y": 7
			}
		},
		{
			"id": "d7",
			"translation": {
				"x": 3.5,
				"y": 7
			}
		},
		{
			"id": "g7",
			"translation": {
				"x": 7,
				"y": 7
			}
		}
	],
	"MODEL_CONNECTOR": [
		{
			"length": 3,
			"translation": {
				"x": 3.5,
				"y": 0
			},
			"rotation": 0
		},
		{
			"length": 2,
			"translation": {
				"x": 3.5,
				"y": 1.16
			},
			"rotation": 0
		},
		{
			"length": 1,
			"translation": {
				"x": 3.5,
				"y": 2.33
			},
			"rotation": 0
		},
		{
			"length": 1,
			"translation": {
				"x": 1.16,
				"y": 3.5
			},
			"rotation": 0
		},
		{
			"length": 1,
			"translation": {
				"x": 5.84,
				"y": 3.5
			},
			"rotation": 0
		},
		{
			"length": 1,
			"translation": {
				"x": 3.5,
				"y": 4.66
			},
			"rotation": 0
		},
		{
			"length": 2,
			"translation": {
				"x": 3.5,
				"y": 5.84
			},
			"rotation": 0
		},
		{
			"length": 3,
			"translation": {
				"x": 3.5,
				"y": 7
			},
			"rotation": 0
		},
		{
			"length": 3,
			"translation": {
				"x": 0,
				"y": 3.5
			},
			"rotation": 90
		},
		{
			"length": 2,
			"translation": {
				"x": 1.16,
				"y": 3.5
			},
			"rotation": 90
		},
		{
			"length": 1,
			"translation": {
				"x": 2.33,
				"y": 3.5
			},
			"rotation": 90
		},
		{
			"length": 1,
			"translation": {
				"x": 3.5,
				"y": 1.16
			},
			"rotation": 90
		},
		{
			"length": 1,
			"translation": {
				"x": 3.5,
				"y": 5.84
			},
			"rotation": 90
		},
		{
			"length": 1,
			"translation": {
				"x": 4.66,
				"y": 3.5
			},
			"rotation": 90
		},
		{
			"length": 2,
			"translation": {
				"x": 5.84,
				"y": 3.5
			},
			"rotation": 90
		},
		{
			"length": 3,
			"translation": {
				"x": 7,
				"y": 3.5
			},
			"rotation": 90
		}
	]
};

/***/ },

/***/ 722:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 723:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 724:
/***/ function(module, exports) {

module.exports = ".navbar-inverse {\n  border: none;\n  background-color: #273043;\n  margin-bottom: 0;\n  color: #fff;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  background: none;\n}\n"

/***/ },

/***/ 725:
/***/ function(module, exports) {

module.exports = ":host {\n  position: absolute;\n}\n:host /deep/ rect {\n  fill: #3a4763;\n}\n"

/***/ },

/***/ 726:
/***/ function(module, exports) {

module.exports = ":host {\n  padding: 10px;\n  opacity: 0.95;\n  color: #fff;\n}\n#message {\n  text-align: center;\n  padding: 20px 0;\n  font-size: 20px;\n}\n.white span {\n  border-left: 5px solid #861388;\n  padding-left: 10px;\n}\n.black span {\n  border-left: 5px solid #B3001B;\n  padding-left: 10px;\n}\n"

/***/ },

/***/ 727:
/***/ function(module, exports) {

module.exports = ":host {\n  position: relative;\n  cursor: pointer;\n  z-index: 1;\n}\n:host /deep/ ellipse {\n  fill: #EEC643;\n  stroke: #3a4763;\n}\n"

/***/ },

/***/ 728:
/***/ function(module, exports) {

module.exports = "#scene {\n  background-color: #273043;\n  padding: 40px 20px;\n  overflow: hidden;\n}\n#board {\n  position: relative;\n  width: 85vw;\n  height: 85vw;\n  margin: auto;\n}\n@media only screen and (orientation: landscape) {\n  #board {\n    width: 75vh;\n    height: 75vh;\n  }\n}\n#board svg {\n  overflow: visible;\n}\n"

/***/ },

/***/ 729:
/***/ function(module, exports) {

module.exports = ":host /deep/ div {\n  z-index: 2;\n}\n:host(.white) /deep/ path {\n  fill: #861388;\n  stroke: white;\n}\n:host(.black) /deep/ path {\n  fill: #B3001B;\n  stroke: black;\n}\n:host(.selected) /deep/ path {\n  stroke: #EEC643 !important;\n}\n"

/***/ },

/***/ 730:
/***/ function(module, exports) {

module.exports = "#status {\n  opacity: 0.95;\n  position: relative;\n  width: 100%;\n  height: 60px;\n  color: #fff;\n  background-image: -webkit-linear-gradient(left, #861388 0%, #B3001B 100%);\n  background-image: linear-gradient(to right, #861388 0%, #B3001B 100%);\n}\n#status input {\n  width: 100%;\n  background: inherit;\n  border: none;\n}\n#status form {\n  max-width: 60%;\n}\n#status input:focus {\n  border-bottom: 1px #EEC643 solid;\n  outline: none;\n}\n#status #player-black input {\n  text-align: right;\n}\n#show-msg {\n  z-index: 2;\n  position: fixed;\n  font-size: 28px;\n  right: 5px;\n  bottom: 5px;\n  width: auto;\n}\n#player-white,\n#player-black {\n  position: absolute;\n  overflow: hidden;\n  height: 100%;\n  top: 0;\n  width: 50%;\n  -webkit-transition: width 2s;\n  transition: width 2s;\n  z-index: 1;\n}\n.current {\n  border-bottom: solid 2px #EEC643;\n  color: #EEC643;\n}\n#player-white {\n  left: 0;\n  background-color: #861388;\n}\n#player-white .state {\n  float: right;\n  max-width: 35%;\n  overflow: hidden;\n}\n#player-white form {\n  float: left;\n}\n#player-black {\n  right: 0;\n  text-align: right;\n  background-color: #B3001B;\n}\n#player-black form {\n  float: right;\n}\n#player-black .state {\n  float: left;\n  max-width: 35%;\n  overflow: hidden;\n}\n#overlay-message {\n  width: 100%;\n  opacity: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 4;\n  font-size: 41px;\n  color: white;\n  position: absolute;\n  text-align: center;\n}\n#msg {\n  display: none;\n  z-index: 1;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 20px 20px 60px 20px;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.8);\n  max-height: 20%;\n  overflow-y: scroll;\n}\n"

/***/ },

/***/ 731:
/***/ function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n\n        <div class=\"col-lg-12 window\">\n\n            <div class=\"container col-lg-6 col-lg-offset-3\">\n\n                <h1><img title=\"Nine Men's Morris\" id=\"logo\" alt=\"Nine Men's Morris\" src=\"/assets/images/nmmLogo.png\"></h1>\n\n                <h2>Deceptively Easy. Surprisingly deep.</h2>\n\n            </div>\n\n        </div>\n\n        <div class=\"col-lg-12\">\n\n            <div class=\"container col-lg-8 col-lg-offset-2\">\n                <div id=\"about\" class=\"content\">\n\n                    <h3>Start Quickly—play indefinitely</h3>\n\n                    <div class=\"panel panel-info\">\n                        <blockquote>\n                            The players determine who plays first, then take turns placing their men one per play on empty points.\n                            If a player is able to place three of his pieces on contiguous points in a straight line, vertically or horizontally,\n                            he has formed a mill and may remove one of his opponent's pieces from the board and the game.\n                        </blockquote>\n                        <div class=\"panel-footer\"><cite><a href=\"\">From Wikipedia, the free encyclopedia</a></cite></div>\n\n                    </div>\n\n                    <h3>Indepth</h3>\n                    <h4>Phase 1: SET</h4>\n\n                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n\n                    <h4>Phase 2: MOVE</h4>\n\n                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n\n                    <h4>Phase 3: HOP</h4>\n\n                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n\n                    <h3>Nine Men's Morris has a long and rich history</h3>\n\n                    <div class=\"panel panel-info\">\n                        <blockquote>\n                            According to R. C. Bell, the earliest known board for the game includes diagonal lines and was \"cut into the roofing slabs of the temple at Kurna in Egypt\" c. 1400 BCE.\n                            However, Friedrich Berger writes that some of the diagrams at Kurna include Coptic crosses, making it \"doubtful\" that the diagrams date to 1400 BCE.\n                            Berger concludes, \"certainly they cannot be dated.\"\n                        </blockquote>\n\n                        <div class=\"panel-footer\"><cite><a href=\"\">From Wikipedia, the free encyclopedia</a></cite></div>\n                    </div>\n\n                </div>\n            </div>\n\n        </div>\n    </div>\n\n</div>"

/***/ },

/***/ 732:
/***/ function(module, exports) {

module.exports = "<!-- <app-header></app-header> -->\n<app-play></app-play>\n<!-- <router-outlet></router-outlet> -->\n\n"

/***/ },

/***/ 733:
/***/ function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse\">\n\n    <div class=\"container\">\n\n            <ul class=\"nav navbar-nav navbar-left\">\n\n                <li class>\n                  <a routerLink=\"/play\">Play</a>\n                </li>\n\n                <li class>\n                  <a routerLink=\"/about\">About</a>\n                </li>\n\n            </ul>\n\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li>\n                    <a class=\"navbar-brandt\" href=\"/\">NMM</a>\n                </li>\n            </ul>\n\n    </div>\n\n</nav>"

/***/ },

/***/ 734:
/***/ function(module, exports) {

module.exports = "<div id=\"instructions\" class=\"container-fluid\">\n\n  <div class=\"row\">\n    <div class=\"col-lg-6 col-lg-offset-3\">\n      <div id=\"message\" [class]=\"currentPlayer?.toLowerCase()\">\n        <span>{{message}}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n\n    <div class=\"col-lg-8 col-lg-offset-2\">\n\n      <div class=\"col-lg-4\">\n        <h4>Phase 1: SET</h4>\n        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n      </div>\n\n      <div class=\"col-lg-4\">\n        <h4>Phase 2: MOVE</h4>\n        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n      </div>\n\n      <div class=\"col-lg-4\">\n        <h4>Having a Mil</h4>\n        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n      </div>\n\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 735:
/***/ function(module, exports) {

module.exports = "<app-puck #p\n  [x]=\"x\"\n  [y]=\"y\"\n  [id]=\"'puck-' + id\"\n  [board]=\"board\"\n  [player]=\"state?.man?.toLowerCase()\"\n  [isSelected]=\"isSelected\"\n  (window:resize)=\"p.onResize()\">\n</app-puck>"

/***/ },

/***/ 736:
/***/ function(module, exports) {

module.exports = "<app-status [(black)]=\"state.black\" [(white)]=\"state.white\"\n  [(currentPlayer)]=\"state.currentPlayer.man\">\n</app-status>\n\n<div id=\"scene\">\n  <div id=\"board\">\n    \n    <app-junction #j *ngFor=\"let junction of boardDefinition['MODEL_JUNCTION']\"\n      [x]=\"junction.translation.x\"\n      [y]=\"junction.translation.y\"\n      [id]=\"junction.id\"\n      [board]=\"BOARD_ID\"\n      [(state)]=\"boardState[junction.id]\"\n      (window:resize)=\"j.onResize()\"\n      (click)=\"j.onClick(state.currentPlayer.man, state.currentPlayer.currentState)\">\n    </app-junction>\n\n    <app-connector #c *ngFor=\"let connector of boardDefinition['MODEL_CONNECTOR']; let i = index\"\n      [x]=\"connector.translation.x\"\n      [y]=\"connector.translation.y\"\n      [id]=\"'connector-' + i\"\n      [length]=\"connector.length\"\n      [rotation]=\"connector.rotation\"\n      [board]=\"BOARD_ID\"\n      (window:resize)=\"c.onResize()\">\n    </app-connector>\n\n  </div>\n\n  <app-instructions [message]=\"state?.status?.message\"\n  [currentPlayer]=\"state.currentPlayer.man\"></app-instructions>\n</div>\n"

/***/ },

/***/ 737:
/***/ function(module, exports) {

module.exports = "<div id=\"status\">\n \n  <div id=\"player-white\" [class.current]=\"currentPlayer === 'WHITE'\" [style.width.%]=\"whiteProgress\">\n    <div class=\"wrapper\">\n      \n      <form (ngSubmit)=\"onSubmit($event, playerWhiteForm, 'white')\"\n      [formGroup]=\"playerWhiteForm\">\n        <input type=\"text\" id=\"name\" title=\"Click to edit\" value=\"{{white.name}}\"\n        [(ngModel)]=\"whiteName\"\n        [formControl]=\"playerWhiteForm.controls['name']\">\n      </form>\n\n      <span class=\"state\">{{white.currentState}}</span>\n\n    </div>\n  </div>\n\n  <div id=\"player-black\" [class.current]=\"currentPlayer === 'BLACK'\" [style.width.%]=\"blackProgress\">\n    <div class=\"wrapper\">\n\n      <form (ngSubmit)=\"onSubmit($event, playerBlackForm, 'black')\"\n      [formGroup]=\"playerBlackForm\">\n        <input type=\"text\" id=\"name\" title=\"Click to edit\" value=\"{{black.name}}\"\n        [(ngModel)]=\"blackName\"\n        [formControl]=\"playerBlackForm.controls['name']\">\n      </form>\n\n      <span class=\"state\">{{black.currentState}}</span>\n\n    </div>\n  </div>\n</div>\n\n<button type=\"button\" class=\"btn btn-link\" id=\"show-msg\">\n  <span class=\"glyphicon glyphicon-option-vertical\" aria-hidden=\"true\"></span>\n</button>\n\n<div id=\"msg\"></div>\n"

/***/ }

},[1000]);
//# sourceMappingURL=main.bundle.map