export function formatDate(dateString, isHours = true) {
    // Convertir la cadena a un objeto Date
    const date = new Date(dateString);

    // Obtener los componentes de la fecha
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (!isHours) {
        return `${day}/${month}/${year}`;
    }

    // Devolver la fecha formateada
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}