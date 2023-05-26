import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER } from "../queries";

const Nav = ({ logout }) => {
  const result = useQuery(USER);
  //console.log(result);
  const username = result?.data?.me?.username || null;

  //console.log(username);
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
        <Link to="/recommendations" className="nav-link">
          Recommendations
        </Link>
        {/*   {username && (
          <li
            className="nav-li"
            id="nav-username"
          >{`${username} is signed in...`}</li>
        )} */}
        <button onClick={logout}>logout</button>
      </ul>
    </div>
  );
};

export default Nav;
