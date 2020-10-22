import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './subcomponents/NavigationBar';
import HomePage from './HomePage';
import SignInPage from './SignInPage';

const App = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/" component= { HomePage } exact />
        <Route path="/signin" component={ SignInPage } exact />
				<Route path="/signup" component={ SignInPage } exact />
      </Switch>
    </>
  );
}

export default App;