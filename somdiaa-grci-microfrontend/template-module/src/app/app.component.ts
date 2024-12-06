import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {LateralNavbarComponent} from "./lateral-navbar/lateral-navbar.component";
import {NavbarTopComponent} from "./navbar-top/navbar-top.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, LateralNavbarComponent, NavbarTopComponent]
})
export class AppComponent {
  title = 'template-module';

}

