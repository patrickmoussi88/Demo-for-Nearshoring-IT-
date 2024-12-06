import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get token():any{
    return localStorage.getItem("AccesToken");
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

  getRoleFromToken():any{
    return this.getClaimOfToken()?.authorities;
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
}
