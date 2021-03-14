import './style/App.css';
import { BaseMap } from './Components/basemap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            <h1>Hello</h1>
          </Route>
          <Route path="/">
            <BaseMap />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
