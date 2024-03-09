import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
const AllCourses = () => {
  const token = localStorage.getItem("userToken");
  // Check if token is available
  // console.log(token)
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    fetch("http://localhost:3001/users/courses", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        console.log("Courses", courses);
      });
  }, []);

  function Course({ title, imageLink, id }) {
    const buyCourse = (id) => {
      fetch("http://localhost:3001/users/courses/" + id, {
        method: "POST",
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/mycourses");
        });
    };
    return (
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "300px",
          height: "400px",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {title}
        </Typography>
        <br />
        <img
          src={imageLink}
          alt="image"
          style={{ height: "200px", width: "300px" }}
        />
        <br />
        <Button variant="contained" onClick={() => buyCourse(id)}>
          BUY
        </Button>
        <br />
      </Card>
    );
  }
  return (
    <div style={{backgroundColor: "inherit"}}>
      <h1>All Courses</h1>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {courses.map((c, index) => (
          <Course
            key={index}
            id={c._id}
            title={c.title}
            imageLink={c.imageLink}
          ></Course>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
