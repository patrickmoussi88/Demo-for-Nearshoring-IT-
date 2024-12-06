import {Component, OnInit} from '@angular/core';
import {HomeData} from "../../../models/home-data";
import {HomeService} from "../../../services/home.service";
import {AlertsData} from "../../../models/alerts-data";
import {ProfileFunctions} from "../../../models/profile-functions";
import { Router } from '@angular/router';
import { NotificationPage } from 'src/app/models/notification-page';
import { MessageLevel } from 'src/app/models/message-Level';
import {DatePipe, NgForOf, NgIf } from '@angular/common';
import {AssertUrl} from "../../../pipes/assert-url";
declare  let $:any;

@Component({
  selector: 'nav-welcome',
  templateUrl: './nav-welcome.component.html',
  styleUrls: ['./nav-welcome.component.css'],

})
export class NavWelcomeComponent implements OnInit{
    homeData!: HomeData;
    alerts!: AlertsData[];
    profileFuntions!: ProfileFunctions[];
    notificationList!:NotificationPage;
    errorIcon="images/icons/error-modal.svg";
    errorMessage:string="";


    constructor(private homeService: HomeService,private router:Router) {
    }
    ngOnInit() {
        this.homeData = this.homeService.data;
        this.alerts = this.homeService.alerts;
        this.profileFuntions = this.homeService.profileFunctions;
        this.getNotificationOfUser();
    }

    navigateTo(link:string){
        this.router.navigate([link])
    }

    getNotificationOfUser(){
        this.homeService.getNotificationOfUser().subscribe({
            next:value=>{
                this.notificationList= value.data;
            },
            error:err=>{
                if(err!=''){
                    this.errorMessage=err;
                    $("#errorModal").modal('show');
                }
            }
        })
    }
}
