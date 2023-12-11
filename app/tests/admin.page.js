import { Selector } from 'testcafe';

class AdminPage {
  constructor() {
    this.pageId = '#list-recipe-admin-page';
    this.editButtonId = '#admin-edit-button';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoAdminEdit(testController) {
    await testController.click('#admin-edit-button');
  }

  async gotoAdminEditSubmit(testController) {
    await testController.click('[type="submit"]');
  }

  async editRecipeName(testController, recipeTestName) {
    await testController.typeText('#admin-submit-button-0000', recipeTestName);
    await testController.wait(1000);
  }

  async gotoAdminRemove(testController) {
    await testController.click('#admin-remove-button');
  }

  async gotoAdminRemoveOK(testController) {
    await testController.click('#admin-remove-ok');
  }

  async editIsDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async typeInSearch(testController, recipeName) {
    await this.isDisplayed(testController);
    await testController.typeText('#admin-searchbar', recipeName);
    await testController.wait(1000);
  }

  async assertRecipeName(testController, expectedRecipeName) {
    const recipeNameElement = Selector('#admin-recipe-name').withText(expectedRecipeName);
    await testController.expect(recipeNameElement.exists).ok();
  }
}

export const adminPage = new AdminPage();
