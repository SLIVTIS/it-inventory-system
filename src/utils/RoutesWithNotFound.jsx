import { Route, Routes } from 'react-router-dom';

function RoutesWithNotFound({ children, routes }) {
  return (
    <Routes>
      {children}
      {routes?.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default RoutesWithNotFound;