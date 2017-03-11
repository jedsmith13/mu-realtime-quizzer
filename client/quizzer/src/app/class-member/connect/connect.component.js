"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ConnectComponent = (function () {
    function ConnectComponent(classService) {
        this.classService = classService;
    }
    ConnectComponent.prototype.ngOnInit = function () {
    };
    ConnectComponent = __decorate([
        core_1.Component({
            selector: 'app-connect',
            templateUrl: './connect.component.html',
            styleUrls: ['./connect.component.css']
        })
    ], ConnectComponent);
    return ConnectComponent;
}());
exports.ConnectComponent = ConnectComponent;
