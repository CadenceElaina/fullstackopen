import { useQuery } from "@apollo/client";
import { ALL_BOOKS, USER } from "../queries";

const Recommendations = () => {
  const { data: userData, loading: loadingUser } = useQuery(USER);
  const genre = userData?.me?.favoriteGenre;
  const { data: booksData, loading: loadingBooks } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: loadingUser,
  });

  const books = booksData?.allBooks || [];
  /*   const bookRecommendations = allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  ); */
  const username = userData?.me?.username;
  //console.log(genre, userData);

  return (
    <div className="container">
      <h2>Recommendations</h2>
      {(loadingBooks || loadingUser) && <p>loading books...</p>}
      {books.length > 0 ? (
        <div>
          <p>
            Books in {username}'s favorite genre: {genre}
          </p>
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
        </div>
      ) : (
        <>
          no recommendations based {username}'s favorite genre: {genre}...
        </>
      )}
    </div>
  );
};

export default Recommendations;
