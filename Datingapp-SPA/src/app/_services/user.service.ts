import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})

export class UserService {

baseUrl = environment.apiUrl;
constructor(private httpclient: HttpClient) { }
getUsers(): Observable<User[]>{
  return this.httpclient.get<User[]>(this.baseUrl + 'user');
}
getUser(id): Observable<User>{
  return this.httpclient.get<User>(this.baseUrl + 'user/' + id);
}
updateUser(id: number,user:User){
  return this.httpclient.put(this.baseUrl + 'user/' + id, user);
}

}
