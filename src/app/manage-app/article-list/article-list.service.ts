import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArticleService, Article, SearchResult } from '../../blog-app/article-service';
import config from 'config';

@Injectable()
export class ArticleListService {

	constructor(private _ser: ArticleService){
	}

	getItems(pageIndex:number): Observable<SearchResult<Article>> {
		return this._ser.getArticles(pageIndex, config.article.pageSize);
	}

}