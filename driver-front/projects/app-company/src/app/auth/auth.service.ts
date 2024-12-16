import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { Platform } from '@ionic/angular';
const TOKEN_KEY ='auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base_path = 'http://localhost:3000';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private plt: Platform, private  httpClient:  HttpClient, private storage: Storage) { 
    this.plt.ready().then( ()=>{})
  }

  login(user: User): Observable<AuthResponse> {
    console.log(user);
    return this.httpClient.post(`${this.base_path}/userCompany`, user).pipe(
      tap(async (res: AuthResponse) => {
        console.log(res);
        console.log(this.storage);
        if (res.user) {
          console.log(res.user);
          console.log(this.storage);
          this.storage.clear();
          await this.storage.set("access_token", res.user.access_token);
          await this.storage.set("expires_in", res.user.expires_in);
          await this.storage.set("remember" , res.user.remember);
          await this.storage.set("firstname" , res.user.firstname);
          await this.storage.set("lastname" , res.user.lastname);
          await this.storage.set("email" , res.user.email);
          await this.storage.set("Company" , res.user.email);
          await this.storage.set("id" , res.user.id);
          this.authSubject.next(true);}

      })
    );
    }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
  
}
