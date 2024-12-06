import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {PerimetreResponse} from "../../models/response/perimetre-response";
import {Observable} from "rxjs";
import {MetierResponse} from "../../models/response/metier-response";
import jwtDecode from "jwt-decode";
import {NotificationPage} from "../../models/response/notification-page";
import { MessageResponse } from 'src/app/models/response/message-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient ) { }

  private PERIMETREURL:string=environment.baseUrl+"perimetres";
  private METIERURL:string=environment.baseUrl+"metiers";
  private NOTIFURL:string=environment.baseUrl+"notification"
  private AUHTURL:string= environment.baseUrl+"authentification";

  private httpHeaders:HttpHeaders= new HttpHeaders({
    "Authorization":"Bearer "+localStorage.getItem("AccesToken"),
    "Content-Type":"application/json"
  })

  logout():Observable<any>{
    return this.http.put(this.AUHTURL+"/logout",null,{headers:this.httpHeaders});
  }


  getAllPerimetre():Observable<MessageResponse<PerimetreResponse[]>>{
    return this.http.get<MessageResponse<PerimetreResponse[]>>(this.PERIMETREURL+"/user",{headers:this.httpHeaders});
  }

  getAllMetier():Observable<MessageResponse<MetierResponse[]>>{
    return this.http.get<MessageResponse<MetierResponse[]>>(this.METIERURL+"/user",{headers:this.httpHeaders});
  }

  getNotificationOfUser(pagenum:number=0,pagesize:number=10):Observable<MessageResponse<NotificationPage>>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pagenum",pagenum);
    queryParams = queryParams.append("pagesize",pagesize);
    return this.http.get<MessageResponse<NotificationPage>>(this.NOTIFURL+"/user",{params:queryParams,headers:this.httpHeaders})
  }

  hasAnyAuthority(authorities: string[] | string): boolean {

    if (!localStorage.getItem("AccesToken")) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    /*if (this.userIdentity.authorities.find((a) => a === UserType.ROLE_ADMIN))
      return true;
      */
    return this.getRoleFromToken().some((authority: string) =>
      authorities.includes(authority)
    );
  }

  get token():any{
    return localStorage.getItem("AccesToken");
  }

  getRoleFromToken():any{
    return this.getClaimOfToken()?.authorities;
  }
  getNameFromToken():string{
    return this.getClaimOfToken()?.name;
  }
  getClaimOfToken(): any{
    return this.decodeAccescToken(this.token);
  }
  decodeAccescToken(token: string){
    try {
      return jwtDecode(token);
    }catch (error){
      return null;
    }
  }

  isconnect():boolean{
    return  this.token? true:false;
  }






}
