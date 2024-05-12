import { useState } from 'react';

function useFetch() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (url, method = 'GET', body = null, isDownload = false) => {
        try {
            // Configura el estado para indicar que la solicitud está en curso
            setIsLoading(true);

            let headers = {
                "Content-Type": "application/json"
            }

            const user = JSON.parse(localStorage.getItem('user'));
            if (user !== null) {
                headers["Authorization"] = "Bearer " + user.token;
            }
            // Configura las opciones de la solicitud Fetch
            const options = {
                method,
                headers: headers,
                body: body ? JSON.stringify(body) : null
            };

            // Realiza la solicitud Fetch
            const response = await fetch(url, options);

            // Verifica si la solicitud fue exitosa
            if (response.ok) {
                // Parsea la respuesta JSON
                if (isDownload) {
                    const doc = await response.blob();
                    setData(doc);
                } else {
                    const data = await response.json();
                    setData(data);
                }
                setError(null);
            } else {
                // Si la solicitud no fue exitosa, lanza un error con el mensaje de error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la solicitud');
            }
        } catch (error) {
            // Captura cualquier error que ocurra durante la solicitud
            setError(error.message);
        } finally {
            // Configura el estado para indicar que la solicitud ha terminado
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, fetchData };
}

export default useFetch;