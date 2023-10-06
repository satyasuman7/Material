import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='http://localhost:3000/users';
  staffUrl='http://localhost:3000/role';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.apiurl);
  }
  getDataDetails(data:any){
    return this.http.get(this.apiurl + '/' + data);
  }

  getDataRole(){
    return this.http.get(this.staffUrl);
  }

  proceedRegister(inputdata: any){
    return this.http.post(this.apiurl, inputdata);
  }

  updateUser(data:any,inputdata: any){
    return this.http.put(this.apiurl + '/' + data, inputdata);
  }

  IsloggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  GetUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }
}
