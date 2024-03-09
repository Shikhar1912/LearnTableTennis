import React from "react";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const registerUser = () => {
    fetch("http://localhost:3001/admin/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        localStorage.setItem("authToken", data);
        navigate("/courses");
      });
  };
  return (
    <div>
      <h1>Register to the website</h1>
      <br />
      Email
      <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
      <br />
      Password
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={registerUser}>Resister</button>
      <br />
      Already a user? <a href="/login">Login</a>
    </div>
  );
}

export default Register;
