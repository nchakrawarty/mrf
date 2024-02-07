import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';

@Component({
  selector: 'app-panchayat',
  templateUrl: './panchayat.component.html',
  styleUrls: ['./panchayat.component.scss']
})
export class PanchayatComponent implements OnInit {

  constructor(private http: HttpClient) { }
  wList: any;
  ngOnInit(): void {
    this.http.get(`${Urls.WLIST}`).subscribe((res: any) => {
      this.wList = res;
      console.log(res)

    })
  }

}
