import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Autenticacion {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getIsLoggedIn());
  private userTypeSubject = new BehaviorSubject<number | null>(this.getUserType());
  private userIdSubject = new BehaviorSubject<string | null>(null);  // <--- Nuevo BehaviorSubject para el ID
  userId = this.userIdSubject.asObservable();

  constructor() {}

  //si esta la sesion iniciada
  private getIsLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  //devuelve el tipo de usuario que inicio sesion
  private getUserType(): number | null {
    const userType = localStorage.getItem('userType');
    return userType ? +userType : null;
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
    this.isLoggedInSubject.next(true);
    this.userTypeSubject.next(userType);
    this.userIdSubject.next(idUsuario);
  }

  //elimina el tipo e id
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    this.isLoggedInSubject.next(false);
    this.userTypeSubject.next(null);
    this.userIdSubject.next(null);
  }
}
