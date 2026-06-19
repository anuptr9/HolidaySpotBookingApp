import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl:any= environment.baseURL;
  user:any;
  constructor(private http:HttpClient) { }

  //adds the user to fake jsonserver
  getUser(){
    return this.http.get(this.baseUrl);
  }
  addUser(data:any){
    return this.http.post(this.baseUrl,data);
  }

//use this url for registration module of spring booot
doRegistration(){
  return this.http.post("http://localhost:9081/registration",this.user,{responseType:'text' as 'json'});
}

getUserList():Observable<User[]>{
  return this.http.get<User[]>(`${this.baseUrl}`);
}
}