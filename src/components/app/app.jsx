import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { NotFound404 } from '../../pages/notFound404';
import { MainPage } from '../../pages/main';
import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {

  return (
    <>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
