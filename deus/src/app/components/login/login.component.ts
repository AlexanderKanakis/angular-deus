import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/api/auth/auth.service';
import { CustomTokenObjectPair } from '../../models/CustomtokenObjectPair';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginObj: CustomTokenObjectPair = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {

  }

  async onLogin(){
    await this.authService.login(this.loginObj);
  }

}
