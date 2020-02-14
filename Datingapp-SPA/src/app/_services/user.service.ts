import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginationResult } from '../_models/Paginations';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class UserService {

baseUrl = environment.apiUrl;
constructor(private httpclient: HttpClient) { }
getUsers(page?, itemPerPage?): Observable<PaginationResult<User[]>> {
const paginationsResult: PaginationResult<User[]> = new  PaginationResult<User[]>();
let params = new HttpParams();
if (page != null && itemPerPage != null) {
  params = params.append('pageNumber', page);
  params = params.append('pageSize', itemPerPage);
}

console.log(itemPerPage);
return this.httpclient.get<User[]>(this.baseUrl + 'user', {
    observe: 'response', params
  }).pipe(
    map( response => {
      paginationsResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginationsResult.pagination = JSON.parse( response.headers.get('Pagination'));
      }
      return paginationsResult;
    })
  );
}
getUser(id): Observable<User> {
  return this.httpclient.get<User>(this.baseUrl + 'user/' + id);
}
updateUser(id: number, user: User) {
  return this.httpclient.put(this.baseUrl + 'user/' + id, user);
}

}
