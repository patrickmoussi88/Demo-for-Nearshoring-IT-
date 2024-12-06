import {Component, OnInit} from '@angular/core';
//import { AuthorizeDirective } from 'src/app/directive/authorize.directive';
import {HomeData} from "../../../models/home-data";
import {HomeService} from "../../../services/home.service";

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.css'],
    //imports:[AuthorizeDirective]
})
export class ModsComponent implements OnInit {
    homeData!: HomeData;
    constructor(private homeService: HomeService) {
    }
    ngOnInit() {
        this.homeData = this.homeService.data;
    }
}
