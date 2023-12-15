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