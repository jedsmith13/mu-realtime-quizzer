"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var class_component_1 = require('./class/class.component');
var quiz_component_1 = require('./quiz/quiz.component');
var heroesRoutes = [
    { path: 'trainer/class/create', component: CreateClassComponent },
    { path: 'trainer/class/:id', component: class_component_1.ClassComponent },
    { path: 'trainer/quiz/create', component: CreateQuizComponent },
    { path: 'trainer/quiz', component: quiz_component_1.QuizComponent },
    { path: 'trainer', redirectTo: 'trainer/quiz/create', pathMatch: 'fullPath' }
];
var TrainerRoutingModule = (function () {
    function TrainerRoutingModule() {
    }
    TrainerRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(heroesRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], TrainerRoutingModule);
    return TrainerRoutingModule;
}());
exports.TrainerRoutingModule = TrainerRoutingModule;
