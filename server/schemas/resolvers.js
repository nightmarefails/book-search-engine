const { AuthenticationError } = require('apollo-server-errors');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        }
    },
    Mutation: {
        adduser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user}
        },
        login: async (parent, {username, password}) => {
            const user = User.findOne({ username });

            if(!user) {
                throw new AuthenticationError("Invalid Username or Password")
            }

            const correctPw = await user.isCorrectPassword(password)

            if(correctPw) {
                throw new AuthenticationError('Incorrect Username or Password')
            
            }

            const token = signToken(user)
            return { token, user}
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
                { $pull: {savedBooks: args} },
                { new: true }
            )
        }
    }
}

module.exports = resolvers;