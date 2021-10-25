const { AuthenticationError } = require('apollo-server-errors');
const { User } = require('../models');
const { signToken,  } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            try {
                return await User.findOne({ username: context.user.username });
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password });
                const token = signToken(user);
                return { token, user }
            } catch (error) {
                console.error(error);
            }
        },
        loginUser: async (parent, args) => {
            try {
                const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
                if (!user) {
                    return new AuthenticationError("Invalid Username or E-mail");
                }

                const correctPw = await user.isCorrectPassword(args.password);

                if (!correctPw) {
                    return new AuthenticationError("Invalid Password");
                }

                const token = signToken(user)
                return { token, user }
            } catch (err) {
                console.log(err)
            }
        },
        addBook: async (parent, args) => {
            return User.findOneAndUpdate(
                { _id: args.userId },
                {
                    $addToSet: { savedBooks: args },
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
        },
        removeBook: async (parent, args) => {
            return User.findOneAndUpdate(
                { _id: args.userId },
                { $pull: { savedBooks: args } },
                { new: true }
            )
        }
    }
}

module.exports = resolvers;