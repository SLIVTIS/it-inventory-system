import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import ModalAddSupplier from './ModalAddSupplier';

function Suppliers() {
    const navigate = useNavigate();
    const { data, error, isLoading, fetchData } = useFetch();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value) {
            fetchData("https://it-inventory-api.up.railway.app/api/v1/suppliers");
        }
    };

    useEffect(() => {
        fetchData("https://it-inventory-api.up.railway.app/api/v1/suppliers");
    }, []);

    return (
        <>
            {showModal && <ModalAddSupplier close={handleShowModal} />}
            <div className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                    <h1 className='text-2xl font-bold'>Proveedores</h1>
                    <Button onClick={handleShowModal}  >Agregar proveedor</Button>
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
                                    Teléfono
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
                                data.map(supplier => (
                                    <tr className="bg-white border-b  hover:bg-gray-50 " key={supplier.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {supplier.code}
                                        </th>
                                        <td className="px-6 py-4">
                                            {supplier.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {supplier.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {supplier.telephone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {supplier.active === true ? "Activo" : "Inactivo"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {supplier.createdAt}
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

export default Suppliers