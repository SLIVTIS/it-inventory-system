
import React, { useEffect, useState } from 'react'
import Table from '../../components/Tables/Table'
import useFetch from '../../hooks/useFetch'
import Button from '../../components/Buttons/Button.jsx'
import ModalAddModel from '../Models/ModalAddModel.jsx';
import ModalAddCategorie from '../../components/Modals/ModalAddCategorie.jsx';

function Countries() {
    const [showModal, setShowModal] = useState();
    const { data, error, isLoading, fetchData } = useFetch();

    useEffect(() => {
        fetchData("http://localhost:4000/api/v1/suppliers");
    }, []);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>

            {showModal && <ModalAddModel close={handleShowModal} />}
            {showCategorie && <ModalAddCategorie />}
            <div className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                    <h1 className='text-2xl font-bold'>Modelos</h1>
                    <Button onClick={handleShowModal}  >Agregar modelo</Button>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Código
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Activo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Creado
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map(model => (
                                    <tr className="bg-white border-b  hover:bg-gray-50 " key={model.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {model.code}
                                        </th>
                                        <td className="px-6 py-4">
                                            {model.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {model.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {model.active === true ? "Activo" : "Inactivo"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {model.createdAt}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="list-empty">No hay proveedores registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Countries