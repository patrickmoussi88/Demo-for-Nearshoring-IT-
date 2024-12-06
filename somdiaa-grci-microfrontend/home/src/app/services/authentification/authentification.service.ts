import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {CredentialsModel} from "../../models/credentials.model";
import jwt_decode from "jwt-decode";
import {ResponseMessageModel} from "../../models/responseMessage.model";
import {UpdatePassword} from "../../models/updatePassword";
import {UserResponse} from "../../models/user-response";
import { ResponseMessage } from 'src/app/models/response-message';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

    private AUHTURL:string= environment.baseUrl+"authentification";
    private USERURL:string=environment.baseUrl+"users"
  constructor(private http:HttpClient) { }

    get token():any{
      return localStorage.getItem("AccesToken");
    }

    signIn(loginParam: CredentialsModel):Observable<ResponseMessage<any>>{
      const hash =btoa(loginParam?.username+":"+loginParam?.password);
      const httpHeaders:HttpHeaders= new HttpHeaders({
          "Authorization":"Basic "+hash
      })
      return this.http.post<ResponseMessage<any>>( this.AUHTURL+"/sign-in",null,{headers:httpHeaders}).pipe(
          tap(
              (res:any)=>{
                  localStorage.clear();
                  localStorage.setItem('AccesToken',res?.data);
                  localStorage.setItem('authority',this.getRoleFromToken());
                 // console.log(res);

              }
          )
      );

    }

    logout():Observable<any>{
      return this.http.put(this.AUHTURL+"/logout",null);
    }

    forgotPassword(username:string):Observable<ResponseMessage<any>>{
      return this.http.get<ResponseMessage<any>>(this.AUHTURL+"/forgot-password/"+username);
    }

    resetPassword(otpCode:string,newpassword:string,username:string):Observable<ResponseMessage<any>>{
        const hash =btoa(otpCode+":"+newpassword);
        const httpHeaders:HttpHeaders= new HttpHeaders({
            "Authorization":"Basic "+hash,
        })
      return this.http.put<ResponseMessage<any>>(this.AUHTURL+"/reset-password/"+username,null,{headers:httpHeaders});
    }

    getOtpCode(username:string ):Observable<ResponseMessage<any>>{
       return this.http.get<ResponseMessage<any>>(this.AUHTURL+"/otp-code/"+username);
    }

    updatePassword(credentials:UpdatePassword):Observable<ResponseMessage<any>>{
        return this.http.put<ResponseMessage<any>>(this.AUHTURL+"/update-password",credentials);
    }

    lockUserAccount(userId:number):Observable<ResponseMessage<any>>{
        return this.http.put<ResponseMessage<any>>(this.AUHTURL+"/lock-user-account"+userId,null);
    }

    enanbleUserAccount(userId:number):Observable<ResponseMessage<any>>{
        return this.http.put<ResponseMessage<any>>(this.AUHTURL+"/enable-user-account"+userId,null);
    }

    getCurrentUser():Observable<ResponseMessage<UserResponse>>{
      return this.http.get<ResponseMessage<UserResponse>>(this.USERURL+"/current-user");
    }

    verify_token():Observable<ResponseMessage<any>>{
        return this.http.get<ResponseMessage<any>>(this.AUHTURL+"/verify-token");
    }

    hasAnyAuthority(authorities: string[] | string): boolean {

        if (!localStorage.getItem("AccesToken")) {
            return false;
        }

        if(authorities.length==0){
            return true;
        }
        
        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }
        /*if (this.userIdentity.authorities.find((a) => a === UserType.ROLE_ADMIN))
          return true;
          */
       console.log(authorities)
        return this.getRoleFromToken().some((authority: string) =>
            authorities.includes(authority)
        );
    }


    getmetiersFromToken():any{
        return this.getClaimOfToken()?.metiers;
    }

    getusernameToken():string{
        return this.getClaimOfToken()?.sub;
    }
    getSessionFromToken():string{
        return this.getClaimOfToken()?.sessionId;
    }
    getperimetreFromToken():any{
        return this.getClaimOfToken()?.perimetres;
    }
    getRoleFromToken():any{
      return this.getClaimOfToken()?.authorities;
    }
    getClaimOfToken(): any{
      return this.decodeAccescToken(this.token);
    }
    decodeAccescToken(token: string){
      try {
          return jwt_decode(token);
      }catch (error){
          return null;
      }
    }
}
