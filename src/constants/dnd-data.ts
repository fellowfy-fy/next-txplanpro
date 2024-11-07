import { CloudUpload } from "lucide-react";

export type DragDropVariant =
  | "upper_occlusal"
  | "lower_occlusal"
  | "side_left"
  | "side_right"
  | "frontal_open"
  | "frontal_closed"
  | "retractor"
  | "smile"
  | "other_portrait"
  | "panoramic_xray"
  | "xray"
  | "intro"
  | "vision"
  | "break";

export const DragAndDropData = {

    // upload-patients
    upper_occlusal: {
      label: "Upper Occlusal Photo",
      description: "Upload the upper occlusal photo.",
      Icon: CloudUpload,
    },
    lower_occlusal: {
      label: "Lower Occlusal Photo",
      description: "Upload the lower occlusal photo.",
      Icon: CloudUpload, 
    },
    side_left: {
      label: "Side Left Photo",
      description: "Upload the side left photo.",
      Icon: CloudUpload, 
    },
    side_right: {
      label: "Side Right Photo",
      description: "Upload the side right photo.",
      Icon: CloudUpload, 
    },
    frontal_open: {
      label: "Frontal Open Photo",
      description: "Upload the frontal open photo.",
      Icon: CloudUpload, 
    },
    frontal_closed: {
      label: "Frontal Closed Photo",
      description: "Upload the frontal closed photo.",
      Icon: CloudUpload, 
    },
    retractor: {
      label: "Retractor Photo",
      description: "Upload the retractor photo.",
      Icon: CloudUpload, 
    },
    smile: {
      label: "Smile Photo",
      description: "Upload the smile photo.",
      Icon: CloudUpload, 
    },
    other_portrait: {
      label: "Other Portrait Photos",
      description: "Upload other portrait photos.",
      Icon: CloudUpload, 
    },
    panoramic_xray: {
      label: "Panoramic X-Ray",
      description: "Upload the panoramic x-ray.",
      Icon: CloudUpload, 
    },
    xray: {
      label: "X-Rays",
      description: "Upload x-ray images.",
      Icon: CloudUpload, 
    },

    // upload-clinic
    intro: {
      label: "Intro",
      description: "Upload intro image.",
      Icon: CloudUpload, 
    },
    vision: {
      label: "Vision",
      description: "Upload Vision image.",
      Icon: CloudUpload, 
    },
    break: {
      label: "Break",
      description: "Upload Break image.",
      Icon: CloudUpload, 
    },
  };