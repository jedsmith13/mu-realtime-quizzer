import { QuizzerPage } from './app.po';

describe('quizzer App', () => {
  let page: QuizzerPage;

  beforeEach(() => {
    page = new QuizzerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
