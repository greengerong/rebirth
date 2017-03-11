import { browser, element, by } from 'protractor';
import { PageBase } from '../../core';
import { Article } from '../../core/article';

export class RebirthAboutPage extends PageBase {

  constructor() {
    super('/blog/about');
  }

  getArticleItem(): Article {
    const elm = element(by.tagName('article-item'));

    return <Article>{
      title: elm.element(by.className('article-title')).getText(),
      author: elm.element(by.className('article-author')).getText(),
      date: elm.element(by.className('article-date')).getText(),
      tags: elm.all(by.className('article-tag-list-item'))
        .map(tag => tag.getText())
    };
  }
}
