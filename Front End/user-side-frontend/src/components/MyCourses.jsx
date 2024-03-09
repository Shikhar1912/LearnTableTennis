import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
const MyCourses = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users/purchasedCourses", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }, []);
  console.log("courses:", courses);
  const Course = ({ title, description, imageLink, id }) => {
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
        <Button variant="contained" onClick={() => viewCourse(id)}>
          VIEW
        </Button>
        <br />
      </Card>
    );
  };
  return (
    <div style={{backgroundColor: "inherit"}}>
      <h1>My Courses</h1>
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
            description={c.description}
            imageLink={c.imageLink}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
