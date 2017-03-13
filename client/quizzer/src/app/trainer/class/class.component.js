"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var class_service_1 = require('../class.service');
var ClassComponent = (function () {
    function ClassComponent(classService) {
        this.classService = classService;
    }
    ClassComponent.prototype.ngOnInit = function () {
        this.currentClass = this.classService.currentClass;
    };
    ClassComponent = __decorate([
        core_1.Component({
            selector: 'quizzer-trainer-class',
            providers: [class_service_1.ClassService],
            templateUrl: './class.component.html',
            styleUrls: ['./class.component.css']
        })
    ], ClassComponent);
    return ClassComponent;
}());
exports.ClassComponent = ClassComponent;
