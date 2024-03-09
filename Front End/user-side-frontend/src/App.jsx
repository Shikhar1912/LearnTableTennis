import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import MyCourses from "./components/MyCourses";
import AllCourses from "./components/AllCourses";
import Appbar from "./components/Appbar";
function App() {
  return (
    <div style={{ backgroundColor: "#edede8", height: "100vh" }}>
      <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/allcourses" element={<AllCourses />} />
            <Route path="/mycourses" element={<MyCourses />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
