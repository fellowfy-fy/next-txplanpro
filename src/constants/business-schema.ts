import { z } from 'zod';

const servicePrices = z.array(
  z.object({
    name: z.string(),
    price: z.number({ message: "Price must be a number" }),
  })
);
const uploadedFilesSchema = z.object({
  intro: z.instanceof(File).nullable(),
  vision: z.instanceof(File).nullable(),
  break: z.instanceof(File).nullable(),
});
const content = z.array(
  z.object({
    name: z.string(),
    content: z.string(),
  })
)

export const businessSchema = z.object({
  servicePrices: servicePrices,
  uploadedFiles: uploadedFilesSchema,
  content: content,
})

export type TBusinessFormValues = z.infer<typeof businessSchema>;
