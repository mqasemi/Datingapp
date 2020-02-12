import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from '../_services/Auth.service';
@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor( private userService: UserService, private alertify: AlertifyService,private routeService: Router,
         private authservice: AuthService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authservice.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('to fetch user data error occured');
                this.routeService.navigate(['/member']);
                return of(null);
            })
        );
    }
    
}