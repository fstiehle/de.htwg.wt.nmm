/**
 * WebSocket Service
 *
 * @param url
 * @param msgCallback
 * @constructor
 */
Game.WsService = function (url, msgCallback) {
    this.url = url;
    this.msgCallback = msgCallback;

    this.socket = new WebSocket(url);

    console.log('Socket Status: '+ this.socket.readyState + ' (ready)');

    this.socket.onopen = function () {
        console.log('Socket Status: '+ this.socket.readyState + ' (open)');
    }.bind(this);

    this.socket.onmessage = function (msg) {
        console.log('Socket Status: '+ msg + ' (onmessage)');
        var jsonMSG = JSON.parse(msg.data);
        if (jsonMSG.code === "200") {
            this.msgCallback(jsonMSG);
        } else {
            console.error("[WebSocket Error]["+jsonMSG.code+"] " + jsonMSG.message);
        }
    }.bind(this);

    this.socket.onclose = function () {
        console.log('Socket Status: '+ this.socket.readyState + ' (closed)');
    }.bind(this);
};

Game.WsService.prototype.send = function (data) {
    console.log("Game.WsService.prototype.send ...");
    this.socket.send(JSON.stringify(data));
    console.log('Socket Status: data sent');
};



/**
 * Ajax Service
 *
 * @param url
 * @param msgCallback
 * @constructor
 */
Game.AjaxService = function(url, msgCallback) {
    this.url = url;
    this.msgCallback = msgCallback;
};

Game.AjaxService.prototype.send = function (datas) {
    console.log("Game.AjaxService.prototype.send() called ...");
    $.ajax({
        url: 'json',
        type: 'POST',
        data: JSON.stringify(datas),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: this.msgCallback
    });
};


/**
 * Game Communication Service
 *
 * @param msgCallback
 * @constructor
 */
Game.Service = function (msgCallback) {
  this.WS_URL = "ws://localhost:9000/socket";
  this.AJAX_URL = "http://localhost:9000/json";

  this.service = null;

  if (window.WebSocket){
    console.log("USE WEBSOCKET");
    this.service = new Game.WsService(this.WS_URL, msgCallback);
  } else {
    console.log("USE AJAX");
    this.service = new Game.AjaxService(this.AJAX_URL, msgCallback);
  }
};

Game.Service.prototype.request = function (data) {
    console.log("Game.Service.protoype.request() called ...");
    this.service.send(data);
};

Game.Service.prototype.requestCommand = function (type, command, query) {
    console.log("Game.Service.protoype.requestCommand() called ...");
    var data = {type: type, command: command, query: query};
    this.request(data);
}


