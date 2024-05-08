import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';

function ModalAddStore({ close }) {
    const { data, error: errorData, isLoading, fetchData } = useFetch();
    const { data: locations, error: lError, isLoading: lIsLoading, fetchData: locationData } = useFetch();
    const [error, setError] = useState();
    const [hostelery, setHostelery] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        state: '',
        name: '',
        code: '',
        isHostelery: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleHostelery = () => {
        setFormData(prevState => ({
            ...prevState,
            ['isHostelery']: !hostelery
        }));
        setHostelery(!hostelery);
    }

    const handleSummit = (e) => {
        e.preventDefault();


        formData.location === '' || formData.location === 'Selecciona una ubicación' ?
            setError('Selecciona una ubicación') :
            fetchData("https://it-inventory-api.up.railway.app/api/v1/stores", "POST", formData);
    };

    useEffect(() => {
        if (data) {
            close(true);
        }
    }, [data]);

    useEffect(() => {
        if (errorData) {
            setError(errorData);
        } else if (lError) {
            setError(lError)
        }
    }, [errorData, lError]);

    useEffect(() => {
        locationData("https://it-inventory-api.up.railway.app/api/v1/locations");
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
                                Agregar un nuevo local
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
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 ">Ubicación</label>
                                    <select
                                        id="location"
                                        onChange={handleChange}
                                        name='location'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        required
                                    >
                                        <option defaultValue="">Selecciona una ubicación</option>
                                        {locations && locations.map(location => (
                                            <option value={location.id} key={location.id}>{location.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe el nombre del local"
                                        required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Dirección</label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe una dirección"
                                    ></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Codígo</label>
                                    <input
                                        type="text"
                                        name="code"
                                        id="code"
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="Escribe un codigo para el local"
                                        required></input>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex items-center mb-4">
                                        <input
                                            id="hostelery"
                                            type="checkbox"
                                            value={true}
                                            onChange={handleHostelery}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="hostelery" className="ms-2 text-sm font-medium text-gray-900 ">¿Es de hosteleria?</label>
                                    </div>
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

export default ModalAddStore