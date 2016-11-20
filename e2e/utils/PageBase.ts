import { browser } from 'protractor';

export class PageBase {

  constructor(private url: string) {

  }

  getTitle() {
    return browser.getTitle();
  }


  navigateTo() {
    return browser.get(this.url);
  }
}
