import React, { useEffect } from 'react'
import Label from '../../components/Label'
import Button from '../../components/Buttons/Button'
import Input from '../../components/Inputs/Input'
import RadioGroup from '../../components/RadioGroup'
import RadioGroupItem from '../../components/RadioGroupItem'
import placeholderImage from '../../assets/images/placeholder.svg';
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import NotificationSucces from '../../components/Notification/NotificationSucces'
import NotificationError from '../../components/Notification/NotificationError'


function AddUser() {
    const { data, error, isLoading, fetchData } = useFetch();
    const [flag, setFlag] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState("user");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passCorrect, setPassCorrect] = useState(false);

    const handlePermissionChange = (value) => {
        setSelectedPermission(value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };


    const handleConfirmPassChange = (e) => {
        setConfirmPass(e.target.value);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            username: username,
            email: email,
            password: password,
            permissions: selectedPermission
        };
        if (passCorrect) {
            fetchData("https://it-inventory-api.up.railway.app/api/v1/admin", 'POST', body);
        } else {
            console.log("Las contraseñas no coinciden");
        }

    };

    useEffect(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setPassCorrect(false);

        if (data) {
            const timeout = setTimeout(() => {
                setFlag(true);
                setTimeout(() => {
                    setFlag(false);
                }, 5000);
            }, 0); // Delay de 0 para ejecutarlo inmediatamente
            return () => clearTimeout(timeout); // Limpia el timeout en caso de que el componente se desmonte antes de que se complete
        }

    }, [data]);

    useEffect(() => {
        if (confirmPass === password) {
            setPassCorrect(true);
        } else {
            setPassCorrect(false);
        }
    }, [confirmPass]);

    const handleCloseNotification = () => {
        setFlag(false);
    }

    return (
        <div className='relative'>
            {flag && <div className="w-full grid place-content-center absolute">
                <NotificationSucces onClick={handleCloseNotification}>Usuario agregado correctamente</NotificationSucces>
            </div>}
            {error && <div className="w-full grid place-content-center absolute">
                <NotificationError onClick={handleCloseNotification}>{error}</NotificationError>
            </div>}
            <div key="1" className="mx-auto max-w-md space-y-6">

                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Crear una cuenta</h1>
                    <p className="text-gray-500 dark:text-gray-400">Complete el formulario.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <div className="flex items-center justify-center">
                                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                                    <img
                                        alt="Avatar"
                                        className="h-full w-full object-cover"
                                        height="96"
                                        src={placeholderImage}
                                        style={{
                                            aspectRatio: "96/96",
                                            objectFit: "cover",
                                        }}
                                        width="96"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-white opacity-0 transition-opacity hover:opacity-100">
                                        <UploadIcon className="h-6 w-6" />
                                        <input className="absolute inset-0 cursor-pointer opacity-0" id="avatar" type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Ingrese su nombre de usuario" value={username} onChange={handleUsernameChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Introduce tu correo electrónico" value={email} onChange={handleEmailChange} required type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" placeholder="Ingresa tu contraseña" value={password} onChange={handlePassChange} required type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                            <Input id="confirm-password" placeholder="Confirma la contraseña" value={confirmPass} onChange={handleConfirmPassChange} required type="password" />
                            {!passCorrect && <p className='text-xs text-red-600'>Las contraseñas no coinciden</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Permisos</Label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroup name="permissions" onChange={handlePermissionChange} defaultValue="user">
                                        <RadioGroupItem id="user" value="user">
                                            <Label htmlFor="user">Usuario</Label>
                                        </RadioGroupItem>
                                        <RadioGroupItem id="admin" value="admin">
                                            <Label htmlFor="admin">Administrador</Label>
                                        </RadioGroupItem>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full" type="submit" onClick={handleSubmit}>
                        {isLoading ? "Agregando..." : "Agregar"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}

export default AddUser