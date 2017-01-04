import { Injectable } from '@angular/core';

@Injectable()
export class MouseQueueService {

  private mouseQueue: Array<string> = new Array();

  constructor() { }

  /**
   * Return [] if mouseQueue not full (length === 2)
   */
  addClick(puck: string) {
    this.mouseQueue.push(puck);
    if (this.mouseQueue.length >= 2) {
      return this.reset();
    }
    return this.mouseQueue;
  }

  getLength() {
    return this.mouseQueue.length;
  }
  
  /**
   * Reset and return old mouse Queue
   */
  private reset() {
    let oldMouseQueue = this.mouseQueue
    this.mouseQueue = new Array();
    console.log("New" + this.mouseQueue);
    return oldMouseQueue;
  }

}
