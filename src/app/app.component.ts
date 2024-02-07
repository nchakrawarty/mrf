import { Component } from '@angular/core';
import { InternetSpeedService } from './internet-speed.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mrf';
  constructor(private internetSpeedService: InternetSpeedService) { }
  ngOnInit(): void {
    // element.requestFullScreen()
  }


  logout() {
    console.log("lg out")
  }
}
