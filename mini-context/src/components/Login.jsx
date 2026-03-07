import React, { useState, useContext } from "react";
import UserContext from "../context/userContext";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setUser(null);
      return;
    }
    setUser({ username, password });
  };

  return (
    <>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        placeholder="Enter username"
      />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Login;
