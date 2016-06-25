import { Component } from '@angular/core';
import {ArticleList} from '../article-list';

@Component({
  selector: 'home',
  providers: [],
  directives: [ArticleList],
  pipes: [],
  styles: [require('./home.scss')],
  template: require('./home.html')
})
export class Home {

}
