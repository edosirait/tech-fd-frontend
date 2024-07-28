import {Routes} from '@angular/router';
import {StarWarsComponent} from "./pages/star-wars/star-wars.component";

export const routes: Routes = [
  { path: 'star-wars-people', component: StarWarsComponent },
  {
    path: 'star-wars-detail/:id',
    loadComponent: () => import('./pages/star-wars/star-wars-detail/star-wars-detail.component').then(m => m.StarWarsDetailComponent)
  },
  { path: '', redirectTo: '/star-wars-people', pathMatch: 'full' },
  { path: '**', redirectTo: '/star-wars-people', pathMatch: 'full' }  // Handle unmatched routes
];
