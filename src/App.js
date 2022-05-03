import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connexion from "./components/Connexion/Connexion";
import ParentSettings from "./components/Settings/parent-settings/Settings/parent-settings";
import './App.css';
import "./base.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/register" element={<Connexion />} />
        <Route path="/settings" element={<ParentSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
