import { Patient } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';

interface DeletePatientResponse {
  message?: string;
  error?: string;
}

export const search = async (query: string, doctorId: number): Promise<Patient[]> => {
  return (await axiosInstance.get<Patient[]>(ApiRoutes.SEARCH_PATIENTS, { params: { query, doctorId } }))
    .data;
};

export const deleteId = async (patientId: number, doctorId: number): Promise<DeletePatientResponse> => {
  return (await axiosInstance.delete(ApiRoutes.DELETE_PATIENT, { params: { patientId, doctorId } })).data;
}