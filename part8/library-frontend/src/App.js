import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import Recommendations from "./components/Recommendations";

const Notify = ({ errorMessage }) => {
  console.log(errorMessage);
  if (!errorMessage) {
    return null;
  }
  return (
    <div className="container error" style={{ color: "red" }}>
      {errorMessage}
    </div>
  );
};

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  //console.log(result);
  //console.log(booksResult);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data.data.bookAdded);
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.author.name} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <h2 className="title">Welcome to the Library</h2>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="title">Welcome to the Library</h2>
      <Nav logout={logout} />
      <Notify errorMessage={errorMessage} />

      <Routes>
        <Route
          path="/"
          element={
            <Authors authors={result.data.allAuthors} setError={notify} />
          }
        />
        <Route path="/books" element={<Books setError={notify} />} />
        <Route path="/newbook" element={<NewBook setError={notify} />} />
        <Route
          path="/recommendations"
          element={<Recommendations setError={notify} />}
        />
      </Routes>
    </div>
  );
};

export default App;
