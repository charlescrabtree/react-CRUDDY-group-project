import './App.css';
import Auth from './components/Auth/Auth';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        {/* <Route exact path="/"></Route> */}
      </Switch>
    </div>
  );
}

export default App;
