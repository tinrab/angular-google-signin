import { AngularGoogleSigninPage } from './app.po';

describe('angular-google-signin App', () => {
  let page: AngularGoogleSigninPage;

  beforeEach(() => {
    page = new AngularGoogleSigninPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
