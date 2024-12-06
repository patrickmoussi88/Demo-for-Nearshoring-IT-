import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("response : ",request);
    return next.handle(request).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
      let  errorMessage;
      if(error.status==403){
          localStorage.clear();
          this.router.navigate(['/'])
          return throwError('');
      }
      if(error.error) {
          errorMessage= `${error.error.message}`;
      }else{
          if(error.status==401)
              errorMessage =" Vous n'est pas autoriser a effectuer cette operation";
          if(error.status==503)
              errorMessage =" service indisponible";
         
      }

      //alert(errorMessage)
      return throwError(errorMessage);

  }
}
export const ResponseInterceptorProvider={
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi:true
}
