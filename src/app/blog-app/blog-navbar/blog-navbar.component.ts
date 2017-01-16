import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'blog-navbar',
  styleUrls: ['./blog-navbar.scss'],
  templateUrl: './blog-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogNavbarComponent {
  showNavBar: boolean;

  toggleNavBarState($event: Event) {
    $event.stopPropagation();
    this.showNavBar = !this.showNavBar;
  }

  hideNavBar($event: Event) {
    /* tslint:disable */
    $event && $event.stopPropagation();
    /* tslint:enable */
    this.showNavBar = false;
  }
}
