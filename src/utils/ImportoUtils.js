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

export const getSpese = (stipendio, primaNecessita, svago, risparmi) => {
    const stipendioFloat = parseFloat(stipendio);
    const primaNecessitaFloat = parseFloat(primaNecessita);
    const svagoFloat = parseFloat(svago);
    const risparmiFloat = parseFloat(risparmi);

    const speseFloat = stipendioFloat - primaNecessitaFloat - svagoFloat - risparmiFloat;

    return speseFloat.toString();
}

export const  calcolaPercentualeIntera = (totale, numero) => {
    const totaleFloat = parseFloat(totale);
    const numeroFloat = parseFloat(numero);
    if (totaleFloat === 0) {
      return 0;
    }
  
    var percentuale = Math.round((numeroFloat / totaleFloat) * 100);
    return percentuale;
}