import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './HomePage';
import SignInPage from './SignInPage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import DashboardPage from './DashboardPage';
import NavigationBar from './subcomponents/NavigationBar';
import ProtectedRoute from './subcomponents/ProtectedRoute';

const App = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/" component={ HomePage } exact />
        <Route path={ ["/signin", "/signup"] } component={ SignInPage } exact />
        <ProtectedRoute path="/profile" component={ ProfilePage } />
        <ProtectedRoute path="/search" component={ SearchPage } />
        <ProtectedRoute path="/pcs-dashboard" component={ DashboardPage } />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;