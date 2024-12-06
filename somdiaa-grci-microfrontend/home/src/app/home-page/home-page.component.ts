import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../services/authentification/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements  OnInit{

    constructor(private authenService:AuthentificationService,private router:Router) {

    }
    ngOnInit(): void {
        this.checkSignIn();
    }

    checkSignIn(){
        if(this.authenService.token){
            this.authenService.verify_token().subscribe({
                next:value => {
                    this.router.navigate(['home/authentication/welcome']);
                },
                error:err => {
                    localStorage.clear();
                }
            })
        }
    }

}
