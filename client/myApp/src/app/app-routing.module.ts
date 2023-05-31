import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MovieComponent } from './movie/movie.component';
const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  {
    path:'dashboard', component:DashboardComponent, children:[
      {path:'', redirectTo:'movie', pathMatch:'full'},
      {
        path: 'movie',
        component: MovieComponent,
      },
      {
        path: 'details/:id',
        component: MovieDetailsComponent,
      },
    ]
  },
 
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
