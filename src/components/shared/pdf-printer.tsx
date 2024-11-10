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
              width: 100%;
              height: 100%;
              max-width: 1190px; /* A4 landscape width */
              max-height: 842px; /* A4 landscape height */
              position: relative;
            }
            .full-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .flex-container {
              display: flex;
              justify-content: space-between;
            }
            .white-text {
              color: white;
            }
            @media print {
              .section {
                width: 100%;
                height: 100%;
              }
              .section-content {
                width: 100%;
                height: 100%;
              }
            }
          </style>
        </head>
        <body>
          <!-- Intro Section -->
          <div class="section">
            <div class="section-content">
              <img src="${introImage}" class="full-image" />
              <div style="position: absolute; left: 40px; top: 33%; color: white;">
                <p style="font-size: 50px; line-height: 50px;">Treatment plan<br />& patient's clinical guide</p>
                <hr style="margin-top: 12px"/>
                <p style="font-size: 30px; font-weight: 300;">Patient Name: <span style="font-weight: 600;">${patientName}</span></p>
                <p style="font-size: 30px; font-weight: 300;">Doctor: <span style="font-weight: 600;">${doctorName}</span></p>
              </div>
            </div>
          </div>

          <!-- Vision Section -->
          <div class="section">
            <div class="section-content">
              <img src="${visionImage}" class="full-image" />
              <p style="position: absolute; left: 160px; top: 140px; font-size: 50px; line-height: 50px; color: white; text-align: right;">
                Our<br />Vision &<br />Approach
              </p>
              <p style="position: absolute; right: 224px; bottom: 224px; font-size: 20px; color: white; font-weight: 300; max-width: 300px;">
                ${visionText}
              </p>
            </div>
          </div>

          <!-- Sides Section -->
          <div class="section">
            <div class="section-content" style="display: flex; flex-direction: column; align-items: center; text-align: center; background: white;">
              <p style="font-size: 30px; font-weight: bold; margin: 20px 0;">DIAGNOSIS<br />VISUALISATION</p>
              <div style="display: flex; gap: 40px; margin-top: 20px; flex: 1; align-items: center;">
                <div style="text-align: center;">
                  <p style="font-size: 30px; font-weight: bold; margin-bottom: 64px;">UPPER JAW</p>
                  <img src="${leftSideImage}" style="width: 400px; height: 300px; object-fit: cover;" />
                </div>
                <div style="text-align: center;">
                  <p style="font-size: 30px; font-weight: bold; margin-bottom: 64px;">LOWER JAW</p>
                  <img src="${rightSideImage}" style="width: 400px; height: 300px; object-fit: cover;" />
                </div>
              </div>
            </div>
          </div>

          <!-- Occlusal Section -->
          <div class="section">
            <div class="section-content" style="display: flex; flex-direction: column; align-items: center; text-align: center; background: white;">
              <p style="font-size: 30px; font-weight: bold; margin: 20px 0;">DIAGNOSIS<br />VISUALISATION</p>
              <div style="display: flex; gap: 40px; margin-top: 20px; flex: 1; align-items: center;">
                <div style="text-align: center;">
                  <p style="font-size: 30px; font-weight: bold; margin-bottom: 64px;">LEFT SIDE</p>
                  <img src="${lowerOcclusalImage}" style="width: 400px; height: 300px; object-fit: cover;" />
                </div>
                <div style="text-align: center;">
                  <p style="font-size: 30px; font-weight: bold; margin-bottom: 64px;">RIGHT SIDE</p>
                  <img src="${upperOcclusalImage}" style="width: 400px; height: 300px; object-fit: cover;" />
                </div>
              </div>
            </div>
          </div>

          <!-- X-ray Section -->
          <div class="section">
            <div class="section-content" style="display: flex; flex-direction: column; background: white;">
              <img src="${panoramicXrayImage}" style="width: 100%; height: 300px; object-fit: cover;" />
              <div style="display: flex; justify-content: space-between; padding: 20px; flex: 1;">
                <div style="flex: 1; text-align: left;">
                  <p style="font-size: 20px; line-height: 24px; font-weight: bold; margin-bottom: 12px;">
                    SURGICAL & IMPLANT<br />TREATMENT
                  </p>
                  <p>${servicesText}</p>
                </div>
                <div style="flex: 1; text-align: left;">
                  <p style="font-size: 20px; line-height: 24px; font-weight: bold; margin-bottom: 12px; text-align: center;">
                    PROCEDURES
                  </p>
                  ${countTreatments(teeth).map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span>${item.name}</span>
                      <span style="font-weight: 600;">${item.count}</span>
                    </div>
                  `).join('')}
                </div>
                <div style="flex: 1; text-align: left;">
                  <p style="font-size: 20px; line-height: 24px; font-weight: bold; margin-bottom: 12px; text-align: center;">
                    FINANCIAL PLAN
                  </p>
                  ${formattedPrices.map(item => `
                    <div style="margin-bottom: 4px;">
                      ${item.name} ($${item.pricePerUnit} × ${item.count}) = $${item.totalPrice}
                    </div>
                  `).join('')}
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