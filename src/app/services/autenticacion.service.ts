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

  // Obtener el estado de 'isLoggedIn' desde localStorage
  private getIsLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Obtener el tipo de usuario desde localStorage
  private getUserType(): number | null {
    const userType = localStorage.getItem('userType');
    return userType ? +userType : null;
  }

  // Obtener el estado de 'isLoggedIn' como un observable
  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  // Obtener el tipo de usuario como un observable
  get userType() {
    return this.userTypeSubject.asObservable();
  }

  // Actualizar el estado de sesión
  login(userType: number, idUsuario: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType.toString());
    this.isLoggedInSubject.next(true);
    this.userTypeSubject.next(userType);
    this.userIdSubject.next(idUsuario);
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    this.isLoggedInSubject.next(false);
    this.userTypeSubject.next(null);
    this.userIdSubject.next(null);
  }
}
