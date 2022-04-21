// import logo from "./logo.svg";
import "./App.css";
import "./base.scss";
// import ArrowRightIcon from "./icons/ArrowRightIcon";
// import EditIcon from "./icons/EditIcon";
// import EyeClosedIcon from "./icons/EyeClosedIcon";
// import LockIcon from "./icons/LockIcon";
// import TrashIcon from "./icons/TrashIcon";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/dashboard/:page" element={<Dashboard />} />
      <Route path="/admin/:page" element={<Admin />} />
      <Route path="/admin/study/:id" element={<AdminTest />} />
      <Route path="/study/:id" element={<Test />} /> */}
        <Route path="/register" element={<Connexion />} />
        <Route path="/" element={<Connexion />} />
        <Route path="*" element={<Connexion fromNotFound />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <h1>Kindred</h1>
    //   <p>test</p>
    //   <h2>TEST</h2>
    //   <h3>TEST</h3>
    //   <button>
    //     Lets start ! <ArrowRightIcon></ArrowRightIcon>
    //   </button>
    //   <TrashIcon></TrashIcon>
    //   <EyeClosedIcon></EyeClosedIcon>
    //   <EditIcon></EditIcon>
    // </div>
  );
}

export default App;
