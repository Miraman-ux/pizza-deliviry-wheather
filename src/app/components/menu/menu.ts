import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  pizzas = [
    {id: 1, name: 'Маргарита', price: 450},
    {id: 2, name: 'Пеперони', price: 550},
    {id: 3, name: 'Четыре сыра', price: 600},
  ];
}
