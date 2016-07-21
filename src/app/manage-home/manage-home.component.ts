import { Component } from '@angular/core';
import { RebirthRoleDirective } from '../permissions';
@Component({
  selector: 'manage-home',
  pipes: [],
  providers: [],
  directives: [RebirthRoleDirective],
  styles: [
    require('./manage-home.scss')
  ],
  template: require('./manage-home.html')
})
export class ManageHomeComponent {

}
