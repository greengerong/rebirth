import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';
import { Article } from '../../shared';

@Component({
  selector: 'about',
  styleUrls: [],
  templateUrl: './about.html'
})
export class AboutComponent implements OnInit {
  private article: Article;

  constructor(private aboutService: AboutService) {

  }

  ngOnInit() {
    this.aboutService.getArticle()
      .subscribe(result => this.article = result);
  }
}
