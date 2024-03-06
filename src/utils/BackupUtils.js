import * as DataBaseUtils from "./DataBaseUtils"
import {getDateDayMonthYearHourMinute} from "./DateUtils";
import * as DateUtils from "./DateUtils";

//ESEGUI BACKUP
export const scaricaBackup = async () => {
    // Ottieni i dati dal localStorage
    // const datiLocalStorage = localStorage.getItem('user');

    // Converte la stringa JSON in un oggetto JavaScript
    // const datiBackup = JSON.parse(datiLocalStorage);

    const datiBackup = await DataBaseUtils.getData();

    // Converti gli oggetti in una stringa JSON
    const datiJson = JSON.stringify(datiBackup);

    // Crea un oggetto Blob dal JSON
    const blob = new Blob([datiJson], { type: 'application/json' });

    // Crea un URL per il Blob
    const url = URL.createObjectURL(blob);

    // Crea un elemento a (link) temporaneo
    const link = document.createElement('a');
    link.href = url;
    // filename
    const now = new Date();
    const filename = [now.getDate(), "-", now.getMonth() + 1, "-", now.getFullYear(), "_", now.getHours(), "-", now.getMinutes(), ".json"].join("");
    link.download = filename; 
    document.body.appendChild(link);

    // Simula il clic sul link per avviare il download
    link.click();

    // Rimuovi l'elemento a (link) temporaneo
    document.body.removeChild(link);

    // Rilascia l'URL del Blob
    URL.revokeObjectURL(url);

    //salvo ultimo backup
    await DataBaseUtils.saveUltimoBackup();
};

//RIPRISTINO BACKUP
export const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        // Leggi il contenuto del file come testo
        const fileContent = await file.text();

        // Parsa il contenuto del file JSON
        const datiJson = JSON.parse(fileContent);

        // Inserisci i dati nel localStorage
        localStorage.setItem('data', JSON.stringify(datiJson));

        console.log('Dati inseriti nel localStorage:', datiJson);

        //salvo ultimo ripristino
         await DataBaseUtils.saveUltimoRipristino();
      } catch (errore) {
        console.error('Errore durante la lettura del file JSON:', errore);
      }
    }
};

export const copiaBackup = async () => {
  // Ottieni i dati dal localStorage
  // const datiLocalStorage = localStorage.getItem('user');

  // Converte la stringa JSON in un oggetto JavaScript
  // const datiBackup = JSON.parse(datiLocalStorage);

  let datiBackup = await DataBaseUtils.getData();

  // aggiungo la data attuale al json di backup
    const dataEsportazione = await DateUtils.getDateDayMonthYearHourMinute(new Date());
  datiBackup = {dataEsportazione: dataEsportazione, ...datiBackup}

  // Converti gli oggetti in una stringa JSON
  const datiJson = JSON.stringify(datiBackup);

  // Copy the text inside the text field
  navigator.clipboard.writeText(datiJson);
};

export const ripristinoBackup = async (dati) => {

  // const clipboard = await navigator.clipboard.readText();
  const clipboard = dati;

  if(clipboard.includes("user") && clipboard.includes("ctv") && clipboard.includes("svago") && clipboard.includes("primaNecessita")){
    // await DataBaseUtils.saveUltimoAggiornamento();
    localStorage.setItem('data', clipboard);
    return 200;
  }else{
    return 500;
  }
};