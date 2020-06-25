import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlApi: string;

  constructor(private http: HttpClient) { 
    this.urlApi = environment.urlApi + '/users';
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  createUser(User: Object): Observable<Object> {
    return this.http.post(`${this.urlApi}`, User);
  }

  updateUser(value: any): Observable<Object> {
    return this.http.put(`${this.urlApi}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`, { responseType: 'text' });
  }

  getUsersPage(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    if (sortBy && sortBy.trim() != '') {
      params = params.append("sortBy", sortBy);
    }

    if (sortType && sortType.trim() === 'desc') {
      params = params.append("sortAscending", "false");
    }

    return this.http.get(`${this.urlApi}`, {
      params:params
    });
  }

}
