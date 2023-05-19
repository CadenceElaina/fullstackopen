import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [name, setName] = useState("");
  /*   if (!authors) {
    return null;
  } */

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();
    /* console.log(typeof born);
    console.log(typeof parseInt(born)); */
    editAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("author not found");
    }
  }, [result.data]);

  return (
    <div className="container">
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear for an author</h3>
      <form onSubmit={submit}>
        <label htmlFor="author-select">Choose an Author:</label>
        <select onChange={({ target }) => setName(target.value)}>
          <option defaultValue="selected">select author</option>
          {authors.map((a) => (
            <option value={`${a.name}`} key={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
