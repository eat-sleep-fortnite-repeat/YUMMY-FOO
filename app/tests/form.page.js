import { Selector } from 'testcafe';

class FormPage {
  async addRecipeName(testController, recipeTestName) {
    await testController.click('#add-recipe-name');
    await testController.typeText('#add-recipe-name', recipeTestName);
  }

  async addRecipeTime(testController, recipeTestTime) {
    await testController.click('#add-recipe-time');
    await testController.typeText('#add-recipe-time', recipeTestTime);
  }

  async addRecipeCost(testController, recipeTestCost) {
    await testController.click('#add-recipe-cost');
    await testController.typeText('#add-recipe-cost', recipeTestCost);
  }

  async addRecipeFilter(testController, recipeTestFilter) {
    await testController.click('#add-recipe-filter');
    await testController.typeText('#add-recipe-filter', recipeTestFilter);
  }

  async addRecipeDirections(testController, recipeTestDirections) {
    await testController.click('#add-recipe-directions');
    await testController.typeText('#add-recipe-directions', recipeTestDirections);
  }

  async addRecipeIngredients(testController, recipeTestIngredients) {
    await testController.click('#add-recipe-ingredients');
    await testController.typeText('#add-recipe-ingredients', recipeTestIngredients);
  }

  async addRecipeAppliances(testController, recipeTestAppliances) {
    await testController.click('#add-recipe-appliances');
    await testController.typeText('#add-recipe-appliances', recipeTestAppliances);
  }

  async addRecipeLink(testController, recipeTestLink) {
    await testController.click('#add-recipe-link');
    await testController.typeText('#add-recipe-link', recipeTestLink);
  }

  async addRecipeDietary(testController) {
    const dairyFreeCheckbox = Selector('[data-testid=dietary-checkbox-dairy-free]');
    const vegetarianCheckbox = Selector('[data-testid=dietary-checkbox-vegetarian]');
    await testController.click(dairyFreeCheckbox());
    await testController.expect(dairyFreeCheckbox.checked).ok();
    await testController.click(vegetarianCheckbox());
    await testController.expect(vegetarianCheckbox.checked).ok();
  }

  async addRecipeSubmit(testController) {
    const errorsField = Selector('#add-recipe-error');
    await testController.click('#add-recipe-submit');
    await testController.expect(errorsField.exists).notOk();
  }
}

export const formPage = new FormPage();
