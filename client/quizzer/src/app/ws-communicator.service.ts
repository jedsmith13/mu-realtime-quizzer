import { Injectable } from '@angular/core';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import * as UMFMessage from 'fwsp-umf-message';

@Injectable()
export class WsCommunicatorService {
  private ws: any;
  
  constructor() {
      
    ws = $WebSocket('wss://mu-auth-adventure-jedsmithobd.c9users.io');
    
    // Collect clientId from body of fist request.
    ws.onMessage(
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
  
    return ws.send(message);
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
  
    return ws.send(message);
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
  
    return ws.send(message);
  }

}
