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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Biblioteca</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/libros'>Libros</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
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
