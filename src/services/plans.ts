import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { Plan } from '@prisma/client';

// interface DeletePatientResponse {
//   message?: string;
//   error?: string;
// }

// export const search = async (query: string, doctorId: number): Promise<Patient[]> => {
//   return (await axiosInstance.get<Patient[]>(ApiRoutes.SEARCH_PATIENTS, { params: { query, doctorId } }))
//     .data;
// };

// export const deleteId = async (patientId: number, doctorId: number): Promise<DeletePatientResponse> => {
//   return (await axiosInstance.delete(ApiRoutes.DELETE_PATIENT, { params: { patientId, doctorId } })).data;
// }

export const getPlans = async (patientId: number, doctorId: number | null): Promise<Plan[]> => {
  return (await axiosInstance.get<Plan[]>(ApiRoutes.GET_PLANS, { params: { patientId, doctorId } })).data;
}