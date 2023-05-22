import SetBirthYear from "./SetBirthYear";

const Authors = ({ authors, setError }) => {
  return (
    <div className="container">
      <h2>authors</h2>
      {authors.length > 0 ? (
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
      ) : (
        <>no authors...</>
      )}
      <SetBirthYear authors={authors} setError={setError} />
    </div>
  );
};

export default Authors;
