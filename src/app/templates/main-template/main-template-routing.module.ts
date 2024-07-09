import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTemplateComponent } from './main-template.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
   component:MainTemplateComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('../../pages/basic/basic.module').then((m) => m.BasicModule)
      },
      {
        path: 'support',
        loadChildren: () =>
          import('../../pages/support/support.module').then((m) => m.SupportModule)
      },
      {
        path: 'contents',
        loadChildren: () =>
          import('../../pages/contents/contents.module').then(
            (m) => m.ContentsModule
          ),
      },
      {
        path: 'libraries',
        loadChildren: () =>
          import('../../pages/libraries/libraries.module').then(
            (m) => m.LibrariesModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () => import('../../pages/reports/reports.module').then((m) => m.ReportsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainTemplateRoutingModule { }
