import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor( private userService: UserService, private alertify: AlertifyService,private routeService: Router) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('to fetch user data error occured');
                this.routeService.navigate(['/member']);
                return of(null);
            })
        );
    }
    
}