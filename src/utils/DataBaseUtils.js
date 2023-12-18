export const dataTemplate = {
    user: "ccarellice",
    ctv: [
    ],
    svago: [
    ],
    primaNecessita: [
    ]
};

export const saveData = async (data) => {
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
    const primaNec = {
        id: new Date().toString(),
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
    const svago = {
        id: new Date().toString(),
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

    await saveData(newDatas);

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

    await saveData(newDatas);

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

    await saveData(newDatas);

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

    await saveData(newDatas);

    return 200;
}