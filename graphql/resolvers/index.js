const postsResolvers = require("./posts");
const useresResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length
	},
	Query: {
		...postsResolvers.Query
	},
	Mutation: {
		...useresResolvers.Mutation,
		...postsResolvers.Mutation,
		...commentsResolvers.Mutation
	},
	Subscription: {
		...postsResolvers.Subscription
	}
};
