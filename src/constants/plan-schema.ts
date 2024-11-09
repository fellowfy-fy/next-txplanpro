import { z } from 'zod';

const toothDataSchema = z.object({
  id: z.number().optional(),
  number: z.number(),
  diagnosis: z.array(z.string()),
  treatments: z.array(z.string()),
  note: z.string().optional().nullable(),
});

const uploadedFilesSchema = z.object({
  upper_occlusal: z.instanceof(File).nullable(),
  lower_occlusal: z.instanceof(File).nullable(),
  side_left: z.instanceof(File).nullable(),
  side_right: z.instanceof(File).nullable(),
  panoramic_xray: z.instanceof(File).nullable(),
});


export const planSchema = z.object({
  title: z.string().nullable(),
  teeth: z.array(toothDataSchema),
  uploadedFiles: uploadedFilesSchema,
});

export type TPlanFormValues = z.infer<typeof planSchema>;
