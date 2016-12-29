import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ErrorService {

  private _error: BehaviorSubject<string> = new BehaviorSubject("");

  public error: Observable<string> = this._error.asObservable();

  constructor() {
  }

}
