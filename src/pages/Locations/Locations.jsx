import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch.js'
import Button from '../../components/Buttons/Button.jsx'
import ModalAddLocation from './ModalAddLocation.jsx';
import Loader from '../../components/Loaders/Loader.jsx';
import ModalPermissionLocation from './ModalPermissionLocation.jsx';
import CloseIcon from '@mui/icons-material/Close';
import API_DOMAIN from '../../config.js';

function Locations() {
    const [showModal, setShowModal] = useState(false);
    const [modalPermission, setModalPermission] = useState(null);
    const { data, error, isLoading, fetchData } = useFetch();
    const { data: permission, error: pError, isLoading: pIsLoading, fetchData: permissionData } = useFetch();

    const handleFetch = () => {
        fetchData(`${API_DOMAIN}/api/v1/locations`);
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value === true) {
            handleFetch();
        }
    };

    const handleUnassign = (value) => {
        permissionData(`${API_DOMAIN}/api/v1/locations/permission/`, 'DELETE', { id: value });
    }

    useEffect(() => {
        if (permission) {
            handleFetch();
        }
    }, [permission]);

    const handleModalPermission = (value, update) => {
        setModalPermission(value);
        if (update === true) {
            handleFetch();
        }
    }
    return (
        <>
            {showModal && <ModalAddLocation close={handleShowModal} />}
            {modalPermission && <ModalPermissionLocation close={handleModalPermission} locationId={modalPermission} />}
            {isLoading ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-8 p-6">
                    <div className="flex items-center justify-between">
                        <h1 className='text-2xl font-bold'>Ubicaciones</h1>
                        <Button onClick={handleShowModal}  >Agregar ubicación</Button>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Codigo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        País
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Estado
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Asignado
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map(location => (
                                        <tr className="bg-white border-b  hover:bg-gray-50 " key={location.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {location.code}
                                            </th>
                                            <td className="px-6 py-4">
                                                {location.Country.code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {location.state}
                                            </td>
                                            <td className="px-6 py-4">
                                                {location.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div >
                                                    {location.user && location.user.length > 0 && location.user.map(user => (
                                                        <div key={user.id}>
                                                            <button className=' text-red-700' onClick={() => handleUnassign(user.id)}>
                                                                <CloseIcon className='p-0.5' />
                                                            </button>
                                                            <span key={user.id}>{user.User.username}</span>
                                                        </div>

                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className='px-2' onClick={() => handleModalPermission(location.id)}>Asignar</button>
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

export default Locations