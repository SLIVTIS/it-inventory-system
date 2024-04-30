import { useState, useEffect } from "react";

export function useFetchWithAbort(url, method = "GET", body = null) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);

        const requestOptions = {
            method: method,
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json" //ajustar los encabezados según sea necesario
            },
            body: body ? JSON.stringify(body) : null
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("Cancelled request");
                } else {
                    setError(error);
                }
            })
            .finally(() => setLoading(false));

        return () => abortController.abort();
    }, []);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Cancelled Request");
        }
    };

    return { data, loading, error, handleCancelRequest };
}