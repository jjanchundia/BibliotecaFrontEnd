import React,{ useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 
 
  
function ProjectList() {
    const  [projectList, setProjectList] = useState([])
  
    useEffect(() => {
        fetchProjectList()
    }, [])
  
    const fetchProjectList = () => {
        axios.get('/api/libros')
        .then(function (response) {
          setProjectList(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (id) => {
        alert(id)
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
                axios.delete(`/api/libros/delete/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Libro Eliminado Correctamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchProjectList()
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
                            to="/create">Ingresar Nuevo Libro
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
                                {projectList.map((project, key)=>{
                                    return (
                                        <tr key={project.libroId}>
                                            <td>{project.nombre}</td>
                                            <td>{project.descripcion}</td>
                                            <td>
                                                {project.estado === 'L' ? 'Libre' : project.estado === 'P' ?
                                                 'Prestado' : project.estado}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/show/${project.libroId}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${project.libroId}`}>
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={()=>handleDelete(project.libroId)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
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
  
export default ProjectList;
