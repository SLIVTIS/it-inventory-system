import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

function isAuthenticated() {
    const user = localStorage.getItem('user');

    return user !== null && user !== undefined;
}

function RoutesWithAuthentication({ children, routes }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, []);

    return (
        <Routes>
            {routes?.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))}
            {isAuthenticated() && (
                children
            )}

            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    )
}

export default RoutesWithAuthentication;