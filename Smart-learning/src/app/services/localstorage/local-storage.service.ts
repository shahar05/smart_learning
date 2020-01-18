import { Injectable } from '@angular/core';
import * as E from '../../app.enums';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(key: E.LocalStorageKey, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: E.LocalStorageKey): any {
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    return value;
  }
}
