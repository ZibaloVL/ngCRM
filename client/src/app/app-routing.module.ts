import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegistrPageComponent } from './registr-page/registr-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalitycsPageComponent } from './analitycs-page/analitycs-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent,
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginPageComponent },
        { path: 'registr', component: RegistrPageComponent }
    ]
  },
  { path: '', component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalitycsPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: 'order', component: OrderPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
