import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const go = useNavigate();

    const salir = async () => {
        localStorage.removeItem("token");
        go('/');
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Biblioteca</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/libros'>Libros</Link>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <button
                                onClick={salir}
                                type="button"
                                className="btn btn-outline-danger">
                                Salir
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
