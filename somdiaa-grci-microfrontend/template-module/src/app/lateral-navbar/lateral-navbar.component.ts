import {Component, OnInit} from '@angular/core';
import {DashbordService} from "../services/dashbord.service";
import {DashbordData} from "../models/dashbord-data";
import {Features} from "../models/features";
import {AssertUrlPipe} from "../pipes/assert-url-pipe";
import {CommonModule} from "@angular/common";
import {HashLinkPipe} from "../pipes/hash-link-pipe";
import { Router } from '@angular/router';
import { AuthorizeDirective } from '../directives/authorize.directive';

@Component({
  selector: 'app-lateral-navbar',
  templateUrl: './lateral-navbar.component.html',
  standalone: true,
  styleUrls: ['./lateral-navbar.component.css'],
  imports: [AssertUrlPipe, CommonModule, HashLinkPipe,AuthorizeDirective]
})
export class LateralNavbarComponent implements OnInit{

  data!: DashbordData;
  features!: Features[];
  constructor(private dashbordService: DashbordService,private route:Router) {
  }
  
  ngOnInit() {
    this.data = this.dashbordService.data;
    this.features = this.dashbordService.features;
  }

  changeFeature(feacture: Features){
    if(!feacture.collapse){
      this.route.navigate([feacture.link]);
    }
  }

  changeItem(item:any){
    if(item.pathModule!=""){
      this.route.navigate([item.pathModule]);
    }
  }







}
