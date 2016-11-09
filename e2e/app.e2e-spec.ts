import { RebirthPage } from './app.po';

describe('rebirth App', function() {
  let page: RebirthPage;

  beforeEach(() => {
    page = new RebirthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
