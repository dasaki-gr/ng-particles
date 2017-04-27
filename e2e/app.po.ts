import { browser, element, by } from 'protractor';

export class NgParticlesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dsk-root h1')).getText();
  }
}
