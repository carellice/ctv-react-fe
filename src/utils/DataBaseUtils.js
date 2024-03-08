import * as DateUtils from "./DateUtils"
import * as ImportoUtils from "./ImportoUtils"

export const dataTemplate = {
    user: "user",
    ctv: [
    ],
    svago: [
    ],
    primaNecessita: [
    ]
};

export const saveData = async (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    await saveUltimoAggiornamento();
}

export const saveDataWithoutUtilmoAggiornamento = async (data) => {
    localStorage.setItem("data", JSON.stringify(data));
}

export const deleteData = async () => {
    localStorage.removeItem("data");
}

export const getData = async () => {
    if(localStorage.getItem("data") === null){
        localStorage.setItem("data", JSON.stringify(dataTemplate));
        return dataTemplate;
    }else{
        return JSON.parse(localStorage.getItem("data"));
    }
}

export const getUltimoBackup = async () => {
    if(localStorage.getItem("ultimoBackup") === null){
        return null;
    }else{
        const ultimoBacukpDate = new Date(localStorage.getItem("ultimoBackup"));
        const ultimoBackup = await DateUtils.getDateDayMonthYearHourMinute(ultimoBacukpDate);
        return ultimoBackup;
    }
}

export const getUltimoBackupRAW = async () => {
    if(localStorage.getItem("ultimoBackup") === null){
        return null;
    }else{
        const ultimoBacukpDate = new Date(localStorage.getItem("ultimoBackup"));
        return ultimoBacukpDate.toString();
    }
}

export const getUltimoRipristino = async () => {
    if(localStorage.getItem("ultimoRipristino") === null){
        return null;
    }else{
        const ultimoRipristinoDate = new Date(localStorage.getItem("ultimoRipristino"));
        const ultimoRipristino = await DateUtils.getDateDayMonthYearHourMinute(ultimoRipristinoDate);
        return ultimoRipristino;
    }
}

export const saveUltimoRipristino = async () => {
    localStorage.setItem("ultimoRipristino", new Date().toString());
}

export const saveUltimoBackup = async () => {
    localStorage.setItem("ultimoBackup", new Date().toString());
}

export const getCtv = async () => {
    const dataConst = await getData();
    return dataConst.ctv;
}

export const getTotCostiPrimaNecessita = async () => {
    const dataConst = await getData();
    const primaNec = dataConst.primaNecessita;
    var costoTot = 0;
    primaNec.forEach(el => {
        const costoEl = parseFloat(el.costo.replace(",", "."));
        costoTot = costoTot + costoEl;
    });
    return costoTot;
}

export const getTotCostiSvago = async () => {
    const dataConst = await getData();
    const primaNec = dataConst.svago;
    var costoTot = 0;
    primaNec.forEach(el => {
        const costoEl = parseFloat(el.costo.replace(",", "."));
        costoTot = costoTot + costoEl;
    });
    return costoTot;
}

export const savePrimaNecessita = async (scadenza, nome, note, dataDa, dataA, costo) => {
    const numeroRandom = Math.floor(Math.random() * 10000000);
    const primaNec = {
        id: new Date().toString() + numeroRandom.toString(),
        nome: nome,
        note: note,
        dataDa: scadenza ? dataDa.toString() : null,
        dataA: scadenza ? dataA.toString() : null,
        costo: costo.replace(",", ".")
    }

    const dataConst = await getData();
    const primaNecArray = dataConst.primaNecessita;
    const newPrimaNecArray = [...primaNecArray, primaNec];

    const data = await getData();
    const newData = {...data, primaNecessita: newPrimaNecArray};

    await saveData(newData);

    return 200;
}

export const saveSvago = async (scadenza, nome, note, dataDa, dataA, costo) => {
    const numeroRandom = Math.floor(Math.random() * 10000000);
    const svago = {
        id: new Date().toString() + numeroRandom.toString(),
        nome: nome,
        note: note,
        dataDa: scadenza ? dataDa.toString() : null,
        dataA: scadenza ? dataA.toString() : null,
        costo: costo.replace(",", ".")
    }

    const dataConst = await getData();
    const svagoArray = dataConst.svago;
    const newSvagoArray = [...svagoArray, svago];

    const data = await getData();
    const newData = {...data, svago: newSvagoArray};

    await saveData(newData);

    return 200;
}

