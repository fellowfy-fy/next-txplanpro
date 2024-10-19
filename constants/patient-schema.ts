import { z } from 'zod';

const toothDataSchema = z.object({
  number: z.number(),
  diagnosis: z.array(z.string()),
  treatments: z.array(z.string()),
  note: z.string().optional(),
});

// Схема для загруженных файлов
const uploadedFilesSchema = z.object({
  upper_occlusal: z.instanceof(File).nullable(),
  lower_occlusal: z.instanceof(File).nullable(),
  side_left: z.instanceof(File).nullable(),
  side_right: z.instanceof(File).nullable(),
  panoramic_xray: z.instanceof(File).nullable(),
});


export const patientSchema = z.object({
  fullName: z.string().min(2, { message: 'Full Name must have at least 2 characters' }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birth Date must be in the format YYYY-MM-DD',
  }),
  address: z.string().min(5, { message: 'Address must have at least 5 characters' }),
  teethData: z.array(toothDataSchema),
  uploadedFiles: uploadedFilesSchema, 
});

export type TPatientFormValues = z.infer<typeof patientSchema>;
