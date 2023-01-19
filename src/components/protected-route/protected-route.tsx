import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation, RouteProps, } from 'react-router-dom';

type TProtectedRouteProps = RouteProps & {
    unAuthorizedOnly?: boolean;
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ( { unAuthorizedOnly = false, children, ...rest } ) => {

    const isAuthenticated = useSelector((store: any) => store.userReducer.isAuthenticated);
    const loc = useLocation< { from: Location, background: Location }>();

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
