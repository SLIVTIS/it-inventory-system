
import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import Button from '../../components/Buttons/Button.jsx';
import ModalAddCountry from './ModalAddCountry.jsx';
import Loader from '../../components/Loaders/Loader.jsx';

function Countries() {
    const [showModal, setShowModal] = useState(false);
    const { data, error, isLoading, fetchData } = useFetch();

    useEffect(() => {
        fetchData("https://it-inventory-api.up.railway.app/api/v1/countries");
    }, []);

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value === true) {
            fetchData("https://it-inventory-api.up.railway.app/api/v1/countries");
        }
    };

    return (
        <>

            {showModal && <ModalAddCountry close={handleShowModal} />}
            {isLoading ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-8 p-6">
                    <div className="flex items-center justify-between">
                        <h1 className='text-2xl font-bold'>País</h1>
                        <Button onClick={handleShowModal}  >Agregar país</Button>
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
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map(country => (
                                        <tr className="bg-white border-b  hover:bg-gray-50 " key={country.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {country.code}
                                            </th>
                                            <td className="px-6 py-4">
                                                {country.country}
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
            )}
        </>
    )
}

export default Countries