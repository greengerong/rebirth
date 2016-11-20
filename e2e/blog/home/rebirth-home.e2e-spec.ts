import { RebirthHomePage } from './rebirth-home.po';
import { Article } from '../../core/article';

describe('rebirth home page', function () {
  let page: RebirthHomePage;

  beforeEach(() => {
    page = new RebirthHomePage();
    page.navigateTo();
  });

  it('should navigate to home page', () => {
    expect(page.getTitle()).toEqual('破狼博客');
  });

  it('should display blog logo', () => {
    expect(page.getLogo()).toEqual('破狼博客');
  });

  it('should display blog menus', () => {
    let navs = page.getNavs();
    expect(navs).toContain('文章');
    expect(navs).toContain('站内资源');
    expect(navs).toContain('关于我');
  });

  it('should display blog site resources', () => {
    let allNavs = page.getNavsWithSiteResource();

    expect(allNavs).toContain('文章');
    expect(allNavs).toContain('站内资源|相关资源|我要提问|著作与翻译|Angularjs深度剖析与最佳实践');
    expect(allNavs).toContain('关于我');
    expect(allNavs).toContain('我要提问');
    expect(allNavs).toContain('Angularjs深度剖析与最佳实践');
  });

  it('should display blog articles', () => {
    let articles = page.getArticleItems();

    articles.then((article: Article[]) => {
      expect(article.length).toBeGreaterThan(0);
      expect(article[0].title).toEqual('Zone.js - 暴力之美(Page 1)');
      expect(article[0].author).toEqual('破狼');
      expect(article[0].date).not.toBeUndefined();
      expect((article[0].tags).length).toBeGreaterThan(0);
    });

  });

});
