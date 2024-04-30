function getInitials(cadena) {
    // Dividir la cadena en palabras
    const palabras = cadena.split(' ');

    // Crear un array para almacenar las iniciales
    const iniciales = [];

    // Iterar sobre las palabras y obtener la primera letra de cada una
    palabras.forEach(palabra => {
        // Asegurarse de que la palabra no esté vacía
        if (palabra.trim() !== '') {
            iniciales.push(palabra[0].toUpperCase()); // Agregar la inicial en mayúscula
        }
    });

    // Unir las iniciales con espacios y devolver como cadena
    return iniciales.join(' ');
}

export default getInitials;