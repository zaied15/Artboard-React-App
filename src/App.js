import { Routes, Route } from "react-router-dom";
import "./App.css";
import Drawing from "./components/Drawing/Drawing";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login/Login";
import Register from "./components/Login/Register/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="drawing" element={<Drawing></Drawing>}></Route>
      </Routes>
    </div>
  );
}

export default App;
