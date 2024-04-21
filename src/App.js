import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NotFound from "./components/NotFound"
import LibroList from "./pages/LibroList"
import LibroCreate from "./pages/LibroCreate"
import Login from "./components/Login"
// import LibroEdit from "./pages/LibroEdit"
// import LibroShow from "./pages/LibroShow"

function App() {
  const isAuthenticated = () => {
    // Verificar si el usuario está autenticado, por ejemplo, verificamos si hay un token en localStorage
    return localStorage.getItem('token') !== null;
  };

  const PrivateRoute = ({ element, ...props }) => {
    return isAuthenticated() ? (
      // Si el usuario está autenticado, renderiza el componente
      element
    ) : (
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      <Navigate to="/"/>
    );
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route exact path="/libros" element={<LibroList />} />
        <Route path="/libros/create" element={<LibroCreate />} /> */}
        {/* Utiliza el componente PrivateRoute para proteger las rutas */}
        <Route path="/libros" element={<PrivateRoute element={<LibroList />} />} />
        <Route path="/libros/create" element={<PrivateRoute element={<LibroCreate />} />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/edit/:id"  element={<LibroEdit/>} />
          <Route path="/show/:id"  element={<LibroShow/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;