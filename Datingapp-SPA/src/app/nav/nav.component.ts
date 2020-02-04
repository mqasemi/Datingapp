import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private loginservice: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.loginservice.login(this.model).subscribe(next => {
      console.log('successful login');
    },
    erro => {
        console.log('falid to login');
        console.log(erro);
    });
  }
  logedin() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    console.log('loged out');
  }

}
