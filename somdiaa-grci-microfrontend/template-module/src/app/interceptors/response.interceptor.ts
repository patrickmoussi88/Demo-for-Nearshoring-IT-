import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("response : ",request);
    return next.handle(request).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
    let errorMessage ='erreur inconnue';

    if(error.error instanceof ErrorEvent){
      errorMessage=`Error : ${error.error.message}`;
    }else{
      errorMessage= `Error code: ${error.error.status}\nMessage : ${error.error.message}`;
    }

    alert(errorMessage);
    return throwError(errorMessage);

  }
}
export const ResponseInterceptorProvider={
  provide: HTTP_INTERCEPTORS,
  useClass: ResponseInterceptor,
  multi:true
}

