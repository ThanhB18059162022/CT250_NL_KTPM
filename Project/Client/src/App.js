import { Switch, Route,BrowserRouter as Router } from "react-router-dom"

import "./App.css";
import route from "./pages/route";

function App() {
  return (
    <Router>
      <Switch>
        {route.map(({ component: Component, path, ...rest }) =>
          <Route component={Component} key={path} {...rest} />
        )}
      </Switch>
    </Router>
  );
}

export default App;
