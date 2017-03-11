import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { ClassMemberModule } from './class-member/class-member.module';
import { TrainerModule } from './trainer/trainer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ClassMemberModule,
    TrainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