export const saveCtv = async (dataPar, stipendio, svago, primaNecessita, risparmi, percentualePrimaNecessita, percentualeRisparmi, percentualeSvago) => {
    const ctv = {
        id: new Date().toString(),
        data: dataPar,
        stipendio: stipendio.replace(",", "."),
        svago: svago,
        primaNecessita: primaNecessita,
        risparmi: risparmi,
        percentualePrimaNecessita: percentualePrimaNecessita,
        percentualeSvago: percentualeSvago,
        percentualeRisparmi: percentualeRisparmi
    }

    const dataConst = await getData();
    const ctvArray = dataConst.ctv;
    const newCtvArray = [...ctvArray, ctv];

    const data = await getData();
    const newData = {...data, ctv: newCtvArray};

    await saveData(newData);

    return 200;
}

export const delElById = async(id) => {
    const datas = await getData();
    const primaNecessitaArray = datas.primaNecessita;
    const newPrimaNecessitaArray = primaNecessitaArray.filter(el => el.id !== id);
    const svagoArray = datas.svago;
    const newSvagoArray = svagoArray.filter(el => el.id !== id);

    const newDatas = {...datas, primaNecessita: newPrimaNecessitaArray, svago: newSvagoArray}

    await saveData(newDatas);

    return 200;
}

export const getElById = async(id) => {
    const datas = await getData();
    const primaNecessitaArray = datas.primaNecessita;
    const newPrimaNecessitaArray = primaNecessitaArray.filter(el => el.id === id);
    const svagoArray = datas.svago;
    const newSvagoArray = svagoArray.filter(el => el.id === id);

    if(newSvagoArray.length !== 0){
        return newSvagoArray[0];
    }else{
        return newPrimaNecessitaArray[0];
    }
}

export const delCtvById = async(id) => {
    const datas = await getData();
    const ctvArray = datas.ctv;
    const newCtvArray = ctvArray.filter(el => el.id !== id);
    const newDatas = {...datas, ctv: newCtvArray}

    await saveData(newDatas);

    return 200;
}

