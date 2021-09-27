import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public mainObservable = new Observable(observer => {
    observer.next();
    observer.complete();
  });

  private configSubject: Subject<string>;

  constructor() {
    this.configSubject = new Subject();
    this.mainObservable = this.configSubject.asObservable();
  }

  disableNavbar(habilitar: string): void {
    this.configSubject.next(habilitar);
  }

}
