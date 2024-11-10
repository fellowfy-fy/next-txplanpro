import React from 'react';
import { Button } from "../ui/button";
import { Printer } from "lucide-react";

interface PrintSectionsProps {
  introImage: string;
  visionImage: string;
  leftSideImage: string;
  rightSideImage: string;
  lowerOcclusalImage: string;
  upperOcclusalImage: string;
  panoramicXrayImage: string;
  patientName: string;
  doctorName: string;
  visionText: string;
  servicesText: string;
  teeth: any[]; // Замените на правильный тип
  formattedPrices: any[]; // Замените на правильный тип
  countTreatments: (teeth: any[]) => any[]; // Замените на правильный тип
}

export const PrintSections: React.FC<PrintSectionsProps> = ({
  introImage,
  visionImage,
  leftSideImage,
  rightSideImage,
  lowerOcclusalImage,
  upperOcclusalImage,
  panoramicXrayImage,
  patientName,
  doctorName,
  visionText,
  servicesText,
  teeth,
  formattedPrices,
  countTreatments
}) => {
   const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

const printContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Print Sections</title>
      <style>
        @page {
          size: A4 landscape;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          background: white;
        }
        .section {
          width: 100vw;
          height: 100vh;
          position: relative;
          page-break-after: always;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .section-content {
          position: relative;
          aspect-ratio: 842 / 595;
          width: 100%;
          height: 100%;
        }
        .full-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* Обеспечиваем, чтобы контент всегда заполнял страницу с сохранением пропорций */
        .section-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: calc(100vw * (595/842));
          max-height: 100vh;
          max-width: calc(100vh * (842/595));
        }
        @media print {
          .section {
            width: 100%;
            height: 100%;
            page-break-after: always;
          }
          .section-content {
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            width: 100%;
            height: 100%;
            max-width: none;
            max-height: none;
          }
          /* Убираем разрыв страницы после последней секции */
          .section:last-child {
            page-break-after: avoid;
          }
        }
        /* Корректируем размеры изображений внутри секций */
        .side-image {
          width: calc(100vw * 0.4);
          height: calc(100vw * 0.3);
          max-width: 400px;
          max-height: 300px;
          object-fit: cover;
        }
        @media print {
          .side-image {
            width: 400px;
            height: 300px;
          }
        }
      </style>
    </head>
    <body>
      <!-- Intro Section -->
      <div class="section">
        <div class="section-content">
          <img src="${introImage}" class="full-image" />
          <div style="position: absolute; left: 5%; top: 33%; color: white;">
            <p style="font-size: min(50px, 5vw); line-height: 1;">Treatment plan<br />& patient's clinical guide</p>
            <hr style="margin-top: 12px"/>
            <p style="font-size: min(30px, 3vw); font-weight: 300;">Patient Name: <span style="font-weight: 600;">${patientName}</span></p>
            <p style="font-size: min(30px, 3vw); font-weight: 300;">Doctor: <span style="font-weight: 600;">${doctorName}</span></p>
          </div>
        </div>
      </div>

      <!-- Vision Section -->
      <div class="section">
        <div class="section-content">
          <img src="${visionImage}" class="full-image" />
          <p style="position: absolute; left: 19%; top: 24%; font-size: min(50px, 5vw); line-height: 1; color: white; text-align: right;">
            Our<br />Vision &<br />Approach
          </p>
          <p style="position: absolute; right: 27%; bottom: 38%; font-size: min(20px, 2vw); color: white; font-weight: 300; max-width: 300px;">
            ${visionText}
          </p>
        </div>
      </div>

      <!-- Sides Section -->
      <div class="section">
        <div class="section-content" style="background: white;">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <p style="font-size: min(30px, 3vw); font-weight: bold; margin: 20px 0;">DIAGNOSIS<br />VISUALISATION</p>
            <div style="display: flex; gap: 5%; justify-content: center; align-items: center; margin-top: 20px;">
              <div style="text-align: center;">
                <p style="font-size: min(30px, 3vw); font-weight: bold; margin-bottom: 64px;">UPPER JAW</p>
                <img src="${leftSideImage}" class="side-image" />
              </div>
              <div style="text-align: center;">
                <p style="font-size: min(30px, 3vw); font-weight: bold; margin-bottom: 64px;">LOWER JAW</p>
                <img src="${rightSideImage}" class="side-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Occlusal Section -->
      <div class="section">
        <div class="section-content" style="background: white;">
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <p style="font-size: min(30px, 3vw); font-weight: bold; margin: 20px 0;">DIAGNOSIS<br />VISUALISATION</p>
            <div style="display: flex; gap: 5%; justify-content: center; align-items: center; margin-top: 20px;">
              <div style="text-align: center;">
                <p style="font-size: min(30px, 3vw); font-weight: bold; margin-bottom: 64px;">LEFT SIDE</p>
                <img src="${lowerOcclusalImage}" class="side-image" />
              </div>
              <div style="text-align: center;">
                <p style="font-size: min(30px, 3vw); font-weight: bold; margin-bottom: 64px;">RIGHT SIDE</p>
                <img src="${upperOcclusalImage}" class="side-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- X-ray Section -->
      <div class="section">
        <div class="section-content" style="background: white;">
          <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="height: 50%;">
              <img src="${panoramicXrayImage}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="flex: 1; display: flex; justify-content: space-between; padding: 2%;">
              <div style="flex: 1; padding: 0 2%;">
                <p style="font-size: min(20px, 2vw); line-height: 1.2; font-weight: bold; margin-bottom: 12px;">
                  SURGICAL & IMPLANT<br />TREATMENT
                </p>
                <p style="font-size: min(16px, 1.6vw);">${servicesText}</p>
              </div>
              <div style="flex: 1; padding: 0 2%;">
                <p style="font-size: min(20px, 2vw); line-height: 1.2; font-weight: bold; margin-bottom: 12px; text-align: center;">
                  PROCEDURES
                </p>
                ${countTreatments(teeth).map(item => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: min(16px, 1.6vw);">
                    <span>${item.name}</span>
                    <span style="font-weight: 600;">${item.count}</span>
                  </div>
                `).join('')}
              </div>
              <div style="flex: 1; padding: 0 2%;">
                <p style="font-size: min(20px, 2vw); line-height: 1.2; font-weight: bold; margin-bottom: 12px; text-align: center;">
                  FINANCIAL PLAN
                </p>
                ${formattedPrices.map(item => `
                  <div style="margin-bottom: 4px; font-size: min(16px, 1.6vw);">
                    ${item.name} ($${item.pricePerUnit} × ${item.count}) = $${item.totalPrice}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          }
        }
      </script>
    </body>
  </html>
`;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <Button onClick={handlePrint} variant="outline">
      <Printer className="mr-2 h-4 w-4" />
      Print Sections
    </Button>
  );
};