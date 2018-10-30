import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import asyncComponent from './AsyncComponent';
// Import the NotFound component to be used below
import NotFound from './NotFound/notFound';
// Import CSS from App.css
import './App.css';
import createBrowserHistory from 'history/createBrowserHistory';

// Dynamically imported components
const Home = asyncComponent(() =>
  import('./Home/home').then(module => {
    console.log('at app', module.default);
    return module.default;
  }),
);
console.log('type---', typeof Home);
const Maps = asyncComponent(() =>
  import('./Maps/maps').then(module => module.default),
);

const Blog = asyncComponent(() =>
  import('./Blog/blog').then(module => {
    return module.default;
  }),
);

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <header className="header">
            <nav className="navbar container">
              <div className="navbar-brand">
                <Link to="/">
                  <span className="navbar-item">Lazy Loading Routes</span>
                </Link>
              </div>

              <div className="navbar-end">
                <Link to="/maps">
                  <span className="navbar-item mr-2">Maps</span>
                </Link>
                <Link to="/blog">
                  <span className="navbar-item">Blog</span>
                </Link>
              </div>
            </nav>
          </header>
          <section className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/maps" component={Maps} />
              <Route path="/blog" component={Blog} />
              <Route path="*" component={NotFound} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
