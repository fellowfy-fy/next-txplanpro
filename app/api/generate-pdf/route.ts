import { PDFDocument, rgb } from "pdf-lib";
import { NextResponse } from "next/server";

// Функция для генерации PDF в landscape режиме
async function generatePDF() {
  const pdfDoc = await PDFDocument.create();

  // Указываем размеры страниц в альбомной ориентации (Landscape)
  const landscapeWidth = 842; // Ширина для альбомного режима (обычно высота для A4)
  const landscapeHeight = 595; // Высота для альбомного режима (обычно ширина для A4)

  const page1 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  const page2 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  const page3 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  const page4 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  const page5 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  const page6 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);

  // Добавляем background на первую страницу
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/420px-PNG_transparency_demonstration_1.png';
  const backgroundImageBytes = await fetch(url).then((res) => res.arrayBuffer());
  const backgroundImage = await pdfDoc.embedPng(backgroundImageBytes);
  page1.drawImage(backgroundImage, {
    x: 0,
    y: 0,
    width: landscapeWidth,
    height: landscapeHeight,
  });

  // Добавляем текст на вторую страницу
  page2.drawText('Text in bottom-left corner', {
    x: 50,
    y: 50,
    size: 24,
    color: rgb(0, 0, 0),
  });

  // Добавляем изображения на третью страницу
  const imageBytes = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/420px-PNG_transparency_demonstration_1.png').then((res) => res.arrayBuffer());
  const image = await pdfDoc.embedPng(imageBytes);
  const positions = [
    { x: 50, y: 300 },
    { x: 300, y: 300 },
    { x: 50, y: 100 },
    { x: 300, y: 100 },
  ];
  positions.forEach(pos => {
    page3.drawImage(image, {
      ...pos,
      width: 200,
      height: 200,
    });
  });

  // Добавляем текст на правую сторону четвертой страницы
  page4.drawText('Right-centered text', {
    x: 550,
    y: landscapeHeight / 2,
    size: 24,
    color: rgb(0, 0, 0),
  });

  // Добавляем текст в левом верхнем углу пятой страницы
  page5.drawText('Top-left text', {
    x: 50,
    y: landscapeHeight - 50,
    size: 24,
    color: rgb(0, 0, 0),
  });

  // Добавляем картинку сверху и текст в три столбца на шестой странице
  page6.drawImage(image, {
    x: 50,
    y: 400,
    width: 500,
    height: 100,
  });

  const columns = [
    { x: 50, text: 'Column 1 text' },
    { x: 250, text: 'Column 2 text' },
    { x: 450, text: 'Column 3 text' },
  ];
  columns.forEach((col) => {
    page6.drawText(col.text, {
      x: col.x,
      y: 300,
      size: 16,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export async function GET() {
  try {
    const pdfBytes = await generatePDF();
    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="generated.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ message: "Error generating PDF", error: (error instanceof Error ? error.message : "Unknown error") }, { status: 500 });
  }
}
