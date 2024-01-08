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
        return `${parteInteraFormattata},${parteDecimale}${parteDecimale.length === 1 ? '0' : ''}`;
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

export const sommaPrimaNecessita = () => {
    if(localStorage.getItem("data") === null){
        return "0,00";
    }else{
        var somma = parseFloat("0");
        const data = JSON.parse(localStorage.getItem("data"));
        const primaNecessita = data.primaNecessita;
        for (const primaNecessitaEl of primaNecessita) {
            somma = somma + parseFloat(primaNecessitaEl.costo);
        }
        return somma;
    }
}

export const sommaSvago = () => {
    if(localStorage.getItem("data") === null){
        return "0,00";
    }else{
        var somma = parseFloat("0");
        const data = JSON.parse(localStorage.getItem("data"));
        const svago = data.svago;
        for (const svagoEl of svago) {
            somma = somma + parseFloat(svagoEl.costo);
        }
        return somma;
    }
}

export const sommaSvagoPrimaNecessita = () => {
    if(localStorage.getItem("data") === null){
        return "0,00";
    }else{
        var somma = parseFloat("0");
        const data = JSON.parse(localStorage.getItem("data"));
        const svago = data.svago;
        const primaNecessita = data.primaNecessita;
        for (const svagoEl of svago) {
            somma = somma + parseFloat(svagoEl.costo);
        }
        for (const primaNecessitaEl of primaNecessita) {
            somma = somma + parseFloat(primaNecessitaEl.costo);
        }
        return somma;
    }
}