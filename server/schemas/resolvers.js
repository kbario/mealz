const { AuthenticationError } = require("apollo-server-express");
const { Error } = require("mongoose");
const { User, Recipe, Card } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    // user: async (parent, { profileId }) => {
    //   return User.findOne({ _id: profileId });
    // },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate(["recipes", "cards"])
          .populate({ path: "cards", populate: "meals" });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addRecipe: async (
      parent,
      { name, description, serves, ingredients, from, cookTime, cuisine },
      context
    ) => {
      if (!context.user)
        throw new AuthenticationError("You're not logged in...");

      try {
        const recipe = await Recipe.create({
          name,
          serves,
          ingredients,
          description,
          from,
          cuisine,
          cookTime,
        });
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } },
          { new: true }
        ).populate(["recipes", "cards"]);
        // .populate({ path: "cards", populate: "meals" });
      } catch (error) {
        console.log(error);
      }
    },
    addCard: async (parent, { name, date, meals }, context) => {
      if (context.user) {
        try {
          const card = await Card.create({ name, date, meals });

          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { cards: card._id } },
            { new: true }
          );
          return user.populate(["recipes", "cards"]);
          // .populate({ path: "cards", populate: "meals" });
        } catch (error) {
          console.log(error);
        }
      }
    },

    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const recipe = await Recipe.findByIdAndDelete(recipeId);
        if (recipe.ok) {
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { recipes: recipeId } },
            { new: true }
          ).populate(["recipes", "cards"]);
          // .populate({ path: "cards", populate: "meals" });
        } else {
          return Error("Could not delete recipe");
        }
      }
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        const resp = Recipe.deleteMany({
          _id: { $in: context.user.recipes },
        });
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //     // Add a third argument to the resolver to access data in our `context`
    //     addSkill: async (parent, { profileId, skill }, context) => {
    //       // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    //       if (context.user) {
    //         return Profile.findOneAndUpdate(
    //           { _id: profileId },
    //           {
    //             $addToSet: { skills: skill },
    //           },
    //           {
    //             new: true,
    //             runValidators: true,
    //           }
    //         );
    //       }
    //       // If user attempts to execute this mutation and isn't logged in, throw an error
    //       throw new AuthenticationError("You need to be logged in!");
    //     },
    //     // Set up mutation so a logged in user can only remove their profile and no one else's
    //
    //     // Make it so a logged in user can only remove a skill from their own profile
    //     removeSkill: async (parent, { skill }, context) => {
    //       if (context.user) {
    //         return Profile.findOneAndUpdate(
    //           { _id: context.user._id },
    //           { $pull: { skills: skill } },
    //           { new: true }
    //         );
    //       }
    //       throw new AuthenticationError("You need to be logged in!");
    //     },
  },
};

module.exports = resolvers;
