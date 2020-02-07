import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public loginservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginservice.login(this.model).subscribe(next => {
      this.alertify.success('successful login');
      console.log('successful login');
    }, error => {
      this.alertify.error(error);
    },
    ()=> {
      this.router.navigate(['/member']);
    });
  }
  logedin() {
    return this.loginservice.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('you successful log out');
    this.router.navigate(['/home']);
    console.log('loged out');
  }

}
