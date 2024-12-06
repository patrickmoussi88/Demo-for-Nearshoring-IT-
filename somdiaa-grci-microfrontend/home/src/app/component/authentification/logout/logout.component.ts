import {Component, ViewChild} from '@angular/core';
import {AuthentificationService} from "../../../services/authentification/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
    @ViewChild('closeModal') closebutton:any;
    constructor(private authenService:AuthentificationService,private router: Router) {
    }

    logout=()=>{
        this.closebutton.nativeElement.click();
        this.authenService.logout().subscribe({
            next: value => {
                this.router.navigate(['']).then(
                    ()=>{
                        localStorage.clear();
                    }
                )
            }
        })
    }

}
