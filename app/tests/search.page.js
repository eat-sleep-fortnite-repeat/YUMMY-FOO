import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#search-page';
    this.favButton = '#fav-button';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  // Favorites the first recipe shown
  async clickFavButton(testController) {
    await testController.click('#fav-button');
  }

  // Favorites a recipe at a specific index (can't get to work)
  async clickFavButtonAtIndex(testController, index) {
    const recipeCard = Selector('.recipe-card').nth(index);
    const favButton = recipeCard.find(this.favButton);
    await testController.expect(recipeCard.exists).ok({ timeout: 10000 });
    await testController.expect(favButton.exists).ok({ timeout: 5000 });
    await testController.click(favButton);
  }

  async typeInSearch(testController, recipeName) {
    await this.isDisplayed(testController);
    await testController.typeText('#searchbar', recipeName);
    await testController.wait(1000);
  }

  async assertRecipeName(testController, expectedRecipeName) {
    const recipeNameElement = Selector('#recipe-name').withText(expectedRecipeName);
    await testController.expect(recipeNameElement.exists).ok();
  }

}

export const searchPage = new SearchPage();
