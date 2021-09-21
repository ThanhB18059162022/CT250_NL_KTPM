import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

import "./App.css";
import route from "./pages/route";
import CartProvider from "./providers/CartProviders";
function App() {
  return (
    <CartProvider>
      <Router>
        <Switch>
          {route.map(({ component: Component, path, ...rest }) =>
            <Route key={path} component={Component} path={path} {...rest} />
          )}
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
