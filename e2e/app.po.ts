import { browser, element, by } from 'protractor';

export class RebirthPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('title')).getText();
  }
}
