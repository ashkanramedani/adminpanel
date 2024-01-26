import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
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
    path: 'podcasts',
    loadChildren: () =>
      import('./pages/podcasts/podcasts.module').then((x) => x.PodcastsModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module').then((x) => x.NewsModule),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./pages/blogs/blogs.module').then((x) => x.BlogsModule),
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
