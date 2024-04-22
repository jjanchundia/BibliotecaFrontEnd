import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"

function LibroShow() {
    const [id, setId] = useState(useParams().id)
    const [isSuccess, setIsSuccess] = useState(false)
    const [libro, setLibro] = useState({ name: '', description: '' })
    let token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`/api/libros/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
                if (response.data.isSuccess === false) {
                    Swal.fire({
                        icon: 'error',
                        title: response.data.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsSuccess(false);
                    return;
                } else {
                    setLibro(response.data.value);
                    setIsSuccess(true);
                }
                console.log(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            {isSuccess === true ?
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Libros</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/libros"> Ver todos los Libros
                            </Link>
                        </div>
                        <div className="card-body">
                            <b className="text-muted">Nombre:</b>
                            <p>{libro.nombre}</p>
                            <b className="text-muted">Descripción:</b>
                            <p>{libro.descripcion}</p>
                            <b className="text-muted">Estado:</b>
                            <p>{libro.estado === 'L' ? 'Libre' : libro.estado === 'P' ?
                                'Prestado' : libro.estado}</p>
                        </div>
                    </div>
                </div>
                : <NotFound></NotFound>}
        </Layout>
    );
}

export default LibroShow;