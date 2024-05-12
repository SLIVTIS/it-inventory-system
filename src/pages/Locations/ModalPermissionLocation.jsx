import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import API_DOMAIN from '../../config';

function ModalPermissionLocation({ close, locationId, userList }) {
    const { data, error: errorData, isLoading, fetchData } = useFetch();
    const { data: users, error: uError, isLoading: uIsLoading, fetchData: usersData } = useFetch();
    const [userId, setUserId] = useState([]);
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        user: '',
        location: locationId
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
        console.log(formData);
        formData.user === '' || formData.user === 'Selecciona un usuario' ?
            setError('Selecciona un usuario') :
            fetchData(`${API_DOMAIN}/api/v1/locations/permission`, "POST", formData);
    };

    useEffect(() => {
        if (data) {
            close(null, true);
        }
    }, [data]);

    useEffect(() => {
        if (errorData) {
            setError(errorData);
        } else if (uError) {
            setError(uError)
        }
    }, [errorData, uError]);

    useEffect(() => {
        usersData(`${API_DOMAIN}/api/v1/user/permission/locations/${locationId}`);
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
                                Asignar un usuario
                            </h3>
                            <button type="button" onClick={() => close(null)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
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
                                <div className="col-span-2">
                                    <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 ">Usuarios</label>
                                    <select
                                        id="user"
                                        onChange={handleChange}
                                        name='user'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        required
                                    >
                                        <option defaultValue="">Selecciona un usuario</option>
                                        {users && users.map(user => (
                                            <option value={user.id} key={user.id}>{user.username}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {error && <p className='text-red-600'>{error}</p>}
                            <Button type="submit" >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                {isLoading ? "Asignando..." : "Asignar"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalPermissionLocation