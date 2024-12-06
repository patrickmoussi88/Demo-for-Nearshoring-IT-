import {Component, OnInit} from '@angular/core';
import {HomeData} from "../../models/home-data";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit{
    homeData!: HomeData;
    constructor(private homeService: HomeService) {
    }
    ngOnInit() {
        this.homeData = this.homeService.data;
    }
}
