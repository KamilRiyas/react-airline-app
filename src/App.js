import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route, i) =>
            <Route key={i} exact={route.subRoutes.some(r => r.exact)} path={route.subRoutes.map(r => r.path)}>
              <route.layout>
                {route.subRoutes.map((subRoute, i) =>
                  <Route key={i} {...subRoute} />
                )}
              </route.layout>
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
