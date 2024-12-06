import {Component, OnInit} from '@angular/core';
import {HomeData} from "../../../models/home-data";
import {HomeService} from "../../../services/home.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    homeData!: HomeData;
    constructor(private homeService: HomeService) {
    }
    ngOnInit() {
        this.homeData = this.homeService.data;
    }
}
