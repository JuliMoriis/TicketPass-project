import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Autenticacion {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getIsLoggedIn());
  private userTypeSubject = new BehaviorSubject<number | null>(this.getUserType());
  private userIdSubject = new BehaviorSubject<string | null>(this.getUserId());
  userId = this.userIdSubject.asObservable();

  constructor() { }

  //si esta la sesion iniciada
  private getIsLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  //devuelve el tipo de usuario que inicio sesion
  private getUserType(): number | null {
    const userType = localStorage.getItem('userType');
    return userType ? +userType : null;
  }

  private getUserId(): string | null {
    return localStorage.getItem('idUsuario');
}

  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  get userType() {
    return this.userTypeSubject.asObservable();
  }


  //guarda el tipo e id al iniciar sesion
  login(userType: number, idUsuario: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType.toString());
    localStorage.setItem('idUsuario', idUsuario);
    this.isLoggedInSubject.next(true);
    this.userTypeSubject.next(userType);
    this.userIdSubject.next(idUsuario);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('idUsuario');
    this.isLoggedInSubject.next(false);
    this.userTypeSubject.next(null);
    this.userIdSubject.next(null);
  }
}
