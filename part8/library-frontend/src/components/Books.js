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

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="container">
      <h2>books</h2>
      {books.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>no books...</>
      )}
    </div>
  );
};

export default Books;
