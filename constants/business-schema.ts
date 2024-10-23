import { z } from 'zod';

const servicePrices = z.array(
    z.object({
      type: z.string(),
      price: z.number({message: "Price must be a number"}),
    })
  );
const uploadedFilesSchema = z.object({
    intro: z.instanceof(File).nullable(),
    vision: z.instanceof(File).nullable(),
    break: z.instanceof(File).nullable(),
  });

export const businessSchema = z.object({
    servicePrices: servicePrices,
    uploadedFiles: uploadedFilesSchema, 
})

export type TBusinessFormValues = z.infer<typeof businessSchema>;
