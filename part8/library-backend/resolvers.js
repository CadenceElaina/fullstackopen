require("dotenv").config();
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

//const JWT_SECRET = process.env.SECRET;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.findOne({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const filteredBooks = await Book.find({ author: root.id });
      return filteredBooks.length;
    },
  },
  Book: {
    author: async (root) => {
      const foundAuthor = await Author.findById(root.author);
      return foundAuthor;
    },
  },
  Mutation: {
    addBook: async (
      root,
      { author: name, genres, published, title },
      context
    ) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Error saving author", {
            code: "BAD_USER_INPUT",
            error,
          });
        }
      }

      const book = new Book({ author, genres, published, title });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Error saving book", {
          code: "BAD_USER_INPUT",
          error,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        return await author.save();
      } catch (error) {
        throw new GraphQLError("Error saving updated author", {
          code: "BAD_USER_INPUT",
          error,
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Error saving user", {
          code: "BAD_USER_INPUT",
          invalidArgs: args.name,
          error,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          code: "BAD_USER_INPUT",
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
