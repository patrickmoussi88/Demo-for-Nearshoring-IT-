import {Component, OnInit} from '@angular/core';
import {HomeData} from "../../../models/home-data";
import {HomeService} from "../../../services/home.service";
import {AuthentificationService} from "../../../services/authentification/authentification.service";
import {FormBuilder, FormControl, FormGroup, isFormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseMessageModel} from "../../../models/responseMessage.model";
declare  let $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    homeData!: HomeData;
    submitted=false;
    response: ResponseMessageModel |null=null;
    errorIcon="images/icons/error-modal.svg";
    errorMessage:string="";

    constructor(
        private homeService: HomeService,
        private authenService:AuthentificationService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }

    loginForm: FormGroup = this.formBuilder.group({
        username: new FormControl(null,[Validators.required,Validators.email]),
        password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
        isSessionOpen: new FormControl(false,Validators.required)
    })


    ngOnInit() {
        this.homeData = this.homeService.data;
    }


    get getControls():any{
        return this.loginForm.controls;
    }
    login=()=>{
        this.submitted=true;
        if(!this.loginForm.valid) return;
        const credentials= this.loginForm.value;

        this.authenService.signIn(credentials).subscribe({
            next: value => {
                this.router.navigate(['home/authentication/welcome']).then(
                    ()=>{

                    }
                )
            },
            error:err=>{
                if(err!=''){
                    this.errorMessage=err;
                    $("#errorModal").modal('show');
                }
            }
        })
    }

    goToForgotPasswordPage() {
        this.router.navigate(['home/authentication/reset/forgot-password']);
    }

    onBlurInput=()=>{

    }


}
