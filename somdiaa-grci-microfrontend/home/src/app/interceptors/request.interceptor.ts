import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token= localStorage.getItem('AccesToken');
      let httpHeaders:HttpHeaders;
      if (token && !request.headers.get("Authorization")){
           httpHeaders= new HttpHeaders({
              "Authorization":"Bearer "+token,
               "Content-Type":"application/json"
          })
      }else{
          if (request.headers.get("Authorization")){
              httpHeaders= new HttpHeaders({
                  "Authorization":""+request.headers.get("Authorization"),
                  "Content-Type":"application/json"
              })
          }else{
              httpHeaders= new HttpHeaders({
                  "Content-Type":"application/json"
              })
          }
      }
      const clonereq=request.clone({
          headers:httpHeaders,
      })
      console.log("clone_request :",clonereq);
    return next.handle(clonereq);
  }
}

export const RequestInterceptorProvider={
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi:true
}
