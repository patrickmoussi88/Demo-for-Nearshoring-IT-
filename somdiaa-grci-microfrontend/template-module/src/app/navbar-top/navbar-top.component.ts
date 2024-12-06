import {Component, OnInit} from '@angular/core';
import {DashbordData} from "../models/dashbord-data";
import {DashbordService} from "../services/dashbord.service";
import {AlertsData} from "../models/alerts-data";
import {ProfileFunctions} from "../models/profile-functions";
import {AssertUrlPipe} from "../pipes/assert-url-pipe";
import {CommonModule, DatePipe} from "@angular/common";
import { Router} from "@angular/router";
import {DataService} from "../services/global/data.service";
import {PerimetreResponse} from "../models/response/perimetre-response";
import {MetierResponse} from "../models/response/metier-response";
import {FormsModule} from "@angular/forms";
import {NotificationPage} from "../models/response/notification-page";
import {MessageLevel} from "../models/response/message-level";
declare var $:any;

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  standalone: true,
  styleUrls: ['./navbar-top.component.css'],
  imports: [AssertUrlPipe, CommonModule, FormsModule,DatePipe]
})
export class NavbarTopComponent implements OnInit{
  dashbordData!: DashbordData;
  alerts!: AlertsData[];
  profileFuntions!: ProfileFunctions[];
  perimetreId!:number;
  metierId!:number;
  perimetreSelected:number=1;
  metierSelected!:number;
  name:string="";
  perimetreList!:PerimetreResponse[];
  metiersList!:MetierResponse[];
  notificationList!:NotificationPage;
  pagenum:number=0;
  pagesize:number=10;
  filialles:PerimetreResponse[]=[];
  errorMessage:string="";
    errorIcon:string="images/icons/error-modal.svg";

  constructor(private dashbordService: DashbordService,private dataService:DataService,private router: Router,) {

  }

  ngOnInit() {
    this.dashbordData = this.dashbordService.data;
    this.alerts = this.dashbordService.alerts;
    this.profileFuntions = this.dashbordService.profileFunctions;
    this.perimetreSelected=this.getPerimetreId;
    this.metierSelected=this.getMetierId;
    this.checkifUserConnect();
    this.name=this.dataService.getNameFromToken();

    this.getAllperimetre();
    this.getAllMetiers();
    this.getNotificatioOfUser();
  }

  onPerimetreValue(event: any, type: string) {
    console.log(event.target.value,type)
    this.perimetreId = event.target.value;
    this.savePerimetreIdInLocalStorage(this.perimetreId);
  }
  onMetierValue(event: any, type: string) {
    console.log(event.target.value,type)
    this.metierId = event.target.value;
    this.saveMertierInLocalStorage(this.metierId);
  }

  public savePerimetreIdInLocalStorage( value: number) {
    localStorage.setItem('perimetreId',""+ value);
    window.location.reload();
  }

  public saveMertierInLocalStorage( value: number) {
    localStorage.setItem('metierId',""+ value);
    window.location.reload();
  }

  public get getPerimetreId(): number {
    let val = localStorage.getItem("perimetreId")?? "";
    return Number(val);
  }

  public get getMetierId(): number {
    let val = localStorage.getItem("metierId")?? "";
    return Number(val);
  }

  checkifUserConnect(){
    if(!this.dataService.isconnect()){
      this.router.navigate(['home/authentication/login']).then(
        ()=>{
          localStorage.clear();

        }
      )
    }
  }

  openLogoutModal(){
    $("#logoutModal").modal('show')
  }

  logout(){
    this.dataService.logout().subscribe({
      next:value => {
        $("#logoutModal").modal('hide')
        this.router.navigate(['']).then(
          ()=>{
            localStorage.clear();
          }
        )
      }
    })
  }
  getAllperimetre(){
    this.dataService.getAllPerimetre().subscribe({
      next:value => {
        this.perimetreList=value.data;
        if(!this.perimetreSelected){
          this.perimetreSelected=this.perimetreList[0].id
          this.savePerimetreIdInLocalStorage(this.perimetreSelected)
        }
      },
      error:err=>{
        //this.senderro(err)
      }
    })
  }

  getAllMetiers(){
    this.dataService.getAllMetier().subscribe({
      next:value => {
        this.metiersList=value.data;
        if(!this.metierSelected){
          this.metierSelected=this.metiersList[0].id;
          this.saveMertierInLocalStorage(this.metierSelected);
        }
      },
      error:err=>{
       // this.senderro(err)
      }
    })
  }

  getNotificatioOfUser(){

    this.dataService.getNotificationOfUser(this.pagenum,this.pagesize).subscribe({
      next:value => {
        this.notificationList=value.data;
      },
      error:err => {
        console.log("error",err)
        this.senderro(err);
      }
    })
  }

  senderro(err:any){
    let  errorMessage="";
    if(err.status==401 && !err.error) {
      this.errorMessage= " Vous n’êtes pas autorisé(e) à effectuer cette opération ";
      $("#errorModalTemplate").modal('show');
      return;
    }
    if(err.status==503) {
      this.errorMessage=" Service indisponible";
      $("#errorModalTemplate").modal('show');
      return;
    }
    if(err.status==403){
      localStorage.clear();
      this.router.navigate(["/"])
      return;
    }
    this.errorMessage=`${err.error.message}`;
    $("#errorModalTemplate").modal('show');
  }


  protected readonly MessageLevel = MessageLevel;
}
