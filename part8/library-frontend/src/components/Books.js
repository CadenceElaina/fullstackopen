import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("all");

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks || [];
  //console.log("books:", books);
  //console.log(books);
  if (result.loading) {
    return <div>loading...</div>;
  }

  // Get only unique genres
  // flatMap is same as const unique = [...new Set(arr.map((b) => b.genres).flat())] but slightly more effiecient
  const genres = [...new Set(books.flatMap((book) => book.genres))];
  //console.log(genres);
  return (
    <div className="container">
      <h2>books</h2>
      <p>Genre is {genre}</p>
      {books.length > 0 ? (
        <div className="container">
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books
                .filter((b) => (genre !== "all" ? b.genres.includes(genre) : b))
                .map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            {genres.map((genre) => (
              <button key={genre} onClick={() => setGenre(genre)}>
                {genre}
              </button>
            ))}
            <button onClick={() => setGenre("all")}>all genres</button>
          </div>
        </div>
      ) : (
        <>no books...</>
      )}
    </div>
  );
};

export default Books;
