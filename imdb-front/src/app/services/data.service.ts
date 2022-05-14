import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T {
    return JSON.parse(sessionStorage.getItem(key)) as T;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
