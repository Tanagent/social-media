const postsResolvers = require("./posts");
const useresResolvers = require("./users");

module.exports = {
	Query: {
		...postsResolvers.Query
	},
	Mutation: {
		...useresResolvers.Mutation,
		...postsResolvers.Mutation
	}
};
