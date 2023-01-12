import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ unAuthorizedOnly = false, children, ...rest }) => {

    const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);
    const loc = useLocation();

    if (!isAuthenticated && !unAuthorizedOnly) {
        return (
            <Route {...rest}>
                <Redirect to={{pathname: '/login', state: {from: loc}}} />
            </Route>
        )
    }

    if (isAuthenticated && unAuthorizedOnly) {
        const { from } = loc.state || {from: {pathname: '/'}};

        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        )
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    );

}

ProtectedRoute.propTypes = {
    unAuthorizedOnly: PropTypes.bool,
    children: PropTypes.node,
    rest: PropTypes.any,
}
