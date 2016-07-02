import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { DropdownDirective } from '../dropdown';

@Component({
  selector: 'blog-navbar',
  providers: [],
  directives: [DropdownDirective, RouterLinkActive],
  pipes: [],
  styles: [require('./blog-navbar.scss')],
  template: require('./blog-navbar.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogNavbarComponent {
  private showNavBar: boolean;

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
