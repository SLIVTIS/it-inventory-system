import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

function Dashboard() {

    const { data, error, isLoading, fetchData } = useFetch();

    return (
        <>
            <h1>Hola dashboard</h1>
        </>
    );
}

export default Dashboard;