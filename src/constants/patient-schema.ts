import { z } from 'zod';

export const patientSchema = z.object({
  fullName: z.string().min(2, { message: 'Full Name must have at least 2 characters' }),
  birthDate: z.coerce
    .date()
    .min(new Date('1900-01-01'), { message: 'Birth date cannot be before 1900' })
    .max(new Date(), { message: 'Birth date cannot be in the future' }),
  address: z.string().min(5, { message: 'Address must have at least 5 characters' }),
});

export type TPatientFormValues = z.infer<typeof patientSchema>;
