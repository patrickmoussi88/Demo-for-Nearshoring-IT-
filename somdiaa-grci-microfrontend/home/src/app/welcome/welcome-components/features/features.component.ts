import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../../services/home.service";
import {Features} from "../../../models/features";

@Component({
  selector: 'features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit{
    featuresData!: Features[];
    keyDashbordIndex="Dashbord-AuditInterne-Key"
    constructor(private homeService: HomeService) {
    }
    ngOnInit() {
        this.featuresData = this.homeService.features;
    }

    changePage(link:string){
        if(link=="dashbord-audit-interne")
            localStorage.setItem(this.keyDashbordIndex,"1");

    }
}
