import {
    UploadCloud,
    ClipboardList,
    Smile,
    DollarSign,
    Image,
    Layers,
  } from "lucide-react";

export  const cardData = {
    // create
    complex: {
      title: "Complex treatment plan",
      description: "Ai - generated, fully customizable",
      details:
        "Create fast, professional and visual appealing Dental Treatment Plans online in just several minutes. Increase patient's trust and your clinic's brand identity",
      buttonText: ["CREATE"],
      Icon: Image,
      redirectUrlFirst: "/create-plan",
    },
    dsd: {
      title: "Digital Smile Design",
      description: "The core of your complex planning",
      details:
        "Treatment plan, motivate and educate Your patients. Increase case acceptance and Your understanding of Your patient's clinical needs",
      buttonText: ["CREATE", "OPEN"],
      Icon: Smile,
    },
    local: {
      title: "Local (segment) treatment plan",
      description: "Fast and easy",
      details: "Make presentations even for on-going local treatments",
      buttonText: ["CREATE"],
      Icon: Layers,
    },

    // patients
    upload: {
      title: "Upload patient's data",
      description: "Add photos, x-rays or videos to database",
      details:
        "Add as many photos or x-rays of Your patient as You need to create a great looking treatment plan or Digital Smile Design project",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
      redirectUrlFirst: "/upload-patients",
    },

    treatment: {
      title: "Treatment Plans",
      description: "Create new or open existing",
      details: "To-do (1)\nReady to present (0)\nAccepted (0)",
      buttonText: ["CREATE", "OPEN"],
      Icon: ClipboardList,
      redirectUrlFirst: "/create",
      redirectUrlSecond: "/all-plans",
    },

    dsdp: {
      title: "Digital Smile Design projects",
      description: "Create new or open existing ",
      details:
        "Make sure You have minimum of 2 good photos in DSD protocol (retractor-photo and smile photo) in the database or on Your device",
      buttonText: ["CREATE", "OPEN"],
      Icon: Smile,
      redirectUrlFirst: "/create",
    },

    payment: {
      title: "Payments and insurance",
      description: "Invoices and other documents",
      details: "All (1)\nPaid (1)\nPending (0)",
      buttonText: ["CREATE", "OPEN"],
      Icon: DollarSign,
      redirectUrlFirst: "/upload-pricing",
    },

    // settings
    uploadC: {
      title: "Clinic logo and photos",
      description: "Interior and exterior photos of clinic",
      details:
        "These photos are used in the static part of the treatment plan template, describing and showing Your clinic better for the patient",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
      redirectUrlFirst: "/upload-clinic",
    },

    dental: {
      title: "Dental care photos",
      description: "Surgery/Ortho/Therapy/Prostho",
      details: "Add photos describing best Your clinical care processes",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
    },

    team: {
      title: "Your team",
      description: "Doctors, Admins or Assistants",
      details:
        "Whoever You want to be shown in the template, so that the patient better know Your team",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
      redirectUrlFirst: "/upload-team",
    },

    texts: {
      title: "Static texts",
      description: "Describe Your clinic and your care",
      details:
        "Whoever You want to be shown in the template, so that the patient better know Your team",
      buttonText: ["UPLOAD", "OPEN DATABASE"],
      Icon: UploadCloud,
      redirectUrlFirst: "/upload-statix",
    },
  };