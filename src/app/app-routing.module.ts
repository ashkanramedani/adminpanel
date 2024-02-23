import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
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
    path: '',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path:'AuditReports',
    loadChildren:()=>
    import('./pages/audit-reports/audit-reports.module').then((m)=>m.AuditReportsModule)
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
export class AppRoutingModule {}
