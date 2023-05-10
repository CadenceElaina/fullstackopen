import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUserOut } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logUserOut());
    dispatch(setNotification(`${user.name} has been logged out!`, 5));
    navigate("/login");
  };
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <span className="active-user">{user.name}</span> logged in{" "}
      <button id="logout-btn" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Navbar;