export const orderSvagoByNome = async() => {
    const datas = await getData();
    const svagoArray = datas.svago;
    const arrayOrdinato = svagoArray.sort((a, b) => {
        const nomeA = a.nome.toUpperCase(); // Converti in maiuscolo per l'ordinamento senza distinzione tra maiuscole e minuscole
        const nomeB = b.nome.toUpperCase();
      
        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
    const newDatas = {...datas, svago: arrayOrdinato}

    await saveDataWithoutUtilmoAggiornamento(newDatas);

    return 200;
}
export const orderSvagoByCosto = async() => {
    const datas = await getData();
    const svagoArray = datas.svago;
    const arrayOrdinato = svagoArray.sort((a, b) => {
        const nomeA = parseFloat(a.costo);
        const nomeB = parseFloat(b.costo);
      
        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
    const newDatas = {...datas, svago: arrayOrdinato}

    await saveDataWithoutUtilmoAggiornamento(newDatas);

    return 200;
}


export const orderPrimaNecessitaByNome = async() => {
    const datas = await getData();
    const svagoArray = datas.primaNecessita;
    const arrayOrdinato = svagoArray.sort((a, b) => {
        const nomeA = a.nome.toUpperCase(); // Converti in maiuscolo per l'ordinamento senza distinzione tra maiuscole e minuscole
        const nomeB = b.nome.toUpperCase();
      
        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
    const newDatas = {...datas, primaNecessita: arrayOrdinato}

    await saveDataWithoutUtilmoAggiornamento(newDatas);

    return 200;
}

export const orderPrimaNecessitaByCosto = async() => {
    const datas = await getData();
    const svagoArray = datas.primaNecessita;
    const arrayOrdinato = svagoArray.sort((a, b) => {
        const nomeA = parseFloat(a.costo);
        const nomeB = parseFloat(b.costo);
      
        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });
    const newDatas = {...datas, primaNecessita: arrayOrdinato}

    await saveDataWithoutUtilmoAggiornamento(newDatas);

    return 200;
}

export const getCensored = async () => {
    if(localStorage.getItem("censored") === null){
        return false;
    }else{
        return localStorage.getItem("censored") === "true";
    }
}

export const saveCensored = async (value) => {
    localStorage.setItem("censored", value.toString());
}

export const saveEditWithUpdate = async (id) => {

    const data = await getData();
    const primaNecessita = data.primaNecessita;
    const svago = data.svago;

    const primaNecessitaFilter = primaNecessita.filter(el => el.id === id);
    const svagoFilter = svago.filter(el => el.id === id);
    if(primaNecessitaFilter.length !== 0){
        const res = await delElById(primaNecessitaFilter[0].id);
        const dataInizioDate = new Date(primaNecessitaFilter[0].dataDa);
        dataInizioDate.setMonth(dataInizioDate.getMonth() + 1);
        const primaNecessitaToSave = {...primaNecessitaFilter[0], dataDa: dataInizioDate.toString()};
        const dataADate = new Date(primaNecessitaToSave.dataA);
        if(dataInizioDate > dataADate){
        }else{
            const ress = await savePrimaNecessita(true, primaNecessitaToSave.nome, primaNecessitaToSave.note, primaNecessitaToSave.dataDa, primaNecessitaToSave.dataA, primaNecessitaToSave.costo);
        }
    } else if(svagoFilter.length !== 0){
        const res = await delElById(svagoFilter[0].id);
        const dataInizioDate = new Date(svagoFilter[0].dataDa);
        dataInizioDate.setMonth(dataInizioDate.getMonth() + 1);
        const svagoToSave = {...svagoFilter[0], dataDa: dataInizioDate.toString()};
        const dataADate = new Date(svagoToSave.dataA);
        if(dataInizioDate > dataADate){
        }else{
            const ress = await saveSvago(true, svagoToSave.nome, svagoToSave.note, svagoToSave.dataDa, svagoToSave.dataA, svagoToSave.costo);
        }
    }
}

export const checkCtv = async (stipendio, percentualePrimaNecessita, percentualeSvago, percentualeRisparmi, daSottrarrePrimaNecessita, daSottrarreSvago, daSottrarreRisparmi) => {
    if (
        stipendio === "" ||
        percentualePrimaNecessita === "" ||
        percentualeSvago === "" ||
        percentualeRisparmi === "" ||
        daSottrarrePrimaNecessita === "" ||
        daSottrarreSvago === "" ||
        daSottrarreRisparmi === ""
      ) {
        return 400; //errore popolare tutti i campi
      } else {
        return 200;
    }
}


export const insertCtv = async (stipendio, percentualePrimaNecessita, percentualeSvago, percentualeRisparmi, risultatoSvago, risultatoPrimaNecessita, risultatoRisparmi) => {
    saveCtv(
        DateUtils.getDateMonthYear(),
        stipendio,
        risultatoSvago,
        risultatoPrimaNecessita,
        risultatoRisparmi,
        percentualePrimaNecessita,
        percentualeRisparmi,
        percentualeSvago
    ).then((r) => {
    if (r === 200) {
        return 200;
    } else {
    return 500; //errore inserimento
    }
    });
}

export const saveUltimoAggiornamento = async () => {
    localStorage.setItem("ultimoAggiornamento", new Date().toString());
}

export const getUltimoAggiornamento = async () => {
    if(localStorage.getItem("ultimoAggiornamento") === null){
        return null;
    }else{
        const ultimoBacukpDate = new Date(localStorage.getItem("ultimoAggiornamento"));
        const ultimoBackup = await DateUtils.getDateDayMonthYearHourMinute(ultimoBacukpDate);
        return ultimoBackup;
    }
}

export const getUltimoAggiornamentoRAW = async () => {
    if(localStorage.getItem("ultimoAggiornamento") === null){
        return null;
    }else{
        const ultimoBacukpDate = new Date(localStorage.getItem("ultimoAggiornamento"));
        return ultimoBacukpDate.toString();
    }
}

export const getSpeseFisse = () => {
    if(localStorage.getItem("data") === null){
        return [];
    }else{
        const svago = JSON.parse(localStorage.getItem("data")).svago;
        const primaNecessita = JSON.parse(localStorage.getItem("data")).primaNecessita
        svago.forEach(oggetto => {
            oggetto.tipo = "s";
        });
        primaNecessita.forEach(oggetto => {
            oggetto.tipo = "pn";
        });
        return [...svago, ...primaNecessita];
    }
}

export const getTotalEntrateByMese = async () => {
    const datas = await getData();
    const ctvArray = datas.ctv;
    const meseArray = [];
    const meseArrayFinal = [];
    //PRENDO TUTTE LE DATE
    ctvArray.forEach(ctv => {
        const ctvData = ctv.data;
        if(!meseArray.includes(ctvData)){
            meseArray.push(ctvData);
        }
    });
    //CREO UN NUOVO ARRAY CHE CONTENGA LE DATE CON I RELATIVI TOTALI DI STIPENDI
    meseArray.forEach(mese => {
        const ctvMese = ctvArray.filter(ctv => ctv.data === mese);
        let stipendioTotale = 0;
        ctvMese.forEach(ctv => {
            const stipendioCtvFloat = parseFloat(ctv.stipendio);
            stipendioTotale = stipendioTotale + stipendioCtvFloat;
        });
        const stipendioTotaleFormatted = ImportoUtils.getImportoFormatted(stipendioTotale.toString());
        meseArrayFinal.push(mese + " - " + stipendioTotaleFormatted + " €");
    })

    return meseArrayFinal.reverse();
}