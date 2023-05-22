import { useApolloClient, useQuery } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";

import { ALL_AUTHORS } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div className="container error" style={{ color: "red" }}>
      {errorMessage}
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  console.log(result);
  //console.log(booksResult);
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
        <Route path="/books" element={<Books />} />
        <Route path="/NewBook" element={<NewBook setError={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
