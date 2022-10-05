import './App.css';
import Auth from './components/Auth/Auth';
import Posts from './components/Posts/Posts';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/posts" component={Posts} />
        <Route path="/auth/:type" component={Auth} />
        {/* <Route exact path="/"></Route> */}
      </Switch>
    </div>
  );
}

export default App;
