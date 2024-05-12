import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import Button from '../../components/Buttons/Button.jsx';
import { useParams } from 'react-router-dom';
import ModalStoreStock from './ModalStoreStock.jsx';
import Loader from '../../components/Loaders/Loader.jsx';
import ModalResponsive from './ModalResponsive.jsx';
import ModalReassign from './ModalReassign.jsx';
import { isAdmin } from '../../utils/userUtilities.js';
import CloseIcon from '@mui/icons-material/Close';
import ModalAssignUser from './ModalAssignUser.jsx';
import API_DOMAIN from '../../config.js';

function StoreStock() {
    const [admin, setAdmin] = useState(isAdmin());
    const { storeId, title } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showModalResponsive, setShowModalResponsive] = useState(false);
    const [showModalReassign, setShowModalReassign] = useState(null);
    const [showModalUser, setShowModalUser] = useState(null);
    const [users, setUsers] = useState([]);
    const { data, error, isLoading, fetchData } = useFetch();
    const { data: resetState, error: rError, isLoading: rIsLoading, fetchData: resetStateData } = useFetch();
    const { data: store, error: sError, isLoading: sIsLoading, fetchData: storeData } = useFetch();
    const { data: unassign, error: uError, isLoading: uIsLoading, fetchData: unassignData } = useFetch();

    const handleFetch = () => {
        fetchData(`${API_DOMAIN}/api/v1/stock/${storeId}`);
    }
    const handleFetchStore = () => {
        storeData(`${API_DOMAIN}/api/v1/stores/${storeId}`);
    }
    const handleFetchReset = (value) => {
        const formData = {
            stateId: value.statusId,
            status: value.status,
        }
        resetStateData(`${API_DOMAIN}/api/v1/state/reset`, 'PATCH', formData);
    }
    const handleUnassign = (value) => {
        unassignData(`${API_DOMAIN}/api/v1/stores/permission/${value}`, 'DELETE');
    }

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value === true) {
            handleFetch();
        }
    };

    const handleShowModalUser = (value, update) => {
        setShowModalUser(value);
        if (update === true) {
            handleFetchStore();
        }
    }

    const handleShowModalReassign = (value, update) => {
        setShowModalReassign(value);
        if (update === true) {
            handleFetch();
        }
    };

    const handleShowModalResponsive = () => {
        setShowModalResponsive(!showModalResponsive);
    };

    useEffect(() => {
        handleFetch();
        handleFetchStore();
    }, []);

    useEffect(() => {
        if (store) {
            setUsers(store.user);
        }

    }, [store]);

    useEffect(() => {
        if (unassign) {
            handleFetchStore();
        }
    }, [unassign]);

    useEffect(() => {
        if (resetState) {
            handleFetch();
        }
    }, [resetState]);
    return (
        <>
            {showModal && <ModalStoreStock close={handleShowModal} storeId={storeId} title={title} />}
            {showModalReassign && <ModalReassign close={handleShowModalReassign} storeId={storeId} article={showModalReassign} />}
            {showModalResponsive && <ModalResponsive close={handleShowModalResponsive} storeId={storeId} />}
            {showModalUser && <ModalAssignUser close={handleShowModalUser} storeId={showModalUser} usersList={users} />}
            {isLoading ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-8 p-6">
                    <div className="flex items-center justify-between">
                        <h1 className='text-2xl font-bold'>{title}</h1>
                        <div>
                            <Button onClick={handleShowModalResponsive}  >Responsiva</Button>
                            {admin && <Button className={'mx-2'} onClick={handleShowModal}  >Asignar equipos</Button>}
                            {admin && <Button onClick={() => handleShowModalUser(storeId)}  >Asignar tecnico</Button>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="text-sm text-gray-600">Sucursal: {store && store.name}</p>
                        <p className="text-sm text-gray-600">Ubicación: {store && store.location.code}</p>
                        <div className="text-sm text-gray-600">
                            <p>Usuarios asignados:</p>
                            {users && users.length > 0 ? users.map(user => {
                                return <div key={user.User.id}>
                                    <span>{user.User.username} </span>
                                    {admin && <button className=' text-red-700' onClick={() => handleUnassign(user.id)}>
                                        <CloseIcon className='p-0.5' />
                                    </button>}
                                </div>
                            }) : 'No hay usuarios asignados'}

                        </div>
                        <p className="text-sm text-gray-600">Dirección: {store && store.address}</p>
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
                                        Serie
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Estado
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Comentario
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map(article => (
                                        <tr className="bg-white border-b  hover:bg-gray-50 " key={article.stockStoreId}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {article.categorie}
                                            </th>
                                            <td className="px-6 py-4">
                                                {article.supplier}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.modelname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.serie}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.comment}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {article.status === 'rechazada' && admin && <button
                                                    onClick={() => handleFetchReset(article)}
                                                    className='mx-2 font-medium text-blue-600 hover:underline'
                                                >Reenviar</button>}
                                                <button
                                                    onClick={() => handleShowModalReassign(article)}
                                                    className='mx-2 font-medium text-blue-600 hover:underline'
                                                >Reasignar</button>
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

export default StoreStock