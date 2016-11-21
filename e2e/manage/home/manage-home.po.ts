import { browser, element, by } from 'protractor';
import { PageBase } from '../../core';

export class ManageHomePage extends PageBase {

  constructor() {
    super('/manage/home');
  }

  text() {
    return element(by.css('manage-home h2')).getText();
  }
}
