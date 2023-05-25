import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, USER } from "../queries";

const Recommendations = () => {
  const books = useQuery(ALL_BOOKS);
  const user = useQuery(USER);

  if (user.loading || books.loading) {
    return <div>loading...</div>;
  }
  console.log(user);
  const { allBooks } = books.data;
  const favoriteGenre = user.data.me.favoriteGenre;
  console.log(favoriteGenre);
  const bookRecommendations = allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  );

  return (
    <div className="container">
      <h2>Recommendations</h2>
      {bookRecommendations.length > 0 ? (
        <div>
          <p>
            Books in {user.data.me.username}'s favorite genre: {favoriteGenre}
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {bookRecommendations.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>no recommendations...</>
      )}
    </div>
  );
};

export default Recommendations;
