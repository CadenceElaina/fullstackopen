const typeDefs = `
type User {
	username: String!
	favoriteGenre: String!
	id: ID!
}

type Token {
	value: String!
}

type Author {
	name: String!
	id: ID!
	born: Int
	bookCount: Int!
}

type Book {
	title: String!
	published: Int!
	author: Author!
	id: ID!
	genres: [String!]!
}

type Query {
	bookCount: Int!
	authorCount: Int!
	allBooks(author: String, genre: String): [Book!]!
	allAuthors: [Author!]!
	me: User
}

type Mutation {
	addBook(
		title: String!
		author: String!
		published: Int!
		genres: [String!]!
		): Book

	editAuthor(
		name: String!
		setBornTo: Int!
	): Author

	createUser(
		username: String!
		favoriteGenre: String!
	): User

	login(
		username: String!
		password: String!
	): Token
}

type Subscription {
	bookAdded: Book!
	userLoggedIn: User!
}
`;

module.exports = typeDefs;
