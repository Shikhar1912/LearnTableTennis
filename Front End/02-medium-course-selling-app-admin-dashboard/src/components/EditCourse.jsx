import React from "react";
import { useNavigate } from "react-router-dom";
// import ShowCourses from "./components/ShowCourses";


const EditCourse = () => {
  const token = localStorage.getItem("authToken");
  let course;
  const courseId = localStorage.getItem("courseId");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [published, setPublished] = React.useState(false);
  const [imageLink, setImageLink] = React.useState("");
   
  React.useEffect(() => {
    fetch("http://localhost:3001/admin/courses", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        course = data.find((c) => c._id === courseId);
        console.log(course);
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setImageLink(course.imageLink);
        setPublished(course.published);
      });
  }, []);

  const navigate = useNavigate();
  const makeChanges = () =>{
    fetch("http://localhost:3001/admin/courses/"+courseId,{
        method:'PUT',
        headers:{
            Authorization:token,
            'Content-Type':'Application/json'
        },
        body: JSON.stringify({
          title,description,price,published,imageLink  
        })
    }).then(res=>res.json()).then(data=>{
        console.log(data);
        navigate('/courses')
    })
  }
  return (
    <div>
      <label>Title:</label>
      <br />
      <textarea
        rows={1}
        cols={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Description:</label>
      <br />
      <textarea
        rows={5}
        cols={50}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <label>Image Link:</label>
      <br />
      <textarea
        rows={1}
        cols={50}
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
      />
      <br />
      <label>Published:</label>
      <input
        type="checkbox"
        checked={published}
        onChange={(e) => setPublished(e.target.checked)}
      />
      <br />
      <button onClick={makeChanges}>Make Changes</button>
    </div>
  );
};

export default EditCourse;
