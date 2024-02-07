import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternetSpeedService {
  private speedSubject: Subject<number> = new Subject<number>();

  constructor() {
    this.calculateInternetSpeed();
  }

  getSpeed(): Observable<number> {
    return this.speedSubject.asObservable();
  }

  private calculateInternetSpeed(): void {
    const image = new Image();
    const startTime = Date.now();

    image.onload = () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      const speed = this.calculateSpeed(duration);

      this.speedSubject.next(speed);
    };

    image.onerror = () => {
      this.speedSubject.next(-1);
    };

    // Replace the URL with a URL to an image on a remote server
    image.src = 'https://e0.pxfuel.com/wallpapers/807/505/desktop-wallpaper-1mb.jpg';
  }

  private calculateSpeed(duration: number): number {
    // Calculate speed based on the duration
    // For example, if you want to calculate the speed in Mbps:
    const fileSizeInBits = 1024 * 1024 * 8; // Assuming a 1 MB image file
    const durationInSeconds = duration / 1000;
    const speedInMbps = fileSizeInBits / durationInSeconds / (1024 * 1024);

    return speedInMbps;
  }
}