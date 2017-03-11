"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var class_component_1 = require('./class/class.component');
var class_create_component_1 = require('./class-create/class-create.component');
var quiz_component_1 = require('./quiz/quiz.component');
var quiz_create_component_1 = require('./quiz-create/quiz-create.component');
var TrainerModule = (function () {
    function TrainerModule() {
    }
    TrainerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [class_create_component_1.ClassCreateComponent, class_component_1.ClassComponent, quiz_component_1.QuizComponent, quiz_create_component_1.QuizCreateComponent]
        })
    ], TrainerModule);
    return TrainerModule;
}());
exports.TrainerModule = TrainerModule;
