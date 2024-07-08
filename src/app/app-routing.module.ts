import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'basic',
    loadChildren: () =>
      import('./pages/basic/basic.module').then((m) => m.BasicModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./pages/support/support.module').then((m) => m.SupportModule)
  },
  {
    path: 'contents',
    loadChildren: () =>
      import('./pages/contents/contents.module').then(
        (m) => m.ContentsModule
      ),
  },
  {
    path: 'libraries',
    loadChildren: () =>
      import('./pages/libraries/libraries.module').then(
        (m) => m.LibrariesModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then((m) => m.ReportsModule)
  },
  {
    path: 'notFound',
    component: ErrorComponent,
  },
  { path: '**', redirectTo: 'notFound' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
