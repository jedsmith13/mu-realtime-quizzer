import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import * as UMFMessage from 'fwsp-umf-message';

@Injectable()
export class WsCommunicatorService {
  private ws: any;
  private onUpdate: any = {};

  constructor() {
      
    this.ws = new $WebSocket('ws://localhost:5353');
    
    // Collect clientId from body of fist request.
    this.ws.onMessage(
      (msg: MessageEvent)=> {
        const parsedMsg = JSON.parse(msg.data);
        console.log("onMessage ", parsedMsg);

        if (parsedMsg.typ) {
          // Call the callback passing in the body.
          if (this.onUpdate[parsedMsg.typ]) {
            this.onUpdate[parsedMsg.typ](parsedMsg.bdy);
          }
        }
      },
      {autoApply: false}
    );
  }

  public registerUpdater = (type: string, callback: any) => {
    this.onUpdate[type] = callback;
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
  
    return this.ws.send(message).map((res: any) => {
        return res.json();
      })
      .catch(this.handleError);;
  };

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
