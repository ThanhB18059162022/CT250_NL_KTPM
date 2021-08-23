import logo from "./logo.svg";
import "./App.css";
const { ApiCaller } = require("./api_services/servicesContainer");

function App() {
  const getData = async () => {
    var apiCaller = new ApiCaller();

    var res = await apiCaller.get("notes");
    console.log(res.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={getData}>Get data</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
