import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'manage-home',
  styles: [
    require('./manage-home.scss')
  ],
  template: require('./manage-home.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageHomeComponent {

}
