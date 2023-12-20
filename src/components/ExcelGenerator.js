import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = ({ data, fileName }) => {
  const handleDownload = () => {
    // Unire i dati di "ctv", "svago" e "primaNecessita" in un'unica tabella
    const mergedData = [
      ...data.ctv.map(item => ({ categoria: 'ctv', ...item })),
      ...data.svago.map(item => ({ categoria: 'svago', ...item })),
      ...data.primaNecessita.map(item => ({ categoria: 'primaNecessita', ...item })),
    ];

    // Creare un foglio Excel
    const ws = XLSX.utils.json_to_sheet(mergedData);

    // Creare un libro Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Convertire il libro in un array di byte
    const excelArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convertire l'array di byte in un blob
    const blob = new Blob([excelArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Creare un URL dal blob e creare un link di download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;

    // Aggiungere il link al documento, fare clic su di esso e rimuoverlo dopo il download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload}>
      Genera Excel
    </button>
  );
};

export default ExcelGenerator;
