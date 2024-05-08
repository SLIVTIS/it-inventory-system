import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import Button from '../../components/Buttons/Button.jsx';
import ModalAddStore from './ModalAddStore.jsx';
import CardStore from '../../components/Cards/CardStore.jsx';
import Loader from '../../components/Loaders/Loader.jsx';

function Store() {
    const [showModal, setShowModal] = useState(false);
    const { data, error, isLoading, fetchData } = useFetch();

    useEffect(() => {
        fetchData("https://it-inventory-api.up.railway.app/api/v1/stores");
    }, []);

    const handleShowModal = (value) => {
        setShowModal(!showModal);
        if (value === true) {
            fetchData("https://it-inventory-api.up.railway.app/api/v1/stores");
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
                <section className="w-full py-2">
                    <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-4xl mx-auto">
                        <div className="grid gap-4 md:gap-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold tracking-tight">Locales</h1>
                                <Button onClick={handleShowModal}  >Agregar local</Button>
                            </div>
                            <div className="grid gap-4 md:gap-6">
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