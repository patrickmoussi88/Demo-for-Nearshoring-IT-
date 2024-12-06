import {Component, OnInit} from '@angular/core';
import {HomeData} from "../../../models/home-data";
import {HomeService} from "../../../services/home.service";

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.css']
})
export class NavHomeComponent implements OnInit {
    homeData!: HomeData;
    constructor(public homeService:HomeService) {
    }

    ngOnInit() {
        this.homeData = this.homeService.data;
    }
}
