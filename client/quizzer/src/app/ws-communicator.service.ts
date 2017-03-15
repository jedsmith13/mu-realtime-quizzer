import { Injectable } from '@angular/core';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import * as UMFMessage from 'fwsp-umf-message';

@Injectable()
export class WsCommunicatorService {
  private ws: any;
  
  constructor() {
      
    this.ws = new $WebSocket('ws://localhost');
    
    // Collect clientId from body of fist request.
    this.ws.onMessage(
      (msg: MessageEvent)=> {
        console.log("onMessage ", msg.data);
      },
      {autoApply: false}
    );
  }
  
  public sendQuiz = (quizId: string, className: string) => {
    
    let message = UMFMessage.createMessage({
      to: `quiz:/`,
      from: 'client:/',
      typ: 'sendQuiz',
      body: {
        quizId: quizId,
        className: className
      }
    });
  
    return this.ws.send(message);
  }

  public closeQuiz = (quizId: string, answer: string) => {
    
    let message = UMFMessage.createMessage({
      to: `quiz:/`,
      from: 'client:/',
      typ: 'broadcastResults',
      body: {
        quizId: quizId,
        answer: answer
      }
    });
  
    return this.ws.send(message);
  }

  public answerQuestion = (quizId: string, answer: string) => {
    
    let message = UMFMessage.createMessage({
      to: `quiz:/`,
      from: 'client:/',
      typ: 'recieveAnswer',
      body: {
        quizId: quizId,
        answer: answer
      }
    });
  
    return this.ws.send(message);
  }

  public joinClass = (signIn: string) => {
    
    let message = UMFMessage.createMessage({
      to: `class:/`,
      from: 'client:/',
      body: {
        signIn: signIn
      }
    });
  
    return this.ws.send(message);
  };

  public trackClass = (className: string) => {
    
    let message = UMFMessage.createMessage({
      to: `class:/`,
      from: 'client:/',
      body: {
        className: className
      }
    });
  
    return this.ws.send(message);
  };

}
