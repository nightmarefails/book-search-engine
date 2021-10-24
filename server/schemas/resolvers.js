const { AuthenticationError } = require('apollo-server-errors');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args) => {
            try {
                return await User.findOne({ username: args.username });
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
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Invalid Username")
            }

            const correctPw = await user.isCorrectPassword(password)

            if (correctPw) {
                throw new AuthenticationError('Incorrect Password')

            }

            const token = signToken(user)
            return { token, user }
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