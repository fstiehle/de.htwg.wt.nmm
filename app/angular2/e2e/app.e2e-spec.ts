import { NmmPage } from './app.po';

describe('nmm App', function() {
  let page: NmmPage;

  beforeEach(() => {
    page = new NmmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
