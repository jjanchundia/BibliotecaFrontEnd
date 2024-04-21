import React from 'react';

function NotFound() {
  return (
    <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: '100vh' }}>
      <div className="container text-center">
        <h1 className="mb-4">404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
      </div>
    </div>
  );
}

export default NotFound;
