import React, { useEffect, useState } from 'react'
import Button from '../../components/Buttons/Button'
import useFetch from '../../hooks/useFetch';
import ModalAddModel from './ModalAddModel';

function Models() {
    const [showModal, setShowModal] = useState(false);
    const { data, error, isLoading, fetchData } = useFetch();

    useEffect(() => {
        fetchData("https://it-inventory-api.up.railway.app/api/v1/articles");
    }, []);

    const handleShowModal = (value) => {
        if (value) {
            fetchData("https://it-inventory-api.up.railway.app/api/v1/articles");
        }
        setShowModal(!showModal);
    };
    return (<>

        {showModal && <ModalAddModel close={handleShowModal} />}
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
                                Equipo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Marca
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Modelo
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
                                        {model.categorie.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {model.supplier.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {model.modelname}
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

export default Models;