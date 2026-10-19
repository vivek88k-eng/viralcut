import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits implements AfterViewInit, OnDestroy {
  private video?: HTMLVideoElement;

  ngAfterViewInit(): void {
    this.video = document.querySelector(
      '.video-card video'
    ) as HTMLVideoElement | null ?? undefined;

    if (this.video) {
      this.video.muted = true;
      this.video.defaultMuted = true;
      this.video.volume = 0;
    }
  }

  ngOnDestroy(): void {
    this.video = undefined;
  }
}