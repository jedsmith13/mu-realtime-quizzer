"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var connect_component_1 = require('./connect/connect.component');
var class_component_1 = require('./class/class.component');
var heroesRoutes = [
    { path: 'connect', component: connect_component_1.ConnectComponent },
    { path: 'class/:id', component: class_component_1.ClassComponent }
];
var ClassMemberRoutingModule = (function () {
    function ClassMemberRoutingModule() {
    }
    ClassMemberRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(heroesRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], ClassMemberRoutingModule);
    return ClassMemberRoutingModule;
}());
exports.ClassMemberRoutingModule = ClassMemberRoutingModule;
