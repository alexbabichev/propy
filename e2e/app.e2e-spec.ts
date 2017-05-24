import { PropyPage } from './app.po';

describe('propy App', () => {
  let page: PropyPage;

  beforeEach(() => {
    page = new PropyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
