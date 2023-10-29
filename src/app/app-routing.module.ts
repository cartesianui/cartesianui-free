import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '@shared/services';
import { DefaultLayoutComponent } from '@cartesianui/coreui';
import { navItems } from '@app/nav.data';
import { UserConfigurationComponent } from '@cartesianui/bo-user';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('@app/account/account.module').then((m) => m.AccountModule), // Lazy load account module
    data: { preload: true }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [RouteGuard],
    data: {
      title: 'Home',
      navItems: navItems
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@app/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'authorization',
        loadChildren: () => import('@cartesianui/bo-auth').then((m) => m.AuthModule)
      },
      {
        path: 'users',
        loadChildren: () => import('@cartesianui/bo-user').then((m) => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
