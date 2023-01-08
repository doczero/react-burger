import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFound404 } from '../../pages/not-found-404/notFound404';
import { MainPage } from '../../pages/main/main';
import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route/protected-route';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/burgerConstructorActions';

const App = () => {

  const dispatch = useDispatch();

  const { isLoading, error, allIngredients } = useSelector(store => store.burgerConstructorReducer);

  useEffect(() => {

    dispatch(getIngredients());

  }, []);

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  if (!isLoading && error.length > 0) {
    return <h1>Ошибка</h1>
  }

  if (!isLoading && allIngredients.length === 0) {
    return <h1>Нет ингредиентов</h1>
  }

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
          <Route path="/ingredients/:id">
            <IngredientPage />
          </Route>
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
