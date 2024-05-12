import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import Button from '../../components/Buttons/Button.jsx';
import ModalAddStore from './ModalAddStore.jsx';
import CardStore from '../../components/Cards/CardStore.jsx';
import Loader from '../../components/Loaders/Loader.jsx';
import { isAdmin } from '../../utils/userUtilities.js';
import API_DOMAIN from '../../config.js';

function Store() {
    const [admin, setAdmin] = useState(isAdmin());
    const [showModal, setShowModal] = useState(false);
    const { data, error, isLoading, fetchData } = useFetch();


    useEffect(() => {
        fetchData(`${API_DOMAIN}/api/v1/stores`);
    }, []);

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value === true) {
            fetchData(`${API_DOMAIN}/api/v1/stores`);
        }
    };


    return (
        <>

            {showModal && <ModalAddStore close={handleShowModal} />}
            {isLoading ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <section>
                    <div className="container">
                        <div className="grid gap-4 md:gap-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold tracking-tight">Locales</h1>
                                {admin && <Button onClick={handleShowModal}  >Agregar local</Button>}
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {data && data.length > 0 ? (
                                    data.map(store => (
                                        <CardStore store={store} key={store.id} />
                                    ))
                                ) : (
                                    <div>
                                        <p className="list-empty">No hay proveedores registrados.</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Store