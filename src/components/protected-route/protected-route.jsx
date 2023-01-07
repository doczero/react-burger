import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest }) => {

    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);

    return (
        <Route
            {...rest}
            render={() => (
                isAuthenticated
                ? children
                : (
                    <Redirect to = '/login' />
                )

            )
        }
        />
    );

}
