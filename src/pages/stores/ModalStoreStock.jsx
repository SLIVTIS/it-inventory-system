import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import API_DOMAIN from '../../config';

function ModalStoreStock({ close, storeId, title }) {
    const { data, error: errorData, isLoading, fetchData } = useFetch();
    const { data: articles, error: aError, isLoading: aIsLoading, fetchData: articlesData } = useFetch();
    const [error, setError] = useState();
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        if (selectedIds.includes(value)) {
            // Si el ID ya está en el array, elimínalo
            setSelectedIds(selectedIds.filter(item => item !== value));
        } else {
            // Si el ID no está en el array, agrégalo
            setSelectedIds([...selectedIds, value]);
        }
    };

    const handleSummit = (e) => {
        e.preventDefault();
        if (selectedIds.length > 0) {
            const data = {
                storeId: storeId,
                stock: selectedIds
            }
            fetchData(`${API_DOMAIN}/api/v1/stock-store`, "POST", data);
        } else {
            close(false);
        }
    };

    useEffect(() => {
        if (data) {
            close(true);
        }
    }, [data]);

    useEffect(() => {
        if (errorData) {
            setError(errorData);
        } else if (aError) {
            setError(aError)
        }
    }, [errorData, aError]);

    useEffect(() => {
        articlesData(`${API_DOMAIN}/api/v1/stock/unassigned`);
    }, []);
    return (
        <>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className=" bg-black bg-opacity-25 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative p-4 w-full max-w-5xl max-h-full">
                    {/*Modal content*/}
                    <div className="relative bg-white rounded-lg shadow ">
                        {/*Modal header*/}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                Asignar equipos a {title}
                            </h3>
                            <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/*Modal body*/}
                        <form className="p-4 md:p-5" onSubmit={handleSummit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                                    </div>
                                                </th>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {articles && articles.length > 0 ? (
                                                articles.map(article => (
                                                    <tr className="bg-white border-b  hover:bg-gray-50 " key={article.id}>
                                                        <td className="w-4 p-4">
                                                            <div className="flex items-center">
                                                                <input
                                                                    id="article"
                                                                    value={article.id}
                                                                    onChange={handleCheckboxChange}
                                                                    type="checkbox"
                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                                                <label htmlFor="article" className="sr-only">checkbox</label>
                                                            </div>
                                                        </td>
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
                            {error && <p className='text-red-600'>{error}</p>}
                            <Button type="submit" >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                {isLoading ? "Agregando..." : "Agregar local"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalStoreStock