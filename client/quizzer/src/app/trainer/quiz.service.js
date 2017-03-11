"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var QuizService = (function () {
    function QuizService(http) {
        this.http = http;
    }
    QuizService.prototype.create = function (question) {
        return this.http.post("/class", { className: className })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuizService.prototype.get = function () {
        return this.http.get("/quiz")
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuizService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    QuizService = __decorate([
        core_1.Injectable()
    ], QuizService);
    return QuizService;
}());
exports.QuizService = QuizService;
