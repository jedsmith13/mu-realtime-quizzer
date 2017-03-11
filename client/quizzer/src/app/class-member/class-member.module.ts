import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassMemberRoutingModule } from './class-member.routing.module';

import { ConnectComponent } from './connect/connect.component';
import { ClassComponent } from './class/class.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConnectComponent, ClassComponent]
})
export class ClassMemberModule { }
