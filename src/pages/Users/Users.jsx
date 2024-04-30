import React, { useEffect } from 'react'
import "./Users.css";
import UserList from '../../components/UserList/UserList';
import useFetch from '../../hooks/useFetch';
import Button from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

function Users() {
    const navigate = useNavigate();
    const { data: admins, error: errorAdmins, isLoading: isLoadingAdmins, fetchData: fetchAdmins } = useFetch();
    const { data: users, error: errorUsers, isLoading: isLoadingUsers, fetchData: fetchUsers } = useFetch();

    // Llamar a la función fetchData cuando el componente se monta
    React.useEffect(() => {
        fetchAdmins("https://it-inventory-api.up.railway.app/api/v1/admin");
        fetchUsers("https://it-inventory-api.up.railway.app/api/v1/admin/users");
        //fetchAdmins("http://localhost:4000/api/v1/admin");
        //fetchUsers("http://localhost:4000/api/v1/admin/users");
    }, []); // Solo se llama al montar el componente

    const handleNavigate = () => {
        navigate("/users/adduser");
    };

    return (
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
    )
}

export default Users