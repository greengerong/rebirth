import { browser } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class PageBase {

  constructor(private url: string) {

  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    return browser.getTitle();
  }


  navigateTo() {
    return browser.get(this.url);
  }

  clearSession(): wdpromise.Promise<any> {
    return browser.executeScript('window.localStorage.clear();window.sessionStorage.clear();');
  }
}
