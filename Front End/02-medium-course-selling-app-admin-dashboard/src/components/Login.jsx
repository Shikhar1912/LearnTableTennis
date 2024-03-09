import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { adSignInState } from "../states/recoilState";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  let navigate = useNavigate();
  const [adSignIn, setAdSignIn] = useRecoilState(adSignInState);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const checkUser = () => {
    fetch("http://localhost:3001/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.token);
        localStorage.setItem("authToken", data.token);
        setAdSignIn({
            signedIn:true,
            username:username
        })
        navigate("/courses");
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
        Welcome to CourseApp
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
          onClick={checkUser}
        >
          Sign In
        </Button>
      </Card>
    </div>
  );
}

export default Login;
