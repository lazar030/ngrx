import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './core/access-denied/access-denied.component';
import { ListItemsComponent } from './home/components/list-items/list-items.component';
import { ItemDetailsComponent } from './home/containers/item-details/item-details.component';
import { ListMainComponent } from './home/containers/list-main/list-main.component';

const routes: Routes = [
  {
    path: ':listID/:token',
    component: ListMainComponent,
    children: [
      { path: '', component: ListItemsComponent },
      { path: ':propertyID', component: ItemDetailsComponent },
    ],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '**',
    redirectTo: '/access-denied',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
