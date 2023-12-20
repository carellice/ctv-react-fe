import React from 'react';
import jsPDF from 'jspdf';

const PdfGenerator = ({ data, fileName }) => {
  const handleDownload = () => {
    // Creare un nuovo documento PDF
    const pdfDoc = new jsPDF();

    // Aggiungere un titolo al documento
    pdfDoc.text('Report Mensile - Dati Finanziari', 10, 10);

    // Aggiungere i dati di "ctv"
    pdfDoc.text('CTV:', 10, 20);
    data.ctv.forEach((item, index) => {
      const yPosition = 30 + index * 10;
      pdfDoc.text(`ID: ${item.id}, Data: ${item.data}, Stipendio: ${item.stipendio}, Svago: ${item.svago}, Prima Necessità: ${item.primaNecessita}, Risparmi: ${item.risparmi}`, 10, yPosition);
    });

    // Aggiungere i dati di "svago"
    pdfDoc.text('Svago:', 10, 50);
    data.svago.forEach((item, index) => {
      const yPosition = 60 + index * 10;
      pdfDoc.text(`ID: ${item.id}, Nome: ${item.nome}, Note: ${item.note}, Data Da: ${item.dataDa}, Data A: ${item.dataA}, Costo: ${item.costo}`, 10, yPosition);
    });

    // Aggiungere i dati di "primaNecessita"
    pdfDoc.text('Prima Necessità:', 10, 90);
    data.primaNecessita.forEach((item, index) => {
      const yPosition = 100 + index * 10;
      pdfDoc.text(`ID: ${item.id}, Nome: ${item.nome}, Note: ${item.note}, Data Da: ${item.dataDa}, Data A: ${item.dataA}, Costo: ${item.costo}`, 10, yPosition);
    });

    // Salvare il documento come file PDF
    pdfDoc.save(`${fileName}.pdf`);
  };

  return (
    <button onClick={handleDownload}>
      Genera PDF
    </button>
  );
};

export default PdfGenerator;
