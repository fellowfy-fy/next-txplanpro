import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";
import { Patient, User, PatientImage, BusinessImage, Service, BusinessContent, Tooth } from "@prisma/client";

interface GeneratePDFParams {
  patient: Patient;
  doctor: User;
  patientImages: PatientImage[];
  doctorImages: BusinessImage[];
  prices: Service[];
  content: BusinessContent[];
  teeth: Tooth[];
}

async function fetchImageAsBytes(imageUrl: string) {
  try {
    const fullUrl = imageUrl.startsWith('/')
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`
      : imageUrl;

    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error('Failed to fetch image');
    return {
      bytes: await response.arrayBuffer(),
      type: response.headers.get('content-type') || ''
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

async function embedImage(pdfDoc: PDFDocument, imageData: { bytes: ArrayBuffer, type: string }) {
  try {
    if (imageData.type.includes('jpeg') || imageData.type.includes('jpg')) {
      return await pdfDoc.embedJpg(imageData.bytes);
    } else if (imageData.type.includes('png')) {
      return await pdfDoc.embedPng(imageData.bytes);
    } else {
      throw new Error('Unsupported image type');
    }
  } catch (error) {
    console.error('Error embedding image:', error);
    return null;
  }
}

async function generatePDF({
  patient,
  doctor,
  patientImages,
  doctorImages,
  content,
  prices,
  teeth
}: GeneratePDFParams) {
  const pdfDoc = await PDFDocument.create();

  // Загружаем шрифт с поддержкой Unicode
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const landscapeWidth = 842;
  const landscapeHeight = 595;

  // Get content texts
  const introText = content.find(item => item.type === 'intro')?.content || "None";
  const visionText = content.find(item => item.type === 'vision')?.content || "None";
  const breakText = content.find(item => item.type === 'break')?.content || "None";
  const servicesText = content.find(item => item.type === 'services')?.content || "None";

  // Get images URLs
  const introImageUrl = doctorImages.find(item => item.type === 'intro')?.imageUrl;
  const visionImageUrl = doctorImages.find(item => item.type === 'vision')?.imageUrl;
  const breakImageUrl = doctorImages.find(item => item.type === 'break')?.imageUrl;

  const leftSideImageUrl = patientImages.find(item => item.type === 'side_left')?.imageUrl;
  const rightSideImageUrl = patientImages.find(item => item.type === 'side_right')?.imageUrl;
  const upperOcclusalImageUrl = patientImages.find(item => item.type === 'upper_occlusal')?.imageUrl;
  const lowerOcclusalImageUrl = patientImages.find(item => item.type === 'lower_occlusal')?.imageUrl;
  const panoramicXrayImageUrl = patientImages.find(item => item.type === 'panoramic_xray')?.imageUrl;

  // Page 1 - Intro
  const page1 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  if (introImageUrl) {
    const imageData = await fetchImageAsBytes(introImageUrl);
    if (imageData) {
      const image = await embedImage(pdfDoc, imageData);
      if (image) {
        page1.drawImage(image, {
          x: 0,
          y: 0,
          width: landscapeWidth,
          height: landscapeHeight,
        });
      }
    }
  }
  page1.drawText(`Patient Name: ${patient.fullName}`, {
    x: 50,
    y: landscapeHeight / 2,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });
  page1.drawText(`Doctor: ${doctor.fullName}`, {
    x: 50,
    y: (landscapeHeight / 2) - 50,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Page 2 - Vision
  const page2 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  if (visionImageUrl) {
    const imageData = await fetchImageAsBytes(visionImageUrl);
    if (imageData) {
      const image = await embedImage(pdfDoc, imageData);
      if (image) {
        page2.drawImage(image, {
          x: 0,
          y: 0,
          width: landscapeWidth,
          height: landscapeHeight,
        });
      }
    }
  }
  page2.drawText(visionText, {
    x: landscapeWidth / 2 - 200,
    y: landscapeHeight * 0.7,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });
  page2.drawText(`Doctor: ${doctor.fullName}`, {
    x: landscapeWidth - 300,
    y: landscapeHeight * 0.3,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Page 3 - Side Images
  const page3 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  if (leftSideImageUrl && rightSideImageUrl) {
    const [leftImageData, rightImageData] = await Promise.all([
      fetchImageAsBytes(leftSideImageUrl),
      fetchImageAsBytes(rightSideImageUrl)
    ]);

    if (leftImageData) {
      const leftImage = await embedImage(pdfDoc, leftImageData);
      if (leftImage) {
        page3.drawImage(leftImage, {
          x: 50,
          y: landscapeHeight - 350,
          width: 350,
          height: 300,
        });
      }
    }

    if (rightImageData) {
      const rightImage = await embedImage(pdfDoc, rightImageData);
      if (rightImage) {
        page3.drawImage(rightImage, {
          x: landscapeWidth - 400,
          y: landscapeHeight - 350,
          width: 350,
          height: 300,
        });
      }
    }
  }

  // Page 4 - Occlusal Images
  const page4 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  if (upperOcclusalImageUrl && lowerOcclusalImageUrl) {
    const [upperImageData, lowerImageData] = await Promise.all([
      fetchImageAsBytes(upperOcclusalImageUrl),
      fetchImageAsBytes(lowerOcclusalImageUrl)
    ]);

    if (upperImageData) {
      const upperImage = await embedImage(pdfDoc, upperImageData);
      if (upperImage) {
        page4.drawImage(upperImage, {
          x: 50,
          y: landscapeHeight - 350,
          width: 350,
          height: 300,
        });
      }
    }

    if (lowerImageData) {
      const lowerImage = await embedImage(pdfDoc, lowerImageData);
      if (lowerImage) {
        page4.drawImage(lowerImage, {
          x: landscapeWidth - 400,
          y: landscapeHeight - 350,
          width: 350,
          height: 300,
        });
      }
    }
  }

  // Page 5 - Break
  const page5 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  if (breakImageUrl) {
    const imageData = await fetchImageAsBytes(breakImageUrl);
    if (imageData) {
      const image = await embedImage(pdfDoc, imageData);
      if (image) {
        page5.drawImage(image, {
          x: 0,
          y: 0,
          width: landscapeWidth,
          height: landscapeHeight,
        });
      }
    }
  }
  page5.drawText(breakText, {
    x: landscapeWidth - 300,
    y: landscapeHeight * 0.3,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  // Page 6 - Panoramic and Services
  const page6 = pdfDoc.addPage([landscapeWidth, landscapeHeight]);
  if (panoramicXrayImageUrl) {
    const imageData = await fetchImageAsBytes(panoramicXrayImageUrl);
    if (imageData) {
      const image = await embedImage(pdfDoc, imageData);
      if (image) {
        page6.drawImage(image, {
          x: 50,
          y: landscapeHeight - 150,
          width: landscapeWidth - 100,
          height: 300,
        });
      }
    }
  }

  // Draw services text in columns
  const columnWidth = (landscapeWidth - 100) / 3;
  const columns = [
    { x: 50, text: servicesText },
    { x: 50 + columnWidth, text: servicesText },
    { x: 50 + columnWidth * 2, text: servicesText },
  ];

  columns.forEach((col) => {
    page6.drawText(col.text, {
      x: col.x,
      y: 200,
      size: 16,
      maxWidth: columnWidth - 20,
      font,
      color: rgb(0, 0, 0),
    });
  });

  return await pdfDoc.save();
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const pdfBytes = await generatePDF(data);

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="generated.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      {
        message: "Error generating PDF",
        error: (error instanceof Error ? error.message : "Unknown error")
      },
      { status: 500 }
    );
  }
}