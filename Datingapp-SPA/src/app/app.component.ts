import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/Auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Datingapp-SPA';
  jwtHelper = new JwtHelperService();
  constructor(public authservice: AuthService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token ) {
      this.authservice.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.jwtHelper.decodeToken(token));
    }

  }
}
