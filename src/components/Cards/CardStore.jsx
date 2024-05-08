import React from 'react'
import example from "../../assets/images/login-bg.jpg";
import { Link } from 'react-router-dom';

function CardStore({ store }) {
    return (
        <>
            <Link
                to={`/store/${store.id}/${store.code}`}
                className="rounded-lg border bg-card text-card-foreground shadow-sm grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center"
                data-v0-t="card"
            >
                <img
                    src={example}
                    alt="Item Image"
                    width="200"
                    height="200"
                    className="rounded-lg object-cover w-full aspect-square"
                />
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <h3 className="font-semibold text-lg">{store.code + " " + store.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{store.address ? store.location.code + " " + store.address : store.location.code}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <div>
                            <span className="font-medium">Creado:</span> <span>{store.createdAt}</span>
                        </div>
                        <div>
                            <span className="font-medium">Actualizado:</span> <span>{store.updatedAt}</span>
                        </div>
                        <div>
                            <span className="font-medium">Estado:</span>{" "}
                            <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-1">
                                {store.active ? "Activo" : "Inactivo"}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CardStore