import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Search from './search';
import Description from './description'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search} />
            <Route path="description/:owner/:repo/:index" component={Description} />
        </Route>
    </Router>,
  document.getElementById('root')
);
