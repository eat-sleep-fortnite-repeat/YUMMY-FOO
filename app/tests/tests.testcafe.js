import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { aboutPage } from './about.page';
import { favoritesPage } from './favorites.page';
import { adminPage } from './admin.page';
import { addRecipePage } from './addrecipe.page';
import { searchPage } from './search.page';
import { formPage } from './form.page';

/* global fixture:false, test:false  */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db').page('localhost:3000');

// fixture('meteor-application-template-react localhost test with default db').page('127.0.0.1:3000');

test('Test that landing page shows up', async (testController) => {
  await testController.wait(5000);
  await navBar.gotoLandingPage(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the about page shows', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAboutPage(testController);
  await aboutPage.isDisplayed(testController);
});

test('Test that the favorite page shows', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.isDisplayed(testController);
});

test('Test that recipes show on favorites page when favorited', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.assertRecipeNameNOT(testController, 'Lemon Garlic Shrimp');
  await favoritesPage.assertRecipeNameNOT(testController, 'Homemade Pizza');
  // Go to the search page and favorite the first recipe
  await navBar.gotoSearchPage(testController);
  await searchPage.clickFavButton(testController);
  await searchPage.typeInSearch(testController, 'Lemon Garlic Shrimp');
  await searchPage.clickFavButton(testController);

  // Go back to the favorites page and check if there is now 1 recipe
  await navBar.gotoFavoritesPage(testController);
  await testController.wait(1000);
  await favoritesPage.assertRecipeNameOK(testController, 'Lemon Garlic Shrimp');
  await favoritesPage.assertRecipeNameOK(testController, 'Homemade Pizza');
});

test('Test that users favorite are unique to them', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.assertRecipeNameNOT(testController, 'Lemon Garlic Shrimp');
  await favoritesPage.assertRecipeNameNOT(testController, 'Homemade Pizza');
  // Go to the search page and favorite the first recipe
  await navBar.gotoSearchPage(testController);
  await searchPage.typeInSearch(testController, 'Lemon Garlic Shrimp');
  await searchPage.clickFavButton(testController);

  // Go back to the favorites page and check if there is now 1 recipe
  await navBar.gotoFavoritesPage(testController);
  await testController.wait(1000);
  await favoritesPage.assertRecipeNameOK(testController, 'Lemon Garlic Shrimp');
});

test('Test that removes recipes from favorites', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  // Go to favorites page and remove recipes from admin
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.assertRecipeNameOK(testController, 'Lemon Garlic Shrimp');
  await searchPage.clickFavButton(testController);
  await testController.wait(1000);
  await favoritesPage.assertRecipeNameNOT(testController, 'Lemon Garlic Shrimp');

  // Log out and into the other account
  await navBar.logout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.assertRecipeNameOK(testController, 'Lemon Garlic Shrimp');
  await favoritesPage.assertRecipeNameOK(testController, 'Homemade Pizza');

  // Go to favorites & search page and remove recipes from john
  await navBar.gotoSearchPage(testController);
  await searchPage.clickFavButton(testController);
  await testController.wait(1000);
  await navBar.gotoFavoritesPage(testController);
  await favoritesPage.assertRecipeNameOK(testController, 'Lemon Garlic Shrimp');
  await favoritesPage.assertRecipeNameNOT(testController, 'Homemade Pizza');
  await testController.wait(1000);
  await searchPage.clickFavButton(testController);
  await favoritesPage.assertRecipeNameNOT(testController, 'Lemon Garlic Shrimp');
  await favoritesPage.assertRecipeNameNOT(testController, 'Homemade Pizza');

});

test('Test that the add recipe page shows', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddRecipePage(testController);
  await addRecipePage.isDisplayed(testController);
});

test('Test that the search page shows', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
});

test('Test that recipes can be searched for', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoSearchPage(testController);
  await searchPage.typeInSearch(testController, 'Lemon Garlic Shrimp');
  await testController.wait(1000);
  await searchPage.assertRecipeName(testController, 'Lemon Garlic Shrimp');
});

test('Test that the admin page shows', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoAdminPage(testController);

  // Wait for the admin page to be displayed, with a timeout of 15 seconds
  await testController.expect(adminPage.pageSelector.exists).ok({ timeout: 15000 });
});

test('Test that recipes can be edited', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoAdminPage(testController);
  await adminPage.typeInSearch(testController, 'Crepes');
  await adminPage.gotoAdminEdit(testController);
  await adminPage.editIsDisplayed(testController);
  await adminPage.editRecipeName(testController, ' Test');
  // const textBoxSelector = Selector('#uniforms-0002-0000');
  // await t.click(textBoxSelector);
  await adminPage.gotoAdminEditSubmit(testController);
  await adminPage.assertRecipeName(testController, 'Crepes Test');
});

test('Test that recipes can be removed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoAdminPage(testController);
  await adminPage.gotoAdminRemove(testController);
  // const textBoxSelector = Selector('#uniforms-0002-0000');
  // await t.click(textBoxSelector);
  // await adminPage.gotoAdminRemoveOK(testController);
});

// admin.test.js

test('Test that recipes can be searched for', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoAdminPage(testController);
  await adminPage.typeInSearch(testController, 'Bagels');

  // Make sure to wait for any asynchronous updates to the page
  await testController.wait(1000);

  // Assert that the correct recipe card is displayed
  await adminPage.assertRecipeName(testController, 'Bagels');
});

test('Test that the add recipe form submits', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddRecipePage(testController);
  await addRecipePage.isDisplayed(testController);
  await formPage.addRecipeName(testController, 'Avocado Toast');
  await formPage.addRecipeTime(testController, '3 minutes');
  await formPage.addRecipeCost(testController, '$5');
  await formPage.addRecipeFilter(testController, 'Healthy, Quick');
  await formPage.addRecipeDirections(testController, '|1. Toast bread|2. Spread Avocado');
  await formPage.addRecipeIngredients(testController, 'Avocado, Toast');
  await formPage.addRecipeAppliances(testController, 'Toaster');
  await formPage.addRecipeLink(testController, 'https://feelgoodfoodie.net/wp-content/uploads/2023/09/Avocado-Toast-with-Egg-TIMG.jpg');
  await formPage.addRecipeDietary(testController);
  await formPage.addRecipeSubmit(testController);
});
