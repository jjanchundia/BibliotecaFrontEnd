import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LibroList from "./pages/LibroList"
import LibroCreate from "./pages/LibroCreate"
import Login from "./components/Login"
// import LibroEdit from "./pages/LibroEdit"
// import LibroShow from "./pages/LibroShow"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/libros" element={<LibroList />} />
        <Route path="/libros/create" element={<LibroCreate />} />
        {/* <Route path="/edit/:id"  element={<LibroEdit/>} />
          <Route path="/show/:id"  element={<LibroShow/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;