"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angular2_websocket_1 = require('angular2-websocket/angular2-websocket');
var UMFMessage = require('fwsp-umf-message');
var WsCommunicatorService = (function () {
    function WsCommunicatorService() {
        this.sendQuiz = function (quizId, className) {
            var message = UMFMessage.createMessage({
                to: "quiz:/",
                from: 'client:/',
                typ: 'sendQuiz',
                body: {
                    quizId: quizId,
                    className: className
                }
            });
            return ws.send(message);
        };
        this.closeQuiz = function (quizId, answer) {
            var message = UMFMessage.createMessage({
                to: "quiz:/",
                from: 'client:/',
                typ: 'broadcastResults',
                body: {
                    quizId: quizId,
                    answer: answer
                }
            });
            return ws.send(message);
        };
        this.answerQuestion = function (quizId, answer) {
            var message = UMFMessage.createMessage({
                to: "quiz:/",
                from: 'client:/',
                typ: 'recieveAnswer',
                body: {
                    quizId: quizId,
                    answer: answer
                }
            });
            return ws.send(message);
        };
        ws = angular2_websocket_1.$WebSocket('wss://mu-auth-adventure-jedsmithobd.c9users.io');
        // Collect clientId from body of fist request.
        ws.onMessage(function (msg) {
            console.log("onMessage ", msg.data);
        }, { autoApply: false });
    }
    WsCommunicatorService = __decorate([
        core_1.Injectable()
    ], WsCommunicatorService);
    return WsCommunicatorService;
}());
exports.WsCommunicatorService = WsCommunicatorService;
