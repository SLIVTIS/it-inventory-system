import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import Button from '../../components/Buttons/Button.jsx';
import ModalAddStock from './ModalAddStock.jsx';
import Loader from '../../components/Loaders/Loader.jsx';
import { isAdmin } from '../../utils/userUtilities.js';
import API_DOMAIN from '../../config.js';

function StockGeneral() {
    const [admin, setAdmin] = useState(isAdmin());
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(null);
    const { data, error, isLoading, fetchData } = useFetch();

    const handleFetch = () => {
        fetchData(`${API_DOMAIN}/api/v1/stock`);
    }

    const handleShowModalEdit = (update, value) => {
        setShowModalEdit(value);
        if (update === true) {
            handleFetch();
        }
    }

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value === true) {
            handleFetch();
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);
    return (
        <>
            {showModal && <ModalAddStock close={handleShowModal} />}
            {showModalEdit && <ModalAddStock close={handleShowModalEdit} stockObject={showModalEdit} />}
            {isLoading ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-8 p-6 overflow-y-hidden">
                    <div className="flex items-center justify-between">
                        <h1 className='text-2xl font-bold'>Stock general</h1>
                        {admin && <Button onClick={handleShowModal}  >Agregar articulo</Button>}
                    </div>

                    <div className=" shadow-md sm:rounded-lg">
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
                                        Serie
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Comentario
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Activo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map(article => (
                                        <tr className="bg-white border-b  hover:bg-gray-50 " key={article.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {article.article.categorie.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {article.article.supplier.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.article.modelname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.serie}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.comment}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.active === true ? "Activo" : "Inactivo"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {admin && <button onClick={() => handleShowModalEdit(false, article)} className="font-medium text-blue-600 hover:underline">Edit</button>}
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
            )}
        </>
    )
}

export default StockGeneral