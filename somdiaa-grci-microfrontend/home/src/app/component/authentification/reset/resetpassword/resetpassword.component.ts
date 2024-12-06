import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../../../services/authentification/authentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../../../services/home.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeData} from "../../../../models/home-data";
declare  let $:any;

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{
    homeData!: HomeData;         username : string="";
    submitted=false;
    otpTimer:string="00:00" ;
    timerNumber:number=0.5;
    errorIcon="images/icons/error-modal.svg";
    errorMessage:string="";


    constructor(
        private authenService:AuthentificationService,
        private router : Router,
        private homeservice  : HomeService,
        private formBuilder: FormBuilder,
        private activatedRouter: ActivatedRoute
    ) {

    }

    resetGroup : FormGroup= this.formBuilder.group({
        otpCode: new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
        newpassword : new FormControl(null,[Validators.required,Validators.minLength(8)]),
        oldPassword : new FormControl(null,[Validators.required,Validators.minLength(6)])
    })

    ispasswordmatch: boolean = true;

    ngOnInit() {
        this.homeData = this.homeservice.data;
       /** this.activatedRouter.queryParamMap.subscribe((queryParams) => {
            const username = queryParams.get('username');

        });*/
       this.username="" + localStorage.getItem("username")
    }





    resetPassword=()=>{
        this.submitted=true;
        console.log("pass"+this.ispasswordmatch);
        if(!this.resetGroup.valid) return;
        let credentials= this.resetGroup.value;

        if( credentials.newpassword!==credentials.oldPassword){
            this.ispasswordmatch=false;
            return;
        }

        this.authenService.resetPassword(credentials.otpCode,credentials.newpassword,this.username).subscribe({
            next: value => {
                this.router.navigate(['home/authentication/login']).then(
                    ()=>{
                        localStorage.clear();
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

    reSendOtpCode=()=>{
        if(this.otpTimer=="00:00"){
            this.authenService.forgotPassword(this.username).subscribe({
                next: value => {
                    this.timer(this.timerNumber);
                    this.timerNumber= this.timerNumber>3?this.timerNumber:this.timerNumber+0.5;
                    console.log("console")
                }
            })
        }

    }

    get getControls():any{
        return this.resetGroup.controls;
    }



    timer(minute:number) {
        // let minute = 1;
        let seconds: number = minute * 60;
        let textSec: any = '0';
        let statSec: number =seconds%60;

        const prefix = minute < 10 ? '0' : '';

        const timer = setInterval(() => {
            seconds--;
            if (statSec != 0) statSec--;
            else statSec = 59;

            if (statSec < 10) {
                textSec = '0' + statSec;
            } else textSec = statSec;

            this.otpTimer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

            if (seconds == 0) {
                console.log('finished');
                clearInterval(timer);
            }
        }, 1000);
    }



    passewordchange(){
       this.ispasswordmatch= this.submitted? this.resetGroup.value.newpassword==this.resetGroup.value.oldPassword:true

    }



}
