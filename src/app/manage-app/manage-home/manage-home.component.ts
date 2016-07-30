import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AUTH_ROLE_PERMISSIONS_DIRECTIVE } from 'rebirth-permission';

@Component({
  selector: 'manage-home',
  pipes: [],
  providers: [],
  directives: [...AUTH_ROLE_PERMISSIONS_DIRECTIVE],
  styles: [
    require('./manage-home.scss')
  ],
  template: require('./manage-home.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageHomeComponent {

}
