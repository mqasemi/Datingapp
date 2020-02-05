import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public loginservice: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.loginservice.login(this.model).subscribe(next => {
      this.alertify.success('successful login');
      console.log('successful login');
    }, error => {
      this.alertify.error(error);
    });
  }
  logedin() {
    return this.loginservice.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('you successful log out');
    console.log('loged out');
  }

}
