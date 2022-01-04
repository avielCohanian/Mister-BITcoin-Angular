import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  store(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  load(key, defaultValue = null) {
    var value = localStorage[key] || [];
    // return JSON.parse(value);
    return value;
  }
  loader(key, defaultValue = null) {
    var value = localStorage[key] || null;
    // return JSON.parse(value);
    return value;
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
