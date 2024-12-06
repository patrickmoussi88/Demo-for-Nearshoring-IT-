import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../../../services/authentification/authentification.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../../../../services/home.service";
import {HomeData} from "../../../../models/home-data";
declare  let $:any;

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{

    homeData!: HomeData;
    submitted=false;
    errorIcon="images/icons/error-modal.svg";
    errorMessage:string="";

    ngOnInit(): void {
        this.homeData = this.homeService.data;
    }
    constructor(
        private authenService : AuthentificationService,
        private  router : Router
        ,private formBuilder: FormBuilder,
        private homeService: HomeService,) {
    }

    forgotGroup: FormGroup = this.formBuilder.group({
        username: new FormControl(null,[Validators.required,Validators.email])
    })


    forgotPassword=()=>{
        this.submitted=true;
        if(!this.forgotGroup.valid) return;
        const username= this.forgotGroup.value.username;
        console.log("username "+username);
        this.authenService.forgotPassword(username).subscribe({
            next: value => {
                localStorage.setItem("username",username)
                this.router.navigate(['home/authentication/reset/reset-password']).then(
                    ()=>{

                    }
                )
            },
            error:err=>{
                if(err!='') {
                    this.errorMessage = err;
                    $("#errorModal").modal('show');
                }
            }
        })
    }

    get getControls():any{
        return this.forgotGroup.controls;
    }

}
