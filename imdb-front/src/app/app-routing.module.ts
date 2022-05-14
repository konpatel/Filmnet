import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizedGuard} from "./core/authorized-guard/authorized-guard";

const routes: Routes = [
  {path: 'home-page', loadChildren: () => import('./content/home-page/home-page.module').then(m => m.HomePageModule)},
  {
    path: 'register-page',
    loadChildren: () => import('./content/register-page/register-page.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'search-results',
    loadChildren: () => import('./content/search-results/search-results.module').then(m => m.SearchResultsModule)
  },
  {path: 'movies', loadChildren: () => import('./content/movies/movies.module').then(m => m.MoviesModule)},
  {
    path: 'personal-list',
    loadChildren: () => import('./content/personal-list/personal-list.module').then(m => m.PersonalListModule),
    canActivate: [AuthorizedGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      forbiddenRedirect: ['home-page'],
      unauthorizedRedirect: ['home-page']
    }
  },
  {path: 'people/:job', loadChildren: () => import('./content/people/people.module').then(m => m.PeopleModule)},
  {
    path: 'movies-details/:id',
    loadChildren: () => import('./content/movies-details/movies-details.module').then(m => m.MoviesDetailsModule),
    canActivate: [AuthorizedGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      forbiddenRedirect: ['home-page'],
      unauthorizedRedirect: ['home-page']
    }
  },
  {
    path: 'review', loadChildren: () => import('./content/review/review.module').then(m => m.ReviewModule),
    canActivate: [AuthorizedGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      forbiddenRedirect: ['home-page'],
      unauthorizedRedirect: ['home-page']
    }
  },
  {path: 'category/:id', loadChildren: () => import('./content/category/category.module').then(m => m.CategoryModule)},
  {
    path: 'person-details/:id',
    loadChildren: () => import('./content/person-details/person-details.module').then(m => m.PersonDetailsModule),
    canActivate: [AuthorizedGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      forbiddenRedirect: ['home-page'],
      unauthorizedRedirect: ['home-page']
    }
  },
  {path: 'terms', loadChildren: () => import('./core/terms/terms.module').then(m => m.TermsModule)},
  {
    path: 'admin-page',
    loadChildren: () => import('./content/admin-page/admin-page.module').then(m => m.AdminPageModule),
    canActivate: [AuthorizedGuard],
    data: {
      roles: ['ROLE_ADMIN'],
      forbiddenRedirect: ['home-page'],
      unauthorizedRedirect: ['home-page']
    }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./content/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password/:token',
    loadChildren: () => import('./content/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {path: 'about-us', loadChildren: () => import('./core/about-us/about-us.module').then(m => m.AboutUsModule)},
  {
    path: 'notification-page',
    loadChildren: () => import('./content/notification-page/notification-page.module').then(m => m.NotificationPageModule),
    canActivate: [AuthorizedGuard],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      forbiddenRedirect: ['home-page'],
      unauthorizedRedirect: ['home-page']
    }
  },
  {
    path: 'navigation-list',
    loadChildren: () => import('./core/navigation-list/navigation-list.module').then(m => m.NavigationListModule)
  },
  {path: '**', redirectTo: 'home-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
