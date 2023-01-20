import React, { useEffect, FC } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFound404 } from '../../pages/not-found-404/notFound404';
import { MainPage } from '../../pages/main/main';
import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients } from '../../services/action-creators/burgerConstructorActionCreators';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './app.module.css';
import { getCookie } from '../../utils/cookies';
import { getUser } from '../../services/action-creators/userActionCreators';
import { Location } from 'history';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const App: FC = () => {

  const dispatch = useAppDispatch();

  const { isLoading, error, allIngredients } = useAppSelector(store => store.burgerConstructorReducer);

  const location = useLocation< { background: Location }>();
  const background = location.state && location.state.background;
  const history = useHistory();

  useEffect(() => {

    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
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
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute unAuthorizedOnly={true} path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute unAuthorizedOnly={true} path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute unAuthorizedOnly={true} path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute unAuthorizedOnly={true} path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <div className={styles.ingredientDetailsPageWrapper}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            <IngredientDetails />
          </div>
        </Route>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
      {background && (<Route path="/ingredients/:id" exact={true}>
                    <Modal 
                        title='Детали ингредиента'
                        onClose={() => {
                            history.replace({ pathname: "/"});
                        }} 
                    >
                        <IngredientDetails />
                    </Modal>
                </Route>)
      }
    </>
  );
}

export default App;
