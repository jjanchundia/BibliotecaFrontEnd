import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"

function LibroList() {
    const [LibroList, setLibroList] = useState([])
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetchLibroList()
    }, [])

    const fetchLibroList = () => {
        axios.get('/api/libros', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                setLibroList(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handlePrestar = (id) => {
        Swal.fire({
            title: 'Está seguro de Prestar Libro?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Prestar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/libros/prestar', {
                    libroId: id
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                ).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Libro Prestado Correctamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchLibroList()
                })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const handleDevolver = (id) => {
        Swal.fire({
            title: 'Está seguro de Devolver Libro?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Devolver!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/libros/devolver', { libroId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Libro Devuelto Correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchLibroList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Está seguro de eliminar Libro?',
            text: "Acción no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/libros/delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Libro Eliminado Correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchLibroList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Listado de Libros</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/libros/create">Ingresar Nuevo Libro
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th width="240px">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LibroList.map((Libro, key) => {
                                    return (
                                        <tr key={Libro.libroId}>
                                            <td>{Libro.nombre}</td>
                                            <td>{Libro.descripcion}</td>
                                            <td>
                                                {Libro.estado === 'L' ? 'Libre' : Libro.estado === 'P' ?
                                                    'Prestado' : Libro.estado}
                                            </td>
                                            <td>
                                                {/* <Link
                                                    to={`/show/${Libro.libroId}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${Libro.libroId}`}>
                                                    Edit
                                                </Link> */}
                                                {Libro.estado === 'L' ? (
                                                    <button
                                                        onClick={() => handlePrestar(Libro.libroId)}
                                                        className="btn btn-outline-primary mx-1">
                                                        Prestar
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDevolver(Libro.libroId)}
                                                        className="btn btn-outline-warning mx-1">
                                                        Devolver
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(Libro.libroId)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Eliminar
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LibroList;
