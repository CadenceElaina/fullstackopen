import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from "../queries";
import { updateCache } from "../App";

const NewBook = ({ setError, setToastMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);
  /* , {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
      console.log(error.message);
      /* const messages = error.graphQLErrors[0].message; */
  /*    setError(error.message);
    },
    onCompleted: (data) => {
      console.log(data);
      const addedBook = data.addBook;
      console.log("added book", addedBook);
      setToastMessage(`${addedBook.title} addedby ${data.addBook.author.name}`);
      //setError(`added ${data.addBook.title} by ${data.addBook.author.name}`);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
  }); */

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: parseInt(published), genres },
      refetchQueries: [
        { query: ALL_AUTHORS },
        { query: ALL_BOOKS },
        ...genres.map((g) => ({
          query: ALL_BOOKS,
          variables: { genre: g },
        })),
      ],
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div className="container">
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
