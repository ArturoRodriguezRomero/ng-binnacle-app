import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorMessages = new Map<number, string>();

  constructor(private notifier: NotifierService) {
    this.errorMessages.set(0, 'No hay conexión a Internet.');
    this.errorMessages.set(401, 'No autorizado.');
    this.errorMessages.set(404, 'Recurso no encontrado.');
    this.errorMessages.set(500, 'Error del servidor. Inténtalo más tarde.');
  }

  throw(error: HttpErrorResponse) {
    console.log(error);
    this.notifier.notify('error', this.errorMessages.get(error.status));
  }
}
