// import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adSignInState } from "../states/recoilState";
const Appbar = () => {
  const { signedIn, username } = useRecoilValue(adSignInState);
  console.log(signedIn);
  console.log(username);
  const setSignIn = useSetRecoilState(adSignInState);
  // const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the token from local storage and redirect to the sign-in page
    localStorage.removeItem("userToken");
    setSignIn({ signedIn: false, username: "" });
    navigate("/signin");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        alignItems: "center",
      }}
    >
      <Typography
        style={{
          fontWeight: "600",
          fontSize: "24px",
          fontFamily: "sans-serif",
          color: "#ef233c",
        }}
      >
        CourseApp
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        {signedIn ? (
          <>
            <Button
              style={{ margin: "0 10px" }}
              onClick={() => navigate("/courses")}
            >
              All Courses
            </Button>
            <Button
              style={{ margin: "0 10px" }}
              onClick={() => navigate("/createCourse")}
            >
              Create
            </Button>
            <Typography style={{ fontSize: "20px", margin: "0 10px" }}>
              {username}
            </Typography>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              style={{ margin: "0 10px" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button variant="contained" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Appbar;
