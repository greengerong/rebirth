import { RebirthQuestionPage } from './rebirth-question.po';

describe('rebirth question page', function () {
  let page: RebirthQuestionPage;

  beforeEach(() => {
    page = new RebirthQuestionPage();
    page.navigateTo();
  });

  it('should display question articles', () => {
    let article = page.getArticleItem();

    expect(article.title).toEqual('提问的智慧');
  });
});
