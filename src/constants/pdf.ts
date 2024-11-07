export interface PdfContent {
  images: {
    intro: string;
    description: string;
    leftSide: string;
    rightSide: string;
    lowerJaw: string;
    upperJaw: string;
    xray: string;
  };
  texts: {
    pageTitle: string;
    patientStatus: string;
    leftSideLabel: string;
    rightSideLabel: string;
    lowerSideLabel: string;
    upperSideLabel: string;
    columnOne: string;
    columnTwo: string;
    columnThree: string;
  };
}

export const pdfContent: PdfContent = {
  images: {
    intro: "/intro-placeholder.jpg",
    description: "/description-placeholder.jpg",
    leftSide: "/left-side.png",
    rightSide: "/right-side.png",
    lowerJaw: "/lower-jaw.png",
    upperJaw: "/upper-jaw.png",
    xray: "/xray.png",
  },
  texts: {
    pageTitle: "Preview of PDF Plan sfnsg ibs",
    patientStatus: "Patient LOL ready for duty akbfkf  VFU",
    leftSideLabel: "Left Side",
    rightSideLabel: "Right Side",
    lowerSideLabel: "Lower Side",
    upperSideLabel: "Upper Side",
    columnOne: "Text in Column 1",
    columnTwo: "Text in Column 2",
    columnThree: "Text in Column 3",
  },
};