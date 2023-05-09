import { useState } from "react";
import { useDispatch } from "react-redux";
import { logUserIn } from "../reducers/loginReducer";
//import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(logUserIn(user));
    setUsername("");
    setPassword("");
    //navigate("/blogs");
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
