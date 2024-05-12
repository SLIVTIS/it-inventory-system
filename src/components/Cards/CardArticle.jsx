import { Link } from "react-router-dom";
import example from "../../assets/images/ps3316e.png";
import { formatDate } from "../../utils/formatDate";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loaders/Loader";
import { useEffect, useState } from "react";
import API_DOMAIN from "../../config";

function CardArticle({ movement, onChange, onStateError }) {
    const { data, error, isLoading, fetchData } = useFetch();

    const handleUpdate = (value) => {
        const formData = {
            stateId: movement.id,
            status: value
        }
        fetchData(`${API_DOMAIN}/api/v1/state`, "PATCH", formData);
    }

    useEffect(() => {
        if (data) {
            onChange(true);
        }

        if (error) {
            onStateError(error);
        }
    }, [data, error]);

    return (
        <Link
            className=" rounded-lg border bg-card text-card-foreground shadow-md block md:flex md:max-h-28 items-center overflow-hidden"
            data-v0-t="card"
        >
            <img
                src={example}
                alt="Item Image"
                width="60"
                height="60"
                className="object-cover aspect-square w-full max-w-28"
            />
            <div className="w-full grid sm:grid-cols-2 p-4">
                <div className="grid">
                    <h3 className="font-semibold text-lg">{movement.stockMovement.store.code}</h3>
                    <p className="text-gray-500 text-xs">{"Marca: " + movement.stockMovement.stock.article.supplier.name}</p>
                    <p className="text-gray-500 text-xs">{"Modelo: " + movement.stockMovement.stock.article.modelname}</p>
                    <p className="text-gray-500 text-xs">{"Serie: " + movement.stockMovement.stock.serie}</p>
                    <div className="inline-flex w-fit items-center whitespace-nowrap rounded-md border text-white bg-green-600 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-0">
                        {movement.status}
                    </div>
                </div>
                <div className="grid text-sm text-gray-500 ">
                    <div className="h-full flex flex-col items-end justify-between">
                        <p className="text-xs">{formatDate(movement.created_at)}</p>
                        {isLoading ?
                            (<Loader />) :
                            (<div className="grid grid-cols-2 gap-2">
                                <button className="text-red-500" onClick={() => handleUpdate('rechazada')}>Rechazar</button>
                                <button className="text-green-500" onClick={() => handleUpdate('aceptada')}>Confirmar</button>
                            </div>)}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardArticle