import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipes } from './Recipes';

Meteor.methods({
  'recipes.remove'(recipeId) {
    check(recipeId, String);

    Recipes.collection.remove(recipeId);
  },
  getCurrentUserEmail: function () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action');
    }

    const user = Meteor.users.findOne(this.userId, { fields: { 'emails.address': 1 } });

    if (!user || !user.emails || user.emails.length === 0) {
      throw new Meteor.Error('user-not-found', 'User not found or no email associated');
    }

    return user.emails[0].address;
  },
});
