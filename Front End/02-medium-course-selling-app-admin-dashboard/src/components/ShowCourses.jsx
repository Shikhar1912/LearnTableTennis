import { Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
  const token = localStorage.getItem("authToken");
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/admin/courses", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        console.log(data);
      });
  }, []);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.

  return (
    <div>
      <h1>Your Courses</h1>
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
            title={c.title}
            description={c.description}
            id={c._id}
          />
        ))}
      </div>
    </div>
  );
}

function Course(props) {
  const navigate = useNavigate();
  const editTodo = (id) => {
    console.log(id);
    localStorage.setItem("courseId", id);
    navigate("/editCourse");
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
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <button onClick={() => editTodo(props.id)}>Edit</button>
    </Card>
  );
}

export default ShowCourses;
