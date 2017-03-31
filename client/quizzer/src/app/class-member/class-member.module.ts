import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";

import { ClassMemberRoutingModule } from './class-member.routing.module';

import { ConnectComponent } from './connect/connect.component';
import { ClassComponent } from './class/class.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicFormsCoreModule.forRoot(), 
    DynamicFormsBootstrapUIModule, 
    BrowserModule,  
    ReactiveFormsModule,
    ClassMemberRoutingModule
  ],
  declarations: [ConnectComponent, ClassComponent]
})
export class ClassMemberModule { }
