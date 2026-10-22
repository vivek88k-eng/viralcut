import {
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits implements AfterViewInit, OnDestroy {
  private video?: HTMLVideoElement;
  private carousel?: HTMLElement;
  private clockFace?: HTMLElement;
  private isBrowser: boolean;

  private carouselStartX = 0;
  private carouselStartRotation = 0;
  private carouselRotation = 0;

  private rotationTimer?: ReturnType<typeof setInterval>;
  private clockTimer?: ReturnType<typeof setInterval>;

  private carouselTransitionHandler?: (event: TransitionEvent) => void;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.refreshClockElement();
    this.updateClock();

    this.clockTimer = setInterval(() => {
      this.updateClock();
    }, 1000);

    this.video = document.querySelector(
      '.video-card video'
    ) as HTMLVideoElement | null ?? undefined;

    if (this.video) {
      this.video.muted = true;
      this.video.defaultMuted = true;
      this.video.volume = 0;
    }

    this.refreshCarouselElement();

    if (!this.carousel) {
      console.error('Creator carousel ring not found');
      return;
    }

    this.attachCarouselDragEvents();
    this.startCarouselRotation();
  }

  private refreshClockElement(): void {
    if (!this.clockFace?.isConnected) {
      this.clockFace = document.querySelector(
        '.clock-face'
      ) as HTMLElement | null ?? undefined;
    }
  }

  private updateClock(): void {
    this.refreshClockElement();

    if (!this.clockFace) return;

    const now = new Date();

    const seconds =
      now.getSeconds() + now.getMilliseconds() / 1000;

    const minutes = now.getMinutes() + seconds / 60;

    const hours =
      (now.getHours() % 12) + minutes / 60;

    const hourHand = this.clockFace.querySelector(
      '.clock-hand-hour'
    ) as HTMLElement | null;

    const minuteHand = this.clockFace.querySelector(
      '.clock-hand-minute'
    ) as HTMLElement | null;

    const secondHand = this.clockFace.querySelector(
      '.clock-hand-second'
    ) as HTMLElement | null;

    if (hourHand) {
      hourHand.style.transform =
        `translateX(-50%) rotate(${hours * 30}deg)`;
    }

    if (minuteHand) {
      minuteHand.style.transform =
        `translateX(-50%) rotate(${minutes * 6}deg)`;
    }

    if (secondHand) {
      secondHand.style.transform =
        `translateX(-50%) rotate(${seconds * 6}deg)`;
    }
  }

  private refreshCarouselElement(): void {
    if (!this.carousel?.isConnected) {
      this.carousel = document.querySelector(
        '.creators-card .creator-carousel-ring'
      ) as HTMLElement | null ?? undefined;
    }
  }

  private attachCarouselDragEvents(): void {
  this.refreshCarouselElement();

  if (!this.carousel) return;

  this.carousel.style.cursor = 'grab';
  this.carousel.style.touchAction = 'pan-y';

  this.carousel.addEventListener(
    'pointerdown',
    this.onCarouselPointerDown
  );

  this.carousel.addEventListener(
    'pointermove',
    this.onCarouselPointerMove
  );

  this.carousel.addEventListener(
    'pointerup',
    this.onCarouselPointerUp
  );

  this.carousel.addEventListener(
    'pointercancel',
    this.onCarouselPointerUp
  );
}
  private startCarouselRotation(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }

    this.updateCarouselTransform();

    this.rotationTimer = setInterval(() => {
      this.carouselRotation += 0.3;
      this.updateCarouselTransform();
    }, 30);
  }

  private updateCarouselTransform(): void {
    this.refreshCarouselElement();

    if (this.carousel) {
      this.carousel.style.transform =
        `rotateY(${this.carouselRotation}deg)`;
    }
  }

  private onCarouselPointerDown = (
    event: PointerEvent
  ): void => {
    this.refreshCarouselElement();

    if (!this.carousel) return;

    this.carouselStartX = event.clientX;
    this.carouselStartRotation = this.carouselRotation;

    this.carousel.setPointerCapture(event.pointerId);
  };

  private onCarouselPointerMove = (
    event: PointerEvent
  ): void => {
    if (
      !this.carousel?.isConnected ||
      !this.carousel.hasPointerCapture(event.pointerId)
    ) {
      return;
    }

    this.carouselRotation =
      this.carouselStartRotation +
      (event.clientX - this.carouselStartX) * 0.8;

    this.updateCarouselTransform();
  };

  private onCarouselPointerUp = (
    event: PointerEvent
  ): void => {
    if (this.carousel?.hasPointerCapture(event.pointerId)) {
      this.carousel.releasePointerCapture(event.pointerId);
    }
  };

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = undefined;
    }

    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = undefined;
    }

    if (this.carousel) {
      this.carousel.removeEventListener(
        'pointerdown',
        this.onCarouselPointerDown
      );

      this.carousel.removeEventListener(
        'pointermove',
        this.onCarouselPointerMove
      );

      this.carousel.removeEventListener(
        'pointerup',
        this.onCarouselPointerUp
      );

      this.carousel.removeEventListener(
        'pointercancel',
        this.onCarouselPointerUp
      );

      if (this.carouselTransitionHandler) {
        this.carousel.removeEventListener(
          'transitionend',
          this.carouselTransitionHandler
        );
      }
    }

    this.video = undefined;
    this.carousel = undefined;
    this.clockFace = undefined;
  }
}