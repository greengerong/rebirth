import { browser, element, by } from 'protractor';
import { PageBase } from '../../core';

export class ManageLoginPage extends PageBase {

  constructor() {
    super('/manage/login');
  }

  email(email: string): this {
    element(by.id('email')).sendKeys(email);
    return this;
  }

  password(password: string): this {
    element(by.id('password')).sendKeys(password);
    return this;
  }

  login(): this {
    this.loginButton().submit();
    return this;
  }

  canLogin() {
    return this.loginButton().isEnabled();
  }

  private loginButton() {
    return element(by.tagName('button'));
  }

}
