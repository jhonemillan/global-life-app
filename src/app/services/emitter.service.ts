import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class EmitterService {

   // Event store
   private static _emitters: { [ID: string]: EventEmitter<any> } = {};
   // Set a new event in the store with a given ID
   // as key
   static get(ID: string): EventEmitter<any> {
       if (!this._emitters[ID]) 
           this._emitters[ID] = new EventEmitter();
       return this._emitters[ID];
   }

}
