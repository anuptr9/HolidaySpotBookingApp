import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  getAllLocation: any;

  constructor(private http : HttpClient) { }

  postLocation(data : any) {
    return this.http.post<any>("http://localhost:8081/api/v1/post", data)
    .pipe(map((res:any)=>{
      return res;
    }))   
  }
  getLocation(){
    return this.http.get<any>("http://localhost:8081/api/v1/get")
    .pipe(map((res:any)=>{
      return res;
    }))    
  }
  updateLocation(data :any, id: number){
    return this.http.put<any>("http://localhost:8081/api/v1/put/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))    
  }
  deleteLocation(id : number){
    return this.http.delete<any>("http://localhost:8081/api/v1/delete/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))    
  }

}

