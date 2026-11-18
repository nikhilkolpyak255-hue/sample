import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Farmer-connect');
   constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        setTimeout(() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          window.scrollTo(0, 0);
        }, 0);

      });
  }
}
