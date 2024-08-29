import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminAuthGuard } from './shared/admin.auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MovieDisplayComponent } from './components/movie-display/movie-display/movie-display.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'movie-display', component: MovieDisplayComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
