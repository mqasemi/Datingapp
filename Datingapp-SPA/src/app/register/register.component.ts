import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Input() values: any;
  @Output() cancelEvent = new EventEmitter<any>();
  constructor(private authService: AuthService, private alertify: AlertifyService ) { }

  ngOnInit() {
  }
  register() {
    this.alertify.confirm('are you sure register ??', () => {
      this.authService.register(this.model).subscribe(next => {
        console.log('user created successfully');
        this.alertify.success('user created successfuly');
       }, error => {
        this.alertify.error(error);
       }
        );
    });
  }
  cancel() {
    this.cancelEvent.emit(this.model);

  }

}
