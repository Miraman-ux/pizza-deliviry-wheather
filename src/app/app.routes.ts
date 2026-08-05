import { Routes } from '@angular/router';
import { Home } from './Pizza/components/home/home';
import { Menu } from './Pizza/components/menu/menu';
import { Contacts } from './Pizza/components/contacts/contacts';
import {Pizza} from './Pizza/components/pizza/pizza';
import { NotFound } from './Pizza/components/not-found/not-found';
import { OrderForm } from './Pizza/components/order-form/order-form';
import { WeatherComponent } from './Weather/components/weather/weather.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'menu', component: Menu, title: 'Меню пицц 🍕' },
  { path: 'pizza/:id', component: Pizza },
  { path: 'contacts', component: Contacts },
  {path: 'order', component: OrderForm, title: 'Оформление заказа' },
  {path: 'weather', component: WeatherComponent},


  {
    path: 'admin',
    loadComponent: () => import('./Pizza/pages/admin/admin').then(m => m.Admin),
    title: 'Панель администратора',


  },


  {
    path: '**', component: NotFound, title: 'Страница не найдена'
  }
];
