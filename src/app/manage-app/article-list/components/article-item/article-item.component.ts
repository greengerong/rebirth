import {Component,Input} from '@angular/core';
import {Article} from '../../../../blog-app/article-service';

@Component({
	selector: 'article-item',
	styles: [require('./article-item.scss')],
	template: require('./article-item.html')
})
export class ArticleItemComponent {
	
@Input() item:Article = {};


	constructor(){

	}

	ngOnInit(): void {

	}

	onDelete(){

	}

	onEdit(){

	}

}
