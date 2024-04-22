import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'

function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (usuario === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Usuario!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (password === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Contraseña!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        axios.post('/api/usuarios/login',{
            username: usuario,
            password: password
        }).then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido al sistema!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setUsuario('')
                setPassword('')

                // Almacenamos el token en nuestro localstorage para usarlo en las 
                // demas peticiones mas adelante
                localStorage.setItem("token", response.data.value.token);
                console.log(localStorage.getItem("token"));
                navigate('/libros'); // Redireccionamos a la página de libros
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado!',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(error);
            });
    }

    return (
        <div className="container mt-5">
            <h1>Iniciar Sesión</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default Login;