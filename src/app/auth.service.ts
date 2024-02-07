import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Urls } from './constants/urls';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    // const payload = { username, password };
    return this.http.post<any>(`${Urls.LOGIN}`, { email, password, returnSecureToken: true })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.http.get(`${Urls.USERS}/${user.userId}?access_token=${user.id}`).subscribe(res => {
          let data: any = res;
          console.log(res);
          localStorage.setItem("userName", data.username);
        });
        // console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.id) {
          this.isLoggedIn = true;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.router.navigate(['/home']);
        // this.router.navigate(['/tabs/customerlist']);
        return user;
      }));
    // Simulate an API call for authentication
    if (email === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      // Perform routing to the desired route after successful login
      this.router.navigate(['/home']);
      return of(true); // Return an observable of true for successful login
    } else {
      this.isLoggedIn = false;
      return of(false); // Return an observable of false for failed login
    }
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }
}
