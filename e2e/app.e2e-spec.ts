import { RebirthPage } from './app.po';

describe('rebirth App', function () {
  let page: RebirthPage;

  beforeEach(() => {
    page = new RebirthPage();
  });

  it('should navigate to home page', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('破狼博客');
  });
});
