import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Article } from "../article-service/Article";

@Component({
  selector: 'article-search',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./article-search.scss')],
  template: require('./article-search.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleSearchComponent {

  @Input() articles: Article [];


  /**
   * 筛选出符合要求的数据
   * @param keyword
   * @returns {Article[]}
   */
  filterArticles(keyword: string): Array<Article> {
    return this.articles.filter((article: Article) => {
      if (article.title.indexOf(keyword)) {
        console.log(`title  关键词是${keyword}, 文章标题是 ${article.title}`);
        return true;
      }
      let categories: string[] = article.categories;
      for (let category of categories) {
        console.log(category.indexOf(keyword));
        if (category.indexOf(keyword)) {
          console.log(`category  关键词是${keyword}, 分类是 ${category}`);
          return true;
        }
      }
    });
  }
}
