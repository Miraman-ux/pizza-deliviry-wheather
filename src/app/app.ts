import {Component} from '@angular/core';
import {RouterLink, RouterOutlet, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
}


