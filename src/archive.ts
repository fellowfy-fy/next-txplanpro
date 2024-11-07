/**
 *  ЭТО ФУНКЦИЯ КОТОРАЯ БЛЯ НЕ ПОМНЮ, НО СОХРАНЮ. ЧОТО ПРО СТАРЫЕ ДАННЫЕ ПАЦИЕНТА, КОТОРЫЕ Я ПОПРАВЛЯЛ БЛЯ. НУ ЕГО В ПИЗДУ ЛУЧШЕ ЗАНОВО ПЕРЕПИШУ, А НЕ ЭТИМ ГОВНОМ ПОЛЬЗОВАТЬСЯ
 */


// methods.setValue("fullName", patient.fullName);
// methods.setValue("address", patient.address);
// const formattedBirthDate = new Date(patient.birthDate)
//   .toISOString()
//   .split("T")[0];
// methods.setValue("birthDate", formattedBirthDate);

// if (patient.teeth) {
//   const formattedTeethData = patient.teeth.map((tooth) => ({
//     number: tooth.number,
//     diagnosis: tooth.diagnoses,
//     treatments: tooth.treatment,
//     note: tooth.note || undefined,
//   }));

//   methods.setValue("teethData", formattedTeethData);
// }
// if (patient.images) {
//   const patientImages = patient.images;

//   const fieldMap: Record<
//     string,
//     keyof TPlanFormValues["uploadedFiles"]
//   > = {
//     upper_occlusal: "upper_occlusal",
//     lower_occlusal: "lower_occlusal",
//     side_left: "side_left",
//     side_right: "side_right",
//     panoramic_xray: "panoramic_xray",
//   };

//   const uploadedFiles = await convertUrlsToFiles<
//     TPlanFormValues["uploadedFiles"]
//   >(patientImages, fieldMap);
//   methods.setValue("uploadedFiles", uploadedFiles);
// }