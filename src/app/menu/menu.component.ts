import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Urls } from '../constants/urls';
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router, private http: HttpClient, private location: Location) { }
  activeMenu!: string;
  u: any;
  user:any;
  ngOnInit() {
    this.user = localStorage.getItem('currentUser')
console.log(this.user)
    const url: string = this.location.path(); /*'https://www.example.com/path';*/
    console.log(this.location.path(), url)
    if(url.includes('login')){
      console.log(true)
    }else {console.log(false)}
    // const urlObj: URL = new URL(url);
    // console.log((urlObj.pathname).slice(1))
    // throw new Error('Method not implemented.');
    this.setActiveMenu((url).slice(1));
    this.u = localStorage.getItem('currentUser');
    this.u = JSON.parse(this.u)
  }

  logout() {
    this.u = localStorage.getItem('currentUser');
    this.u = JSON.parse(this.u)
    console.log(this.u)
    this.http.post<any>(`${Urls.LOGOUT}?access_token=${this.u?.id}`, { "access_token": this.u.id }).subscribe((res: any) => {
      console.log(res);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userName');
      this.router.navigate(['/login']);
      console.log("Logged out");
      window.location.reload()
    })

  }
  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
    console.log(this.activeMenu)
  }
}
