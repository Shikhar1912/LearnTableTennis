import React from "react";
import { useNavigate } from "react-router-dom";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [published, setPublished] = React.useState(false);
  const [imageLink, setImageLink] = React.useState("");
  const navigate  = useNavigate();
  const addCourse = () => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:3001/admin/courses", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageLink,
        price,
        published,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
      navigate('/courses');
  };
  return (
    <div>
      <h1>Create Course Page</h1>
      Title: <input type={"text"} onChange={(e) => setTitle(e.target.value)} />
      <br />
      Description:{" "}
      <input type={"text"} onChange={(e) => setDescription(e.target.value)} />
      <br />
      Price:{" "}
      <input type={"number"} onChange={(e) => setPrice(e.target.value)} />
      <br />
      imageLink:{" "}
      <input type={"text"} onChange={(e) => setImageLink(e.target.value)} />
      <br />
      Published:{" "}
      <input
        type={"checkbox"}
        checked={published}
        onChange={(e) => setPublished(e.target.checked)}
      />
      <br />
      <button onClick={addCourse}>Create Course</button>
    </div>
  );
}
export default CreateCourse;
