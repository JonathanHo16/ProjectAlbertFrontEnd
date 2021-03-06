/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import {rootReducer} from './dataModel/reducers.js'

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
      <Router history={hist}>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin/dashboard" />
      </Router>
    </Provider>,
  document.getElementById("root")
);
