import { useQuery } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Nav from "./components/Nav";

import { ALL_AUTHORS } from "./queries";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  console.log(result);
  //console.log(booksResult);
  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2 className="title">Welcome to the Library</h2>
      <Nav />

      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/NewBook" element={<NewBook />} />
        {/*     <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} /> */}
      </Routes>
    </div>
  );
};

export default App;
