// import logo from "./logo.svg";
import "./App.css";
import "./base.scss";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import EditIcon from "./icons/EditIcon";
import EyeClosedIcon from "./icons/EyeClosedIcon";
import LockIcon from "./icons/LockIcon";
import TrashIcon from "./icons/TrashIcon";
function App() {
  return (
    <div className="App">
      <h1>Kindred</h1>
      <p>test</p>
      <h2>TEST</h2>
      <h3>TEST</h3>
      <button>
        Lets start ! <ArrowRightIcon></ArrowRightIcon>
      </button>
      <TrashIcon></TrashIcon>
      <EyeClosedIcon></EyeClosedIcon>
      <EditIcon></EditIcon>
    </div>
  );
}

export default App;
