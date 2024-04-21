import React, {useState} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
function LibroCreate() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {

        if(name === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombre!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(description === ""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Descripción!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        setIsSaving(true);
        let token = localStorage.getItem("token");
        axios.post('/api/libros/register', {
            Nombre: name,
            Descripcion: description
          },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Libro Creado Correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('')
            setDescription('')
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
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Crear Nuevo Libro</h2>
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
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea 
                                    value={description}
                                    onChange={(event)=>{setDescription(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default LibroCreate;