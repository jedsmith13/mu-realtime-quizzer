import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { ClassMemberRoutingModule } from './class-member.routing.module';

import { ConnectComponent } from './connect/connect.component';
import { ClassComponent } from './class/class.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClassMemberRoutingModule
  ],
  declarations: [ConnectComponent, ClassComponent]
})
export class ClassMemberModule { }
