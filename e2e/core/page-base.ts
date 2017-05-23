import { browser } from 'protractor';

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

  clearSession(): Promise<any> {
    return browser.executeScript('window.localStorage.clear();window.sessionStorage.clear();');
  }
}
