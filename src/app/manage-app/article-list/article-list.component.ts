import {Component} from "@angular/core";
import {ArticleItemComponent} from "./components/article-item";
import {ArticleListService} from "./article-list.service";
import {ArticleService, Article, SearchResult} from '../../blog-app/article-service';

@Component({
	selector: 'article-list',
	template: require('./article-list.html'),
	styles: [require('./article-list.scss')],
	directives: [ArticleItemComponent],
	providers:[ArticleService, ArticleListService]
})
export class ArticleListComponent {
	items: Array<Article> = new Array<Article>();
	total:number = 0;
	currentPage: number = 0;

	constructor(private _ser:ArticleListService){
	}


	ngOnInit(){
		this._updateData(1);
	}

	private _updateData(pageIndex:number){
			this._ser.getItems(pageIndex).subscribe((result)=>{
			this.items = result.result;
			this.total = result.total;
			this.currentPage = result.pageIndex;
		})
	}

 
}