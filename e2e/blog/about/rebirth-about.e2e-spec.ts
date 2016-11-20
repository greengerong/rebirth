import { RebirthAboutPage } from './rebirth-about.po';

describe('rebirth about page', function () {
  let page: RebirthAboutPage;

  beforeEach(() => {
    page = new RebirthAboutPage();
    page.navigateTo();
  });

  it('should display question articles', () => {
    let article = page.getArticleItem();

    expect(article.title).toEqual('破狼简介');
    expect(article.author).toEqual('破狼');
    expect(article.date).not.toBeUndefined();
  });
});
