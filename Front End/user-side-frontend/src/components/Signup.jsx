import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextField, Button, Typography } from "@mui/material";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signupUser = () => {
    fetch("http://localhost:3001/users/signup", {
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
        navigate("/allcourses");
        window.location.reload();
      });
  };
  // return (
  //   <div>
  //     <h1>Hey New user, Sign up</h1>
  //     Username
  //     <br />
  //     <input
  //       type="text"
  //       value={username}
  //       onChange={(e) => setusername(e.target.value)}
  //     />
  //     <br />
  //     Password
  //     <br />
  //     <input
  //       type="text"
  //       value={password}
  //       onChange={(e) => setpassword(e.target.value)}
  //     />
  //     <br />
  //     <button onClick={signupUser}>Sign Up</button>
  //   </div>
  // );
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
          onClick={signupUser}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
};

export default Signup;
