import React, { useEffect } from 'react'
import "./Users.css";
import UserList from '../../components/UserList/UserList';
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loaders/Loader';
import API_DOMAIN from '../../config';

function Users() {
    const navigate = useNavigate();
    const { data: admins, error: errorAdmins, isLoading: isLoadingAdmins, fetchData: fetchAdmins } = useFetch();
    const { data: users, error: errorUsers, isLoading: isLoadingUsers, fetchData: fetchUsers } = useFetch();

    // Llamar a la función fetchData cuando el componente se monta
    React.useEffect(() => {
        fetchAdmins(`${API_DOMAIN}/api/v1/admin`);
        fetchUsers(`${API_DOMAIN}/api/v1/admin/users`);
    }, []); // Solo se llama al montar el componente

    const handleNavigate = () => {
        navigate("/users/adduser");
    };

    return (
        <>
            {isLoadingAdmins || isLoadingUsers ? (
                <div className='w-full h-full grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <div className="user-container">
                    <div className="user-header">
                        <h1 className='text-2xl font-bold'>Gestión de usuarios</h1>
                        <Button onClick={handleNavigate} >Agregar usuario</Button>
                    </div>
                    <div className="grid">
                        <UserList title='Administradores' list={admins} />
                        <UserList title='Usuarios' list={users} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Users