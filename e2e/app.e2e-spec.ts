import { NgParticlesPage } from './app.po';

describe('ng-particles App', () => {
  let page: NgParticlesPage;

  beforeEach(() => {
    page = new NgParticlesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dsk works!');
  });
});
