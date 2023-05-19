import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const SetBirthYear = ({ authors, setError }) => {
  const [born, setBorn] = useState("");
  const [name, setName] = useState("");

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      error.graphQLErrors > 0
        ? setError(error.graphQLErrors[0].message)
        : setError("Fill out all the required fields");
    },
  });

  const submit = (event) => {
    event.preventDefault();
    console.log(name, born);
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
      <h3>Set birthyear for an author</h3>
      <form onSubmit={submit}>
        <label htmlFor="author-select">Choose an Author:</label>
        <select onChange={({ target }) => setName(target.value)} value={name}>
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

export default SetBirthYear;
