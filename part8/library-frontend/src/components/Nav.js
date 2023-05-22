import { Link } from "react-router-dom";

const Nav = ({ logout }) => {
  return (
    <div className="nav">
      <ul className="nav-list">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/books" className="nav-link">
          Books
        </Link>
        <Link to="/newbook" className="nav-link">
          Add a Book
        </Link>
        <li>
          <button onClick={logout}>logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
