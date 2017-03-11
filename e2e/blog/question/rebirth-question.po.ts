import { browser, element, by } from 'protractor';
import { PageBase } from '../../core';
import { Article } from '../../core/article';

export class RebirthQuestionPage extends PageBase {

  constructor() {
    super('/blog/question');
  }

  getArticleItem(): Article {
    const elm = element(by.className('smart-question'));

    return <Article>{
      title: elm.element(by.className('article-title')).getText()
    };
  }
}
