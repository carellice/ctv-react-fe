export const getImportoFormatted = (importo) => {
    const importoString = importo.toString();
    const importoWithComma = importoString.replace(".", ",");

    // if (importoWithComma.includes(',')) {
    //     // Se la stringa contiene una virgola, limita a due cifre decimali
    //     const parti = importoWithComma.split(',');
    //     const parteDecimale = parti[1].substring(0, 2);
    //     return `${parti[0]},${parteDecimale}`;
    // } else {
    //     // Se la stringa non contiene una virgola, aggiungi ",00" alla fine
    //     return `${importoWithComma},00`;
    // }

    if (importoWithComma.includes(',')) {
        // Se la stringa contiene una virgola, limita a due cifre decimali
        const parti = importoWithComma.split(',');
        const parteDecimale = parti[1].substring(0, 2);
        const parteInteraFormattata = parti[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${parteInteraFormattata},${parteDecimale}`;
    } else {
        // Se la stringa non contiene una virgola, aggiungi ",00" alla fine
        const parteInteraFormattata = importoWithComma.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${parteInteraFormattata},00`;
    }
};