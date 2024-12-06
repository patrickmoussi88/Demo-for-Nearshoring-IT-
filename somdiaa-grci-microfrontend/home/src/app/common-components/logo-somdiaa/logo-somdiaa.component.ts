import {Component, OnInit} from '@angular/core';
import {HomeData} from "../../models/home-data";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-logo-somdiaa',
  templateUrl: './logo-somdiaa.component.html',
  styleUrls: ['./logo-somdiaa.component.css']
})
export class LogoSomdiaaComponent implements OnInit {
    homeData!: HomeData;

    constructor(private homeService: HomeService) {
    }
    ngOnInit() {
        this.homeData = this.homeService.data;
    }
}
