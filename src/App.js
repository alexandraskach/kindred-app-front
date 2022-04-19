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
      <button>Lets start !</button>
      <TrashIcon></TrashIcon>
      <EyeClosedIcon></EyeClosedIcon>
      <EditIcon></EditIcon>
      <ArrowRightIcon></ArrowRightIcon>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
