import { z } from 'zod';

export const patientSchema = z.object({
  fullName: z.string().min(2, { message: 'Full Name must have at least 2 characters' }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birth Date must be in the format YYYY-MM-DD',
  }),
  address: z.string().min(5, { message: 'Address must have at least 5 characters' }),
});

export type TPatientFormValues = z.infer<typeof patientSchema>;
