import { Component } from '@angular/core';
import { ArticleListComponent } from '../article-list';

@Component({
  selector: 'home',
  providers: [],
  directives: [ArticleListComponent],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class HomeComponent {

}
