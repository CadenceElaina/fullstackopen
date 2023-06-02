import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications";

import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOK_ADDED,
  USER,
  USER_LOGGED_IN,
} from "./queries";
import Recommendations from "./components/Recommendations";

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
  const [toastMessage, setToastMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  //const user = useQuery(USER);
  //console.log(user);
  const client = useApolloClient();
  //console.log(result);
  //console.log(booksResult);

  //App.js:32 Uncaught TypeError: Cannot destructure property 'allBooks' of '_ref' as it is null. ???
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data.data.bookAdded);
      const addedBook = data.data.bookAdded;
      setToastMessage(`${addedBook.title} by ${addedBook.author.name} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useSubscription(USER_LOGGED_IN, {
    onData: ({ data }) => {
      // console.log(data);
      const user = data.data.userLoggedIn;
      const username = user.username;
      const favoriteGenre = user.favoriteGenre;
      /* notify(`${addedBook.author.name} added`); */
      client.cache.updateQuery({ query: USER }, ({ me }) => {
        console.log({ me });
        return {
          me: { username, favoriteGenre },
        };
      });
    },
  });

  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
      setToastMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage, toastMessage]);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    /*     console.log(user?.data?.me.username);
    const username = user?.data?.me.username || null;
    ${username} */

    localStorage.clear();
    setToastMessage(`logged out!`);
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <h2 className="title">Welcome to the Library</h2>
        <Notifications errorMessage={errorMessage} toast={toastMessage} />
        <LoginForm
          setToken={setToken}
          setError={setErrorMessage}
          setToast={setToastMessage}
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="title">Welcome to the Library</h2>
      <Nav logout={logout} />
      <Notifications errorMessage={errorMessage} toast={toastMessage} />

      <Routes>
        <Route
          path="/"
          element={
            <Authors
              authors={result.data.allAuthors}
              setError={setErrorMessage}
            />
          }
        />
        <Route path="/books" element={<Books setError={setErrorMessage} />} />
        <Route
          path="/newbook"
          element={
            <NewBook
              setError={setErrorMessage}
              setToastMessage={setToastMessage}
            />
          }
        />
        <Route
          path="/recommendations"
          element={<Recommendations setError={setErrorMessage} />}
        />
      </Routes>
    </div>
  );
};

export default App;
