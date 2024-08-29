import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  toggleMovie: boolean = false;
  toggleRentals: boolean = false;
  toggleMetrics: boolean = false;

  constructor(private authService: AuthService) {
    
  }

  onCreateMovieClick() {
    this.toggleMovie = true;
    this.toggleRentals = false;
    this.toggleMetrics = false;
  }

  onRentalsClick() {
    this.toggleMovie = false;
    this.toggleRentals = true;
    this.toggleMetrics = false;
  }

  onMetricsClick() {
    this.toggleMovie = false;
    this.toggleRentals = false;
    this.toggleMetrics = true;
  }

  onLogoutClick() {
    this.authService.logout()
  }
}
