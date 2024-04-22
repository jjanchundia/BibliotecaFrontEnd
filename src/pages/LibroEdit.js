import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"

function LibroEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    let token = localStorage.getItem("token");
    const go = useNavigate();

    useEffect(() => {
        axios.get(`/api/libros/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
                console.log(response);
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
                    let libro = response.data.value;
                    setName(libro.nombre);
                    setDescription(libro.descripcion);
                    console.log(libro);
                    setIsSuccess(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }, [])

    const handleSave = () => {

        if (name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombre!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (description === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Descripción!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        setIsSaving(true);
        axios.post(`/api/Libros/edit`, {
            libroId: id,
            nombre: name,
            descripcion: description
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Libro actualizado correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);

                go('/libros');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }


    return (
        <Layout>
            { isSuccess === true ?
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Editar Libro</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/libros">Ver todos los Libros
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Actualizar Libro
                            </button>
                        </form>
                    </div>
                </div>
            </div>
             : <NotFound></NotFound> }
        </Layout>
    );
}

export default LibroEdit;