import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
    standalone: true,
  styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet]
})
export class AppComponent {
  title = 'home';
}
