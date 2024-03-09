import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextField, Button, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { signInState } from "../states/recoilState";

const Signin = () => {
  const [signIn, setSignIn] = useRecoilState(signInState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = () => {
    fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        localStorage.setItem("userToken", "Bearer " + data);
        setSignIn({
          username:username,
          signedIn:true
        });
        navigate("/allcourses");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <Typography
        variant="h3"
        style={{
          marginBottom: "30px",
          textAlign: "center",
          color: "#aaaaaa",
          fontWeight: "550",
          fontSize: "45px",
        }}
      >
        Welcome Back
      </Typography>
      <Card
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ width: "100px" }}
          onClick={loginUser}
        >
          Sign In
        </Button>
      </Card>
    </div>
  );
};

export default Signin;
