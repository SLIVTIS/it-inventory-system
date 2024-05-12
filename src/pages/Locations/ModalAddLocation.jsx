import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import API_DOMAIN from '../../config';

function ModalAddLocation({ close }) {
    const { data, error: errorData, isLoading, fetchData } = useFetch();
    const { data: countries, error: cError, isLoading: cIsLoading, fetchData: countriesData } = useFetch();
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        name: '',
        code: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSummit = (e) => {
        e.preventDefault();
        formData.country === '' || formData.country === 'Selecciona un país' ?
            setError('Selecciona un pais') :
            fetchData(`${API_DOMAIN}/api/v1/locations`, "POST", formData);
    };

    useEffect(() => {
        if (data) {
            close(true);
        }
    }, [data]);

    useEffect(() => {
        if (errorData) {
            setError(errorData);
        } else if (cError) {
            setError(cError)
        }
    }, [errorData, cError]);

    useEffect(() => {
        countriesData(`${API_DOMAIN}/api/v1/countries`);
    }, []);
    return (
        <>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className=" bg-black bg-opacity-25 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/*Modal content*/}
                    <div className="relative bg-white rounded-lg shadow ">
                        {/*Modal header*/}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                Agregar una nueva ubicación
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
                                <div className="col-span-2">
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 ">País</label>
                                    <select
                                        id="country"
                                        onChange={handleChange}
                                        name='country'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        required
                                    >
                                        <option defaultValue="">Selecciona un país</option>
                                        {countries && countries.map(country => (
                                            <option value={country.id} key={country.id}>{country.country}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 ">Estado</label>
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe el nombre del estado"
                                        required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe el nombre de la ubicación"
                                        required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Codígo</label>
                                    <input
                                        type="text"
                                        name="code"
                                        id="code"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe el nombre de la ciudad"
                                        required></input>
                                </div>
                            </div>
                            {error && <p className='text-red-600'>{error}</p>}
                            <Button type="submit" >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                {isLoading ? "Agregando..." : "Agregar ubicación"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddLocation;