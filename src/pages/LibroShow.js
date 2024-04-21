import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"


function LibroShow() {
    const [id, setId] = useState(useParams().id)
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
                setLibro(response.data.value)
                console.log(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
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
        </Layout>
    );
}

export default LibroShow;