import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let errorHandlerService: ErrorHandlerService;
  let notifierServiceStub = { notify: () => {} };

  let errorMessages = new Map<number, string>();

  errorMessages.set(0, 'No hay conexión a Internet.');
  errorMessages.set(400, 'Error del servidor. Inténtalo más tarde.');
  errorMessages.set(401, 'No autorizado.');
  errorMessages.set(404, 'Recurso no encontrado.');
  errorMessages.set(500, 'Error del servidor. Inténtalo más tarde.');

  beforeEach(() => {
    errorHandlerService = new ErrorHandlerService(<any>notifierServiceStub);
  });

  it('should be created', () => {
    expect(errorHandlerService).toBeTruthy();
  });

  it('should have correct errorMessages', () => {
    expect(errorHandlerService.errorMessages).toEqual(
      errorMessages,
      'Expected error messages'
    );
  });

  it('should #notify error when #throw', () => {
    spyOn(notifierServiceStub, 'notify').and.callFake(() => {});

    errorHandlerService.throw(<HttpErrorResponse>{ status: 400 });

    expect(notifierServiceStub.notify).toHaveBeenCalledWith(
      'error',
      errorMessages.get(400)
    );
  });
});
