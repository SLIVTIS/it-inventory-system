import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import CardArticle from "../../components/Cards/CardArticle";
import NotificationError from "../../components/Notification/NotificationError";
import Loader from "../../components/Loaders/Loader";
import API_DOMAIN from "../../config";


function Dashboard() {
    const { data, error: fError, isLoading, fetchData } = useFetch();
    const [error, setError] = useState();

    const handleRefresh = () => {
        fetchData(`${API_DOMAIN}/api/v1/state/pending`);
    }

    const handleStateChange = (value) => {
        if (value) {
            handleRefresh();
        }
    }

    const handleStateError = (value) => {
        if (value) {
            setError(value)
        }
    }

    const handleCloseNotificacion = () => {
        setError(null);
    }

    useEffect(() => {
        handleRefresh();
    }, []);


    useEffect(() => {
        setError(fError);
    }, [fError]);
    return (
        <>
            <div className='relative'>
                {error && <div className="w-full grid place-content-center absolute">
                    <NotificationError onClick={handleCloseNotificacion} >{error}</NotificationError>
                </div>}
            </div>

            {isLoading ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <section>
                    <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
                        {data && data.length > 0 ? data.map(movement => (
                            <CardArticle movement={movement} onChange={handleStateChange} onStateError={handleStateError} key={movement.id} />
                        )) : <p>No hay movimientos pendientes</p>
                        }
                    </div>
                </section>
            )}
        </>
    );
}

export default Dashboard;