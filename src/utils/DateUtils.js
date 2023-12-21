export const monthList = [
    "GENNAIO",
    "FEBBRAIO",
    "MARZO",
    "APRILE",
    "MAGGIO",
    "GIUGNO",
    "LUGLIO",
    "AGOSTO",
    "SETTEMBRE",
    "OTTOBRE",
    "NOVEMBRE",
    "DICEMBRE",
]

export const getDateMonthYear = () => {
    const dataCorrente = new Date();
    const meseCorrente = monthList[dataCorrente.getMonth()];
    const annoCorrente = dataCorrente.getFullYear();

    return meseCorrente + " " + annoCorrente;
};


export const getDateDayMonthYear = (date) => {
    const mese = monthList[date.getMonth()];
    const anno = date.getFullYear();
    const giorno = date.getDate();

    return giorno + " " + mese + " " + anno;
};


export const getDateDayMonthYearHourMinute = async (date) => {
    const mese = monthList[date.getMonth()];
    const anno = date.getFullYear();
    const giorno = date.getDate();
    const ore = date.getHours();
    const minuti = date.getMinutes();

    return giorno + " " + mese + " " + anno + " - " + ore + ":" + minuti;
};