import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-advertise',
  standalone: false,
  templateUrl: './advertise.html',
  styleUrl: './advertise.scss',
})
export class Advertise {
  @Input() ads = [
    {
      title: 'Angular Course',
      description: 'Master Angular from beginner to advanced.',
      imageUrl: 'https://via.placeholder.com/400x200',
      link: 'https://example.com/angular-course'
    },
  ]

  private video: HTMLVideoElement | null = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {

    this.video = document.querySelector('.hero-video');

    if (!this.video) {
      return;
    }

    /* =========================
       Pause when tab changes
    ========================= */

    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );


    /* =========================
       Detect scrolling
    ========================= */

    this.observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            // Ad is visible
            this.video!.muted = false;

            this.video!.play().catch(() => {
              // Browser may block unmuted autoplay
              this.video!.muted = true;
              this.video!.play().catch(() => { });
            });

          } else {

            // User scrolled away from the ad
            this.video!.pause();
            this.video!.muted = true;

          }

        });

      },
      {
        threshold: 0.3
      }
    );

    this.observer.observe(this.video);
  }


  /* =========================
     Browser Tab Change
  ========================= */

  handleVisibilityChange = (): void => {

    if (!this.video) {
      return;
    }

    if (document.hidden) {

      // User changed tab
      this.video.pause();
      this.video.muted = true;

    } else {

      // User returned to tab
      this.video.muted = false;

      this.video.play().catch(() => {
        this.video!.muted = true;
        this.video!.play().catch(() => { });
      });

    }
  };


  /* =========================
     Cleanup
  ========================= */

  ngOnDestroy(): void {

    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );

    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
}
