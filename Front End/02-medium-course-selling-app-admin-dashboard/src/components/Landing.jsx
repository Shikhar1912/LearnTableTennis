import { useState } from "react";
import { Card, Typography, Button, TextField } from "@mui/material";
function Landing() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          // onClick={signupUser}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
}

export default Landing;
