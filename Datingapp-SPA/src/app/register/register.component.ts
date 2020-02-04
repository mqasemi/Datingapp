import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../_services/Auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Input() values: any;
  @Output() cancelEvent = new EventEmitter<any>();
  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(next => {
      console.log(next);
      console.log('user created successfully'); },
      error => {
        console.log('user registration failed');
        alert(error.error);
      });
  }
  cancel() {
    this.cancelEvent.emit(this.model);
    console.log('cancelled');
  }

}
