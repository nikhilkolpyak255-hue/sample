import { Service } from '@angular/core';
import { environment } from './environment/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebClientService {
    private readonly base_url = 'http://localhost:8080/products';
    private username:any;
    private password:any;
    constructor(private http: HttpClient) { }
    
  // public getdata(url: String): Observable<any> {
  //   return this.http.get<any>(`${this.base_url}${url}`);
  // }

 getdata():Observable<any>{
    return this.http.get(this.base_url);
  }
}
