import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Menu } from './components/menu/menu';
import { Contacts } from './components/contacts/contacts';
import {Pizza} from './components/pizza/pizza';
import { NotFound } from './components/not-found/not-found';
import { OrderForm } from './components/order-form/order-form';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: Menu, title: 'Меню пицц 🍕' },
  { path: 'pizza/:id', component: Pizza },
  { path: 'contacts', component: Contacts },

  {path: 'order', component: OrderForm, title: 'Оформление заказа' },


  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin),
    title: 'Панель администратора',
    

  },


  {
    path: '**', component: NotFound, title: 'Страница не найдена'
  }
];
