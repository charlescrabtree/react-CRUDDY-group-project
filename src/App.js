import './App.css';
import Auth from './components/Auth/Auth';
import Posts from './components/Posts/Posts';
import PostForm from './components/Posts/PostForm';
import { Route, Switch } from 'react-router-dom';
import EditPost from './components/Posts/EditPost';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/posts/edit/:id" component={EditPost} />
        <Route path="/posts/new" component={PostForm} />
        <Route path="/posts" component={Posts} />
        <Route path="/auth/:type" component={Auth} />
        <Route exact path="/" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
