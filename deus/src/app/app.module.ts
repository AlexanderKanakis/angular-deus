import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BarComponent } from './components/bar/bar.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MovieCellComponent } from './components/movie-cell/movie-cell.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminAuthGuard } from './shared/admin.auth.guard';
import { AuthService } from './services/api/auth/auth.service';
import { tokenInterceptor } from './services/api/token-interceptor/token-interceptor.service';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovieDisplayComponent } from './components/movie-display/movie-display/movie-display.component';
import { ChartsComponent } from './components/charts/charts.component';
import { MovieCreateFormComponent } from './components/movie-create-form/movie-create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarComponent,
    AdminPanelComponent,
    UserProfileComponent,
    MovieCellComponent,
    LoginComponent,
    SideBarComponent,
    MovieDisplayComponent,
    ChartsComponent,
    MovieCreateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    AuthGuard,
    AdminAuthGuard,
    AuthService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
